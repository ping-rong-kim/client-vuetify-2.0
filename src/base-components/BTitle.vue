<template>
  <h6 class="b-title" v-if="level === 6" :class="classes">
    <slot></slot>
  </h6>
  <h2 v-else :class="classes">
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: "BTitle",
  props: {
    level: {
      type: [Number, String],
      default: 6
    },
    color: {
      type: String,
      default: "textBlack"
    }
  },
  computed: {
    classes() {
      return {
        [`${this.color}--text`]: true
      };
    }
  }
};
</script>

<style scoped lang="scss">
.b-title {
}
</style>
