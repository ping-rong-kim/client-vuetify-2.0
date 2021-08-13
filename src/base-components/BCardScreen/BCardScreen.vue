<template>
  <div
    class="background-white app--shadow b-card-screen"
    :class="{
      'app--round': this.radius === 'normal',
      'app--round-small': this.radius === 'small',
      bordered: this.border
    }"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BCardScreen",
  props: {
    radius: {
      type: String,
      default: "normal"
    },
    border: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    style() {
      let style = {};
      if (this.border) {
        style.borderColor = `var(--v-${this.border}-base)`;
      }
      return style;
    }
  }
};
</script>

<style scoped lang="scss">
.b-card-screen {
  &.bordered {
    border-width: 1px;
    border-style: solid;
  }
}
</style>
