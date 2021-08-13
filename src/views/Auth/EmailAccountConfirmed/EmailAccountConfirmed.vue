<template>
  <div class="email-account-confirmed-page">
    <div
      class="page__inner round-container app--shadow white-background mb-0 pa-5"
    >
      <div class="page__content">
        <v-layout>
          <v-flex md12>
            <v-alert
              class="ma-3"
              color="primary"
              align="left"
              icon="mdi-check-circle"
              value="false"
              v-if="status === 'success'"
            >
              Your Email has been verified
            </v-alert>
            <v-alert
              color="info"
              align="left"
              icon="mdi-information"
              value="false"
              class="rotate-icon ma-3"
              v-if="status === 'error'"
            >
              <span v-if="isLoggedIn">
                The link you clicked on has expired or you have already verified
                your email. Go to my
                <router-link
                  style="color: white; text-decoration: underline;"
                  to="/my-account/profile"
                  :data-cy="$_generateAttrID('linkToProfile')"
                  >profile</router-link
                >
                to check.
              </span>
              <span v-else>
                The link you clicked on has expired or you have already verified
                your email.
                <router-link
                  to="/login"
                  style="color: white; text-decoration: underline;"
                  >Logon</router-link
                >
                and go to my profile to check.
              </span>
            </v-alert>
          </v-flex>
        </v-layout>
        <b-page-title under-dash="yellow">Account Verification</b-page-title>
        <v-layout wrap v-if="status === 'success'" class="mt-3">
          <v-flex
            class="col-sm-auto-important"
            :class="{ 'pr-5': $vuetify.breakpoint.smAndUp }"
          >
            <b-button
              to="/my-account/dashboard"
              class="ma-3"
              color="primary"
              type="submit"
              dark
              style="min-width: 200px"
            >
              Dashboard
            </b-button>
          </v-flex>
          <v-flex class="col-sm-auto-important">
            <b-button
              to="/my-account/mortgage-search"
              class="ma-3"
              color="primary"
              type="submit"
              dark
              style="min-width: 200px"
            >
              Compare mortgages
            </b-button>
          </v-flex>
        </v-layout>
        <div class="app-spinner" v-if="status === 'loading'">
          <div>
            <CircleLoader
              :color="$vuetify.theme.primary"
              class="mx-auto"
            ></CircleLoader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./EmailAccountConfirmed.js"></script>

<style scoped lang="scss" src="./EmailAccountConfirmed.scss"></style>
