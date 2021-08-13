import SignupService from "../services/SignupService";

export default {
  methods: {
    appGetRegistrationForDb(state = false) {
      state = state || this.$store.state;
      return this.$appHelper.getRegistrationForDb(state);
    },
    trySaveStateToDb() {
      if (this.$store.state.isUserLoggedIn) {
        return this.appSaveStateToDb();
      } else {
        return Promise.reject("Not logged in");
      }
    },
    appSaveStateToDb() {
      let registration = this.appGetRegistrationForDb();
      return SignupService.update(registration);
    }
  },
  data: function() {
    return {};
  },
  created() {}
};
