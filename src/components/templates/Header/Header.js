import AuthService from "@/services/AuthService";
import AppNotifications from "@/common-components/AppNotifications/AppNotifications.vue";
/*
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';  //
import VueMoment from 'vue-moment'; //
import moment from 'moment-timezone'; // npm uninstall moment-timezone


Vue.use(VueMoment, {
    moment,
})
// Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios);
*/
export default {
  name: "SiteHeader",
  components: {
    AppNotifications
  },
  methods: {
    trySignup() {
      if (this.$route.name !== "signup") {
        this.$router.push("/signup");
      }
    },
    logout() {
      // tell the server
      if (this.$store.state.clientCenter.currentPage.hasUnsavedChanges) {
        this.$confirmDialog
          .confirm({
            title: "Do you want to logout?",
            text: "Your changes won't be saved."
          })
          .then(res => {
            this.doLogout();
          })
          .catch(reason => {});
      } else {
        this.doLogout();
      }
    },
    async doLogout() {
      try {
        this.logoutProgressing = true;
        await AuthService.logout();
        Logger.log("Logout by clicking logout button in top header");
        // TODO: consider clearing the whole local store
        // TODO: stop using local storage at all
        if (this.$route.name !== "home") {
          await this.$router.push({
            name: "home"
          });
        }
        this.$store.commit("clientCenter/setRouterAfterLogin", {
          name: "dashboard"
        });
        this.logoutProgressing = false;
      } catch (e) {
        this.logoutProgressing = false;
        Logger.error("Failed log out", e);
      }
    },
    userProfileDialogSave() {
      this.userProfileDialog = false;
    },
    transparentOrWhite() {
      this.headerClasses = this.isHomepage ? "transparent" : "navBar";
    },
    handleScroll() {
      if (window.scrollY > 0) {
        this.headerClasses = "navBar";
      } else {
        this.headerClasses = "transparent";
      }
    },
    addScrollhandler() {
      window.addEventListener("scroll", this.handleScroll);
    },
    removeScrollhandler() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    // ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    }
  },
  data() {
    return {
      attrPrefix: "header",
      menu: false,
      drawer: false,
      userProfileDialog: false,
      headerClasses: "",
      title: null,
      responsive: false,
      responsiveInput: false,
      logoutProgressing: false
      //moment: moment
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
    isInMyAccount() {
      return this.$route.meta && this.$route.meta.requiresAuth;
    },
    showAllDashboardPages() {
      if (this.$store.state.showLinkedAccount) {
        return this.$store.getters["linkedAccount/hasProperty"];
      } else {
        return this.$store.getters["properties/hasAnyProperty"];
      }
    },
    store: function() {
      return this.$store.state;
    },
    isHomepage: function() {
      return (
        this.$route.path === "/" ||
        (this.$route.name && this.$route.name.substr(0, 4) === "home")
      );
    },
    notifications() {
      if (this.$store.state.isUserLoggedIn) {
        return this.$store.state.notification.notifications;
      } else {
        return [];
      }
    },
    unReadNotifications() {
      if (this.$store.state.isUserLoggedIn) {
        return this.$store.getters["notification/availableUnreadNotifications"];
      } else {
        return [];
      }
    }
  },
  watch: {
    $route(val) {
      this.transparentOrWhite();

      if (this.isHomepage) this.addScrollhandler();
      else this.removeScrollhandler();
      this.title = val.name;
    }
  },
  async mounted() {
    this.transparentOrWhite();

    if (this.isHomepage) this.addScrollhandler();
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  async updated() {},
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  destroyed() {
    if (this.isHomepage) this.removeScrollhandler();
  }
};
