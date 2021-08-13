import Vue from "vue";
import Router from "vue-router";
/* eslint-disable */
// keep home page separate for fastest page load
import Home from "@/views/Public/Home/Home.vue";

// frontend pages
const Login = () => import(/* webpackChunkName: "frontend" */ "@/views/Login.vue");
const ForgetPassword= ()=> import(/* webpackChunkName: "frontend" */ "@/views/Auth/ForgetPassword/ForgetPassword.vue");
const ForgotPassword = () => import(/* webpackChunkName: "frontend" */ "@/views/Auth/ForgotPassword/ForgotPassword.vue");
const ResetPassword = () => import(/* webpackChunkName: "frontend" */ "@/views/Auth/ResetPassword/ResetPassword.vue");
const EmailAccountConfirmed = () => import(/* webpackChunkName: "frontend" */ "@/views/Auth/EmailAccountConfirmed/EmailAccountConfirmed.vue");
const AboutUs = () => import(/* webpackChunkName: "frontend" */ "@/views/Public/AboutUs/AboutUs.vue");

// signup pages
const Signup = () => import(/* webpackChunkName: "signup" */ "@/views/Signup.vue");

// keep dashboard separate as its a comlpex component and we do 3rd party calls before showing anyway
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ "@/views/my-account/Dashboard/Dashboard.vue");

// TODO add all the my account pages here and chunk under  /* webpackChunkName: "myAccount" */
const Env = () => import(/* webpackChunkName: "myAccount" */ "@/views/Public/Env/Env.vue");
const Version = () => import(/* webpackChunkName: "Version" */ "@/views/Public/Version/Version.vue");
const Profile = () => import(/* webpackChunkName: "myAccount" */ "@/views/my-account/Profile/Profile.vue");
/* eslint-enable */
Vue.use(Router);

const StyleGuideBasic = () =>
  import(/* webpackChunkName: "styleGuideBasic" */ "@/style-guide/basic.vue");
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword
    },
    {
      path: "/forget-password",
      name: "forget-password",
      component: ForgetPassword
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword
    },
    {
      path: "/email-confirmed",
      name: "email-confirmed",
      component: EmailAccountConfirmed
    },
    {
      path: "/about",
      name: "AboutUs",
      component: AboutUs
    },
    {
      path: "/env",
      name: "env",
      meta: {
        requiresAuth: true
      },
      component: Env
    },
    {
      path: "/ver",
      name: "version",
      component: Version
    },
    {
      path: "/my-account/dashboard/:subRoute?/:subRouteParam?",
      name: "dashboard",
      meta: {
        requiresAuth: true
      },
      component: Dashboard
    },
    {
      path: "/my-account/profile/:subRoute?/:subRouteParam?",
      name: "profile",
      meta: {
        requiresAuth: true
      },
      component: Profile
    },
    {
      path: "/styleguide",
      name: "StyleGuideBasic",
      component: StyleGuideBasic
    },
    { path: "*", component: Home }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
