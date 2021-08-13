<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    class="full-width"
    min-width="290px"
    ref="datePickerMenu"
    v-model="datePickerMenu"
  >
    <template v-slot:activator="{ on }">
      <b-text-field
        v-bind="inputAttrs"
        v-bind:value="value"
        :label="label"
        class="app-text-field"
        :class="{ 'consider-append-outer-info': considerAppendOuterInfo }"
        app-text-field
        required
        :rules="rulesComputed"
        v-on="on"
        @input="$emit('input', $event)"
        :mask="mask"
        return-masked-value
      >
        <slot slot="append-outer" name="append-outer"></slot>
      </b-text-field>
    </template>
    <v-date-picker
      v-if="!readonly"
      v-bind="attrs"
      v-bind:value="pickerValue"
      @input="onInput"
      v-on="inputListeners"
      @change="onChange"
      v-on:update:pickerDate="onUpdatePickerDate"
      ref="datePicker"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { isStrDateValid } from "@/utils/DateUtils";

export default {
  inheritAttrs: false,
  name: "AppDatePicker",
  props: {
    considerAppendOuterInfo: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    rules: {
      default: () => [v => true]
    },
    inputYear: {
      default: () => false
    },
    readonly: {
      default: () => false
    },
    dateFormat: {
      type: String,
      default: "yyyy-mm-dd"
    },
    yearReverse: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      isOpening: false,
      datePickerMenu: false
    };
  },
  computed: {
    pickerValue: {
      get() {
        if (this.value) {
          return this.pickerFormat(this.value);
        } else {
          return "";
        }
      }
    },
    attrs() {
      if (this.$attrs.type === "year") {
        return Object.assign({}, this.$attrs, { type: "date" });
      }
      return this.$attrs;
    },
    inputAttrs() {
      return Object.keys(this.$attrs)
        .filter(key => ["id", "data-cy"].includes(key))
        .reduce((obj, key) => {
          obj[key] = this.$attrs[key] + "-input";
          return obj;
        }, {});
    },
    inputListeners() {
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: event => {
            let value = this.valueFormat(event);
            this.$emit("input", value);
          },
          change: event => {
            let value = this.valueFormat(event);
            this.$emit("change", value);
          }
        }
      );
    },
    dateFormatComputed() {
      let dateFormat = this.dateFormat;
      if (this.$attrs.type === "year") {
        dateFormat = dateFormat.substr(0, 4);
      } else if (this.$attrs.type === "month") {
        dateFormat = dateFormat.substr(0, dateFormat.length - 3);
      }
      return dateFormat;
    },
    mask() {
      let dateFormat = this.dateFormatComputed;
      return dateFormat.replace(/[\w]/g, "#");
    },
    rulesComputed() {
      let rules = [
        v =>
          !v ||
          isStrDateValid(v, this.dateFormatComputed.replace("mm", "MM")) ||
          "Invalid date"
      ];
      return this.rules.concat(rules);
    }
  },
  methods: {
    onUpdatePickerDate(date) {
      if (!this.isOpening) {
        if (this.$attrs.type === "year" && date) {
          const year = this.$refs.datePicker.tableYear;
          if (year) {
            this.$emit("input", String(year));
            this.$emit("change", String(year));
          }
          this.datePickerMenu = false;
        }
      }
    },
    pickerFormat(date) {
      if (!date) return "";
      if (this.dateFormat === "dd/mm/yyyy" && date.indexOf("/") !== -1) {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
      } else {
        return date;
      }
    },
    valueFormat(date) {
      if (!date) return "";
      if (this.dateFormat === "dd/mm/yyyy") {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      } else {
        return date;
      }
    },
    onChange($event) {
      this.$refs.datePickerMenu.save($event);
    },
    onInput($event, e) {
      this.datePickerMenu = false;
    }
  },
  mounted() {},
  watch: {
    // v-date-picker is not designed perfectly, it doesn't have props for a need to set first picker as either year, month
    // Fortunately it have data option to select picker type to open first time but it doesn't fire any event after picker modal opened
    datePickerMenu(nv) {
      if (nv) {
        this.isOpening = true;
        setTimeout(() => {
          // this.$refs.datePicker.activePicker = "YEAR";
          if (this.inputYear) {
            this.$refs.datePicker.inputYear = this.inputYear;
            this.$refs.datePicker.tableDate = this.inputYear + "-01-01";
          }
        });
        setTimeout(() => {
          if (this.inputYear) {
            let focusElement = this.$refs.datePicker.$el.querySelector(
              // ".v-date-picker-years .active"
              ".v-date-picker-title__year"
            );
            focusElement.scrollIntoView({ block: "center" });
          }
          this.isOpening = false;
        }, 300);
      } else {
      }
    }
  }
};
</script>
<style scoped></style>
