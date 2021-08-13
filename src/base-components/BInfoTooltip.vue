<template>
  <v-tooltip bottom :max-width="maxWidth">
    <v-icon slot="activator" color="dark">info</v-icon>
    <span>
      <slot></slot>
    </span>
  </v-tooltip>
</template>

<script>
export default {
  name: "BInfoTooltip",
  props: {
    maxWidth: {
      type: [Number, String],
      default: 400
    }
  }
};
</script>

<style scoped></style>
