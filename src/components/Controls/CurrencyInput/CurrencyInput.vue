<template>
  <b-text-field
    v-bind="$attrs"
    :label="label"
    type="text"
    v-model="v"
    @input="onInput"
    :mask="mask"
    prefix="£"
    :placeholder="placeholderString"
    @change="$emit('change', $event)"
    :rules="rules"
    class="app-text-field"
    :class="{
      'pr-0': $vuetify.breakpoint.xs
    }"
  ></b-text-field>
</template>

<script src="./CurrencyInput.js"></script>

<style scoped></style>
