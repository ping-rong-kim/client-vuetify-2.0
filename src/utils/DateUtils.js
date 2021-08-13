import returnable from "vuetify/lib/mixins/returnable";

export function formatDate(
  date,
  formatPattern = "mm/dd/yyyy",
  fromPattern = "yyyy-mm-dd"
) {
  if (!date) return null;
  let year, month, day;
  if (fromPattern === "yyyy-mm-dd") {
    [year, month, day] = date.split("-");
  } else if (fromPattern === "dd/mm/yyyy") {
    [day, month, year] = date.split("/");
  }
  if (formatPattern === "dd/mm/yyyy") {
    return `${day}/${month}/${year}`;
  } else if (formatPattern === "yyyy-mm-dd") {
    return `${year}-${month}-${day}`;
  }
  return `${month}/${day}/${year}`;
}
export function parseDate(date) {
  const month = date.getMonth() + 1;
  const d = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return {
    yyyy: date.getFullYear(),
    MM: month > 9 ? month : "0" + month,
    dd: d > 9 ? d : "0" + d,
    HH: hours > 9 ? hours : "0" + hours,
    mm: minutes > 9 ? minutes : "0" + minutes,
    ss: seconds > 9 ? d : "0" + seconds
  };
}
export function stringToDate(strDate, format = "dd/MM/yyyy") {
  const parsed = parseStrDate(strDate, format);
  return new Date(parsed.yyyy, parsed.MM - 1, parsed.dd || 1);
}
export function stringDate(date, format = "dd/MM/yyyy HH:mm") {
  const dateParsed = parseDate(date);
  let dateString = format.replace("yyyy", dateParsed.yyyy);
  dateString = dateString.replace("MM", dateParsed.MM);
  dateString = dateString.replace("dd", dateParsed.dd);
  dateString = dateString.replace("HH", dateParsed.HH);
  dateString = dateString.replace("mm", dateParsed.mm);
  dateString = dateString.replace("ss", dateParsed.ss);
  return dateString;
}
export function appStringDate(date) {
  return stringDate(date, "dd/MM/yyyy");
}
export function appStringToDate(strDate) {
  const parsed = strDate.split("/");
  return new Date(parsed[2], parsed[1] - 1, parsed[0]);
}
export function parseStrDate(strDate, format = "dd/MM/yyyy") {
  const parsedStrDate = strDate.split(/[^\d]/);
  const parsedFormat = format.split(/[^dMyHms]/);
  return parsedFormat.reduce((acc, key, index) => {
    return { ...acc, [key]: parsedStrDate[index] };
  }, {});
}
export function changeFormat(strDate, fromFormat, toFormat) {
  const date = stringToDate(strDate, fromFormat);
  return stringDate(date, toFormat);
}
export function isStrDateValid(strDate, format = "dd/MM/yyyy") {
  const parsedStrDate = parseStrDate(strDate, format);
  const maxValues = {
    yyyy: "2100",
    MM: "12",
    dd: "31",
    HH: "24",
    mm: "59",
    ss: "59"
  };
  for (const key in parsedStrDate) {
    if (parsedStrDate[key] > maxValues[key]) {
      return false;
    }
  }
  return true;
}
