import whiteLabelConfig from "./../white-label.config";
const defaultEnv = {
  registeredAddress:
    "Seebeck House, 1 Seebeck Place, Knowlhill, Milton Keynes, Buckinghamshire MK5 8FR",
  companyNumber: "11689436",
  companyName: "CasaFi Limited",
  companyRegulated:
    "Authorised and regulated by the Financial Conduct Authority under firm reference number 841073.",
  dataControllerNumber: "ZA543994",
  VUE_APP_AVM_LIFE_DAYS: 0,
  VUE_APP_ENABLE_JWT_HASH: "false",
  VUE_APP_ENABLE_POPUPS: "false",
  VUE_APP_ENABLE_CONSOLE_LOGGING: "true",
  VUE_APP_ENABLE_PRE_RENDER: "false",
  HOUSE_PRICE_DATA: "true",
  VUE_APP_DASHBOARD_TIMELINE: "false",
  VUE_APP_ENABLE_AVM: "false",
  VUE_APP_ENABLE_AVM_REPORT: "true",
  VUE_APP_ENABLE_COMBINED_DASHBOARD: "false",
  VUE_APP_INACTIVE_THRESHOLD_SECONDS: 60 * 60,
  VUE_APP_ACTIVITY_THROTTLER_SECONDS: 60,
  // VUE_APP_INACTIVE_THRESHOLD_SECONDS: 1 * 1,
  // VUE_APP_ACTIVITY_THROTTLER_SECONDS: 1,
  VUE_APP_USE_RANDOM_AVM_ON_LOGIN: "false",
  VUE_APP_BROKER_EMAIL: "dev@borro.com"
};
function getEnvVar() {
  const whiteLabelBrandConfig =
    whiteLabelConfig[process.env.VUE_APP_WHITE_LABEL_BRAND];
  const brandEnv = {};
  for (const key in whiteLabelBrandConfig) {
    if (typeof whiteLabelBrandConfig[key] === "object") {
      for (const kk in whiteLabelBrandConfig[key]) {
        brandEnv[
          `VUE_APP_WHITE_LABEL_${key.toUpperCase()}_${kk.toUpperCase()}`
        ] = whiteLabelBrandConfig[key][kk];
      }
    } else {
      brandEnv[`VUE_APP_WHITE_LABEL_${key.toUpperCase()}`] =
        whiteLabelBrandConfig[key];
    }
  }
  const envs = Object.assign({}, defaultEnv, process.env, brandEnv);
  envs.VUE_APP_AVM_LIFE_DAYS = parseInt(envs.VUE_APP_AVM_LIFE_DAYS);
  return envs;
}
const AppEnv = getEnvVar();
export default AppEnv;
