export default {
  name: "TermInput",
  props: {
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
      term: String(this.value || ""),
      typeOfValue: this.valueType || (this.value ? typeof this.value : "string")
    };
  },
  watch: {
    term(nv) {
      let v = nv ? parseInt(nv) : "";
      if (this.typeOfValue === "string") {
        v = String(v);
      }
      this.$emit("input", v);
    },
    value(nv, ov) {
      if (!ov) {
        this.typeOfValue = typeof nv;
      }
      if (String(nv) !== this.term) {
        this.term = String(nv);
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
        }, 100);
      }
    },
    decrementMortgageTerm() {
      let v = this.value || this.maxValue;
      if (parseInt(v, 10) > 1) {
        this.term = String(parseInt(v) - 1);
        setTimeout(() => {
          this.onChange();
        }, 100);
      }
    }
  }
};
