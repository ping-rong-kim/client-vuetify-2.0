<template>
  <div class="app-change-password">
    <header>
      <b-section-title>Change password</b-section-title>
    </header>
    <div class="change-password__content mb-3">
      <v-form ref="changePasswordForm">
        <b-row>
          <b-col col-12 col-sm-6>
            <b-text-field
              label="Current password"
              v-model="currentPassword"
              :loading="isCheckingCurrentPassword"
              @blur="checkCurrentPasswordCorrect"
              :rules="currentPasswordRules"
              validate-on-blur
              @input="isCurrentPasswordCorrect = false"
              :append-icon="
                currentPasswordVisible ? 'visibility_off' : 'visibility'
              "
              @click:append="
                () => (currentPasswordVisible = !currentPasswordVisible)
              "
              :type="
                currentPasswordVisible && !isCurrentPasswordCorrect
                  ? 'text'
                  : 'password'
              "
              ref="currentPassword"
            >
              <template v-if="isCurrentPasswordCorrect" v-slot:append>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" color="primary">mdi-check</v-icon>
                  </template>
                  Current password has been verified
                </v-tooltip>
              </template>
            </b-text-field>
          </b-col>
        </b-row>
        <b-row v-if="isCurrentPasswordCorrect">
          <b-col col-12 col-sm-6>
            <b-text-field
              label="New password"
              v-model="newPassword"
              :rules="newPasswordRules"
              :append-icon="
                newPasswordVisible ? 'visibility_off' : 'visibility'
              "
              @click:append="() => (newPasswordVisible = !newPasswordVisible)"
              :type="newPasswordVisible ? 'text' : 'password'"
            ></b-text-field>
          </b-col>
          <b-col col-12 col-sm-6>
            <b-text-field
              label="Confirm password"
              v-model="rePassword"
              :rules="confirmPasswordRules"
              :append-icon="rePasswordVisible ? 'visibility_off' : 'visibility'"
              @click:append="() => (rePasswordVisible = !rePasswordVisible)"
              :type="rePasswordVisible ? 'text' : 'password'"
            ></b-text-field>
          </b-col>
        </b-row>
      </v-form>
    </div>
    <footer>
      <b-button
        color="primary"
        v-if="isCurrentPasswordCorrect || true"
        @click="trySavePassword"
        :loading="isSaving"
        >{{
          isCurrentPasswordCorrect ? "Save password" : "Change password"
        }}</b-button
      >
    </footer>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import PasswordMicrodata from "@/microdata/PasswordMicrodata";

export default {
  name: "AppChangePassword",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      rePassword: "",
      isCurrentPasswordCorrect: false,
      checkedCurrentPassword: false,
      isCheckingCurrentPassword: false,
      errorMessages: [],
      newPasswordRules: PasswordMicrodata.rules,
      checkedHash: null,
      isSaving: false,
      isPasswordChanged: false,
      currentPasswordVisible: false,
      newPasswordVisible: false,
      rePasswordVisible: false
    };
  },
  computed: {
    currentPasswordRules() {
      if (!this.checkedCurrentPassword || this.isCurrentPasswordCorrect) {
        return [];
      } else {
        return [v => "Current password is not correct"];
      }
    },
    confirmPasswordRules() {
      if (this.newPassword) {
        return [v => v === this.newPassword || "Password does not match"];
      } else {
        return PasswordMicrodata.rules.concat([
          v => v === this.newPassword || "Password does not match"
        ]);
      }
    }
  },
  methods: {
    async checkCurrentPasswordCorrect() {
      this.isCheckingCurrentPassword = true;
      this.isCurrentPasswordCorrect = await AuthService.checkPasswordCorrect(
        this.currentPassword
      )
        .then(res => {
          this.checkedHash = res.hash;
          return true;
        })
        .catch(error => false);
      this.isCheckingCurrentPassword = false;
      if (this.isCurrentPasswordCorrect) {
        this.errorMessages = [];
      } else {
        this.errorMessages = ["Current password is not correct"];
      }
      this.checkedCurrentPassword = true;
    },
    async trySavePassword() {
      if (
        this.$refs.changePasswordForm.validate() &&
        this.isCurrentPasswordCorrect
      ) {
        const isChanged = await this.savePassword();
        if (isChanged) {
          this.isCurrentPasswordCorrect = false;
          this.checkedCurrentPassword = false;
          this.currentPassword = "";
          this.newPassword = "";
          this.rePassword = "";
        }
      }
    },
    async savePassword() {
      this.isSaving = true;
      this.isPasswordChanged = await AuthService.changePassword(
        this.newPassword,
        this.checkedHash
      )
        .then(res => true)
        .catch(error => false);
      if (this.isPasswordChanged) {
        this.$store.dispatch("setAlert", "Password has been saved");
      }
      this.isSaving = false;
      return this.isPasswordChanged;
    }
  }
};
</script>

<style scoped lang="scss"></style>
