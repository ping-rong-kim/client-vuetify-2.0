import NotificationService from "@/services/NotificationService";
import { uuid } from "@/utils";

export default {
  $store: false,
  async load() {
    try {
      const notification = await NotificationService.get();
      if (
        notification &&
        notification.alert &&
        notification.alert.notifications
      ) {
        this.$store.commit(
          "notification/loadNotifications",
          notification.alert.notifications.alerts
        );
        this.$store.commit("notification/loadAlert", notification.alert);
        return notification;
      }
      return false;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async saveStateToDb() {
    let alert = this.$store.state.notification.alert;
    alert.notifications.alerts = this.$store.state.notification.notifications;
    await NotificationService.update(alert);
  },
  async addAlert(alert) {
    try {
      alert.auid = uuid();
      alert.createdAt = new Date().toISOString();
      alert.readAt = null;
      alert.removedAt = null;
      alert.deletedAt = null;
      this.$store.commit("notification/addNotification", alert);
      return NotificationService.addAlert(alert);
    } catch (e) {
      Logger.error("Failed to add alert");
      return Promise.reject(e);
    }
  }
};
