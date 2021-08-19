<template>
  <v-btn
      class="app-btn b-button"
      :large="large"
      :normal="normal"
      :small="small"
      v-bind="attributes"
      v-on="listeners"
      v-on:click.native="onClick"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "BButton",
  inheritAttrs: false,
  props: {
    normal: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    gaEvent: { type: [Boolean, String, Object], default: true },
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
        eventAction: "Click",
        eventLabel: this.eventLabel || this.$el.innerText
      };
      if (typeof this.gaEvent === "string") {
        options.eventLabel = this.gaEvent;
      } else {
        Object.assign(options, this.gaEvent);
      }
      return options;
    },
    large() {
      return !(this.normal || this.small);
    },
    attributes() {
      return Object.assign({}, this.$attrs);
    },
    listeners() {
      return Object.assign({}, this.$listeners);
    }
  },
  methods: {
    onClick() {
      if (this.gaOption) {
        this.$ga.event(this.gaOption);
      }
    }
  },
  created() {}
};
</script>
<style lang="scss">
.b-button {
  &.theme--light {
    color: var(--v-textBlack-base);
  }
}
</style>
<style scoped lang="scss">
.app-btn.b-button {
  margin: 0 0;
  //&:not(.v-btn--flat) {
  //  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
  //    0 2px 5px 0 rgba(0, 0, 0, 0.24), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  //  &:active {
  //    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
  //      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  //  }
  //}
  &:before,
  &.v-btn--loader {
    background-color: transparent;
  }
  &:hover,
  &:focus {
    &:before {
      opacity: 0.3;
      background-color: currentColor;
    }
  }
  &.v-btn--outline {
    &:before {
      background-color: transparent;
      border: 1px solid transparent;
      opacity: 0.5;
      top: -1px;
      left: -1px;
      bottom: -1px;
      right: -1px;
      width: auto;
      height: auto;
    }
    &:hover,
    &:focus {
      &:before {
        border-color: white;
      }
    }
    &:not(.normal):not([normal]) {
      &:before {
        border-radius: 5px !important;
      }
    }
    @media all and (max-width: 768px) {
      &:not(.v-btn--block):not([normal]):before {
        border-radius: 2px !important;
      }
    }
  }
  &.v-btn--disabled,
  &.v-btn--outline.v-btn--disabled {
    &:not(.v-btn--icon):not(.v-btn--flat).v-btn.theme--light {
      background-color: #999999 !important;
      color: white !important;
    }
  }
  &.v-btn--block {
    /*min-height: 50px;*/
  }
  &.v-btn--small {
    min-width: 50px;
  }
  &.v-btn--outline {
    color: var(--v-textBlack-base);
  }
}
</style>
