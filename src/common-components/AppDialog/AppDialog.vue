<template>
  <v-dialog
    :value="value"
    fullscreen
    @input="hide"
    hide-overlay
    transition="fade-transition"
  >
    <div class="dialog__backdrop"></div>
    <div class="dialog__layout" :style="{ paddingRight: scrollWidth + 'px' }">
      <div
        class="dialog__inner app--shadow"
        :style="{ width: stylesComputed.width + ' !important' }"
      >
        <v-tooltip slot="append-outer" bottom max-width="400" z-index="1001">
          <b-button
            slot="activator"
            class="close__icon"
            text
            icon
            large
            event-category="app-dialog"
            event-label="close"
            color="backward"
            @click="
              $emit('cancel');
              hide();
              $event.stopPropagation();
            "
          >
            <v-icon dark large width="1">mdi-close-circle-outline</v-icon>
          </b-button>
          <span>
            Close
          </span>
        </v-tooltip>
        <div class="dialog__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script src="./AppDialog.js"></script>
<style lang="scss">
.v-dialog--active {
}
</style>
<style scoped lang="scss" src="./AppDialog.scss"></style>
