import AjaxApiService from "@/services/AjaxApiService";
import AppDatePicker from "@/components/Controls/AppDatePicker/AppDatePicker.vue";
import MyAccountMixin from "@/mixins/MyAccountMixin";
import MyProfile from "@/components/MyProfile/MyProfile.vue";
import cloneDeep from "lodash/cloneDeep";
import AppAlert from "@/common-components/AppAlert.vue";
import TitleMetaMixin from "@/mixins/TitleMetaMixin";

export default {
  name: "ProfilePage",
  components: {
    AppDatePicker,
    MyProfile,
    AppAlert
  },
  mixins: [MyAccountMixin, TitleMetaMixin],
  data() {
    let registration = cloneDeep(this.$store.state.registration);
    return {
      metaTitle: "Profile",
      savedMessage: false,
      isEmailUpdated: false,
      tab: "profile",
      errorString: false,
      emailVerifyProcessing: "initial",
      isChanged: false,
      registration: registration
    };
  },
  watch: {
    registration: {
      handler() {
        this.onChange();
      },
      deep: true
    },
    tab() {
      this.isChanged = false;
      this.$store.commit("clientCenter/setCurrentPageUnSavedChange", false);
    }
  },
  created() {
    if (this.$route.query.verifyEmail === "true") {
      this.verifyEmail();
    }
    console.log(this.$vuetify.breakpoint);
  },
  methods: {
    navTab(tab) {
      if (this.tab !== tab) {
        if (this.isChanged) {
          this.$confirmDialog
            .confirm({
              title: "Do you want to leave?",
              text: "Your changes won't be saved."
            })
            .then(res => {
              this.isChanged = false;
              this.$store.commit(
                "clientCenter/setCurrentPageUnSavedChange",
                false
              );
              this.tab = tab;
            })
            .catch(reason => {});
        } else {
          this.tab = tab;
        }
      }
    },
    onChange() {
      this.isChanged = true;
      this.$store.commit("clientCenter/setCurrentPageUnSavedChange", true);
    },
    async onEmailUpdated() {
      this.isEmailUpdated = true;
    },
    verifyEmail() {
      this.emailVerifyProcessing = "loading";
      AjaxApiService.post("/api/v1/auth/send-email-verification")
        .then(res => {
          this.emailVerifyProcessing = "sent";
        })
        .catch(error => {
          this.emailVerifyProcessing = "error";
        });
    },
    async afterProfileSave(personalDetails) {
      this.registration.personalDetails = cloneDeep(personalDetails);
      this.$nextTick(function() {
        this.afterSave();
      });
    },
    async afterSave(personalDetails, message = "Personal Details saved") {
      this.savedMessage = message;
      this.isChanged = false;
      this.$store.commit("clientCenter/setCurrentPageUnSavedChange", false);
    },
    confirmDelete() {
      this.$confirmDialog
        .confirm({
          title: "Delete Account",
          text:
            "Are you sure you want to delete your account and all your data and logout?<br>" +
            "You cannot undo this action.",
          agree: "Delete",
          theme: "delete"
        })
        .then(res => {
          this.deleteAccount();
        })
        .catch(error => {});
    },
    deleteAccount() {
      this.$authService
        .deleteAccount()
        .then(res => {
          this.$router.push({ name: "home" }).then(res => {
            this.$authService.frontLogout();
          });
        })
        .catch(error => {});
    }
  },
  computed: {
    emailVerified() {
      return (
        this.$store.state.isUserLoggedIn &&
        this.$store.state.registration.platformProgress.emailConfirmed
      );
    },
    store() {
      return this.$store.state;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isChanged && this.$authService.user) {
      this.$confirmDialog
        .confirm({
          title: "Do you want to leave?",
          text: "Your changes won't be saved."
        })
        .then(res => {
          this.isChanged = false;
          this.$store.commit("clientCenter/setCurrentPageUnSavedChange", false);
          next();
        })
        .catch(reason => {
          next(false);
        });
    } else {
      this.$store.commit("clientCenter/setCurrentPageUnSavedChange", false);
      next();
    }
  }
};
