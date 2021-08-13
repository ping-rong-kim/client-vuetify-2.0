<template>
  <div
    class="app-row"
    :class="{ column, 'h-full': fullHeight }"
    :style="styleComputed"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BRow",
  props: {
    column: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    colSpace: {
      type: [Number, String],
      default: 30
    }
  },
  computed: {
    styleComputed() {
      const style = {};
      if (this.colSpace !== -1) {
        style["--col-padding"] = `${this.colSpace / 2}px`;
        style.marginLeft = `-${this.colSpace / 2}px`;
        style.marginRight = `-${this.colSpace / 2}px`;
      }
      return style;
    },
    classComputed() {
      return {};
    }
  }
};
</script>

<style scoped></style>
