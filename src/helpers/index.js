import AppHelper from "./AppHelper";

let AppHelpers = function(Vue, options) {
  this.Vue = Vue;
  this.store = options.store;
  this.appHelper = AppHelper;
  this.registeredHelpers = [AppHelper];
  this.registeredHelpers.forEach(helper => {
    helper.$store = this.store;
  });
};
AppHelpers.install = function(Vue, options) {
  Vue.AppHelpers = new AppHelpers(Vue, options);
  Object.defineProperties(Vue.prototype, {
    $helpers: {
      get() {
        return Vue.AppHelpers;
      }
    }
  });
};

export default AppHelpers;
