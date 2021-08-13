import AuthService from "@/services/AuthService";
import { CircleLoader } from "@saeris/vue-spinners";
import TitleMetaMixin from "@/mixins/TitleMetaMixin";

export default {
  name: "ForgotPassword",
  mixins: [TitleMetaMixin],
  data() {
    return {
      metaTitle: "Forgot password",
      metaDescription: "Forgot password",
      email: "",
      error: false,
      errorMessage: false,
      successMessage: false,
      showSpinner: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email"
      ]
    };
  },
  methods: {
    sendEmailIfValid() {
      if (this.$refs.form.validate()) {
        this.sendEmail();
      }
    },
    async sendEmail() {
      try {
        this.showSpinner = true;
        this.errorMessage = false;
        this.successMessage = false;
        const res = await AuthService.forgotPassword(this.email);
        this.showSpinner = false;
        if (res.error) {
          this.successMessage = res.error;
        } else {
          this.successMessage = res.message;
        }
      } catch (e) {
        this.showSpinner = false;
        this.errorMessage = "Something went wrong, try again later";
      }
    }
  },
  components: {
    CircleLoader
  }
};
