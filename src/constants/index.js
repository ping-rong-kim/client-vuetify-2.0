import { NO, YES, SAVE, DELETE } from "@/constants/BaseConst";

export default {
  install(Vue, options) {
    window.YES = YES;
    window.NO = NO;
    window.SAVE = SAVE;
    window.DELETE = DELETE;

    Vue.prototype.YES = YES;
    Vue.prototype.NO = NO;
    Vue.prototype.SAVE = SAVE;
    Vue.prototype.DELETE = DELETE;
  }
};
