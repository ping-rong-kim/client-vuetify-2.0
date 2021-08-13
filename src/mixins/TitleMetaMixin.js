export default {
  head: {
    title: function() {
      return {
        inner: this.metaTitle
      };
    },
    meta: function() {
      return this.metaDescription
        ? [
            {
              name: "description",
              content: this.metaDescription
            },
            {
              name: "og:title",
              content: `${this.metaDescription}`
            },
            {
              name: "twitter:title",
              content: `${this.metaDescription}`
            },
            {
              name: "og:description",
              content: this.metaDescription
            },
            {
              name: "twitter:description",
              content: this.metaDescription
            }
          ]
        : [];
    }
  }
};
