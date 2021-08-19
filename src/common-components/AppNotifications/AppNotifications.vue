<template>
  <v-menu
    content-class="dropdown-menu card-top"
    offset-y
    :close-on-content-click="false"
    v-model="menuOpened"
    :min-width="minWidth"
    :max-width="width"
    :max-height="maxHeight"
  >
    <template v-slot:activator="{ on }">
      <div v-ripple slot="activator" class="toolbar-items" v-on="on">
        <v-badge color="error" overlap left :value="unReadNotifications.length">
          <template slot="badge" v-if="unReadNotifications.length">
            {{ unReadNotifications.length }}
          </template>
          <v-icon color="grey">mdi-bell</v-icon>
        </v-badge>
      </div>
    </template>
    <v-card class="app-notifications">
      <v-toolbar color="white" class="elevation-0" flat>
        <v-toolbar-title>Notifications</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list three-line expand>
        <template v-for="(notification, index) in notifications">
          <v-divider v-if="index"></v-divider>
          <v-list-item :key="index">
            <v-list-item-content style="padding-top: 0;padding-right: 12px">
              <v-container style="padding-left: 0">
                <v-row>
                  <v-col
                    ><v-list-item-title
                      style="color: #6EDD9F;text-align:left;"
                      v-text="notification.title"
                    ></v-list-item-title
                  ></v-col>
                  <v-col class="ml-auto"
                    ><v-list-item-title style="text-align:right;"
                      ><aside
                        class="app-aside__helper-text"
                        style="color: grey"
                      >
                        {{ notification.createdTime }}
                      </aside></v-list-item-title
                    ></v-col
                  >
                </v-row>
              </v-container>
              <v-list-item-subtitle
                v-text="notification.desc"
                style="font-size: 11px !important;text-align: justify;padding-right: 12px;text-justify: inter-character"
              />
              <v-list-item-subtitle style="text-align: left;">
                <router-link
                  slot="activator"
                  class="toolbar-items"
                  :to="notification.actionUrl"
                  v-on:click.native="onActionClick(notification)"
                >
                  <v-list-item-title v-text="notification.actionText" />
                </router-link>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="align-self-auto">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    v-if="!notification.readAt"
                    color="blue"
                    class="darken-2"
                    @click.stop="toggleRead(notification)"
                    v-on="on"
                    >radio_button_checked</v-icon
                  >
                  <v-icon
                    v-else
                    color="#ebecf0"
                    class="darken-2"
                    @click.stop="toggleRead(notification)"
                    v-on="on"
                    >radio_button_unchecked</v-icon
                  >
                </template>
                <span v-if="!notification.readAt">Mark as read</span>
                <span v-else>
                  Mark as unread
                </span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="error"
                    class="darken-2"
                    @click="removeAlert(notification)"
                    v-on="on"
                    >close</v-icon
                  >
                </template>
                <span>Clear notification</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </template>
        <div v-if="notifications.length === 0" class="px-4 py-3 text-left">
          No notifications
        </div>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { stringDate } from "@/utils/DateUtils";

export default {
  name: "AppNotifications",
  computed: {
    maxHeight() {
      return this.$vuetify.breakpoint.height - 70;
    },
    width() {
      return this.$vuetify.breakpoint.width > 700
        ? 700
        : this.$vuetify.breakpoint.width;
    },
    minWidth() {
      return this.$vuetify.breakpoint.width > 500
        ? 500
        : this.$vuetify.breakpoint.width;
    },
    notifications() {
      if (this.$store.state.isUserLoggedIn) {
        return this.$store.getters["notification/availableNotifications"]
          .map(notification => {
            const createdTime = stringDate(
              new Date(notification.createdAt),
              "dd/MM/yyyy HH:mm"
            );
            return Object.assign({ createdTime }, notification);
          })
          .reverse();
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
  data() {
    return {
      menuOpened: false
    };
  },
  methods: {
    toggleRead(notification) {
      const readAt = notification.readAt ? null : new Date().toISOString();
      this.setReadAt(notification, readAt);
    },
    readNotification(notification) {
      const readAt = new Date().toISOString();
      this.setReadAt(notification, readAt);
    },
    onActionClick(notification) {
      this.readNotification(notification);
      this.menuOpened = false;
    },
    setReadAt(notification, readAt) {
      this.$store.commit("notification/updateNotification", {
        auid: notification.auid,
        sets: { readAt }
      });
      this.$microservices.notification.saveStateToDb();
    },
    removeAlert(notification) {
      const removedAt = new Date().toISOString();
      this.$store.commit("notification/updateNotification", {
        auid: notification.auid,
        sets: { removedAt }
      });
      this.$microservices.notification.saveStateToDb();
    }
  }
};
</script>

<style lang="scss">
.app-notifications {
  .v-list {
    .v-list__item {
      height: auto;
    }
  }
}
.toolbar-items {
  cursor: pointer;
}
</style>
