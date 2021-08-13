import BLineTimeChart from "@/base-components/BLineTimeChart/BLineTimeChart.vue";
import AppPreviewGetting from "@/common-components/AppPreviewGetting/AppPreviewGetting.vue";
export default {
  name: "Test",
  components: {
    AppPreviewGetting,
    BLineTimeChart
  },
  data: function() {
    return {
      labels: [
        "2016-02",
        "2017-01",
        "2018-01",
        "2019-03",
        "2020-01",
        "2020-02",
        "2020-03",
        "2020-06",
        "2020-07"
      ],
      datasets: [
        {
          data: [
            250000,
            270000,
            260000,
            311000,
            260000,
            330000,
            260000,
            319000,
            389000
          ]
        }
      ]
    };
  },
  created() {}
};
