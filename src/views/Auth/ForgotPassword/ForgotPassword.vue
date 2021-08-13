<template>
  <v-row class="justify-center ma-0">
    <v-col
      lg-8
      xs-11
      class="white-dashboard round-container left-radius mt-120 app--shadow"
    >
      <v-card class="elevation-0 text-xs-left">
        <div class="green-pointer pb-2" align="start">
          <p
            id="signupAddressTitle"
            class="pt-3 app-page__title mb-0 text-xs-left"
          >
            Forgot password
          </p>
        </div>
        <v-card-text class="px-0 pt-2">
          <v-form ref="form">
            <v-alert
              color="warning"
              align="left"
              icon="mdi-information"
              dismissible
              value="false"
              v-if="errorMessage"
              >{{ errorMessage }}
            </v-alert>
            <v-alert
              color="primary"
              align="left"
              icon="mdi-check-circle"
              dismissible
              value="false"
              v-if="successMessage"
              >An email has been sent to {{ email }} with further instructions.
            </v-alert>
            <b-text-field
              class="pt-5"
              name="email"
              id="email"
              label="Email"
              type="email"
              :class="{
                'pr-0': true
              }"
              v-model="email"
              :data-cy="$_generateAttrID('email')"
              :rules="emailRules"
              @input="errorMessage = false"
              required
              event-category="forgotPasswordForm"
            ></b-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="px-0">
          <router-link :to="{ name: 'login' }">Back to login</router-link>
          <v-spacer></v-spacer>
          <b-button
            color="primary"
            @click="sendEmailIfValid"
            v-if="!successMessage"
            >Send</b-button
          >
        </v-card-actions>
        <div class="app-spinner" v-if="showSpinner">
          <CircleLoader :color="$vuetify.theme.primary" />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script src="./ForgotPassword.js"></script>
<style scoped lang="scss" src="./ForgotPassword.scss"></style>
