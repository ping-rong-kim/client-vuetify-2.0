export default {
  enabled: false,
  init() {
    window._paq =
      window._paq ||
      []; /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    let u = "https://matomo.firmview.co.uk/";
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", process.env.VUE_APP_MATOMO_SITE_ID]);
    this.enabled = true;
  },
  pageTrackWith(url = "", title = "My New Title") {
    if (this.enabled) {
      _paq.push(["setCustomUrl", url]);
      _paq.push(["setDocumentTitle", title]);
      _paq.push(["trackPageView"]);
    }
  },
  trackUser(id) {
    if (this.enabled) {
      _paq.push(["setUserId", id]);
    }
  }
};
