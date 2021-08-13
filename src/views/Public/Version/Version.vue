<template>
  <div
    class="version-page"
    style="background-color: white; text-align: left; padding: 20px 50px; margin: 50px 10px;"
  >
    <div class="env__client">
      <h1>Client Version</h1>
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
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Version",
  data: function() {
    return {
      clientEnv: process.env,
      clientVersion: process.env.VERSION,
      clientBuildDate: process.env.BUILD_DATE
    };
  },
  mounted() {}
};
</script>
