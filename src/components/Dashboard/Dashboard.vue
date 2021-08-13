<template>
  <div class="dashboard-default-component">
    <div class="app-page__inner" style="width: 940px;">
      <v-alert
        class="ma-3 mb-5"
        color="primary"
        align="left"
        icon="mdi-check-circle"
        dismissible
        value="false"
        v-if="emailVerified"
        transition
      >
        Your Email has been verified
      </v-alert>
      <div
        data-cy="dashboard-content"
        class="dashboard__content app-page--margin-y"
      >
        <h1>Dashboard</h1>
      </div>
    </div>
  </div>
</template>

<script src="./Dashboard.js"></script>
<style scoped src="./Dashboard.scss" lang="scss"></style>
