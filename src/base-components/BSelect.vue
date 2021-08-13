<template>
  <v-select
    class="b-select"
    :class="{
      'consider-append-outer-info': considerAppendOuterInfo
    }"
    v-bind="attrs"
    v-on="listeners"
    @input="$emit('input', $event)"
    @change="onChange"
    :menu-props="{ 'content-class': 'b-menu__content' }"
  >
    <template v-for="(_, slot) in $slots">
      <template :slot="slot">
        <slot :name="slot"></slot>
      </template>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "BSelect",
  inheritAttrs: false,
  props: {
    considerAppendOuterInfo: {
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
        eventAction: "Select",
        eventLabel: this.eventLabel || this.$attrs.label
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
    onChange(payload) {
      if (this.gaOption) {
        this.$ga.event({ ...this.gaOption, eventValue: payload });
      }
    }
  }
};
</script>

<style lang="scss">
.b-select {
  .v-input__control {
    .v-input__slot {
      .v-select__slot {
        .v-select__selections {
          .v-select__selection {
            color: var(--v-textBlack-base);
          }
        }
      }
    }
  }
}
</style>
<style scoped lang="scss">
.b-select {
  padding-right: 0;
}
</style>
