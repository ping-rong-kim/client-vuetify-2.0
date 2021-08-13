<template>
  <v-text-field
    class="term-input-component"
    :label="label"
    type="number"
    v-bind="$attrs"
    :placeholder="placeholder"
    :rules="mortgageTermRules"
    v-model="term"
    :append-outer-icon="!readonly ? 'add' : ''"
    :prepend-icon="!readonly ? 'remove' : ''"
    @click:append-outer="incrementMortgageTerm()"
    @click:prepend="decrementMortgageTerm()"
    @change="onChange"
    v-on:blur="$ga.event('TermInput', 'Fill', 'TermRemainingField')"
    hint
    persistent-hint
  >
    <template v-slot:label v-if="$slots.label">
      <slot name="label"></slot>
    </template>
  </v-text-field>
</template>

<script src="./TermInput.js"></script>
<style lang="scss">
.term-input-component {
  .v-input__control {
    .v-input__slot {
      .v-text-field__slot {
        .v-label {
          pointer-events: all;
          height: auto;
          overflow: visible;
        }
      }
    }
  }
}
</style>
<style lang="scss" src="./TermInput.scss" scoped></style>
