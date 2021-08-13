import Vue from "vue";
import bugsnag from "@bugsnag/js";
import bugsnagVue from "@bugsnag/plugin-vue";
import App from "@/App.vue";
import router from "@/router/router";
import store from "@/store";

import AppEnv from "@/AppEnv";

import vuetify from "@/plugins/vuetify";

import VueHead from "vue-head";
import VueAnalytics from "vue-analytics";
import "@/assets/scss/main.scss";
// TODO remove uneeded @mdi font  02/05/2020
import "@mdi/font/css/materialdesignicons.css";

// import "vuetify/dist/vuetify.min.css";
// import "vuetify/src/stylus/app.styl";

import "@/stylus/main.styl";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init();
window.AOS = AOS;

let VueScrollTo = require("vue-scrollto");
const SocialSharing = require("vue-social-sharing");
Vue.use(SocialSharing);

Vue.use(VueHead, {
  separator: "",
  complement: ""
});

// for date manipulation - removed may 2020 as no one used it! and its big
/*
import moment from "moment";
Object.defineProperty(Vue.prototype, "$moment", { value: moment });
// for ordinals
import ordinal from "ordinal-js";
Object.defineProperty(Vue.prototype, "$ordinal", { value: ordinal });
*/

import { sync } from "vuex-router-sync";
sync(store, router);

import AppServices from "./services";
Vue.use(AppServices, { store });

import AppHelpers from "./helpers";
Vue.use(AppHelpers, { store });

import Microservices from "@/microservices";
Vue.use(Microservices, { store });

// Include client side router guards for security
// Before each route is called see if we need to check the JWT token

import Guard from "@/router/guards";
const enableGuards = true;
if (enableGuards) {
  router.beforeEach((to, from, next) => {
    Guard.guardBeforeEach(to, from, next);
  });
  router.afterEach(Guard.guardAfterEach);
  router.onError(Guard.guardOnError);
} else {
  //
}

//import { Ripple } from "vuetify/lib/directives";
Vue.config.productionTip = false;
// Vue.config.errorHandler = (err, vm, info) => {
//   ErrorHandler.handle(err, vm, info);
// };
// vuetify

// does nto use  G-XZ7X6N61D1 but use the account number in the UA format

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA || "UA-145588321-1",
  router,
  debug: {
    // sendHitTask: process.env.NODE_ENV === "production", // only run on server
    sendHitTask: true
    // enabled: true
  },
  fields: {
    cookieDomain: "auto"
  },
  checkDuplicatedScript: true,
  autoTracking: {}
});

import Directives from "./directives";
Vue.use(Directives);
//Vue scroll to
Vue.use(VueScrollTo);

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -120,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

// use bugsnag
if (process.env.VUE_APP_ENABLE_BUGSNAG) {
  const bugsnagClient = bugsnag(process.env.VUE_APP_ENABLE_BUGSNAG);
  bugsnagClient.use(bugsnagVue, Vue);
}

// TODO: write a std plugin that renders content and has behavior

// install common helper functions
import Helper from "@/plugins/Helper";
import AppHelper from "@/helpers/AppHelper";
Vue.prototype.$helper = Helper;
Vue.use(Helper);
Vue.prototype.$appHelper = AppHelper;
import AuthService from "./services/AuthService";
Vue.prototype.$authService = AuthService;

// Add any mixins to modify behavior of all components.
// TODO: general helper methods are probably best in the helper plugin above - this is jsut an example
import AppGeneralMixin from "@/mixins/AppGeneralMixin";
Vue.mixin(AppGeneralMixin);

import Logger from "@/helpers/AppLogger";
window.Logger = Logger;
window.logger = Logger;

import FacebookTrackingHelper from "@/helpers/FacebookTrackingHelper";
FacebookTrackingHelper.init();

import GtagTrackingHelper from "@/helpers/GtagTrackingHelper";
GtagTrackingHelper.init();

import MatomoTrackingHelper from "@/helpers/MatomoTrackingHelper";
if (process.env.VUE_APP_MATOMO_SITE_ID) {
  MatomoTrackingHelper.init();
}
import AppConfirmDialog from "./common-components/AppConfirmDialog/AppConfirmDialog";
Vue.component("AppConfirmDialog", AppConfirmDialog);
import AppConfirmDialogPlugin from "./plugins/AppConfirmDialogPlugin/AppConfirmDialogPlugin";
Vue.use(AppConfirmDialogPlugin, {});

import AppButton from "@/common-components/AppButton/AppButton.vue";
import InactivityHelper from "@/helpers/InactivityHelper";
Vue.component("AppButton", AppButton);
import BaseComponents from "@/base-components";
Vue.use(BaseComponents, {});
import Constants from "@/constants";
Vue.use(Constants, {});
import MicroHelpers from "@/micro-helpers";
import ErrorHandler from "@/handlers/ErrorHandler";
Vue.use(MicroHelpers, { store });

new Vue({
  router,
  store,
  vuetify,
  el: "#app",
  data: () => ({
    //
    currency: "£"
  }),
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  beforeCreate() {
    const existingVersion = AppHelper.getSourceVersion();
    Logger.log("existing version:", existingVersion);
    Logger.log("new version:", process.env.VERSION);
    if (
      existingVersion &&
      process.env.VERSION !== AppHelper.getSourceVersion()
    ) {
      AppHelper.setSourceVersion(process.env.VERSION);
      window.location.reload(true);
    } else {
      AppHelper.setSourceVersion(process.env.VERSION);
    }
  },
  created() {
    Logger.log("Add new feature in white label branch");
  },
  render: function(h) {
    return h(App);
  },
  computed: {
    NewLoanAmountComputed: {
      get: function() {
        return this.formatAsCurrency(search.filter.NewLoanAmount, 0);
      },
      set: function(newValue) {
        search.filter.NewLoanAmount = Number(newValue.replace(/[^0-9\.]/g, ""));
      }
    },
    store() {
      return this.$store.state;
    },
    password() {
      if (
        this.$store.state.registration &&
        this.$store.state.registration.personalDetails &&
        this.$store.state.registration.personalDetails.password
      ) {
        return this.$store.state.registration.personalDetails.password;
      }
      return false;
    }
  },
  watch: {
    password(nv, ov) {
      if (nv) {
        const registration = this.$store.state.registration;
        delete registration.personalDetails.password;
        this.$store.dispatch("setRegistration", registration);
      }
    }
  },
  methods: {
    onInactive() {
      console.log("I am in Main !!!!!!!!!!!");
      if (this.$authService.isLoggedIn) {
        this.$confirmDialog
          .confirm({
            title: "Are you still here?",
            text:
              "Due to inactivity we are about to log you out, if you are still here click below.",
            disagree: false,
            agree: "I'm still here",
            persistent: false
          })
          .then(() => {
            if (this.$authService.isLoggedIn) {
              this.$authService.verifyHash();
            }
          })
          .catch(async error => {
            if (error === "blButton") {
              await this.$authService.logout().catch(err => false);
              Logger.log(
                "Logout by InactivityHandler as clicking logout on confirm dialog"
              );
              await this.$router.push("/login").catch(err => false);
            } else {
              if (this.$authService.isLoggedIn) {
                this.$authService.verifyHash();
              }
            }
          })
          .finally(() => {
            InactivityHelper.addActivityListener();
            InactivityHelper.timer.clearInterval();
            this.$confirmDialog.updateData({ blText: false });
          });
        InactivityHelper.timer.restart();
      } else {
        InactivityHelper.addActivityListener();
      }
    },
    onSessionAbout() {
      if (this.$authService.isLoggedIn) {
        this.$confirmDialog
          .confirm({
            title: "Are you still here?",
            text:
              "Due to session will be expired soon, we are about to log you out, if you are still here click below.",
            disagree: false,
            agree: "I'm still here",
            persistent: false,
            blText: "Log out in 59s"
          })
          .then(() => {
            this.$authService.verifyHash();
          })
          .catch(async error => {
            if (error === "blButton") {
              await this.$authService.logout().catch(err => false);
              Logger.log(
                "Logout by InactivityHandler as clicking logout on session timeout confirm dialog"
              );
              await this.$router.push("/login").catch(err => false);
            } else {
              if (this.$authService.isLoggedIn) {
                this.$authService.verifyHash();
              }
            }
          })
          .finally(() => {
            InactivityHelper.timer.clearInterval();
            this.$confirmDialog.updateData({ blText: false });
          });
        InactivityHelper.timer.restart(59);
      }
    },
    async onSessionExpire() {
      try {
        this.$confirmDialog.destroy();
        if (this.$authService.isLoggedIn) {
          await this.$authService.frontLogout();
          await this.$router.push("/login");
        }
      } catch (e) {}
    },
    onInactivityCounting(sec) {
      this.$confirmDialog.updateData({ blText: "Log out in " + sec + "s" });
    },
    async onInactivityCountingEnd() {
      this.$confirmDialog.updateData({ blText: "Log out" });
      this.$confirmDialog.destroy();
      if (this.$authService.isLoggedIn) {
        await this.$authService.logout();
        Logger.log("Logout by InactivityHandler as timeout on confirm dialog");
        await this.$router.push("/login");

        InactivityHelper.addActivityListener();
        InactivityHelper.timer.clearInterval();
        this.$confirmDialog.updateData({ blText: false });
      }
    }
  },
  mounted() {
    if (this.password) {
      const registration = this.$store.state.registration;
      delete registration.personalDetails.password;
      this.$store.dispatch("setRegistration", registration);
    }
    this.$confirmDialog.mountIfNotMounted();
    this.$store.commit("clientCenter/setCurrentPageUnSavedChange", false);
    InactivityHelper.init();
    InactivityHelper.onInactive = this.onInactive.bind(this);
    InactivityHelper.onSessionAbout = this.onSessionAbout.bind(this);
    InactivityHelper.onSessionExpire = this.onSessionExpire.bind(this);
    InactivityHelper.timer.onCounting = this.onInactivityCounting.bind(this);
    InactivityHelper.timer.onCountingEnd = this.onInactivityCountingEnd.bind(
      this
    );
  }
});
