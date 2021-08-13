<template>
  <div class="about-us-page text-center">
    <h1>About us</h1>
  </div>
</template>

<script>
import TitleMetaMixin from "@/mixins/TitleMetaMixin";
import AppEnv from "@/AppEnv";

export default {
  name: "AboutUs",
  mixins: [TitleMetaMixin],
  data() {
    return {
      metaTitle: "About us",
      metaDescription: `${AppEnv.VUE_APP_WHITE_LABEL_SITE_NAME} is standard.`
    };
  }
};
</script>

<style scoped lang="scss">
.about-us-page {
}
</style>
