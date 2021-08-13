<template>
  <v-row class="justify-center">
    <v-col
      lg12
      xs12
      class="white-dashboard round-container left-radius mt-120 app--shadow"
    >
      <v-card class="elevation-0 text-xs-left">
        <v-alert
          color="info"
          icon="mdi-information"
          value="false"
          dismissible
          v-if="isValidInvitation"
          :class="{
            'mb-4': $vuetify.breakpoint.smAndUp,
            'mb-2 mt-2': $vuetify.breakpoint.xs,
            'rotate-icon': true
          }"
          >{{
            "You have invitation from " + (inviteDetails.fromFullName || "")
          }}</v-alert
        >
        <v-alert
          color="info"
          icon="mdi-information"
          value="false"
          dismissible
          v-else-if="type === 'invitation' && alreadyAcceptDone"
          :class="{
            'mb-4': $vuetify.breakpoint.smAndUp,
            'mb-2 mt-2': $vuetify.breakpoint.xs,
            'rotate-icon': true
          }"
          >{{
            "You already accepted this invitation and linked with " +
              (inviteDetails.fromFullName || "") +
              ", login to see linked Account"
          }}</v-alert
        >
        <v-alert
          color="info"
          icon="mdi-information"
          value="false"
          dismissible
          v-else-if="type === 'invitation'"
          :class="{
            'mb-4': $vuetify.breakpoint.smAndUp,
            'mb-2 mt-2': $vuetify.breakpoint.xs,
            'rotate-icon': true
          }"
          >The link you clicked on has expired</v-alert
        >
        <div class="green-pointer pb-3" align="left">
          <p id="signupAddressTitle" class="pt-3 app-page__title mb-0 ">
            Sign in
          </p>
        </div>
        <v-card-text
          :class="{
            'pt-4': $vuetify.breakpoint.smAndUp,
            'pt-0': $vuetify.breakpoint.xs,
            'px-0': true
          }"
        >
          <v-form ref="form">
            <v-alert
              color="warning"
              icon="mdi-information"
              value="false"
              dismissible
              v-model="showErrorAlert"
              :class="{
                'mb-4': $vuetify.breakpoint.smAndUp,
                'mb-2 mt-2': $vuetify.breakpoint.xs,
                'rotate-icon': true,
                'app-shake': isErrorActive
              }"
              >{{ errorString }}</v-alert
            >
            <b-row
              :class="{
                'pt-4 pb-2': $vuetify.breakpoint.smAndUp,
                'pt-2': $vuetify.breakpoint.xs
              }"
            >
              <b-col col-12 col-sm-6 class="mb-2">
                <b-text-field
                  name="email"
                  id="email"
                  :data-cy="$_generateAttrID('email.input')"
                  label="Email"
                  type="text"
                  v-model="user.email"
                  :autofocus="true"
                  :rules="emailRules"
                  @input="onEmailChange"
                  @change="onEmailChange"
                  :class="{ 'pr-0': $vuetify.breakpoint.xs }"
                  required
                  event-category="loginForm"
                ></b-text-field>
              </b-col>
              <b-col col-12 col-sm-6 class="mb-2">
                <b-text-field
                  name="password"
                  label="Password"
                  id="password"
                  :data-cy="$_generateAttrID('password.input')"
                  v-model="user.password"
                  v-bind="$attrs"
                  v-on="$listeners"
                  :append-icon="visible ? 'visibility_off' : 'visibility'"
                  @click:append="() => (visible = !visible)"
                  :type="visible ? 'text' : 'password'"
                  :rules="[v => !!v || 'Password is required']"
                  class="pr-0"
                  required
                  event-category="loginForm"
                ></b-text-field>
              </b-col>
            </b-row>
          </v-form>
          <v-row align-center justify-space-between wrap class="pr-4 ma-0">
            <div class="d-block text-xs-center body-1 text-h10" align="center">
              <router-link to="forgot-password" class="my-2"
                >Forgot password?</router-link
              >
            </div>
          </v-row>
        </v-card-text>

        <v-row class="justify-space-between ma-0">
          <v-card-actions class="pa-0">
            <b-button color="primary" :to="{ name: 'signup' }"
              >Sign up</b-button
            >
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-actions class="pr-0">
            <b-button
              color="primary"
              name="login"
              id="login"
              @click="login"
              :loading="processing === 'login'"
              >{{ isValidInvitation ? "Login to accept" : "Login" }}</b-button
            >
            <!--<p class="ml-2">100% secure and FCA Authorised</p>-->
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script src="./Login.js"></script>
<style scoped lang="scss"></style>
