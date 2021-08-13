const fs = require("fs");
const path = require("path");
//const version = JSON.parse(fs.readFileSync("./version.txt", "utf8"));
const version = String(
  fs.readFileSync("./version.txt", "utf8").replace(/^\s+|\s+$/g, "")
);
const timestamp = String(
  fs.readFileSync("./build.txt", "utf8").replace(/^\s+|\s+$/g, "")
);
const webpack = require("webpack");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
let devServer = {
  disableHostCheck: true
};
//process.env.version = "100";
console.log("version ===>>> ", version);
console.log("timestamp ===>>> ", timestamp);
console.log("dest ===>>> ", process.argv);
console.log("NodeJS Server     ===>>> ", process.env.VUE_APP_BASE_SERVER_URL);
console.log("GoLang Api Server ===>>> ", process.env.VUE_APP_BASE_API_URL);

let dest = false;
if (process.argv && typeof process.argv === "object") {
  const destFlag = process.argv.find(item => item === "--dest") || false;
  console.log("destFlag ===>>>  ", destFlag);
  if (destFlag) {
    dest = process.argv.find(item => /^dist\/.+/.test(item));
    console.log("dest ===>>>  ", dest);
  }
}
if (process.env.NODE_ENV === "production") {
  console.log("Vue config has been registered for production.");
} else {
  console.log("Vue config has been registered for development.");
  // TODO: @vlad dont copy this back in again we do nto use it and it breaks things for me.
  // Have done @Paul no need proxy because I setup nginx
  // devServer.proxy = {
  //   "/api": {
  //     target: process.env.VUE_APP_BASE_SERVER_URL
  //   }
  // };
}

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
// TODO: see here https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      VERSION: '"' + version + '"',
      BUILD_DATE: '"' + timestamp + '"'
    }
  }),
  new VuetifyLoaderPlugin()
];
if (process.env.VUE_APP_ENABLE_BUNDLE_ANALYZER === "true") {
  plugins.push(new BundleAnalyzerPlugin());
}
const whitelabelConfig = require("./white-label.config");
const whiteLabelBrand = process.env.VUE_APP_WHITE_LABEL_BRAND || "domun";
console.log("white label brand", whiteLabelBrand);
const whiteLabelBrandConfig = whitelabelConfig[whiteLabelBrand];
for (const key in whiteLabelBrandConfig) {
  if (typeof whiteLabelBrandConfig[key] === "object") {
    for (const kk in whiteLabelBrandConfig[key]) {
      process.env[
        `VUE_APP_WHITE_LABEL_${key.toUpperCase()}_${kk.toUpperCase()}`
      ] = whiteLabelBrandConfig[key][kk];
    }
  } else {
    process.env[`VUE_APP_WHITE_LABEL_${key.toUpperCase()}`] =
      whiteLabelBrandConfig[key];
  }
}

let configExports = {
  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    //serviceWorker: false,
    //workboxPluginMode: "InjectManifest",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
      // swSrc: "./empty-service-worker.js" // Empty file
    }
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: plugins,
    resolve: {
      alias: {
        // create alias for whitelabel SCSS variable files
        brandCustomScss: path.resolve(
          __dirname,
          process.env.VUE_APP_WHITE_LABEL_CUSTOM_SCSS
        )
      }
    }
  },
  devServer: devServer,
  productionSourceMap: true // TODO turn this off before launch
};
if (dest && process.env.VUE_APP_ENABLE_PRE_RENDER === "true") {
  configExports.pluginOptions = {
    prerenderSpa: {
      renderRoutes: [
        "/",
        "/about",
        "/glossary",
        "/login",
        "/signup",
        "/terms-and-conditions",
        "/privacy-policy"
      ],
      onlyProduction: true,
      headless: false // <- this could also be inside the customRendererConfig
    }
  };
}
module.exports = configExports;
