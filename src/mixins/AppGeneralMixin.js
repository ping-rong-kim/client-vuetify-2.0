import AppEnv from "@/AppEnv";

export default {
  data() {
    return {
      mxUsedAttrIDs: {}
    };
  },
  computed: {
    envVar() {
      let publicKeys = [
        "registeredAddress",
        "companyNumber",
        "companyName",
        "companyRegulated",
        "dataControllerNumber"
      ];
      let envVar = AppEnv;
      return this.$appHelper.filterObject(envVar, publicKeys);
    },
    $_env() {
      return AppEnv;
    },
    $_attrPrefix() {
      const name = this.$options.name;
      return this.$appHelper.toDashString(name);
    },
    $_isMobile() {
      return this.$vuetify.breakpoint.width < 769;
    },
    $_generateAttrID() {
      return mainPart => {
        if (this.mxUsedAttrIDs.hasOwnProperty(mainPart)) {
          return this.mxUsedAttrIDs[mainPart];
        }
        const attrPrefix = this.attrPrefix || this.$_attrPrefix;
        const attrID =
          attrPrefix + "-" + this.$appHelper.toDashString(mainPart);
        this.mxUsedAttrIDs[mainPart] = attrID;
        return attrID;
      };
    }
  },
  methods: {
    capitalizeFirstLetter(str) {
      if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    },
    formatAsCurrency(value, dec) {
      dec = dec || 0;
      if (value === null) {
        return 0;
      }
      return "" + value.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
  }
};
