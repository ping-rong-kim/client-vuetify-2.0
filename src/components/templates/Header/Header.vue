<template>
  <header class="app__header">
    <div class="mobileNav" v-if="$vuetify.breakpoint.smAndDown">
      <v-app-bar
        fixed
        id="core-toolbar"
        class="app-mobile-toolbar app--shadow-important"
        v-bind:class="headerClasses"
        style="background: transparent;"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title class="mt-0 pr-2 ml-0">
          <router-link
            to="/"
            class="toolbar-title"
            style="display: block; line-height: 0;"
          >
            <img
              :src="$_env.VUE_APP_WHITE_LABEL_LOGO_IMAGE"
              style="height:20px;"
            />
          </router-link>
        </v-app-bar-title>
        <v-spacer />
        <v-toolbar-items v-if="isLoggedIn">
          <div style="margin-top: 20px;" v-if="unReadNotifications.length">
            <v-col class="pa-0">
              <AppNotifications></AppNotifications>
            </v-col>
          </div>
          <div style="margin-top: 15px;" v-else>
            <v-col class="pa-0">
              <AppNotifications></AppNotifications>
            </v-col>
          </div>
          <span style="margin-top:10px">
            <b-button
              v-if="isLoggedIn"
              :id="$_generateAttrID('profileNav')"
              :data-cy="$_generateAttrID('profileNav')"
              to="/my-account/profile"
              class="my-0 mx-2"
              event-category="Navigation"
              event-label="profileIconBtn"
              icon
              text
              small
            >
              <img
                class="footer-logo"
                src="/img/icons/Group.svg"
                width="30px"
              />
              <!-- <v-icon class="ma-0 pa-0">person</v-icon> -->
            </b-button>
          </span>
        </v-toolbar-items>
        <v-toolbar-items v-else>
          <span style="margin-top:10px;margin-right:20px;" v-if="!isLoggedIn">
            <b-button
              normal
              style="padding-top:5px;padding-bottom:5px;"
              v-if="!isLoggedIn"
              @click="trySignup"
              color="primary"
              :id="$_generateAttrID('signupNav')"
              :data-cy="$_generateAttrID('signupNav')"
              >Sign up</b-button
            >
          </span>
          <span style="margin-top:10px;" v-if="!isLoggedIn">
            <b-button
              normal
              style="padding-top:5px;padding-bottom:5px;"
              v-if="!isLoggedIn"
              to="/login"
              outlined
              event-category="Navigation"
              :id="$_generateAttrID('loginNav')"
              :data-cy="$_generateAttrID('loginNav')"
              >Login</b-button
            >
          </span>
        </v-toolbar-items>
      </v-app-bar>
      <v-navigation-drawer
        id="mobileNav"
        fixed
        v-model="drawer"
        app
        light
        class="primary"
        :width="205"
        v-if="$vuetify.breakpoint.smAndDown"
      >
        <v-list dense light color="primary" flat>
          <v-list-item
            to="/"
            @click="$ga.event('Navgation', 'Click', 'HomeBtn')"
          >
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :id="$_generateAttrID('aboutNav')"
            :data-cy="$_generateAttrID('aboutNav')"
            to="/about"
            v-if="!isLoggedIn || !isInMyAccount"
          >
            <v-list-item-action>
              <v-icon>supervisor_account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>About us</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <template v-if="isLoggedIn">
            <v-list-item
              :id="$_generateAttrID('dashboardNav')"
              :data-cy="$_generateAttrID('dashboardNav')"
              to="/my-account/dashboard"
              @click="$ga.event('Navgation', 'Click', 'DashboardBtn')"
            >
              <!-- @click="$ga.event('Navgation', 'Click', 'DashboardBtn')" -->
              <v-list-item-action>
                <div class="dash-icon"></div>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            :id="$_generateAttrID('signupNav')"
            :data-cy="$_generateAttrID('signupNav')"
            v-if="!isLoggedIn"
            @click="
              trySignup();
              $ga.event('Navgation', 'Click', 'SignupBtn');
            "
          >
            <v-list-item-action>
              <v-icon>meeting_room</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :id="$_generateAttrID('loginNav')"
            :data-cy="$_generateAttrID('loginNav')"
            to="/login"
            v-if="!isLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'LoginBtn')"
          >
            <v-list-item-action>
              <v-icon>power_settings_new</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :id="$_generateAttrID('profileNav')"
            :data-cy="$_generateAttrID('profileNav')"
            to="/my-account/profile"
            v-if="isLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'ProfileBtn')"
          >
            <v-list-item-action>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>My profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :id="$_generateAttrID('logoutNav')"
            :data-cy="$_generateAttrID('logoutNav')"
            @click="logout"
            v-app-ga="{ category: 'Navigation', label: 'MobileLogout' }"
            v-if="isLoggedIn"
          >
            <v-list-item-action>
              <v-icon>cancel_presentation</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <div class="desktopNav" v-else>
      <v-app-bar
        fixed
        style="color:black;"
        v-bind:class="headerClasses"
        id="desktopNav2"
        class="app--shadow-important"
      >
        <v-app-bar-title class="mt-0 pr-4">
          <router-link to="/" class="toolbar-title">
            <img
              :src="$_env.VUE_APP_WHITE_LABEL_LOGO_IMAGE"
              style="height:32px; padding-top:12px;"
            />
          </router-link>
        </v-app-bar-title>

        <v-toolbar-items
          id="desktopNav"
          class="hidden-sm-and-down ml-4 pl-4 main-navs with-green-pointer"
        >
          <b-button
            text
            :id="$_generateAttrID('aboutNav')"
            :data-cy="$_generateAttrID('aboutNav')"
            to="/about"
            normal
            class="pl-0"
            v-if="!isLoggedIn || !isInMyAccount"
          >
            <v-icon size="22" class="mr-1">supervisor_account</v-icon>About us
          </b-button>
          <template v-if="isLoggedIn">
            <b-button
              to="/my-account/dashboard"
              class="nav-desktop-dash pl-3"
              :id="$_generateAttrID('dashboardNav')"
              :data-cy="$_generateAttrID('dashboardNav')"
              text
              normal
              >&nbsp;Dashboard</b-button
            >
          </template>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="isLoggedIn">
          <div style="margin-top: 25px;" v-if="unReadNotifications.length">
            <v-col class="pa-0">
              <AppNotifications></AppNotifications>
            </v-col>
          </div>
          <div style="margin-top: 20px;" v-else>
            <v-col class="pa-0">
              <AppNotifications></AppNotifications>
            </v-col>
          </div>
        </v-toolbar-items>
        <div class="hidden-sm-and-down">
          <b-button
            v-if="isLoggedIn"
            :id="$_generateAttrID('profileNav')"
            :data-cy="$_generateAttrID('profileNav')"
            to="/my-account/profile"
            class="my-0 mx-2"
            event-category="Navigation"
            event-label="profileIconBtn"
            text
            icon
            normal
          >
            <img class="footer-logo" src="/img/icons/Group.svg" width="30px" />
            <!-- <v-icon class="ma-0 pa-0">person</v-icon> -->
          </b-button>
          <span style="margin-top:15px;margin-right:20px;" v-if="!isLoggedIn">
            <b-button
              normal
              style="padding-top:5px;padding-bottom:5px;"
              v-if="!isLoggedIn"
              @click="trySignup"
              color="primary"
              :id="$_generateAttrID('signupNav')"
              :data-cy="$_generateAttrID('signupNav')"
              >Sign up</b-button
            >
          </span>
          <span style="margin-top:15px;" v-if="!isLoggedIn">
            <b-button
              normal
              style="padding-top:5px;padding-bottom:5px;"
              v-if="!isLoggedIn"
              to="/login"
              outlined
              event-category="Navigation"
              :id="$_generateAttrID('loginNav')"
              :data-cy="$_generateAttrID('loginNav')"
              >Login</b-button
            >
          </span>
          <span style="margin-top:15px;" v-if="isLoggedIn">
            <b-button
              normal
              style="padding-top:5px;padding-bottom:5px;"
              v-if="isLoggedIn"
              :id="$_generateAttrID('logoutNav')"
              :data-cy="$_generateAttrID('logoutNav')"
              event-category="Navigation"
              @click="logout"
              outlined
              :loading="logoutProgressing"
              >Log out</b-button
            >
          </span>
        </div>
      </v-app-bar>
    </div>
  </header>
</template>

<script src="./Header.js"></script>
<style lang="scss">
.app__header {
  .mobileNav {
    .app-mobile-toolbar {
      .v-toolbar__content {
        @media all and (max-width: 350px) {
          padding-left: 5px;
          padding-right: 5px;
          .v-toolbar__items {
            .v-btn:not(.v-btn--flat) {
              padding-left: 10px !important;
              padding-right: 10px !important;
              min-width: 70px !important;
            }
          }
        }
      }
    }
  }
}
.bg-active {
  background-color: var(--v-primary-base);
  color: white !important;
}
.v-list-item--dense .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list--dense .v-list-item .v-list-item__subtitle {
  font-size: 1.1125rem;
  font-weight: 600;
  line-height: 3rem;
}
a {
  background-color: transparent !important;
}
</style>
<style scoped lang="scss" src="./Header.scss"></style>
