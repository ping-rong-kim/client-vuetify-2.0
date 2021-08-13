<template>
  <v-alert
    class="text-left mb-3"
    dismissible
    value="value"
    v-bind="$attrs"
    v-on="$listeners"
    v-if="value"
  >
    <slot></slot>
  </v-alert>
</template>

<script>
export default {
  name: "AppAlert",
  props: {
    value: {
      default: true
    }
  },
  data() {
    return {
      hideTimeOut: false
    };
  },
  watch: {
    value(show) {
      if (this.hideTimeOut) {
        clearTimeout(this.hideTimeOut);
        this.hideTimeOut = false;
      }
      if (show) {
        this.hideTimeOut = setTimeout(() => {
          this.$emit("input", false);
        }, 4000);
      }
    }
  }
};
</script>

<style scoped></style>
