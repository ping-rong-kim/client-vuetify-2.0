<template>
  <div class="b-col" :class="classComputed" :style="styleComputed">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BCol",
  props: {
    grow: {
      type: Boolean,
      default: false
    },
    shrink: {
      type: Boolean,
      default: false
    },
    colMd: {
      type: [String, Number, Boolean],
      default: false
    },
    order: {
      type: [String, Number],
      default: 0
    },
    cols: {
      type: [String, Number, Boolean],
      default: false
    },
    maxWidth: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  computed: {
    styleComputed() {
      const styles = {
        order: this.order
      };
      if (this.maxWidth !== false) {
        let maxWidth = this.maxWidth;
        if (Number.isInteger(maxWidth)) {
          maxWidth += "px";
        }
        styles.maxWidth = maxWidth;
      }
      return styles;
    },
    classComputed() {
      return Object.assign({}, this.colClass, this.propClass);
    },
    propClass() {
      return {
        "flex-grow": this.grow,
        "flex-shrink": this.shrink
      };
    },
    colClass() {
      const colClass = {};
      let hasColClass = false;
      Object.keys(this.$attrs).map(attr => {
        if (/^col.*/.test(attr)) {
          colClass[`app-${attr}`] =
            this.$attrs[attr] || this.$attrs[attr] === "";
        }
        if (
          /^col-[\d]*$/.test(attr) ||
          /^col-auto$/.test(attr) ||
          /^col$/.test(attr)
        ) {
          hasColClass = true;
        }
      });
      if (this.cols !== false) {
        hasColClass = true;
        colClass[`app-col-${this.cols}`] = true;
      }
      if (this.colMd !== false) {
        colClass[`app-col-md-${this.colMd}`] = true;
      }
      if (!hasColClass) {
        colClass["app-col-auto"] = true;
      }
      return colClass;
    }
  }
};
</script>

<style scoped>
.b-col {
  padding-left: var(--col-padding, 15px);
  padding-right: var(--col-padding, 15px);
}
.flex-grow {
  flex-grow: 1;
}
.flex-shrink {
  flex-shrink: 1;
}
</style>
