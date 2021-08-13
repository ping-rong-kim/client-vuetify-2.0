import AjaxApiService from "@/services/AjaxApiService";
import AppHelper from "@/helpers/AppHelper";
import AppEnv from "@/AppEnv";

export default {
  INACTIVE_USER_TIME_THRESHOLD: AppEnv.VUE_APP_INACTIVE_THRESHOLD_SECONDS * 10,
  USER_ACTIVITY_THROTTLER_TIME:
    AppEnv.VUE_APP_ACTIVITY_THROTTLER_SECONDS * 1000,
  userActivityTimeout: null,
  addActivityListenerTimeout: null,
  sessionAboutTimeout: null,
  sessionExpireTimeout: null,
  onInactive: null,
  isInactiveCalled: false,
  isSessionAboutCalled: false,
  onSessionAbout: null,
  onSessionExpire: null,
  init() {
    this.resetUserActivityTimeout = this.resetUserActivityTimeout.bind(this);
    this.resetUserActivityTimeout();
    AjaxApiService.onJwtTokenSet = lifeTime => {
      this.resetSessionAboutTimeout(lifeTime);
      this.resetSessionExpireTimeout(lifeTime);
    };
  },
  resetUserActivityTimeout() {
    this.clearUserActivityTimeout();
    this.setUserActivityTimeout();
  },
  clearUserActivityTimeout() {
    if (this.userActivityTimeout) {
      clearTimeout(this.userActivityTimeout);
    }
  },
  setUserActivityTimeout() {
    this.removeActivityListener();
    this.userActivityTimeout = setTimeout(() => {
      this.inactiveUserAction();
    }, this.INACTIVE_USER_TIME_THRESHOLD);
    this.addActivityListenerTimeout = setTimeout(() => {
      this.addActivityListener();
    }, this.USER_ACTIVITY_THROTTLER_TIME);
  },
  addActivityListener() {
    this.isInactiveCalled = false;
    window.addEventListener("mousemove", this.resetUserActivityTimeout);
    window.addEventListener("scroll", this.resetUserActivityTimeout);
    window.addEventListener("keydown", this.resetUserActivityTimeout);
    window.addEventListener("resize", this.resetUserActivityTimeout);
  },
  removeActivityListener() {
    window.removeEventListener("mousemove", this.resetUserActivityTimeout);
    window.removeEventListener("scroll", this.resetUserActivityTimeout);
    window.removeEventListener("keydown", this.resetUserActivityTimeout);
    window.removeEventListener("resize", this.resetUserActivityTimeout);
  },
  inactiveUserAction() {
    clearTimeout(this.addActivityListenerTimeout);
    this.removeActivityListener();
    if (this.onInactive && !this.isSessionAboutCalled) {
      console.log(
        "I am In inactiveUserAction of AcitivityHelper !!!!" + this.onInactive()
      );
      this.isInactiveCalled = true;
      this.onInactive();
    }
  },
  setSessionAboutTimeout(lifeTime) {
    this.isSessionAboutCalled = false;
    this.sessionAboutTimeout = setTimeout(() => {
      this.sessionAboutAction();
    }, (lifeTime - 60) * 1000);
  },
  clearSessionAboutTimeout() {
    if (this.sessionAboutTimeout) {
      clearTimeout(this.sessionAboutTimeout);
    }
  },
  resetSessionAboutTimeout(lifeTime) {
    this.clearSessionAboutTimeout();
    this.setSessionAboutTimeout(lifeTime);
  },
  sessionAboutAction() {
    this.clearSessionAboutTimeout();
    if (this.onSessionAbout && !this.isInactiveCalled) {
      this.isSessionAboutCalled = true;
      this.onSessionAbout();
    }
  },
  setSessionExpireTimeout(lifeTime) {
    this.sessionExpireTimeout = setTimeout(() => {
      this.sessionExpireAction();
    }, lifeTime * 1000);
  },
  clearSessionExpireTimeout() {
    if (this.sessionExpireTimeout) {
      clearTimeout(this.sessionExpireTimeout);
    }
  },
  resetSessionExpireTimeout(lifeTime) {
    this.clearSessionExpireTimeout();
    this.setSessionExpireTimeout(lifeTime);
  },
  async sessionExpireAction() {
    try {
      this.clearSessionExpireTimeout();
      this.isSessionAboutCalled = false;
      this.isInactiveCalled = false;
      if (this.onSessionExpire) {
        await this.onSessionExpire();
        setTimeout(() => {
          this.addActivityListener();
        }, 1000);
      }
    } catch (e) {}
  },
  timer: {
    remainingSeconds: 60,
    timerInterval: null,
    onCountingEnd: null,
    onCounting: null,
    restart(secs = 60) {
      this.clearInterval();
      this.startCounting(secs);
    },
    clearInterval() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.remainingSeconds = 60;
    },
    startCounting(secs = 60) {
      this.remainingSeconds = secs;
      this.timerInterval = setInterval(() => {
        if (this.remainingSeconds <= 0) {
          this.clearInterval();
          if (this.onCountingEnd) {
            this.onCountingEnd();
          }
          return false;
        }
        if (this.onCounting) {
          this.onCounting(this.remainingSeconds);
        }
        this.remainingSeconds--;
      }, 1000);
    }
  }
};
