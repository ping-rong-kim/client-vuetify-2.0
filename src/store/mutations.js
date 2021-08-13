import AppHelper from "@/helpers/AppHelper";
const merge = require("lodash.merge");
import cloneDeep from "lodash/cloneDeep";

export default {
  setToken(state, token) {
    state.token = token;
  },
  setCuid(state, cuid) {
    state.cuid = cuid;
  },
  setIsLoggedIn(state, payload) {
    state.isUserLoggedIn = payload;
  },
  setAlert(state, alert) {
    state.alert = alert;
  },
  setErrorAlert(state, errorAlert) {
    state.errorAlert = errorAlert;
  },
  setRegistration(state, registration) {
    state.registration = registration;
  },
  setInMyAccount(state, isInMyAccount) {
    state.isInMyAccount = isInMyAccount;
  },
  updateRegistration(state, payload) {
    AppHelper.vueAssign(state.registration, payload);
  },
  setAccountProcessing(state, payload) {
    state.accountProcessing = payload;
  },
  deepUpdateRegistration(state, payload) {
    merge(state.registration, cloneDeep(payload));
  }
};
