import AppTextField from "@/common-components/AppTextField/AppTextField";
export default {
  name: "CurrencyInput",
  components: {
    AppTextField
  },
  props: {
    placeholder: {
      type: [String, Number],
      default: ""
    },
    label: String,
    value: [String, Number],
    dataType: {
      default: () => false
    },
    rules: {
      default: () => [v => true]
    }
  },
  data: function() {
    return {
      v:
        typeof this.value === "string" || typeof this.value === "number"
          ? this.value
          : "",
      valueType: this.dataType || (this.value ? typeof this.value : false)
    };
  },
  computed: {
    mask() {
      let fv = this.v ? this.$appHelper.thousandsSeparators(this.v) : "";
      return (fv + "###").replace(/\d/g, "#");
    },
    placeholderString() {
      return this.placeholder.toString();
    }
  },
  watch: {
    value(nv) {
      if (nv && !this.valueType) {
        this.valueType = typeof nv;
      }
      if (Number(parseInt(this.v)) !== Number(nv)) {
        this.v = typeof nv === "number" || typeof nv === "string" ? nv : "";
      }
    }
  },
  methods: {
    onInput() {
      let v = this.v ? parseInt(this.v) : "";
      v = typeof v === "number" ? v : "";
      if (this.valueType === "string") {
        v = v.toString();
      }
      this.$emit("input", v);
      if (v === "") {
        this.$nextTick(function() {
          if (this.placeholder) {
            let pv =
              typeof this.placeholder === "string"
                ? parseInt(this.placeholder.replace(/,/g, ""))
                : this.placeholder;
            if (this.valueType === "string") {
              pv = pv.toString();
            }
            if (pv) {
              this.$emit("input", pv);
            }
          }
        });
      }
    }
  }
};
