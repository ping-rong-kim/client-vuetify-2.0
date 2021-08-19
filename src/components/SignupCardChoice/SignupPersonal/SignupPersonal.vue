<template>
  <div>
    <v-row class="align-center justify-center column ma-0" v-if="!hashError">
      <v-card class="elevation-0 text-left">
        <!--        <div class="app-under-dash&#45;&#45;green">-->
        <h2
          class="app-page__title app-under-dash--green app-under-dash--start mt-2"
        >
          Account creation
        </h2>
        <!--        </div>-->
        <p>
          {{ subTitle }}
        </p>
        <v-card-text
          :class="{ 'pt-0 pb-0': $vuetify.breakpoint.xs, 'px-0': true }"
        >
          <v-form ref="personalDetailsForm" v-model="valid">
            <!-- rules="[rules.required, rules.min]" -->
            <v-alert
              color="warning"
              icon="mdi-information"
              :value="false"
              dismissible
              :style="{ 'margin-bottom: 40px': $vuetify.breakpoint.smAndUp }"
              :class="{
                'mb-4': $vuetify.breakpoint.smAndUp,
                'mb-2 mt-3': $vuetify.breakpoint.xs,
                'rotate-icon': true
              }"
              v-if="errorString"
              >{{ errorString }} Please
              <router-link
                to="/login"
                style="color: white; text-decoration: underline;"
                >Sign in
              </router-link>
            </v-alert>
            <b-row class="pt-2 pb-2">
              <b-col col-12 col-sm-6 class="mb-2">
                <b-text-field
                  name="fullname"
                  type="text"
                  label="Full name"
                  v-model="personalDetails.fullname"
                  id="user-fullname-input"
                  data-cy="user-fullname-input"
                  @change="onFullNameChange"
                  :rules="fullnameRules"
                  required
                  data-lpignore="true"
                  event-category="SignupPersonalDetailsForm"
                ></b-text-field>
              </b-col>
              <b-col col-12 col-sm-6 v-if="askBirthday" class="mb-2">
                <AppDatePicker
                  prepend-icon="event"
                  :show-current="false"
                  :input-year="startYearOfBirthday"
                  v-model="personalDetails.dateOfBirth"
                  id="user-birthday-dropdown"
                  data-cy="user-birthday-dropdown"
                  label="Date of birth"
                  :rules="birthdayRules"
                  :min="minDateOfBirthday"
                  :max="maxDateOfBirthday"
                ></AppDatePicker>
              </b-col>
              <b-col col-12 col-sm-6 class="mb-2">
                <b-text-field
                  v-if="!$route.params.email || errorString"
                  name="email"
                  label="Email address"
                  type="text"
                  v-model="personalDetails.email"
                  id="user-email-input"
                  data-cy="user-email-input"
                  data-lpignore="true"
                  @change="
                    onChange($event);
                    requireCheckEmail = true;
                  "
                  :rules="emailRules"
                  required
                  event-category="SignupPersonalDetailsForm"
                ></b-text-field>
              </b-col>
              <b-col col-12 col-sm-6 class="mb-2">
                <b-text-field
                  name="password"
                  label="Password"
                  v-model="personalDetails.password"
                  id="user-password-input"
                  data-cy="user-password-input"
                  @change="onChange($event)"
                  hint="12-32 characters long with at least one uppercase, lowercase, number and special character"
                  v-bind="$attrs"
                  v-on="$listeners"
                  :append-icon="visible ? 'visibility_off' : 'visibility'"
                  @click:append="() => (visible = !visible)"
                  :type="visible ? 'text' : 'password'"
                  autocomplete="new-password"
                  :rules="passwordRules"
                  :counter="32"
                  required
                  data-lpignore="true"
                  event-category="SignupPersonalDetailsForm"
                ></b-text-field>
              </b-col>
              <!--<p>We never share your data with third parties without your permission.</p>-->
              <b-col col-12>
                <p class="mt-4 mb-1 text-sm-center caption">
                  By clicking 'Continue', you are agreeing to our
                  <br v-if="$vuetify.breakpoint.smAndDown" />
                  <a href="/terms-and-conditions" target="_blank"
                    >Terms and Conditions</a
                  >
                  and
                  <a href="/privacy-policy" target="_blank"
                    >Privacy and Cookie Policy</a
                  >.
                </p>
              </b-col>
            </b-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
    <b-row v-if="!hashError" class="pb-3">
      <v-spacer></v-spacer>
      <b-col>
        <b-button
          :class="{ 'px-1': $vuetify.breakpoint.xsOnly }"
          color="primary"
          dark
          @click="trySaveAndNext"
          data-cy="continue-personal-details-step"
          :loading="showSpinner"
          >Signup
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script src="./SignUpPersonal.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./SignUpPersonal.scss"></style>
