<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
    :persistent="options.persistent"
    @input="onDialogInput"
  >
    <v-card :class="'confirm-theme-' + (options.theme || 'general')">
      <v-card-title class="headline" v-if="options.title">{{
        options.title
      }}</v-card-title>

      <v-card-text
        v-if="options.text"
        class="text-left"
        v-html="options.text"
      ></v-card-text>

      <v-card-actions>
        <b-button
          v-if="options.blText"
          color="green darken-1"
          text="text"
          normal
          event-category="confirmDialog"
          @click="
            dialog = false;
            options.promiseRejecter('blButton');
          "
        >
          {{ options.blText }}
        </b-button>
        <v-spacer></v-spacer>

        <b-button
          v-if="options.disagree"
          color="green darken-1"
          text="text"
          normal
          event-category="confirmDialog"
          @click="
            dialog = false;
            options.promiseRejecter('cancel');
          "
        >
          {{ options.disagree }}
        </b-button>

        <b-button
          :color="options.theme === 'delete' ? $vuetify.theme.error : 'green'"
          class="darken-1"
          text="text"
          normal
          event-category="ConfirmDialog"
          @click="
            dialog = false;
            options.promiseResolver('agree');
          "
        >
          {{ options.agree }}
        </b-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AppConfirmDialog",
  props: {
    title: {
      default: false
    },
    text: {
      default: false
    },
    disagree: {
      default: false
    },
    agree: {
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      dialog: false,
      options: {
        title: false,
        text: false,
        agree: "Ok",
        disagree: "Cancel",
        persistent: true,
        blText: false,
        promiseResolver: () => {},
        promiseRejecter: () => {}
      }
    };
  },
  methods: {
    open() {},
    updateData(options) {
      Object.assign(this.options, options);
    },
    commit(options) {
      this.dialog = true;
      Object.assign(this.options, options);
    },
    onDialogInput(payload) {
      if (payload === false) {
        this.options.promiseRejecter("backdrop");
      }
    }
  },
  created() {
    // console.log(this.$vuetify.breakpoint);
  }
};
</script>

<style scoped lang="scss" src="./AppConfirmDialog.scss"></style>
