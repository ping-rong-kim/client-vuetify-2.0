<template>
  <v-progress-circular
    class="b-progress-circular"
    :width="width"
    :color="color"
    indeterminate
  ></v-progress-circular>
</template>

<script>
export default {
  name: "BProgressCircular",
  props: {
    color: {
      type: String,
      default: "green"
    },
    width: {
      type: Number,
      default: 3
    }
  }
};
</script>

<style scoped></style>
