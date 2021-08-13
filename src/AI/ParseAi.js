import { iPrefix, capitalize } from "@/utils/StringUtils";

const nameTitles = [
  "Mr.",
  "Mrs.",
  "Miss",
  "Dr.",
  "Ms.",
  "Prof.",
  "Rev.",
  "Lady",
  "Sir",
  "Air Cdre.",
  "Brgdr.",
  "Capt.",
  "Cmdr.",
  "Col.",
  "Dame",
  "Flt. Lt.",
  "Group Capt.",
  "Judge",
  "Lady",
  "Lord",
  "Lt.-Cmdr.",
  "Lt.-Col.",
  "Maj.-Gen.",
  "Major",
  "Rear Admrl.",
  "Revd Canon",
  "Revd. Father",
  "Rt. Hon. Lord",
  "The Hon.",
  "The Hon. Mrs",
  "Viscount",
  "Wng. Cmdr."
];

export function parseNameTitle(fullName) {
  nameTitles.sort((a, b) => {
    return b.length - a.length;
  });
  for (const iTitle of nameTitles) {
    const title = iPrefix(fullName, iTitle, [" ", "."]);
    if (title) {
      if (![".", " "].includes(fullName[title.length])) {
      } else if (fullName[title.length] === ".") {
        return `${title}.`;
      } else {
        return title;
      }
    }
  }
  return false;
}

export function parseFullName(fullName) {
  const nameTitle = parseNameTitle(fullName);
  let mainName = fullName;
  if (nameTitle) {
    mainName = fullName.substr(nameTitle.length);
    mainName = mainName.trim();
  }
  const parsedMainName = mainName.split(" ");
  const firstName = parsedMainName[0] || "";
  const surname = parsedMainName.slice(1).join(" ") || "";
  return {
    title: nameTitle || "",
    firstname: capitalize(firstName),
    surname: capitalize(surname)
  };
}
