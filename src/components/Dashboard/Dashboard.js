import MyAccountMixin from "@/mixins/MyAccountMixin";

export default {
  name: "dashboard",
  mixins: [MyAccountMixin],
  data() {
    return {
      emailVerified: !!this.$route.params.emailVerified,
      fill: { gradient: ["#ff4c5e", "#ffa300", "#fff700", "#01c25f"] }
    };
  },
  watch: {},
  async created() {
    setTimeout(() => {
      this.emailVerified = false;
    }, 5000);
  }
};
