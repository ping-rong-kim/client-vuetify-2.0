import AjaxApiService from "@/services/AjaxApiService";
import AppHelper from "@/helpers/AppHelper";
import cloneDeep from "lodash/cloneDeep";

export default {
  async update(sets) {
    return AjaxApiService.put("/api/v1/signup", {
      sets: sets
    }).then(res => {
      return res;
    });
  },
  async updateRegistration(registration) {
    return Promise.reject("Deprecated method");
    let objRegistration =
      typeof registration === "object"
        ? cloneDeep(registration)
        : JSON.parse(registration);
    return await this.update({
      registration: objRegistration
    });
  },
  async saveStateToDb() {
    let registration = AppHelper.getRegistrationForDb(this.$store.state);
    return this.update(registration);
  }
};
