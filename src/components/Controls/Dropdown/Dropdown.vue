<template>
  <v-select
    :items="items()"
    v-bind="$attrs"
    :label="label"
    type="select"
    item-value="text"
    v-model="selected"
  />
</template>

<script src="./Dropdown.js"></script>
<style scoped></style>
