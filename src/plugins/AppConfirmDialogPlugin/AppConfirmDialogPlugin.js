import AppConfirmDialog from "@/common-components/AppConfirmDialog/AppConfirmDialog";

let AppConfirmDialogPlugin = function(Vue, globalOptions = {}) {
  this.Vue = Vue;
  this.mounted = false;
  this.$root = {}; // The root component
  this.globalOptions = Object.assign(
    {
      title: false,
      text: false,
      agree: "Ok",
      disagree: "Cancel",
      promiseResolver: () => {},
      promiseRejecter: () => {},
      theme: "general"
    },
    globalOptions
  );
};
AppConfirmDialogPlugin.prototype.mountIfNotMounted = function() {
  if (this.mounted === true) {
    return;
  }

  this.$root = (() => {
    let DialogConstructor = this.Vue.extend(AppConfirmDialog);
    let node = document.createElement("div");
    document.querySelector("body").appendChild(node);

    let Vm = new DialogConstructor();

    return Vm.$mount(node);
  })();

  this.mounted = true;
};

AppConfirmDialogPlugin.prototype.destroy = function() {
  if (this.mounted === true) {
    let elem = this.$root.$el;
    this.$root.$destroy();
    this.$root.$off();
    elem.remove();
    this.mounted = false;
  }
};

AppConfirmDialogPlugin.prototype.confirm = function(options) {
  return this.open(options);
};
AppConfirmDialogPlugin.prototype.updateData = function(options) {
  if (this.mounted === true) {
    this.$root.updateData(options);
  }
};
AppConfirmDialogPlugin.prototype.open = function(localOptions = {}) {
  this.mountIfNotMounted();
  return new Promise((resolve, reject) => {
    localOptions.promiseResolver = resolve;
    localOptions.promiseRejecter = reject;

    this.$root.commit(Object.assign({}, this.globalOptions, localOptions));
  });
};

AppConfirmDialogPlugin.install = function(Vue, options) {
  Vue.confirmDialog = new AppConfirmDialogPlugin(Vue, options);

  Object.defineProperties(Vue.prototype, {
    $confirmDialog: {
      get() {
        return Vue.confirmDialog;
      }
    }
  });
};

export default AppConfirmDialogPlugin;
