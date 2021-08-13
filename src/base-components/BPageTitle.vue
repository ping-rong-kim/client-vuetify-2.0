<template>
  <h2
    class="app-page__title app--color-black"
    :class="{
      'app-under-dash--start': !center,
      'text-center': center,
      [`app-under-dash--${underDash}`]: true
    }"
  >
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: "BPageTitle",
  props: {
    center: {
      type: Boolean,
      default: false
    },
    underDash: {
      type: String,
      default: "green"
    }
  }
};
</script>

<style scoped></style>
