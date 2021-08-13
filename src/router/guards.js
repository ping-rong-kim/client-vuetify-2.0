import AuthService from "@/services/AuthService";
import AppHelper from "@/helpers/AppHelper";
import NotificationMicroservice from "@/microservices/NotificationMicroservice";

/**
 * Simple client side route guard to ensure user is authenticated.
 * If the route meta data requires authentication a serverside call is made to validate the token
 * Otherwise, the user will be redirected to the login page.
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
function guardBeforeEach(to, from, next) {
  let token = AppHelper.getTokenFromCookie();
  if (
    !from.matched.some(record => ["signup", "login"].includes(record.name)) &&
    to.matched.some(record => ["signup", "login"].includes(record.name))
  ) {
    if (AuthService.isLoggedIn) {
      next({
        name:
          AuthService.$store.state.clientCenter.router.beforeLogin.name ||
          "home",
        replace: true
      });
      return true;
    } else {
      if (from.name) {
        AuthService.$store.commit("clientCenter/setRouterBeforeLogin", {
          pageIndex: history.length,
          href: location.href,
          name: from.name
        });
      }
    }
  }
  if (!token) {
    if (to.name !== from.name) {
      AuthService.frontLogout();
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // TODO decide if get from cookie or from session storage
    // let token = AppHelper.getTokenFromBrowserStorage();
    if (!token) {
      AuthService.$store.commit("clientCenter/setRouterAfterLogin", {
        pageIndex: history.length,
        href: location.href,
        name: to.name
      });
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
      // TODO we could look in JWT for roles, admin broker etc
    } else {
      // see if its valid token
      if (AuthService.isLoggedIn) {
        AuthService.$store.commit("clientCenter/setCurrentPage", {});
        next();
      } else {
        AuthService.jwtLogin()
          .then(res => {
            AuthService.$store.commit("clientCenter/setCurrentPage", {});
            NotificationMicroservice.load();
            next();
          })
          .catch(error => {
            AuthService.$store.commit("clientCenter/setRouterAfterLogin", {
              pageIndex: history.length,
              href: location.href,
              name: to.name
            });
            next({
              path: "/login",
              params: { nextUrl: to.fullPath }
            });
          });
      }
      // TODO: maybe see if its authenticated user? maybe a bit over kill for routes. Can do auth server side.
    }
  } else {
    if (AppHelper.getTokenFromCookie() && to.name === "forgot-password") {
      AuthService.logout().then(res => {
        Logger.log("Logout by guard to route forgot-password");
        AuthService.$store.commit("clientCenter/setCurrentPage", {});
        next();
      });
    } else if (token && AuthService.isLoggedIn === false) {
      if (
        to.matched.some(record => ["signup", "login"].includes(record.name))
      ) {
        next();
      } else {
        AuthService.jwtLogin()
          .then(res => {
            AuthService.$store.commit("clientCenter/setCurrentPage", {});
            NotificationMicroservice.load();
            next();
          })
          .catch(error => {
            AuthService.frontLogout();
            AuthService.$store.commit("clientCenter/setCurrentPage", {});
            next();
          });
      }
    } else {
      AuthService.$store.commit("clientCenter/setCurrentPage", {});
      next();
    }
  }
}
function guardAfterEach(to, from) {
  if (
    (from.matched.some(record => record.name === "signup") ||
      from.matched.some(record => record.name === "login")) &&
    !(
      to.matched.some(record => record.name === "signup") ||
      to.matched.some(record => record.name === "login")
    )
  ) {
    if (AuthService.isLoggedIn && to.meta.requiresAuth) {
      setTimeout(() => {
        AuthService.$store.commit("clientCenter/setRouterAfterLogin", {
          pageIndex: history.length,
          href: location.href,
          name: to.name
        });
      }, 300);
    }
  }
}
function guardOnError(error) {
  Logger.error("Failed to load chunk with error", error);
  if (/loading .*chunk .* failed./i.test(error)) {
    window.location.reload(true);
  }
}
export default {
  guardBeforeEach,
  guardAfterEach,
  guardOnError
};
