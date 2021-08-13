<template>
  <div class="b-current-text">
    <sup class="currency__symbol">&pound;</sup>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BCurrencyText"
};
</script>

<style scoped lang="scss">
.b-current-text {
  position: relative;
  font-weight: 600;
  line-height: 1;
  .currency__symbol {
    position: absolute;
    font-size: 0.69em;
    line-height: 1;
    top: -0.1em;
    right: 100%;
    transform: translateX(-0.1em);
    color: var(--v-primary-base);
    font-weight: bold;
  }
}
</style>
