import AjaxApiService from "@/services/AjaxApiService";
import AppHelper from "@/helpers/AppHelper";
import MatomoTrackingHelper from "@/helpers/MatomoTrackingHelper";
import { uuid } from "@/utils";

export default {
  isLoggedIn: false,
  user: false,
  hasLinkedAccount: false,
  changePassword(password, hash) {
    return AjaxApiService.post("/api/v1/forgot-password/change-password", {
      hash,
      password
    });
  },
  checkPasswordCorrect(password) {
    return AjaxApiService.post("/api/v1/forgot-password/check-password", {
      password
    });
  },
  verifyHash() {
    const hash = AppHelper.getParameterFromURL("hash");
    return AjaxApiService.post("/api/v1/auth/verify-hash", {
      hash: hash
    }).then(res => {
      return res;
    });
  },
  login(email, password, linkWith = false) {
    let user = { email, password };
    if (linkWith) {
      user.linkWith = linkWith;
    }
    return AjaxApiService.post("/api/v1/auth/login", user).then(res => {
      this.isLoggedIn = true;
      this._fillUserFromResponse(res);
      MatomoTrackingHelper.trackUser(this.user.cuid);
      return res;
    });
  },
  _getPersonalFromRegistration(registration) {
    let $registration = registration;
    if (typeof $registration === "string") {
      $registration = JSON.parse(registration);
    }
    return $registration.personalDetails;
  },
  _fillUserFromResponse(res) {
    let user = this._getPersonalFromRegistration(res.Signup.registration);
    user.cuid = res.cuid;
    this.user = user;
    return user;
  },
  forgotPassword(email) {
    return AjaxApiService.post("/api/v1/forgot-password", {
      email: email
    });
  },
  async resetPassword(password) {
    const hash = AppHelper.getParameterFromURL("hash");
    return AjaxApiService.post("/api/v1/forgot-password/reset-password", {
      password: password,
      hash: hash
    }).then(async res => {
      this.isLoggedIn = true;
      this._fillUserFromResponse(res);
      this.$store.dispatch("loginWith", res);
      this.$store.dispatch("setAlert", "The new password saved correctly");
      return res;
    });
  },
  jwtLogin() {
    return AjaxApiService.post("/api/v1/auth/jwt-login")
      .then(async res => {
        this.isLoggedIn = true;
        this._fillUserFromResponse(res);
        this.$store.dispatch("loginWith", res);
        MatomoTrackingHelper.trackUser(this.user.cuid);
        return res;
      })
      .catch(error => {
        this.isLoggedIn = false;
        this.user = false;
        window.document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        logger.log("jwt login error:", document.cookie);
        this.$store.dispatch("logout");
        return Promise.reject("jwt invalid");
      });
  },
  async logout() {
    this.user = false;
    return await AjaxApiService.post("/api/v1/auth/logout").then(
      res => {
        this.isLoggedIn = false;
        this.user = false;
        document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        this.$store.dispatch("logout");
        return res;
      },
      error => {
        this.isLoggedIn = false;
        this.user = false;
        document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        this.$store.dispatch("logout");
        return false;
      }
    );
  },
  async frontLogout() {
    this.isLoggedIn = false;
    this.user = false;
    document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    if (this.$store.state.isUserLoggedIn || true) {
      await this.$store.dispatch("logout");
    }
    return Promise.resolve();
  },
  async isEmailInUse(email) {
    return AjaxApiService.post("/api/v1/auth/is-email-in-use", {
      email: email
    });
  },
  oneShotRegister(payload) {
    if (typeof payload.signUp.registration === "string") {
      payload.signUp.registration = JSON.parse(payload.signUp.registration);
    }
    delete payload.signUp.registration.personalDetails.password;
    payload.user.cuid = payload.user.cuid || uuid();
    return AjaxApiService.post("/api/v1/signup", payload)
      .then(res => {
        this.isLoggedIn = true;
        this._fillUserFromResponse(res);
        this.$store.dispatch("loginWith", res);
        return res;
      })
      .catch(error => {
        Logger.log("one-short-register has unexpected result: ", error);
        return Promise.reject(error);
        //return res;
      });
  },
  verifyEmail(token) {
    if (
      this.isLoggedIn &&
      this.$store.state.registration.platformProgress &&
      this.$store.state.registration.platformProgress.emailConfirmed === true
    ) {
      return Promise.resolve("already_verified");
    }
    return AjaxApiService.post("/api/v1/auth/verify-email", { hash: token })
      .then(res => {
        if (this.isLoggedIn === false) {
          this.isLoggedIn = true;
          this._fillUserFromResponse(res);
          MatomoTrackingHelper.trackUser(this.user.cuid);
        } else {
        }
        this.$store.dispatch("loginWith", res);
        return res;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  deleteAccount() {
    return AjaxApiService.post("/api/v1/auth/delete-account")
      .then(res => {
        return res;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  async changeEmail(newEmail) {
    return AjaxApiService.put("/api/v1/user/change-email", {
      email: newEmail
    });
  }
};
