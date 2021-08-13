<template>
  <v-dialog v-model="open" :width="width" content-class="b-popup">
    <v-card>
      <v-card-title class="title grey lighten-2 px-2 py-0" primary-title>
        {{ title }}
        <b-button
          data-cy="closeModalBtn"
          class="closeModalBtn ml-auto"
          icon
          @click="open = false"
          light
          event-category="b-popup"
          event-label="close-b-popup"
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
  name: "BPopup",
  props: {
    title: {
      type: String,
      default: "Info"
    },
    width: {
      type: [String, Number],
      default: "500"
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    open: {
      get() {
        return this.value;
      },
      set(open) {
        if (!open) {
          this.$emit("input", false);
        }
      }
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
.b-popup {
  box-shadow: 0 10px 15px -7px rgba(0, 0, 0, 0.08),
    0 10px 10px 3px rgba(0, 0, 0, 0.06), 0 9px 10px 8px rgba(0, 0, 0, 0.06);
}
</style>
<style scoped lang="scss">
.closeModalBtn {
  margin-left: auto;
}
</style>
