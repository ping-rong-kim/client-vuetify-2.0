import SignupPersonal from "@/components/SignupCardChoice/SignupPersonal/SignupPersonal.vue";

import AuthService from "@/services/AuthService";
import { CircleLoader } from "@saeris/vue-spinners";

export default {
  name: "SignCardChoiceDefault",
  components: {
    SignupPersonal,
    CircleLoader
  },
  data() {
    return {
      registration: {
        personalDetails: {},
        platformProgress: {
          emailConfirmed: false,
          dataVersion: this.$store.state.dataVersion
        }
      },
      showSpinner: false,
      hash: this.$route.query.hash || false
    };
  },
  methods: {
    saveToStore() {
      this.$store.dispatch("setRegistration", this.registration);
    },
    async oneShotRegister(payload) {
      this.saveToStore();
      this.showSpinner = true;
      const user = {
        email: this.registration.personalDetails.email,
        password: this.registration.personalDetails.password
      };
      const signUp = this.$appHelper.getRegistrationForDb(this.$store.state);
      AuthService.oneShotRegister({
        user: user,
        signUp: signUp
      })
        .then(async res => {
          await this.$router.push({
            name: "dashboard",
            params: this.registration
          });
          setTimeout(() => {
            this.$microservices.notification.load();
          }, 500);
        })
        .catch(error => {
          Logger.log("one shot register had unexpected result", error);
        })
        .finally(() => {
          this.showSpinner = false;
        });
    }
  }
};
