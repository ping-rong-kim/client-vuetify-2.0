import axios from "axios";
import AppHelper from "@/helpers/AppHelper";
const envBaseServerApiUrl = process.env.VUE_APP_BASE_SERVER_URL;

const token = AppHelper.getTokenFromCookie();
export default {
  // TODO: @vlad we don't use proxy server we use real servers set with en vars
  onJwtTokenSet: null,
  axios: axios.create({
    baseURL: envBaseServerApiUrl,
    withCredentials: true,
    timeout: 30000
  }),
  token: token,

  post(endPoint, payload = {}) {
    return this.axios.post(endPoint, payload).then(
      res => {
        this.filterTokenFromResponse(res);
        this.filterTokenExpire(res);
        return res.data;
      },
      error => {
        return Promise.reject(error);
      }
    );
  },
  put(endPoint, payload = {}) {
    return this.axios.put(endPoint, payload).then(res => {
      this.filterTokenFromResponse(res);
      this.filterTokenExpire(res);
      return res.data;
    });
  },
  get(endPoint) {
    return this.axios.get(endPoint).then(res => {
      this.filterTokenFromResponse(res);
      this.filterTokenExpire(res);
      return res.data;
    });
  },
  filterTokenExpire(res) {
    const tokenLifeTime = res.request.getResponseHeader("token-expire");
    if (this.onJwtTokenSet && tokenLifeTime) {
      this.onJwtTokenSet(Number(tokenLifeTime));
    }
  },
  filterTokenFromResponse(res) {
    if (res.data.token) {
      this.token = AppHelper.getTokenFromCookie();
    }
  }
};
