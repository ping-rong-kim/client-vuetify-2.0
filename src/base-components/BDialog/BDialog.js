export default {
  name: "BDialog",
  props: {
    value: {
      default: false
    },
    styles: {
      default: () => {
        return {};
      }
    }
  },
  watch: {
    value(newValue) {
      if (newValue) {
        this.scrollWidth = window.innerWidth - document.body.offsetWidth;
        document.querySelector("html").classList.add("dom-overflow-y-hidden");
        if (this.scrollWidth) {
          document.querySelector("html").style.paddingRight =
            this.scrollWidth + "px";
        }
      } else {
        document
          .querySelector("html")
          .classList.remove("dom-overflow-y-hidden");
        if (this.scrollWidth) {
          this.scrollWidth = 0;
          document.querySelector("html").style.paddingRight = "0px";
        }
      }
    }
  },
  data: function() {
    return {
      scrollWidth: 0
    };
  },
  methods: {
    hide() {
      this.$emit("input", false);
    },
    confirmHide() {
      this.$confirmDialog
        .confirm({
          title: "Do you want to leave?",
          text: "You have unsaved changes!"
        })
        .then(res => {
          this.hide();
        })
        .catch(reason => {});
    }
  },
  computed: {
    isScreenWidthEnough() {
      return (
        this.$vuetify.breakpoint.width - this.scrollWidth * 3 >
        parseInt(this.stylesComputed.width)
      );
    },
    paddingX() {
      if (this.isScreenWidthEnough) {
        return `${this.scrollWidth}px`;
      } else {
        return "10px";
      }
    },
    layoutStyle() {
      const style = { paddingRight: this.paddingX };
      if (!this.isScreenWidthEnough) {
        style.paddingLeft = this.paddingX;
      }
      return style;
    },
    stylesComputed() {
      const defaultStyles = {
        width: "1200px"
      };
      return Object.assign(defaultStyles, this.styles);
    }
  },
  components: {},
  beforeDestroy() {
    document.querySelector("html").style.paddingRight = "0px";
    document.querySelector("html").classList.remove("dom-overflow-y-hidden");
  }
};
