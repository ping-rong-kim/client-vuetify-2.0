import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import ClientCenter from "@/store/modules/client-center-store";
import Notification from "./modules/notification-store";
import General from "./modules/general-store";
import HashHelper from "@/helpers/HashHelper";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import AppEnv from "@/AppEnv";

const ENABLE_JWT_HASH = AppEnv.VUE_APP_ENABLE_JWT_HASH;
const vuexPersist = new VuexPersist({
  key: "app-state",
  storage: window.sessionStorage,
  reducer: state => ({
    isInMyAccount: state.isInMyAccount,
    // isUserLoggedIn: state.isUserLoggedIn,
    registration: state.registration,
    route: state.route,
    cuid: state.cuid,
    token: state.token, // TODO: Move the token to a cookie,
    clientCenter: state.clientCenter,
    linkedAccount: state.linkedAccount,
    dataVersion: state.dataVersion,
    notification: state.notification,
    general: state.general
  }),
  restoreState: (key, storage) => {
    const data = storage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        try {
          return HashHelper.decode(data);
        } catch (e) {}
      }
    }
  },
  saveState: (key, state, storage) => {
    if (ENABLE_JWT_HASH === "true") {
      const hash = HashHelper.encode(state);
      storage.setItem(key, hash);
    } else {
      storage.setItem(key, JSON.stringify(state));
    }
  }
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  // strict: true,
  state: {
    token: null,
    cuid: null,
    alert: null,
    errorAlert: null,
    registration: null,
    isUserLoggedIn: false,
    isInMyAccount: false,
    dataVersion: "17/04/20",
    accountProcessing: false
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    clientCenter: ClientCenter,
    notification: Notification,
    general: General
  }
});
