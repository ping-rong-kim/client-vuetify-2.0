import BRow from "@/base-components/BRow";
import BCol from "@/base-components/BCol";
import BButton from "@/base-components/BButton";
import BCardScreen from "@/base-components/BCardScreen/BCardScreen";
import BPageTitle from "@/base-components/BPageTitle";
import BInfoPopup from "@/base-components/BInfoPopup";
import BRadioGroup from "@/base-components/BRadioGroup";
import BSelect from "@/base-components/BSelect";
import BInfoTooltip from "@/base-components/BInfoTooltip";
import BDialog from "@/base-components/BDialog/BDialog.vue";
import BTextField from "@/base-components/BTextField";
import BProgressCircular from "@/base-components/BProgressCircular";
import BFavouriteStar from "@/base-components/BFavouriteStar";
import BCurrencyInput from "@/base-components/BCurrencyInput";
import BPopup from "@/base-components/BPopup";
import BSectionTitle from "@/base-components/BSectionTitle";
import BTitle from "@/base-components/BTitle";
import BTermInput from "@/base-components/BTermInput";
import BCard from "@/base-components/BCard";
import BCurrencyText from "@/base-components/BCurrencyText";
import BSpinner from "@/base-components/BSpinner";
import BLink from "@/base-components/BLink";
import BTab from "@/base-components/BTab";

export default {
  install(Vue, options) {
    Vue.component("b-row", BRow);
    Vue.component("b-col", BCol);
    Vue.component("b-button", BButton);
    Vue.component("b-card-screen", BCardScreen);
    Vue.component("b-page-title", BPageTitle);
    Vue.component("b-info-popup", BInfoPopup);
    Vue.component("b-radio-group", BRadioGroup);
    Vue.component("b-select", BSelect);
    Vue.component("b-info-tooltip", BInfoTooltip);
    Vue.component("b-dialog", BDialog);
    Vue.component("b-text-field", BTextField);
    Vue.component("b-progress-circular", BProgressCircular);
    Vue.component("b-favourite-star", BFavouriteStar);
    Vue.component("b-currency-input", BCurrencyInput);
    Vue.component("b-popup", BPopup);
    Vue.component("b-section-title", BSectionTitle);
    Vue.component("b-title", BTitle);
    Vue.component("b-term-input", BTermInput);
    Vue.component("b-card", BCard);
    Vue.component("b-currency-text", BCurrencyText);
    Vue.component("b-spinner", BSpinner);
    Vue.component("b-link", BLink);
    Vue.component("b-tab", BTab);
  }
};