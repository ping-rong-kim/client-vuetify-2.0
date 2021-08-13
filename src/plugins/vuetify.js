import Vue from "vue";
import Vuetify from "vuetify/lib";
import AppEnv from "@/AppEnv";

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "mdi" // default - only for display purposes
  },
  theme: {
    options: {
      customProperties: true
    },
    light: true,
    themes: {
      light: {
        primary: AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_PRIMARY || "#49d586",
        secondary:
          AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_SECONDARY || "#f9a825",
        backward: AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_BACKWARD || "#9e9ebc",
        accent: AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_ACCENT || "#49d586",
        heading: AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_HEADING || "#49d586",
        error: AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_ERROR || "#ff5252",
        tertiary: AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_TERTIARY || "#fd7574",
        quaternary:
          AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_QUATERNARY || "#9e9ebd",
        periwinkle:
          AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_PERIWINKLE || "#7a78ff",
        appBlue: AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_APPBLUE || "#6e6cfa",
        yellow: AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_YELLOW || "#f8c822",
        textBlack:
          AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_TEXT_BLACK || "#111111",
        appGreyDark:
          AppEnv.VUE_APP_WHITE_LABEL_COLOR_PALLET_APPGRAYDARK || "#6f6f8c"
      }
    }
  }
};

export default new Vuetify(opts);
