import StatusConst from "@/constants/StatusConst";
import AppHelper from "@/helpers/AppHelper";

export default {
  namespaced: true,
  state: {
    currentPage: {
      hasUnsavedChanges: false
    },
    pages: {
      mortgageDetail: {}
    },
    alerts: {
      showTips: true,
      closedTips: []
    },
    router: {
      history: [],
      beforeLogin: {
        name: "home",
        pageIndex: 0
      },
      afterLogin: false,
      transition: false
    },
    status: {
      mortgageSearchStatus: StatusConst.INITIAL,
      avmLatestStatus: StatusConst.INITIAL
    }
  },
  getters: {
    isMortgageSearching(state) {
      return [StatusConst.CALLING, StatusConst.RETURNED].includes(
        state.status.mortgageSearchStatus
      );
    }
  },
  mutations: {
    updateStatus(state, payload) {
      Object.assign(state.status, payload);
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    updateCurrentPage(state, payload) {
      Object.assign(state.currentPage, payload);
    },
    setCurrentPageUnSavedChange(state, payload) {
      AppHelper.vueAssign(state.currentPage, { hasUnsavedChanges: payload });
    },
    setPageData(state, payload) {
      state.pages[payload.page] = payload.value;
    },
    setRouterBeforeLogin(state, payload) {
      state.router.beforeLogin = payload;
    },
    setRouterAfterLogin(state, payload) {
      state.router.afterLogin = payload;
    },
    setAlert(state, payload) {
      Object.assign(state.alerts, payload);
    },
    closeTip(state, payload) {
      state.alerts.closedTips.push(payload);
    },
    setRouterTransition(state, payload) {
      state.router.transition = payload;
    }
  },
  actions: {
    cleanCurrentPage({ state, commit }) {
      commit("setCurrentPage", { hasUnsavedChanges: false });
    }
  }
};
