<template>
  <v-main :class="{ 'content-container': true }">
    <v-container fluid fill-height align-center>
      <v-row class="justify-center align-start">
        <v-col text-xs-center>
          <transition
            v-if="routerTransition"
            :name="routerTransition"
            @after-enter="afterRouterTransitionEnter"
          >
            <router-view key="mainRouterView" />
          </transition>
          <router-view key="mainRouterView" v-else />
          <v-snackbar
            dark
            :color="color"
            :timeout="timeout"
            v-model="refreshSnackbar"
            :bottom="true"
            :right="true"
            v-if="appEnablePopup"
          >
            <v-icon color="white" class="snackIcon" @click="doRefresh()"
              >refresh
            </v-icon>
            <div>A new update is avaliable. Please refresh your browser.</div>
            <v-icon color="white" size="16" @click="dismissRefresh()"
              >cancel
            </v-icon>
          </v-snackbar>
          <v-snackbar
            dark
            :color="color"
            :timeout="timeout"
            v-model="alertSnackbar"
            :bottom="true"
            :right="true"
            v-if="appEnablePopup"
          >
            <!-- TODO: add support for choosnig alert icons
                               notifications_none report_problem add_alert error and warning
                                -->
            <v-icon color="white" class="snackIcon shake"
              >notifications_active
            </v-icon>
            <div>{{ this.alertText }}</div>
            <v-icon color="white" size="16" @click="dismissAlert()"
              >cancel
            </v-icon>
          </v-snackbar>

          <v-snackbar
            dark
            :color="errorColor"
            :timeout="timeout"
            v-model="errorAlertSnackbar"
            bottom
            right
            v-if="appEnablePopup"
          >
            <!-- TODO: add support for choosnig alert icons
                               notifications_none report_problem add_alert error and warning
                                -->
            <v-icon color="white" class="snackIcon errorShake">error</v-icon>
            <div>{{ this.errorAlertText }}</div>
            <v-icon color="white" size="16" @click="dismissErrorAlert()"
              >cancel
            </v-icon>
          </v-snackbar>
          <!-- TODO HACK move this div into a test component for testing -->
          <div v-if="this.$router.currentRoute.name == 'coaching'">
            <h2>Test Error Alert</h2>
            <b-button text @click="addErrorAlert()">
              <v-icon color="red" size="20" class="snackIcon">warning </v-icon>
              Pop Error Alert
            </b-button>

            <h2>Test Alerts</h2>
            <b-button text @click="addAlert()">
              <v-icon color="red" size="20" class="snackIcon">warning </v-icon>
              Pop Alert
            </b-button>

            <b-button text @click="addRefresh()">
              <v-icon color="blue" size="20" class="snackIcon">refresh </v-icon>
              Pop Refresh
            </b-button>
          </div>
          <!-- TODO HACK remove this div its only for testing -->
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AppEnv from "@/AppEnv";
export default {
  data: () => ({
    vueWindow: window,
    color: "green",
    errorColor: "red",
    timeout: -1,
    refreshSnackbar: false,
    alertSnackbar: false,
    alertText: "",
    errorAlertSnackbar: false,
    errorAlertText: ""
  }),

  methods: {
    afterRouterTransitionEnter() {
      this.$store.commit("clientCenter/setRouterTransition", false);
    },
    addErrorAlert() {
      this.$store.dispatch("setErrorAlert", "We have failed you");
    },
    dismissErrorAlert() {
      this.errorAlertSnackbar = false;
      this.$store.dispatch("setErrorAlert", null);
    },
    addAlert() {
      this.$store.dispatch("setAlert", "You got to do something now!");
    },
    dismissAlert() {
      this.alertSnackbar = false;
      this.$store.dispatch("setAlert", null);
    },
    addRefresh() {
      this.$store.dispatch("setAlert", "Refresh now");
    },

    dismissRefresh() {
      this.refreshSnackbar = false;
      this.$store.dispatch("setAlert", null);
    },
    doRefresh() {
      this.refreshSnackbar = false;
      this.$store.dispatch("setAlert", null);
      this.vueWindow.location.reload(true);
    }
  },
  computed: {
    routerTransition() {
      return this.$store.state.clientCenter.router.transition;
    },
    appEnablePopup() {
      return AppEnv.VUE_APP_ENABLE_POPUPS === "true";
    },
    alert() {
      return this.$store.state.alert;
    },
    errorAlert() {
      return this.$store.state.errorAlert;
    }
  },
  watch: {
    errorAlert(newAlert, oldAlert) {
      // Our fancy notification (2).
      if (newAlert) {
        this.errorAlertSnackbar = true;
        this.errorAlertText = newAlert;
      }
    },
    alert(newAlert, oldAlert) {
      // Our fancy notification (2).
      if (newAlert) {
        if (newAlert.startsWith("Refresh")) {
          this.refreshSnackbar = true;
        } else {
          this.alertSnackbar = true;
          this.alertText = newAlert;
        }
      }
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.snackIcon {
  padding-right: 10px;
}

.shake {
  // TODO make it shake faster but for same amount of time
  animation: shake 1.2s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.errorShake {
  // TODO make it shake faster but for same amount of time
  animation: shake 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.v-main.content-container {
  min-height: 100vh !important;
}
main.content-container {
  transition: none;

  &:not(.require-corner-dot) {
    background: #f8f8ff !important;
    position: relative;
    z-index: 1;
    overflow: hidden;

    &:before {
      content: "";
      background-image: url("/img/icons/thunberbolt.png");
      background-repeat: repeat;
      background-position: top center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }

  &.path-frontpage {
    padding-top: 0 !important;
    background: #fff;
  }
}
</style>
