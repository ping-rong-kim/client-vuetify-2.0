<template>
  <v-card
    class="b-card app--shadow textBlack--text"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: "BCard"
};
</script>

<style scoped lang="scss">
.b-card {
  &.v-sheet {
    border-radius: 12px;
  }
  &.v-card--flat {
    box-shadow: none;
  }
}
</style>
