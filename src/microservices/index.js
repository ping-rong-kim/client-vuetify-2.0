import NotificationMicroservice from "@/microservices/NotificationMicroservice";
import ReturningUserBehaviourMicroservice from "@/microservices/ReturningUserBehaviourMicroservice";

let Microservices = function(Vue, options) {
  this.Vue = Vue;
  this.store = options.store;
  this.notification = NotificationMicroservice;
  this.returningUserBehaviour = ReturningUserBehaviourMicroservice;

  NotificationMicroservice.$store = this.store;
  ReturningUserBehaviourMicroservice.$store = this.store;
};
Microservices.install = function(Vue, options) {
  Vue.Microservices = new Microservices(Vue, options);
  Object.defineProperties(Vue.prototype, {
    $microservices: {
      get() {
        return Vue.Microservices;
      }
    }
  });
};

export default Microservices;
