<template>
  <v-footer class="app__footer textBlack--text" height="auto" color="white">
    <v-container bg fill-height grid-list-md text-xs-center class="pa-3">
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 row align-center justify-center>
          <b-row class="justify-center">
            <b-col max-width="100%">
              <section class="terms__section mb-3">
                <b-row class="justify-center align-center" col-space="16">
                  <b-col>
                    <div class="text-sm-right footer-logo-container">
                      <img
                        class="footer-logo"
                        :src="$_env.VUE_APP_WHITE_LABEL_LOGO_IMAGE"
                      />
                    </div>
                  </b-col>
                  <b-col style="max-width: 100%;">
                    <div
                      class="text-sm-left text-xs-left footer-description pt-1"
                    >
                      <p class="mb-0 terms">
                        Copyright&nbsp;&copy;&nbsp;{{
                          new Date().getFullYear()
                        }}&nbsp;{{ $_env.VUE_APP_WHITE_LABEL_SITE_NAME }}, all
                        rights reserved.
                      </p>
                      <div class="pt-1 terms pl-0 pr-0">
                        <b-row
                          :col-space="$vuetify.breakpoint.xs ? 20 : 30"
                          :class="{ 'justify-center': $vuetify.breakpoint.xs }"
                        >
                          <b-col>
                            <router-link to="/terms-and-conditions">
                              Terms
                              <span v-if="$vuetify.breakpoint.mdAndUp"
                                >and Conditions</span
                              >
                            </router-link>
                          </b-col>
                          <b-col>
                            <router-link to="/privacy-policy">
                              Privacy&nbsp;<span
                                v-if="$vuetify.breakpoint.mdAndUp"
                                >and&nbsp;Cookie&nbsp;</span
                              >Policy
                            </router-link>
                          </b-col>
                          <b-col>
                            <a
                              :href="$_env.VUE_APP_WHITE_LABEL_HELPER_CENTER"
                              target="_blank"
                            >
                              Help Center
                            </a>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </section>
              <section
                class="social__section"
                v-if="
                  $_env.VUE_APP_WHITE_LABEL_SOCIAL_FACEBOOK ||
                    $_env.VUE_APP_WHITE_LABEL_SOCIAL_LINKEDIN
                "
              >
                <b-row
                  class="align-center"
                  col-space="16"
                  :class="{ 'justify-center': $vuetify.breakpoint.width < 463 }"
                >
                  <b-col>
                    <div class="social__label">Social</div>
                  </b-col>
                  <b-col>
                    <div class="social__list">
                      <b-row>
                        <b-col v-if="$_env.VUE_APP_WHITE_LABEL_SOCIAL_FACEBOOK">
                          <b-link
                            class="social__link"
                            :href="$_env.VUE_APP_WHITE_LABEL_SOCIAL_FACEBOOK"
                            target="_blank"
                            :underline="false"
                            >Facebook</b-link
                          >
                        </b-col>
                        <b-col v-if="$_env.VUE_APP_WHITE_LABEL_SOCIAL_LINKEDIN">
                          <b-link
                            class="social__link"
                            :href="$_env.VUE_APP_WHITE_LABEL_SOCIAL_LINKEDIN"
                            target="_blank"
                            :underline="false"
                            >Linkedin</b-link
                          >
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
              </section>
            </b-col>
          </b-row>
        </v-flex>
        <v-flex
          xs12
          sm12
          class="footer-caption mt-3"
          :class="{ 'text-left': $vuetify.breakpoint.xs }"
        >
          <p class="mb-0">
            {{ $_env.VUE_APP_WHITE_LABEL_SITE_NAME }} is a trading name of
            {{ envVar.companyName }}, registered in England and Wales with
            company number {{ envVar.companyNumber }}. <br />Registered Office:
            {{ envVar.registeredAddress }}.<br />
            {{ envVar.companyRegulated }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
    <cookie-law theme="dark-lime">
      <div slot="message">
        <b>{{ $_env.VUE_APP_WHITE_LABEL_BRAND_DOMAIN }}</b> uses cookies to
        deliver our services. By using the website you agree with our use of
        cookies. Learn more here -
        <router-link to="/privacy-policy" target="_blank"
          >Privacy&nbsp;and&nbsp;Cookies&nbsp;Policy</router-link
        >
      </div>
    </cookie-law>
  </v-footer>
</template>

<script>
import CookieLaw from "vue-cookie-law";
import AppEnv from "@/AppEnv";
export default {
  data() {
    return {
      env: AppEnv
    };
  },
  components: { CookieLaw },
  mounted() {}
};
</script>
<style scoped lang="scss">
.app__footer {
  .terms__section {
  }
  .social__section {
    font-size: 14px;
    .social__label {
      width: 106px;
      padding-right: 15px;
      border-right: 1.5px solid var(--v-primary-base);
      text-align: right;
    }
    .social__link {
      text-align: left;
      display: block;
      width: 153px;
      text-decoration: none;
    }
    @media all and (max-width: 959px) {
      .social__link {
        width: auto;
      }
    }
    @media all and (max-width: 900px) {
      .social__label {
        width: 101px;
      }
    }
    @media all and (max-width: 462px) {
      .social__label {
        width: auto;
      }
    }
  }
}
.v-footer {
  align-items: center;
  display: flex;
  flex: 0 1 auto !important;
  min-height: 36px;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.footer-logo {
  height: 20px;
  padding-top: 2px;
  @media only screen and( max-width: 900px) {
    height: 18px;
  }
}

.footer-logo-container {
  border-left: 1.5px solid transparent;
  border-right: 1.5px solid var(--v-primary-base);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 15px;
  @media only screen and( max-width: 900px) {
    padding: 5px;
    padding-right: 15px;
  }
  @media all and (max-width: 462px) {
    border-right-color: transparent;
  }
}

.footer-description {
  .terms {
    font-size: 14px;
    @media only screen and( max-width: 600px) {
      font-size: 14px;
    }
  }
}

.footer-caption {
  font-size: 12px;
  /*font-weight: 500;*/
  @media only screen and( max-width: 600px) {
    padding: 5px;
    font-size: 12px;
  }
}
</style>
<style lang="scss">
.app__footer {
  .Cookie {
    @media all and (max-width: 600px) {
      padding: 5px;
      .Cookie__content {
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .Cookie__buttons {
        margin: 0px;
      }
    }
  }
}
</style>
