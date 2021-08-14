<template>
  <div id="app" data-app app-data="true" light>
    <v-app class="textBlack--text" id="inspire">
      <page-header name="page-header" />
      <page-content :class="{ 'require-corner-dot path-frontpage': isHome }" />
      <page-footer />
    </v-app>
  </div>
</template>
<script>
import PageHeader from "@/components/templates/Header/Header.vue";
import PageContent from "@/components/templates/Content/Content";
import PageFooter from "@/components/templates/Footer/Footer";

export default {
  name: "app",
  components: {
    PageHeader,
    PageContent,
    PageFooter
  },
  mounted() {},
  computed: {
    isHome() {
      return (
        this.$route.path === "/" ||
        (this.$route.name && this.$route.name.substr(0, 4) === "home")
      );
    }
  },
  head: {
    script: function() {
      let script = [];
      if (process.env.VUE_APP_CRAZYEGG_SCRIPT_ON) {
        script.push({
          type: "text/javascript",
          src: "//script.crazyegg.com/pages/scripts/0091/6439.js",
          async: true,
          body: false
        });
      }
      if (process.env.VUE_APP_MATOMO_SITE_ID) {
        script.push({
          type: "text/javascript",
          src: "https://matomo.firmview.co.uk/matomo.js",
          async: true,
          body: false,
          inner: true
        });
      }
      script.push({
        type: "text/javascript",
        src: "https://www.googletagmanager.com/gtag/js?id=AW-1068374282",
        async: true,
        body: false
      });
      script.push({
        type: "text/javascript",
        src: "https://w.appzi.io/w.js?token=ZzffH",
        async: true,
        body: false
      });
      return script;
    }
  }
};
</script>
