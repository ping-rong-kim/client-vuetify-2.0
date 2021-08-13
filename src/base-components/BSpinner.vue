<template>
  <div class="b-spinner" v-if="value">
    <div class="spinner__inner">
      <CircleLoader
        :color="$vuetify.theme.primary"
        class="mx-auto"
      ></CircleLoader>
      <div class="spinner__txt mt-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { CircleLoader } from "@saeris/vue-spinners";

export default {
  name: "BSpinner",
  components: {
    CircleLoader
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: [Number, String],
      default: 30500
    },
    timeoutUrl: {
      type: [Boolean, String, Object],
      default: false
    }
  },
  data() {
    return { hideTimeout: null };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        if (v) {
          this.hideTimeOut = setTimeout(() => {
            if (this.value) {
              this.$emit("input", false);
              if (this.timeoutUrl) {
                this.$router.push(this.timeoutUrl);
              }
              this.$store.dispatch("setErrorAlert", "Something went wrong.");
            }
          }, Number(this.timeout));
        } else {
          if (this.hideTimeOut) {
            clearTimeout(this.hideTimeOut);
          }
        }
      }
    }
  },
  beforeDestroy() {
    if (this.hideTimeOut) {
      clearTimeout(this.hideTimeOut);
    }
  }
};
</script>

<style scoped lang="scss">
.b-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  .spinner__txt {
    &:empty {
      display: none;
    }
  }
}
</style>
