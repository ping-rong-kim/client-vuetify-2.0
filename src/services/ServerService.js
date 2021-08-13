import AjaxApiService from "@/services/AjaxApiService";

export default {
  async getEnv() {
    return await AjaxApiService.get("/api/v1/env/show");
  }
};
