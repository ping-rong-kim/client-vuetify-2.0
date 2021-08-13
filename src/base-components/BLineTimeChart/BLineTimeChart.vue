<template>
  <line-chart
    :chart-data="datacollection"
    :options="optionsComputed"
    :styles="{ height: _height }"
    class="line-chart"
  ></line-chart>
</template>

<script>
import LineChart from "@/components/LineChart";
import { stringDate } from "@/utils/DateUtils";
export default {
  name: "BLineTimeChart",
  props: {
    labels: Array,
    datasets: {
      type: Array
    },
    height: {
      default: false
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    bOptions: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    "line-chart": LineChart
  },
  data() {
    return {};
  },
  computed: {
    datacollection() {
      return {
        labels: this.labels,
        seriese: "seriese",
        datasets: this.datasets.map(dataset =>
          Object.assign(
            {
              label: "Home Value",
              backgroundColor: "transparent",
              fillStyle: "transparent",
              data: [],
              pointBackgroundColor: this.$vuetify.theme.periwinkle,
              pointBorderColor: this.$vuetify.theme.periwinkle,
              pointRadius: 4,
              pointHoverRadius: 8,
              borderColor: this.$vuetify.theme.periwinkle,
              fill: false
            },
            dataset
          )
        )
      };
    },
    labelsToShow() {
      const years = [];
      const labelsToShow = [];
      let prevDate = new Date("1920-01");
      for (const date of this.labels) {
        if (
          Array.isArray(this.bOptions.skipLabels) &&
          this.bOptions.skipLabels.includes(date)
        ) {
          continue;
        }
        const y = new Date(date).getFullYear();
        if (!years.includes(y)) {
          const newDate = new Date(date);
          if (newDate - prevDate > 1000 * 3600 * 24 * 30 * 7) {
            years.push(y);
            labelsToShow.push(stringDate(newDate, "yyyy-MM"));
            prevDate = newDate;
          }
        }
      }
      return labelsToShow;
    },
    optionsComputed() {
      const yAxisHelper = this.yAxesHelper;
      const $this = this;
      return {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
          text: "Home Value"
        },
        legend: {
          display: false,
          position: "bottom"
        },
        scales: {
          xAxes: [
            {
              display: true,
              type: "time",
              time: {
                unit: "month",
                stepSize: 1
              },
              scaleLabel: {
                display: false,
                labelString: "Date in Years" //was Date in Years
              },
              gridLines: {
                display: false
              },
              ticks: {
                source: "labels",
                callback(date) {
                  const _date = stringDate(new Date(date), "yyyy-MM");
                  if ($this.labelsToShow.includes(_date)) {
                    return date;
                  } else {
                    return "";
                  }
                }
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value"
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback: (value, index, values) => {
                  return (
                    "£" +
                    this.$appHelper.thousandsSeparators(
                      Number(value).toFixed(0)
                    )
                  );
                },
                min:
                  yAxisHelper.step *
                  Math.floor(yAxisHelper.lv / yAxisHelper.step),
                max:
                  yAxisHelper.step *
                  Math.ceil(yAxisHelper.gv / yAxisHelper.step),
                stepSize: yAxisHelper.step
              }
            }
          ]
        },
        tooltips: {
          // Disable the on-canvas tooltip
          enabled: true,
          callbacks: {
            title: (items, data) => {
              const d = data["labels"][items[0]["index"]];
              return stringDate(new Date(d), "dd/MM/yyyy");
            },
            label: (items, data) => {
              return (
                data["datasets"][0]["label"] +
                ": £" +
                this.$appHelper.thousandsSeparators(
                  Number(items["value"]).toFixed(0)
                )
              );
            }
          },
          backgroundColor: "#efeff7",
          titleFontSize: 24,
          titleFontColor: "black",
          titleFontStyle: "bold",
          bodyFontColor: "black",
          bodyFontSize: 24,
          bodyFontStyle: "bold",
          displayColors: false,
          titleAlign: "left",
          bodyAlign: "left",
          footerAlign: "left",
          custom: function(tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById("chartjs-tooltip");

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip";
              tooltipEl.innerHTML = "<table></table>";
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = "0";
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove("above", "below", "no-transform");
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add("no-transform");
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);

              var innerHtml = "<thead>";

              titleLines.forEach(function(title) {
                innerHtml += "<tr><th>" + title + "</th></tr>";
              });
              innerHtml += "</thead><tbody>";

              bodyLines.forEach(function(body, i) {
                var colors = tooltipModel.labelColors[i];
                var style = "background:" + colors.backgroundColor;
                style += "; border-color:" + colors.borderColor;
                style += "; border-width: 2px";
                var span = '<span style="' + style + '"></span>';
                innerHtml += "<tr><td>" + span + body + "</td></tr>";
              });
              innerHtml += "</tbody>";

              var tableRoot = tooltipEl.querySelector("table");
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = "absolute";
            tooltipEl.style.left =
              position.left +
              window.pageXOffset +
              tooltipModel.caretX -
              70 +
              "px";
            tooltipEl.style.top =
              position.top +
              window.pageYOffset +
              tooltipModel.caretY +
              30 +
              "px";
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = "20px 30px 15px"; // 'px ' + tooltipModel.xPadding + 'px';
            tooltipEl.style.pointerEvents = "none";
          }
        }
      };
    },
    yAxesHelper() {
      let gv = -Infinity;
      let lv = Infinity;
      const data = this.datacollection.datasets[0].data;
      data.forEach(v => {
        gv = Math.max(v, gv);
        lv = Math.min(v, lv);
      });
      if (gv === -Infinity || lv === Infinity) {
        return false;
      }
      let mv = Math.max(Math.round((gv - lv) / 2), 10000);
      gv = Math.round(gv + mv);
      lv = Math.round(lv - mv);
      const dis = (gv - lv) / 10;
      const round = dis > 10000 ? 10000 : 5000;
      const step = round * Math.round(dis / round) || round;
      return {
        gv,
        lv,
        dis,
        step,
        startValue: data[0],
        endValue: data[data.length - 1]
      };
    },
    _height() {
      const defaultHeight = this.$vuetify.breakpoint.xs ? "250px" : "350px";
      return this.height || defaultHeight;
    }
  },
  methods: {}
};
</script>
<style lang="scss">
#chartjs-tooltip {
  display: none;
}
</style>
<style scoped lang="scss"></style>
