<template>
  <b-text-field
    v-bind="$attrs"
    :gaEvent="gaEvent"
    :label="label"
    type="text"
    v-model="v"
    @input="onInput"
    :mask="mask"
    prefix="£"
    :placeholder="placeholderString"
    @change="$emit('change', $event)"
    :rules="rulesComputed"
    :class="{
      'pr-0': $vuetify.breakpoint.xs
    }"
    :error-messages="errorMessages"
    :event-category="eventCategory"
    :event-label="eventLabel"
  ></b-text-field>
</template>

<script>
export default {
  name: "BCurrencyInput",
  inheritAttrs: false,
  components: {},
  props: {
    gaEvent: {
      type: [Object, Boolean, String],
      default: true
    },
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
    },
    maxValue: {
      type: [Number, String],
      default: 99999999
    },
    maxValueError: {
      type: String,
      default: "Max value is 99,999,999"
    },
    eventCategory: String,
    eventLabel: String
  },
  data: function() {
    return {
      errorMessages: [],
      v:
        typeof this.value === "string" || typeof this.value === "number"
          ? this.value
          : "",
      valueType: this.dataType || (this.value ? typeof this.value : false)
    };
  },
  computed: {
    isLeadZero() {
      return this.v.length > 1 && this.v.charAt(0) === "0";
    },
    leadingNoneZeroRules() {
      return [
        v =>
          !(v.length > 1 && v.charAt(0) === "0") || "Leading value can't be 0"
      ];
    },
    maxValueRules() {
      return [
        v =>
          (this.isMaxValueValidate(v) && this.isMaxLengthValidate(v)) ||
          this.maxValueError
      ];
    },
    rulesComputed() {
      return this.rules
        .concat(this.maxValueRules)
        .concat(this.leadingNoneZeroRules);
    },
    mask() {
      if (this.isMaxValueValidate(this.v) && this.isMaxLengthValidate(this.v)) {
        let fv = this.v ? this.$appHelper.thousandsSeparators(this.v) : "";
        return (fv + "###").replace(/\d/g, "#");
      } else {
        let fv = this.v ? this.$appHelper.thousandsSeparators(this.v) : "";
        return fv.replace(/\d/g, "#");
      }
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
    isMaxValueValidate(v) {
      if (this.maxValue) {
        const maxValue = Number(this.maxValue);
        return Number(v) <= maxValue;
      }
      return true;
    },
    isMaxLengthValidate(v) {
      if (this.maxValue) {
        const maxLength = this.maxValue.toString().length;
        return v.toString().length <= maxLength;
      }
      return true;
    },
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
</script>

<style scoped></style>
