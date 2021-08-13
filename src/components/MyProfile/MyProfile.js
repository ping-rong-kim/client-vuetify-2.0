import MyAccountMixin from "@/mixins/MyAccountMixin";
import AppDatePicker from "@/components/Controls/AppDatePicker/AppDatePicker.vue";
import cloneDeep from "lodash/cloneDeep";
import AuthService from "@/services/AuthService";
import AppSectionTitle from "@/common-components/AppSectionTitle/AppSectionTitle.vue";
import AppChangePassword from "@/common-components/AppChangePassword/AppChangePassword.vue";

export default {
  name: "MyProfile",
  mixins: [MyAccountMixin],
  components: {
    AppDatePicker,
    AppSectionTitle,
    AppChangePassword
  },
  props: {},
  data() {
    const registration = cloneDeep(this.$store.state.registration);
    return {
      emailChanged: false,
      registration,
      errorString: false,
      fullNameRules: [
        v => !!v || "Please provide their full name",
        v => /.+\s+.+/.test(v) || "Please provide their full name"
      ],
      contactRules: [
        v => {
          if (!v) {
            return true;
          }
          return (
            /^(?=(?:\D*\d\D*){8,14}$)[ -]*\+?[ -]*(?:\((?:[ -]*\d)+[ -]*\))?[- \d]*/.test(
              v
            ) || "Please enter a valid contact number"
          );
        }
      ],
      emailVerified: this.$store.state.registration.platformProgress
        .emailConfirmed,
      hasBirthday: !!registration.personalDetails.dateOfBirth,
      valid: false,
      isSaving: false
    };
  },
  computed: {
    emailRules() {
      return [
        v => !!v || "Email address is required",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email",
        v => this.errorString === false || "Please enter different email"
      ];
    },
    startYearOfBirthday() {
      let d = new Date();
      d.setFullYear(d.getFullYear() - 45);
      return d.getFullYear();
    }
  },
  methods: {
    onFullNameChange() {
      this.registration.personalDetails.fullname = this.registration.personalDetails.fullname.replace(
        /\s{2,}/g,
        " "
      );
      let nameArray = this.registration.personalDetails.fullname.split(" ");
      this.registration.personalDetails.firstname = nameArray[0].trim();
    },
    onEmailInput(email) {
      if (email !== this.$store.state.registration.personalDetails.email) {
        this.emailChanged = true;
        this.errorString = false;
        this.$refs.profileForm.validate();
      } else {
        this.emailChanged = false;
        this.errorString = false;
      }
    },
    onChange() {
      this.$emit("change");
    },
    async trySave() {
      if (this.$refs.profileForm.validate()) {
        this.isSaving = true;
        if (this.emailChanged) {
          try {
            await this.tryChangeEmail();
          } catch (e) {
            this.isSaving = false;
            return false;
          }
        }
        await this.save();
        if (this.emailChanged) {
          this.$emit("emailUpdated");
          this.emailChanged = false;
        }
      }
    },
    async tryChangeEmail() {
      this.$emit("showSpinner");
      try {
        const existRes = await AuthService.isEmailInUse(
          this.registration.personalDetails.email
        ).catch(error => {
          return {
            isEmailInUse: true,
            message: "This email account is already in use."
          };
        });
        if (existRes.isEmailInUse) {
          this.errorString = existRes.message;
          this.$refs.profileForm.validate();
          this.$emit("hideSpinner");
          return Promise.reject("This email account is already in use.");
        }
        await AuthService.changeEmail(this.registration.personalDetails.email);
        this.registration.platformProgress.emailConfirmed = false;
        this.emailVerified = false;
        await this.$store.dispatch("updateRegistration", {
          platformProgress: this.registration.platformProgress
        });
        return true;
      } catch (e) {
        Logger.log("catch error on try email change", e);
        this.errorString = "This email account is already in use.";
        this.$emit("hideSpinner");
        this.$refs.profileForm.validate();
        return Promise.reject("Your token has been expired.");
      }
    },
    async save() {
      this.isSaving = true;
      // save to vueState
      await this.$store.dispatch("deepUpdateRegistration", {
        personalDetails: cloneDeep(this.registration.personalDetails)
      });
      // save to DB
      let res = await this.appSaveStateToDb().catch(error => false);

      if (res) {
        this.$store.dispatch("setAlert", "Personal Details saved");
        if (this.registration.personalDetails.dateOfBirth) {
          this.hasBirthday = true;
        }
        this.$emit("afterSave", this.registration.personalDetails);
      } else {
        this.$store.dispatch(
          "setErrorAlert",
          "There was a problem saving your changes to the database"
        );
      }
      this.isSaving = false;
    }
  }
};
