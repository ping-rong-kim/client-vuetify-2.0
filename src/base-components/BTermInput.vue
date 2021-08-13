<template>
  <b-text-field
    :gaEvent="gaEvent"
    class="b-term-input"
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
    ref="bTextField"
  >
    <template v-slot:label v-if="$slots.label">
      <slot name="label"></slot>
    </template>
  </b-text-field>
</template>

<script>
export default {
  name: "BTermInput",
  inheritAttrs: false,
  props: {
    gaEvent: {
      type: [Object, Boolean, String],
      default: true
    },
    label: {
      type: String,
      default: "Remaining term (years)"
    },
    value: {
      type: [Number, String]
    },
    maxValue: {
      type: [Number, String],
      default: 40
    },
    placeholder: {
      type: String,
      default: "25"
    },
    valueType: {
      type: [String, Boolean],
      default: () => false
    },
    rules: {
      default: () => false
    },
    readonly: {
      default: () => false
    }
  },
  data: function() {
    return {
      hasLabelSlot: !!this.$slots.label,
      mortgageTermRules: this.rules || [
        v =>
          v <= this.maxValue ||
          "Maximum mortgage term is " + this.maxValue + " years",
        v => v > 0 || v === "" || "Minimum mortgage term is 1 year",
        v => v === "" || /^(0|[1-9]\d*)$/.test(v) || "Whole values are allowed"
      ],
      typeOfValue: this.valueType || (this.value ? typeof this.value : "string")
    };
  },
  computed: {
    term: {
      get() {
        return String(this.value || "");
      },
      set(nv) {
        let v = nv ? parseInt(nv) : "";
        if (this.typeOfValue === "string") {
          v = String(v);
        }
        this.$emit("input", v);
      }
    }
  },
  watch: {
    value(nv, ov) {
      if (!ov) {
        this.typeOfValue = typeof nv;
      }
    }
  },
  mounted() {},
  methods: {
    onChange() {
      let v = parseInt(this.term) ? parseInt(this.term) : this.value;
      if (this.typeOfValue === "string") {
        v = String(v);
      }
      this.$emit("change", v);
    },
    incrementMortgageTerm() {
      let v = this.value || 0;
      if (parseInt(v, 10) < this.maxValue) {
        this.term = String(parseInt(v) + 1);
        setTimeout(() => {
          this.onChange();
          this.$refs.bTextField.onChange();
        }, 100);
      }
    },
    decrementMortgageTerm() {
      let v = this.value || this.maxValue;
      if (parseInt(v, 10) > 1) {
        this.term = String(parseInt(v) - 1);
        setTimeout(() => {
          this.onChange();
          this.$refs.bTextField.onChange();
        }, 100);
      }
    }
  }
};
</script>
<style lang="scss">
.b-term-input {
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
<style lang="scss" scoped>
.b-term-input {
  >>> .v-label {
    right: -80px !important;
    max-width: 200px;
    pointer-events: all !important;
  }
}
</style>
