<template>
  <div class="profile-page">
    <div class="app-page__inner">
      <div
        class="
          background-white app--round app--shadow app-page--margin-top mb-3 pb-3
        "
        :class="{
          'px-4': $vuetify.breakpoint.smAndUp,
          'px-1': $vuetify.breakpoint.xsOnly
        }"
      >
        <div class="page__main">
          <div
            class="page__header"
            :class="{
              'mx-3-minus': $vuetify.breakpoint.smAndUp,
              'mx-1-minus': $vuetify.breakpoint.xsOnly,
              'mb-1': $vuetify.breakpoint.xsOnly
            }"
          >
            <v-tabs
              class="app-tabs"
              color="#1f1d1d"
              background-color="#efeff7"
              fixed-tabs
              hide-slider
              height="60px"
              show-arrows
            >
              <b-tab
                class="tab__item"
                :class="{ 'tab__item--active': tab === 'profile' }"
                @click="navTab('profile')"
                :data-cy="$_generateAttrID('tabProfile')"
              >
                <div class="tab__name">
                  Profile
                </div>
              </b-tab>
            </v-tabs>
          </div>
          <div class="page__content">
            <v-container
              fluid
              grid-list-sm
              class="text-left"
              :class="{
                'pa-3': $vuetify.breakpoint.smAndUp,
                'pa-1': $vuetify.breakpoint.xs
              }"
            >
              <AppAlert
                color="primary"
                icon="mdi-check-circle"
                v-model="savedMessage"
                >{{ savedMessage }}</AppAlert
              >
              <div class="email-verify-section mb-3" v-if="!emailVerified">
                <template v-if="emailVerified">
                  <v-alert
                    v-if="false"
                    color="primary"
                    align="left"
                    icon="mdi-check-circle"
                    dismissible
                    :value="false"
                  >
                    Your email has been verified
                  </v-alert>
                </template>
                <v-alert
                  v-else-if="emailVerifyProcessing === 'sent'"
                  color="primary"
                  align="left"
                  icon="mdi-check-circle"
                  dismissible
                  :value="false"
                >
                  Verification email sent
                </v-alert>
                <v-alert
                  v-else-if="isEmailUpdated"
                  color="warning"
                  align="left"
                  icon="mdi-information"
                  :value="false"
                >
                  <div>
                    <span v-if="emailVerifyProcessing !== 'error'"
                      >Email address updated. A verification email has been sent
                      to {{ registration.personalDetails.email }}.</span
                    >
                    <span v-else>Something went wrong</span>
                    &nbsp;&nbsp;&nbsp;
                    <a
                      v-if="emailVerifyProcessing !== 'loading'"
                      href="javascript:;"
                      style="color: white; text-decoration: underline; vertical-align: middle;"
                      @click="verifyEmail"
                      >Send again</a
                    >
                    <v-progress-circular
                      v-if="emailVerifyProcessing === 'loading'"
                      indeterminate
                      color="white"
                      :size="20"
                      :width="2"
                    ></v-progress-circular>
                  </div>
                </v-alert>
                <v-alert
                  v-else
                  color="warning"
                  align="left"
                  icon="mdi-information"
                  :value="false"
                >
                  <div>
                    <span v-if="emailVerifyProcessing !== 'error'"
                      >A verification email has been sent to
                      {{ registration.personalDetails.email }}.</span
                    >
                    <span v-else>Something went wrong</span>
                    &nbsp;&nbsp;&nbsp;
                    <a
                      v-if="emailVerifyProcessing !== 'loading'"
                      href="javascript:;"
                      style="color: white; text-decoration: underline; vertical-align: middle;"
                      @click="verifyEmail"
                      >Send again</a
                    >
                    <v-progress-circular
                      v-if="emailVerifyProcessing === 'loading'"
                      indeterminate
                      color="white"
                      :size="20"
                      :width="2"
                    ></v-progress-circular>
                  </div>
                </v-alert>
              </div>
              <MyProfile
                v-if="tab === 'profile'"
                @afterSave="afterProfileSave"
                @change="onChange"
                @emailUpdated="onEmailUpdated"
              ></MyProfile>
            </v-container>
            <v-container
              v-if="tab === 'profile'"
              fluid
              grid-list-sm
              class="text-left"
              :class="{
                'pa-3': $vuetify.breakpoint.smAndUp,
                'pa-1': $vuetify.breakpoint.xs
              }"
            >
              <v-row wrap>
                <!-- Contact Preferences -->
                <v-col
                  xs12
                  :class="{
                    'pr-4 mt-3': $vuetify.breakpoint.smAndUp,
                    'pr-0 mt-1': $vuetify.breakpoint.xs
                  }"
                >
                  <b-section-title>
                    Account removal
                  </b-section-title>
                  <b-button color="error" @click="confirmDelete"
                    >Delete account
                  </b-button>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Profile.js"></script>
<style scoped src="./Profile.scss" lang="scss"></style>
