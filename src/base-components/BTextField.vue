<template>
  <AppTextField
    class="b-text-field"
    v-bind="attrs"
    v-on="listeners"
    :rules="rules"
    @change="onChange"
    ref="appTextField"
  >
    <template v-for="(_, slot) in $slots">
      <template :slot="slot">
        <slot :name="slot"></slot>
      </template>
    </template>
  </AppTextField>
</template>

<script>
import AppTextField from "@/common-components/AppTextField/AppTextField";

export default {
  name: "BTextField",
  inheritAttrs: false,
  components: { AppTextField },
  props: {
    rules: {
      type: Array,
      default() {
        return [];
      }
    },
    gaEvent: {
      type: [Object, Boolean, String],
      default: true
    },
    eventCategory: String,
    eventLabel: String
  },
  watch: {
    rules: {
      deep: true,
      handler() {
        this.$refs.appTextField.validate();
      }
    }
  },
  computed: {
    attrs() {
      return Object.assign({}, this.$attrs);
    },
    listeners() {
      return Object.assign({}, this.$listeners);
    },
    gaOption() {
      if (!this.gaEvent) {
        return false;
      }
      const options = {
        eventCategory: this.eventCategory || `${this.$route.name}Page`,
        eventAction: "Input",
        eventLabel: this.eventLabel || this.$attrs.label,
        eventValue:
          this.$attrs.type === "password"
            ? this.$attrs.value.replaceAll(/./g, "*")
            : this.$attrs.value
      };
      if (typeof this.gaEvent === "string") {
        options.eventLabel = this.gaEvent;
      } else {
        Object.assign(options, this.gaEvent);
      }
      return options;
    }
  },
  methods: {
    onChange(value) {
      if (this.gaOption) {
        this.$ga.event({
          ...this.gaOption,
          eventValue:
            this.$attrs.type === "password"
              ? value.replaceAll(/./g, "*")
              : value
        });
      }
    },
    validate() {}
  }
};
</script>
<style lang="scss">
.v-text-field__details {
  min-height: 20px;
  align-items: center;
}
.b-text-field {
  .v-input__control {
    .v-input__slot {
      .v-text-field__slot {
        input {
          color: var(--v-textBlack-base);
        }
      }
    }
  }
  &.v-input--is-disabled {
    .v-input__control {
      .v-input__slot {
        .v-text-field__slot {
          input {
            color: rgba(176, 176, 176, 1);
          }
        }
      }
    }
  }
}
</style>
<style scoped lang="scss"></style>
