import HashHelper from "@/helpers/HashHelper";
const clonedeep = require("lodash.clonedeep");
import Vue from "vue";
import AppEnv from "@/AppEnv";
const ENABLE_JWT_HASH = AppEnv.VUE_APP_ENABLE_JWT_HASH;

export default {
  getTokenFromCookie() {
    return this.getCookie("jwt");
  },
  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2)
      return parts
        .pop()
        .split(";")
        .shift();
    return false;
  },
  getTokenFromBrowserStorage() {
    const appState = sessionStorage.getItem("app-state");
    if (appState) {
      try {
        if (ENABLE_JWT_HASH === "true") {
          const browserStorage = HashHelper.decode(appState);
          return browserStorage.token;
        } else {
          return JSON.parse(appState).token;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  },
  getBrowserStorage() {
    const appState = sessionStorage.getItem("app-state");
    if (appState) {
      try {
        if (ENABLE_JWT_HASH === "true") {
          return HashHelper.decode(appState);
        } else {
          return JSON.parse(appState).token;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  },
  getSourceVersion() {
    return localStorage.getItem("SOURCE_VERSION");
  },
  setSourceVersion(version) {
    return localStorage.setItem("SOURCE_VERSION", version);
  },
  getParameterFromURL(param, url = window.location.href) {
    let urlHandle = new URL(url);
    return urlHandle.searchParams.get(param);
  },
  // By Vlad: Name is not good, most of case it is used for currency amount, so need to rename as currencyFormat below :).
  thousandsSeparators(num) {
    if (!num && num !== 0) {
      return "";
    }
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  },
  // By Vlad: thousandsSeparators will be deprecated in the future, need to replace with currencyFormat through the whole code.
  currencyFormat(currencyAmount) {
    return this.thousandsSeparators(currencyAmount);
  },

  // TODO move to date utils helper
  formatDate(date, formatPattern = "mm/dd/yyyy", fromPattern = "yyyy-mm-dd") {
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
  },
  getRegistrationForDb(state) {
    let localState = clonedeep(state);
    let registration = localState.registration;
    delete registration.personalDetails.password;
    return {
      registration: registration
    };
  },
  extractFirstName(fullName = "", targetObject = {}) {
    if (fullName) {
      let nameArray = fullName.split(" ");
      targetObject.firstname = nameArray[0].trim();
      return targetObject.firstname;
    }
    return false;
  },
  vueAssign(targetObject, sourceObject) {
    for (let k in sourceObject) {
      Vue.set(targetObject, k, sourceObject[k]);
    }
  },
  parseDate(date) {
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
  },
  stringDate(date, format = "dd/MM/yyyy HH:mm") {
    const dateParsed = this.parseDate(date);
    let dateString = format.replace("yyyy", dateParsed.yyyy);
    dateString = dateString.replace("MM", dateParsed.MM);
    dateString = dateString.replace("dd", dateParsed.dd);
    dateString = dateString.replace("HH", dateParsed.HH);
    dateString = dateString.replace("mm", dateParsed.mm);
    dateString = dateString.replace("ss", dateParsed.ss);
    return dateString;
  },
  filterObject(raw, allowed) {
    return Object.keys(raw)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
      }, {});
  },
  toDashString(str) {
    let dashString = str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    dashString = dashString.replace(/[\s\.]/g, "-");
    dashString = dashString.replace(/^-/, "");
    dashString = dashString.replace(/-{2,}/g, "-");
    return dashString;
  }
};
