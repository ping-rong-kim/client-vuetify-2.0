<template>
  <div
    class="d-flex justify-start align-center"
    :style="computedStyle.component"
  >
    <div class="col-auto-important mr-3" style="max-width: 100%;">
      <h3
        class="app--color-black app-section__title"
        :class="[underDashClass || '']"
        :style="computedStyle.title"
      >
        <slot></slot>
      </h3>
    </div>
    <div class="col-auto-important">
      <slot name="infoPopup"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSectionTitle",
  props: {
    underDash: {
      type: [Boolean, String],
      default: "yellow"
    }
  },
  computed: {
    underDashClass() {
      return this.underDash
        ? "app-under-dash--" + this.underDash + " app-under-dash--start"
        : false;
    },
    computedStyle() {
      let titleStyle = {};
      let componentStyle = {};
      if (this.underDash) {
        titleStyle.marginBottom = "-30px";
        componentStyle.paddingBottom = "30px";
      }
      return { title: titleStyle, component: componentStyle };
    }
  }
};
</script>

<style scoped></style>
