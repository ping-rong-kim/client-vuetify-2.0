import _mapKeys from "lodash/mapKeys";
import _capitalize from "lodash/capitalize";
export default {
  inserted: function(el, binding, vNode) {
    let events = Object.keys(binding.modifiers);
    !events.length && events.push("click");

    const componentInstance = vNode.componentInstance;
    const context = vNode.context;
    let defaultOptions = {
      eventAction: "Click",
      eventLabel: componentInstance
        ? componentInstance.label || el.innerText
        : el.innerText
    };
    if (context.$route) {
      defaultOptions.eventCategory = `${context.$route.name}Page`;
    }
    let bindingValue =
      typeof binding.value === "object"
        ? binding.value
        : typeof binding.value === "string"
        ? { label: binding.value }
        : binding.value !== false && {};
    if (bindingValue) {
      bindingValue = _mapKeys(bindingValue, function(value, key) {
        return "event" + _capitalize(key);
      });
      const options = Object.assign({}, defaultOptions, bindingValue);
      events.forEach(event => {
        el.addEventListener(event, function($event) {
          context.$ga.event(options);
        });
      });
    }
  }
};
