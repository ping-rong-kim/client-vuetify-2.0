let MicroHelpers = function(Vue, options) {
  this.Vue = Vue;
  this.store = options.store;
};
MicroHelpers.install = function(Vue, options) {
  Vue.MicroHelpers = new MicroHelpers(Vue, options);
  Object.defineProperties(Vue.prototype, {
    $microHelpers: {
      get() {
        return Vue.MicroHelpers;
      }
    }
  });
};
export default MicroHelpers;
