<template>
  <div class="signup-default-component">
    <div class="app-page__inner">
      <b-card-screen
        class="app-page__content--padding app-page--margin-y top-left-radius"
      >
        <SignupPersonal
          :registration="registration"
          @change="$emit('change')"
          @showSpinner="showSpinner = true"
          @hideSpinner="showSpinner = false"
          @initialized="$emit('initialized')"
          ref="personalStep"
          @stepTo="oneShotRegister"
          :showSpinner="showSpinner"
        ></SignupPersonal>
      </b-card-screen>
    </div>
  </div>
</template>

<script src="./SignupDefault.js"></script>
<style scoped lang="scss" src="./SignupDefault.scss"></style>
