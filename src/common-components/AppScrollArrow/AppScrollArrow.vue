<template>
  <div
    class="app-scroll-arrow-component"
    :class="{ scrolling: isScrollingUp }"
    @click="goTo"
  >
    <div class="scroll-arrow--shadow"></div>
    <div class="app-scroll-arrow"></div>
  </div>
</template>

<script>
import { SCROLL_OPTIONS } from "@/options/CommonOptions";

export default {
  name: "AppScrollArrow",
  props: {
    to: {
      type: [String, Number]
    }
  },
  data() {
    return {
      isScrollingUp: false
    };
  },
  computed: {
    options() {
      return {
        ...SCROLL_OPTIONS,
        offset: 65
      };
    }
  },
  methods: {
    goTo() {
      this.$vuetify.goTo(this.to, this.options);
      this.isScrollingUp = true;
      setTimeout(() => {
        this.isScrollingUp = false;
      }, this.options.duration);
    }
  }
};
</script>

<style scoped lang="scss">
.app-scroll-arrow-component {
  position: relative;
  width: 60px;
  height: 35px;
  opacity: 0;
  transition: opacity 0.3s ease-out;
  animation-name: app-scroll-arrow-showing;
  animation-delay: 3s;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  --arrow-width: 4px;
  --arrow-color: #7f7f7f;

  .scroll-arrow--shadow {
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      height: var(--arrow-width);
      width: 50%;
      border-radius: 1px;
      box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.03);
    }
    &:before {
      left: 0;
      transform: rotate(35deg);
      transform-origin: bottom right;
    }
    &:after {
      right: 0;
      transform: rotate(-35deg);
      transform-origin: bottom left;
    }
    &:hover {
      &:before,
      &:after {
        box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.06);
      }
    }
  }
  .app-scroll-arrow {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      height: var(--arrow-width);
      width: 50%;
      border-radius: 1px;
      background-color: var(--arrow-color);
    }
    &:before {
      left: 0;
      transform: rotate(35deg);
      transform-origin: bottom right;
    }
    &:after {
      right: 0;
      transform: rotate(-35deg);
      transform-origin: bottom left;
    }
    &:hover {
      &:before,
      &:after {
        background-color: #6c6c6c;
      }
    }
  }
  &.scrolling {
    opacity: 0;
  }
  @keyframes app-scroll-arrow-showing {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
