import AuthService from "@/services/AuthService";
import AppDatePicker from "@/components/Controls/AppDatePicker/AppDatePicker";
import cloneDeep from "lodash/cloneDeep";
import AppHelper from "@/helpers/AppHelper";
import { parseFullName } from "@/AI/ParseAi";

export default {
  name: "signupPersonal",
  components: {
    AppDatePicker
  },
  props: {
    registration: Object,
    showSpinner: Boolean
  },
  data() {
    let nameHash = false;
    if (process.env.VUE_APP_SIGNUP_AUTO_USER === "true") {
      nameHash = AppHelper.stringDate(new Date(), "MMddHHmm");
    }
    let personalDetails = {
      email: "",
      password: "",
      dateOfBirth: "",
      firstname: "",
      fullname: "",
      phone: "",
      monthlyNewsletter: true,
      paccountNewsletter: true,
      tipsNewsletter: true
    };
    return {
      isSaved: false,
      hashError: this.$store.state.clientCenter.currentPage.hashError || false,
      alreadyDone:
        this.$store.state.clientCenter.currentPage.alreadyDone || false,
      valid: false,
      visible: false,
      dateOfBirthVisible: false,
      personalDetails: personalDetails,
      emailRules: [
        v => !!v || "Email address is required",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email"
      ],
      fullnameRules: [
        v => !!v || "Please provide your full name",
        v => /.+\s+.+/.test(v) || "Please provide your full name"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => {
          let azCount = 0;
          let AZCount = 0;
          let numberCount = 0;
          let specialCount = 0;
          for (let i = 0; i < v.length; i++) {
            const char = v[i];
            if (/^[a-z]$/.test(char)) {
              azCount++;
            } else if (/^[A-Z]$/.test(char)) {
              AZCount++;
            } else if (/^\d$/.test(char)) {
              numberCount++;
            } else {
              specialCount++;
            }
          }
          if (
            azCount >= 1 &&
            AZCount >= 1 &&
            numberCount >= 1 &&
            specialCount >= 1 &&
            v.length >= 12
          ) {
            return true;
          }
          return "12-32 characters at least one uppercase, lowercase, number and special";
        }
      ],
      birthdayRules: [v => !!v || "Please provide your date of birth"],
      errorString: false,
      requireCheckEmail: true
    };
  },
  computed: {
    askBirthday() {
      return process.env.VUE_APP_CREDITCHECK === "true";
    },
    minDateOfBirthday() {
      let d = new Date();
      d.setFullYear(d.getFullYear() - 80);
      return d.toISOString().substr(0, 10);
    },
    maxDateOfBirthday() {
      let d = new Date();
      d.setFullYear(d.getFullYear() - 18);
      return d.toISOString().substr(0, 10);
    },
    startYearOfBirthday() {
      let d = new Date();
      d.setFullYear(d.getFullYear() - 45);
      return d.getFullYear();
    },
    subTitle() {
      return "Add your details";
    }
  },
  mounted() {},
  watch: {
    personalDetails: {
      deep: true,
      handler() {
        if (this.$route.params.step === "personal") {
          this.isSaved = false;
          if (
            this.personalDetails.email !==
            this.registration.personalDetails.email
          ) {
            this.requireCheckEmail = true;
          }
          this.$emit("change");
        }
      }
    }
  },
  methods: {
    onFullNameChange(fullName) {
      if (fullName) {
        const correctFullName = fullName.replace(/\s{2,}/g, " ");
        this.personalDetails.fullname = correctFullName;
        const parsedNames = parseFullName(correctFullName);
        Object.assign(this.personalDetails, parsedNames);
      }
    },
    onChange: function(event) {},
    async trySave() {
      if (this.$refs.personalDetailsForm.validate()) {
        const checkEmail = this.personalDetails.email;
        if (this.requireCheckEmail) {
          this.$emit("showSpinner");
          const existRes = await AuthService.isEmailInUse(
            this.personalDetails.email
          ).catch(error => {
            return {
              isEmailInUse: true,
              message: "This email account is already in use."
            };
          });
          if (existRes.isEmailInUse) {
            this.errorString = existRes.message;
            this.$emit("hideSpinner");
            return false;
          } else {
            this.errorString = false;
            // Note: Lastpass could made change email by their engine, so should check whether email is same or changed here
            if (checkEmail === this.personalDetails.email) {
              this.requireCheckEmail = false;
            }
          }
        }
        this.personalDetails.fullname = this.personalDetails.fullname.trim();
        this.registration.personalDetails = cloneDeep(this.personalDetails);
        this.$emit("hideSpinner");
        if (checkEmail === this.personalDetails.email) {
          this.isSaved = true;
        }
        return true;
      }
      return false;
    },
    async trySaveAndNext() {
      if (await this.trySave()) {
        this.$emit("stepTo", "signup");
      }
    }
  }
};
