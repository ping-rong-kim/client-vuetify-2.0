<template>
  <v-form>
    <v-container class="login-container">
      <v-row class="wrap login-row">
        <Login msg="Hello Vue.js World" />
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Login from "@/components/Login/Login.vue";
import MatomoTrackingHelper from "@/helpers/MatomoTrackingHelper";
import AuthService from "../services/AuthService";
import FacebookTrackingHelper from "@/helpers/FacebookTrackingHelper";
import TitleMetaMixin from "@/mixins/TitleMetaMixin";

export default {
  name: "login",
  mixins: [TitleMetaMixin],
  data() {
    return {
      metaTitle: "Login",
      metaDescription:
        "Login to monitor your mortgage, compare and manage your home related finance. Its fast, free simple and secure."
    };
  },
  components: {
    Login
  },
  mounted() {
    this.$store.dispatch("logout", null);
    MatomoTrackingHelper.pageTrackWith(
      this.$route.path,
      `Login | ${this.$_env.VUE_APP_WHITE_LABEL_SITE_NAME}`
    );
    FacebookTrackingHelper.track();
  },
  computed: {
    store: function() {
      return this.$store.state;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.type === "invitation" && to.query.hash) {
      AuthService.verifyInvitation(to.query.hash)
        .then(res => {
          next();
        })
        .catch(error => {
          next();
        });
    } else {
      next();
    }
  }
};
</script>
<style scoped>
/* .login-container{
      background: url('https://res.cloudinary.com/firmview/image/upload/v1564585861/CasaFiAssets/sofa-no-color_cggnfj.jpg');
    } */

.row {
  margin: -2px;
  &.wrap {
    margin: -2px;
    &.login-row {
      margin: -8px;
    }
  }
}
</style>
