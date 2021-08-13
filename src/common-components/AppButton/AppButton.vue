<template>
  <v-btn class="app-btn" v-bind="attributes" v-on="listeners" v-app-ga="vAppGa">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "AppButton",
  inheritAttrs: false,
  props: {
    appGa: {
      default: true
    }
  },
  computed: {
    vAppGa() {
      if (this.appGa === false) {
        return false;
      }
      return this.appGa || true;
    },
    attributes() {
      return Object.assign({}, this.$attrs);
    },
    listeners() {
      return Object.assign({}, this.$listeners);
    }
  }
};
</script>

<style scoped lang="scss">
.app-btn {
  margin: 0 0;
}
</style>
