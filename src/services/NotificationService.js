import axios from "axios";
const microServiceApiUrl =
  process.env.VUE_APP_MICROSERVICE_API_URL || process.env.VUE_APP_BASE_API_URL;
const baseURL = microServiceApiUrl + "/api/v1/nam";
export default {
  api: axios.create({
    baseURL: baseURL,
    withCredentials: true
  }),
  async get() {
    return this.api.get("/").then(res => res.data);
  },
  async update(alert) {
    return this.api.put("/", { sets: { alert } });
  },
  addAlert(alert) {
    return this.api.post("/alert", { alert }).then(res => res.data);
  }
};
