import { CircleLoader } from "@saeris/vue-spinners";
import AuthService from "@/services/AuthService";
export default {
  name: "EmailAccountConfirmed",
  data() {
    let status = "loading";
    if (
      AuthService.isLoggedIn &&
      this.$store.state.registration.platformProgress.emailConfirmed === true
    ) {
      status = "success";
    } else {
      status = "error";
    }
    return {
      status: status,
      isLoggedIn: AuthService.isLoggedIn
    };
  },
  components: {
    CircleLoader
  },
  beforeRouteEnter(to, from, next) {
    if (to.query && to.query.token) {
      AuthService.verifyEmail(to.query.token)
        .then(res => {
          if (res === "already_verified") {
            next({
              name: "dashboard"
            });
          } else {
            if (res.isAlreadyVerified) {
              next({
                name: "dashboard"
              });
            } else {
              next({
                name: "dashboard",
                params: {
                  emailVerified: true
                }
              });
            }
          }
        })
        .catch(error => {
          next();
        });
    } else {
      next();
    }
  }
};
