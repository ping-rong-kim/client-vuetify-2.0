import AppScrollArrow from "@/common-components/AppScrollArrow/AppScrollArrow.vue";
import TitleMetaMixin from "@/mixins/TitleMetaMixin";
import AppEnv from "@/AppEnv";

export default {
  name: "home",
  components: {
    AppScrollArrow
  },
  mixins: [TitleMetaMixin],
  data() {
    return {
      metaTitle: `meta title - ${AppEnv.VUE_APP_WHITE_LABEL_SITE_NAME}`,
      metaDescription: `meta description. ${AppEnv.VUE_APP_WHITE_LABEL_SITE_NAME}`
    };
  }
};
