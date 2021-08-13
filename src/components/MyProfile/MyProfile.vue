<template>
  <div class="my-profile-component">
    <v-form ref="profileForm" v-model="valid">
      <b-page-title>My profile</b-page-title>
      <b-row>
        <b-col
          col-12
          col-sm-6
          :class="{
            'mt-4': $vuetify.breakpoint.smAndUp,
            'mt-1': $vuetify.breakpoint.xs
          }"
        >
          <b-text-field
            label="Full name"
            type="text"
            :rules="fullNameRules"
            :class="{
              'pr-0': $vuetify.breakpoint.xs
            }"
            v-model="registration.personalDetails.fullname"
            :id="$_generateAttrID('fullname-input')"
            :data-cy="$_generateAttrID('fullname-input')"
            @change="onFullNameChange"
            v-on:blur="
              $ga.event(
                'ProfileForm',
                'Fill',
                'FullNameField',
                registration.personalDetails.fullname
              )
            "
            required
          ></b-text-field>
        </b-col>
        <b-col
          col-12
          col-sm-6
          :class="{
            'mt-4': $vuetify.breakpoint.smAndUp,
            'mt-1': $vuetify.breakpoint.xs
          }"
        >
          <b-text-field
            label="Email address"
            type="text"
            v-model="registration.personalDetails.email"
            :id="$_generateAttrID('email-input')"
            :data-cy="$_generateAttrID('email-input')"
            :rules="emailRules"
            :class="{
              'pr-0': $vuetify.breakpoint.xs
            }"
            required
            @input="onEmailInput"
          >
            <template v-if="emailVerified" v-slot:append>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="primary">mdi-check</v-icon>
                </template>
                Email has been verified
              </v-tooltip>
            </template>
            <template v-else v-slot:append>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                Email has not been verified yet
              </v-tooltip>
            </template>
          </b-text-field>
        </b-col>
        <b-col
          col-12
          col-sm-6
          :class="{
            'mt-4': $vuetify.breakpoint.smAndUp,
            'mt-1': $vuetify.breakpoint.xs
          }"
        >
          <b-text-field
            label="Contact number"
            type="text"
            :rules="contactRules"
            v-model="registration.personalDetails.phone"
            :id="$_generateAttrID('phone-input')"
            :data-cy="$_generateAttrID('phone.input')"
            :class="{
              'pr-0': $vuetify.breakpoint.xs
            }"
            v-on:blur="
              $ga.event(
                'ProfileForm',
                'Fill',
                'ContactNumberField',
                registration.personalDetails.phone
              )
            "
          />
        </b-col>
        <b-col
          col-12
          col-sm-6
          :class="{
            'mt-4': $vuetify.breakpoint.smAndUp,
            'mt-1': $vuetify.breakpoint.xs
          }"
        >
          <b-text-field
            v-if="hasBirthday"
            label="Date of birth"
            type="text"
            v-model="registration.personalDetails.dateOfBirth"
            :id="$_generateAttrID('dateOfBirth.input')"
            :data-cy="$_generateAttrID('dateOfBirth.input')"
            :class="{
              'pr-0': $vuetify.breakpoint.xs
            }"
            required
            readonly
            disabled
          ></b-text-field>
          <AppDatePicker
            v-else
            prepend-icon="event"
            :show-current="false"
            :input-year="startYearOfBirthday"
            label="Date of birth"
            v-model="registration.personalDetails.dateOfBirth"
            :id="$_generateAttrID('dateOfBirth.picker')"
            :data-cy="$_generateAttrID('dateOfBirth.picker')"
            :class="{
              'pr-0': $vuetify.breakpoint.xs
            }"
          ></AppDatePicker>
        </b-col>
      </b-row>
      <section class="contact-preference mb-3">
        <!-- Contact Preferences -->
        <header>
          <AppSectionTitle>Contact preferences</AppSectionTitle>
          <div class="text-xs-left subheading font-weight-bold pt-3">
            Please untick the box if you no longer want to receive the emails
          </div>
        </header>
        <div class="app-row col-space-0">
          <!-- Row -->
          <div class="app-col-12 app-col-sm-5 app-col-md-4">
            <v-checkbox
              color="quaternary"
              hide-details
              v-model="registration.personalDetails.monthlyNewsletter"
              :id="$_generateAttrID('monthlyNewsletter.checkbox')"
              :data-cy="$_generateAttrID('monthlyNewsletter.checkbox')"
              :ripple="false"
              label="Monthly newsletter"
            ></v-checkbox>
          </div>
          <div class="app-col-12 app-col-md-8 app-col-sm-7">
            <v-checkbox
              style="align-items: flex-start"
              color="quaternary"
              hide-details
              v-model="registration.personalDetails.paccountNewsletter"
              :id="$_generateAttrID('paccountNewsletter.checkbox')"
              :data-cy="$_generateAttrID('paccountNewsletter.checkbox')"
              :ripple="false"
              label="Account (this cannot be opted out of)"
              readonly
            ></v-checkbox>
          </div>
          <div class="app-col-12 app-col-md-4 app-col-sm-5">
            <v-checkbox
              color="quaternary"
              hide-details
              v-model="registration.personalDetails.tipsNewsletter"
              :id="$_generateAttrID('tipsNewsletter.checkbox')"
              :data-cy="$_generateAttrID('tipsNewsletter.checkbox')"
              :ripple="false"
              label="Tips"
            ></v-checkbox>
          </div>
        </div>
      </section>
      <b-row>
        <b-col class="ml-auto">
          <b-button
            color="primary"
            @click="trySave"
            :loading="isSaving"
            :disabled="!valid"
            >Save
          </b-button>
        </b-col>
      </b-row>
      <section class="change-password__container">
        <AppChangePassword></AppChangePassword>
        <v-divider class="mt-4"></v-divider>
      </section>
    </v-form>
  </div>
</template>

<script src="./MyProfile.js"></script>

<style scoped>
.v-input--checkbox >>> .v-input__control .v-input__slot {
  align-items: flex-start;
}
</style>
