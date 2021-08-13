export function iPrefix(str, prefix, ignores = []) {
  const cleanedPrefix = prefix.replace(/./g, function(a) {
    if (ignores.includes(a)) return "";
    return a;
  });
  const strLength = str.length;
  const prefixLength = cleanedPrefix.length;
  let i,
    j = 0;
  for (i = 0; i < strLength && j < prefixLength; i++) {
    if (ignores.includes(str[i])) continue;
    if (str[i] !== cleanedPrefix[j]) return false;
    ++j;
  }
  return str.substr(0, i);
}
export function capitalize(str) {
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";
}
