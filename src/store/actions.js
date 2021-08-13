import cloneDeep from "lodash/cloneDeep";

export default {
  appUpdateBrowserOnly({ commit, getters, state }, payload) {
    if (state.showLinkedAccount) {
      commit("linkedAccount/updateBrowserOnly", payload, { root: true });
    } else {
      commit("properties/updateBrowserOnly", payload, { root: true });
    }
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  setCuid({ commit }, cuid) {
    commit("setCuid", cuid);
    return cuid;
  },
  setIsLoggedIn({ commit }, payload) {
    commit("setIsLoggedIn", payload);
  },
  setAlert({ commit }, alert) {
    commit("setAlert", "");
    commit("setAlert", alert);
  },
  setErrorAlert({ commit }, alert) {
    commit("setErrorAlert", "");
    commit("setErrorAlert", alert);
  },
  setRegistration({ commit, state, dispatch }, registration) {
    let reg = cloneDeep(registration);
    if (reg && reg.personalDetails && reg.personalDetails.password) {
      delete reg.personalDetails.password;
    }
    commit("setRegistration", reg);
    return reg;
  },
  updateRegistration({ commit }, payload) {
    commit("updateRegistration", payload);
  },
  deepUpdateRegistration({ commit }, payload) {
    commit("deepUpdateRegistration", payload);
  },
  setInMyAccount({ commit }, isInMyAccount) {
    commit("setInMyAccount", isInMyAccount);
  },
  logout({ dispatch, commit }, payload) {
    dispatch("setAlert", null);
    dispatch("setToken", null);
    dispatch("setIsLoggedIn", false);
    dispatch("setCuid", null);
    commit("setRegistration", null);
    dispatch("notification/logout", {}, { root: true });
    dispatch("setInMyAccount", false);
  },
  async loginWith({ state, dispatch, commit, rootGetters, getters }, payload) {
    if (payload.Signup) {
      let registration = payload.Signup.registration;
      dispatch("setRegistration", registration);
    } else {
      logger.log(
        "Sorry something went wrong, we could not find your sign up information at this time"
      );
      dispatch("logout");
      return false;
    }
    dispatch("setToken", payload.token);
    dispatch("setIsLoggedIn", true);
    dispatch("setCuid", payload.cuid);
  }
};
