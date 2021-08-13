<template>
  <v-dialog v-model="open" :width="width" content-class="b-info-dialog">
    <template v-slot:activator="{ on }">
      <v-icon :size="infoSize" style="vertical-align: middle" v-on="on"
        >info</v-icon
      >
    </template>
    <v-card>
      <v-card-title class="title grey lighten-2 px-2 py-0" primary-title>
        {{ title }}
        <b-button
          data-cy="closeModalBtn"
          class="closeModalBtn ml-auto"
          icon
          @click="open = false"
          light
          event-category="info-popup"
          event-label="close"
        >
          <v-icon>close</v-icon>
        </b-button>
      </v-card-title>
      <v-card-text class="text-xs-left">
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "BInfoPopup",
  props: {
    title: {
      type: String,
      default: "Info"
    },
    width: {
      type: [String, Number],
      default: "500"
    },
    infoMultiple: {
      type: [Number, String],
      default: 1
    },
    inReducedLabel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _infoMultiple() {
      if (this.inReducedLabel) {
        return 1.3333333;
      }
      return this.infoMultiple;
    },
    infoSize() {
      if (this.$_isMobile) {
        return 20 * this._infoMultiple;
      }
      return 26 * this._infoMultiple;
    }
  },
  data: function() {
    return {
      open: false
    };
  }
};
</script>
<style lang="scss">
.b-info-dialog {
  box-shadow: 0 10px 15px -7px rgba(0, 0, 0, 0.08),
    0 10px 10px 3px rgba(0, 0, 0, 0.06), 0 9px 10px 8px rgba(0, 0, 0, 0.06);
}
</style>
<style scoped lang="scss">
.closeModalBtn {
  margin-left: auto;
}
</style>
