<template>
  <v-radio-group
    class="b-radio-group"
    :class="{ 'fit-on-mobile': fitOnMobile }"
    v-bind="attrs"
    v-on="listeners"
    @change="onChange"
  >
    <template v-slot:label v-if="$slots.label">
      <slot name="label"></slot>
    </template>
    <slot name="default"></slot>
  </v-radio-group>
</template>

<script>
export default {
  name: "BRadioGroup",
  inheritAttrs: false,
  props: {
    fitOnMobile: {
      type: Boolean,
      default: false
    },
    gaEvent: {
      type: [Object, Boolean, String],
      default: true
    },
    eventCategory: String,
    eventLabel: String
  },
  computed: {
    gaOption() {
      if (!this.gaEvent) {
        return false;
      }
      const options = {
        eventCategory: this.eventCategory || `${this.$route.name}Page`,
        eventAction: "Select",
        eventLabel: this.eventLabel || this.$attrs.label,
        eventValue: this.$attrs.value
      };
      if (typeof this.gaEvent === "string") {
        options.eventLabel = this.gaEvent;
      } else {
        Object.assign(options, this.gaEvent);
      }
      return options;
    },
    attrs() {
      return Object.assign({}, this.$attrs);
    },
    listeners() {
      return Object.assign({}, this.$listeners);
    }
  },
  methods: {
    onChange($event) {
      this.$emit("input", $event);
      if (this.gaOption) {
        this.$ga.event({ ...this.gaOption, eventValue: $event });
      }
    }
  }
};
</script>
<style lang="scss">
.b-radio-group {
  .box__label {
    color: var(--v-textBlack-base);
  }
  .v-input--radio-group__input > .v-label {
    font-size: 0.75em;
    flex-basis: 100%;
  }
  &.fit-on-mobile {
    @media all and (max-width: 600px) {
      .v-input__control {
        flex-basis: 100%;
        .v-input--radio-group__input {
        }
      }
    }
  }
}
</style>
<style scoped lang="scss">
.b-radio-group {
  margin-top: 0;
}
</style>
