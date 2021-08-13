<template>
  <v-tab class="b-tab" v-on="$listeners" v-bind="$attrs">
    <slot></slot>
  </v-tab>
</template>

<script>
export default {
  name: "BTab"
};
</script>

<style scoped></style>
