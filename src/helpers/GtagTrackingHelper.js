export default {
  init() {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function() {
        dataLayer.push(arguments);
      };
    gtag("js", new Date());
    gtag("config", "AW-1068374282");
  },
  conversion() {
    gtag("event", "conversion", {
      send_to: "AW-1068374282/Jic7CMOi6c4BEIqyuP0D"
    });
  }
};
