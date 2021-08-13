<template>
  <div
    class="env-page"
    style="background-color: white; text-align: left; padding: 20px 50px; margin: 50px 10px;"
  >
    <div class="env__client">
      <h1>Client Env</h1>
      <div class="env__list">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Client Version</td>
              <td>{{ clientVersion }}</td>
            </tr>
            <tr>
              <td>Client Build Date</td>
              <td>{{ clientBuildDate }}</td>
            </tr>
            <tr v-for="(value, key) in clientEnv" :key="'client_env_' + key">
              <td>{{ key }}:</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="env__server">
      <h1>Server Env</h1>
      <div class="env__list">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in serverEnv" :key="'server_env_' + key">
              <td>{{ key }}:</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="env__api_server">
      <h1>Api Server Env</h1>
      <div class="env__list">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, key) in apiServerEnv"
              :key="'api_server_env_' + key"
            >
              <td>{{ key }}:</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="env__api_template_server">
      <h1>Api Template Server Env</h1>
      <div class="env__list">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, key) in apiTemplateServerEnv"
              :key="'api_template_server_env_' + key"
            >
              <td>{{ key }}:</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import ApiEnvService from "@/services/ApiEnvService";
import ServerService from "@/services/ServerService";
import AppHelper from "@/helpers/AppHelper";
import AppEnv from "@/AppEnv";

export default {
  name: "Env",
  data: function() {
    return {
      clientEnv: AppEnv,
      clientVersion: process.env.VERSION,
      clientBuildDate: process.env.BUILD_DATE,
      serverEnv: {},
      apiServerEnv: {},
      apiTemplateServerEnv: {}
    };
  },
  mounted() {
    //https://casafi6.firmview.co.uk/api/v1/env
    ServerService.getEnv().then(res => {
      this.serverEnv = res;
    });

    //https://casafi-api.firmview.co.uk/api/v1/env
    ApiEnvService.getEnv().then(res => {
      this.apiServerEnv = res.data;
    });

    //https://casafi-api.firmview.co.uk/api/v1/template-env
    ApiEnvService.getTemplateEnv().then(res => {
      this.apiTemplateServerEnv = res.data;
    });
  }
};
</script>
