export default {
  name: "Dropdown",
  props: {
    label: String,
    options: String
  },
  data: function() {
    return {
      // create items from given options that we can use
      // in the dropdown from the given comma separated
      // string, removing whitespace.
      items: function() {
        var optionCollection = [];
        var options = this.options.split(",");
        for (var i = 0; i < options.length; i++) {
          optionCollection.push({
            index: i,
            text: options[i].trim()
          });
        }
        return optionCollection;
      },
      selected: null
    };
  }
};
