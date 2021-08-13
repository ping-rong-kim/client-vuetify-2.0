import AuthService from "@/services/AuthService";

export default {
  name: "login",
  components: {},
  props: {
    msg: String
  },
  data() {
    let inviteDetails =
      this.$store.state.clientCenter.currentPage.inviteDetails || false;
    return {
      switchForgetPassword: true /*  self forget password ? */,
      showErrorAlert: false,
      isErrorActive: false,
      processing: false,
      inviteDetails,
      user: {
        email: inviteDetails ? inviteDetails.email : "",
        password: ""
      },
      email: inviteDetails ? inviteDetails.email : "",
      hashError: this.$store.state.clientCenter.currentPage.hashError || false,
      alreadyAcceptDone:
        this.$store.state.clientCenter.currentPage.alreadyDone || false,
      password: "",
      error: null,
      visible: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email"
      ],
      errorString: "",
      type: this.$route.query.type || "general",
      hash: this.$route.query.hash || false,
      didPreventAutoFill: false,
      inactiveErrorTimeout: null
    };
  },
  computed: {
    isValidInvitation() {
      return this.type === "invitation" && !this.hashError;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    onEmailChange($event) {
      if (
        this.type === "invitation" &&
        this.inviteDetails &&
        !this.didPreventAutoFill
      ) {
        this.$nextTick(() => {
          this.user.email = this.inviteDetails.email;
        });
        this.didPreventAutoFill = true;
      }
    },
    async login() {
      if (this.$refs.form.validate()) {
        try {
          this.processing = "login";
          this.timer && clearInterval(this.timer);
          const response = await AuthService.login(
            this.user.email,
            this.user.password,
            this.isValidInvitation ? this.inviteDetails.link : false
          );
          await this.$store.dispatch("loginWith", response);
          const afterLogin = this.$store.state.clientCenter.router.afterLogin
            ? this.$store.state.clientCenter.router.afterLogin.name
            : "dashboard";
          this.$router.push({
            name: afterLogin
          });
          this.$microservices.notification.load();
          this.processing = false;
        } catch (error) {
          this.processing = false;
          //this.error = error.response.data.error;
          this.error = error;
          this.showErrorAlert = true;
          this.errorString = "Please enter a valid email/password.";
          this.tryActiveError();
        }
      }
    },
    tryActiveError() {
      if (this.isErrorActive) {
      } else {
        this.activeError();
      }
    },
    inactiveError() {
      this.isErrorActive = false;
      if (this.inactiveErrorTimeout) {
        clearTimeout(this.inactiveErrorTimeout);
      }
    },
    activeError() {
      this.isErrorActive = true;
      this.inactiveErrorTimeout = setTimeout(() => {
        this.inactiveError();
      }, 500);
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
