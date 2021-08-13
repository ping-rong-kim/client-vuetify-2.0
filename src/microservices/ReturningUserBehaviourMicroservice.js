export default {
  $store: false,
  init() {
    this.addListeners();
  },
  addListeners() {
    this.$store.watch(
      state => state.isUserLoggedIn,
      async isLoggedIn => {
        if (isLoggedIn) {
          this.onLogin();
        } else {
          this.onLogout();
        }
      }
    );
  },
  async onLogin() {
    Logger.log("returning user behaviour callback on login");
    try {
      if (
        this.$store.state.route.name === "signup" ||
        (this.$store.state.route.from &&
          this.$store.state.route.from.name === "signup")
      ) {
      } else {
        await this.index();
      }
    } catch (e) {
      Logger.error("fails to callback onLogin of ReturningUserBehaviour", e);
    }
  },
  onLogout() {
    Logger.log("returning user behaviour callback on logout");
  },
  async index() {}
};
