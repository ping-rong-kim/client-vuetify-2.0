export default {
  namespaced: true,
  state: {
    notifications: [],
    alert: null
  },
  getters: {
    availableNotifications(state) {
      return state.notifications.filter(
        notification => !notification.removedAt
      );
    },
    availableUnreadNotifications(state) {
      return state.notifications.filter(
        notification => !notification.removedAt && !notification.readAt
      );
    }
  },
  mutations: {
    addNotification(state, payload) {
      state.notifications.push(payload);
    },
    loadNotifications(state, payload) {
      state.notifications = payload;
    },
    loadAlert(state, payload) {
      state.alert = payload;
    },
    updateNotification(state, payload) {
      state.notifications = state.notifications.map(notification => {
        if (notification.auid === payload.auid) {
          return Object.assign(notification, payload.sets);
        }
        return notification;
      });
    }
  },
  actions: {
    logout({ commit }) {
      commit("loadNotifications", []);
      commit("loadAlert", null);
    },
    readNotification({ commit }, payload) {}
  }
};
