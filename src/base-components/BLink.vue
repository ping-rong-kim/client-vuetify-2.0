<template>
  <a
    class="b-link"
    :href="href"
    :style="{
      color: colorComputed,
      textDecoration: this.underline ? 'underline' : 'none'
    }"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "BLink",
  props: {
    color: {
      type: String,
      default: "primary"
    },
    href: {
      type: String,
      default: "javascript:;"
    },
    underline: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    colorComputed() {
      if (Object.keys(this.$vuetify.theme).includes(this.color)) {
        return `--v-${this.color}-base`;
      } else {
        return this.color;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.b-link {
  &:hover {
    opacity: 0.7;
  }
}
</style>
