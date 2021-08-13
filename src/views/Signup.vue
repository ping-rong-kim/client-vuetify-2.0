<template>
  <div class="signup text-xs-center">
    <SignupCardChoiceDefault
      @change="onChange"
      ref="signUpDefault"
    ></SignupCardChoiceDefault>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import SignupCardChoiceDefault from "@/components/SignupCardChoice/SignupDefault/SignupDefault.vue";
import TitleMetaMixin from "@/mixins/TitleMetaMixin";

export default {
  name: "signup",
  mixins: [TitleMetaMixin],
  components: {
    SignupCardChoiceDefault
  },
  created() {
    if (this.$authService.isLoggedIn) {
      this.$authService.logout();
    }
  },
  data() {
    return {
      metaTitle: "Signup",
      metaDescription: "Sign up",
      registration: {},
      isChanged: false
    };
  },
  computed: {},
  methods: {
    onChange() {
      this.isChanged = true;
      this.$store.commit("clientCenter/setCurrentPageUnSavedChange", true);
    }
  },
  beforeRouteUpdate(to, from, next) {},
  beforeRouteLeave(to, from, next) {
    if (AuthService.user) {
      this.$store.commit("clientCenter/setCurrentPageUnSavedChange", false);
      next();
    } else if (this.isChanged) {
      this.$confirmDialog
        .confirm({
          title: "Do you want to leave?",
          text: "Your changes won't be saved."
        })
        .then(res => {
          this.$store.commit("clientCenter/setCurrentPageUnSavedChange", false);
          next();
        })
        .catch(reason => {
          next(false);
        });
    } else {
      next();
    }
  },
  beforeDestroy() {
    this.$store.commit("clientCenter/setCurrentPageUnSavedChange", false);
  }
};
</script>
