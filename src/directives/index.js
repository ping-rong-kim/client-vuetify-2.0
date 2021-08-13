import AppGoogleAnalytics from "@/directives/AppGoogleAnalytics";
import AppInputAiAttr from "@/directives/AppInputAiAttr";
import AppFontSizeAi from "@/directives/AppFontSizeAi";
export default {
  install(Vue, options) {
    Vue.directive("app-ga", AppGoogleAnalytics);
    Vue.directive("app-input-ai-attr", AppInputAiAttr);
    Vue.directive("app-font-size-ai", AppFontSizeAi);
  }
};
