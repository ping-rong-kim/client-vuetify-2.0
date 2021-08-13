import Dashboard from "@/components/Dashboard/Dashboard.vue";
import MyAccountMixin from "@/mixins/MyAccountMixin";
import TitleMetaMixin from "@/mixins/TitleMetaMixin";

export default {
  name: "dashboardPage",
  components: {
    Dashboard
  },
  data() {
    return {
      metaTitle: "Dashboard"
    };
  },
  mixins: [MyAccountMixin, TitleMetaMixin]
};
