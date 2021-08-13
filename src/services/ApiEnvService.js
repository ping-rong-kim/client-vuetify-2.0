import Api from "@/services/ApiGoServer";
export default {
  getEnv() {
    return Api().get("api/v1/env");
  },
  getTemplateEnv() {
    return Api().get("/api/v1/template-env");
  }
};
