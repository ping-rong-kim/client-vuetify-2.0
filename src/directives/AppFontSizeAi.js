function setFontSize(el, binding) {
  const words = el.innerText.split(/\s/);
  const longestWord = words.reduce((acc, word) => {
    return acc.length < word.length ? word : acc;
  });
  const wordLength = longestWord.length;
  const width = el.clientWidth;
  let fontSize = (1.4 * (width - 20)) / wordLength;
  fontSize = Math.min(fontSize, binding.value.max || 40);
  fontSize = Math.max(fontSize, binding.value.min || 10);
  el.style.fontSize = `${fontSize}px`;
}
export default {
  componentUpdated: function(el, binding, vNode) {
    const breakpoints = Object.keys(binding.modifiers);
    for (const breakpoint of breakpoints) {
      if (vNode.context.$vuetify.breakpoint[breakpoint]) {
        setFontSize(el, binding);
        break;
      }
    }
  }
};
