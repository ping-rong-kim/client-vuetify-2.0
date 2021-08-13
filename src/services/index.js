import AuthService from "./AuthService";
import SignupService from "./SignupService";

let AppServices = function(Vue, globalOptions = {}) {
  this.Vue = Vue;
  this.store = globalOptions.store;
  this.authService = AuthService;
  this.signupService = SignupService;
  this.registeredServices = [AuthService, SignupService];
  this.registeredServices.forEach(service => {
    service.$store = this.store;
  });
};
AppServices.install = function(Vue, options) {
  Vue.Services = new AppServices(Vue, options);
  Object.defineProperties(Vue.prototype, {
    $services: {
      get() {
        return Vue.Services;
      }
    }
  });
};
export default AppServices;
