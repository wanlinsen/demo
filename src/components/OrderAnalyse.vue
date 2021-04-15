<template>
  <div class="order_analyse">
    <div class="line_echarts" ref="line_echarts"></div>
    <div class="right">
      <span>订单构成分析</span>
      <div class="pie_echarts" ref="pie_echarts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
export default {
  name: "OrderAnalyse",
  data() {
    return {
      LineOption: null,
      PaiOption: null,
    };
  },
  mounted() {
    // 折线图数据
    const LineOption = {
      title: {
        text: "近7日订单统计",
        subtext: "订单量(单）",
        itemGap: 29,
        textStyle: {
          color: "#4A3939",
          fontWeight: "500",
          fontFamily: "Noto Sans S Chinese",
          fontSize: 22,
        },
      },
      // 提示框
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            width: 2,
            color: "#767373",
            type: "solid",
            opacity: 0.5,
          },
        },
        textStyle: {
          color: "#fff",
        },
        backgroundColor: "rgba(0,0,0,0.7)",
        extraCssText: "width:180px;",
      },
      // 布局
      grid: {
        left: 4,
        top: 90,
        bottom: 30,
        containLabel: true,
      },
      color: ["#00B9BB", "#0084FF"],
      legend: {
        data: ["医院", "代理商"],
        left: 535,
        itemGap: 40, // 设置间距
        itemWidth: 40, // 设置宽度
        itemHeight: 10, // 设置高度
        textStyle: {
          fontSize: 12,
          fontfamily: "Noto Sans S Chinese",
          fontWeight: 400,
          color: "#4A3939",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}",
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
      },
      series: [
        {
          name: "医院",
          type: "line",
          data: [20, 280, 100, 17, 240, 250, 70],
          lineStyle: { color: "#00B9BB" }, //设置线条颜色
          symbol: "circle",
          smooth: true, //平滑曲线显示,
          // 设置折线上圆点大小
          symbolSize: 6,
          showSymbol: false//鼠标经过时显示小圆点
        },
        {
          name: "代理商",
          type: "line",
          data: [50, 230, 80, 200, 100, 300, 60],
          symbol: "circle",
          smooth: true, //平滑曲线显示
          symbolSize: 6,
          lineStyle: { color: "#0084FF" },
          showSymbol: false//鼠标经过时显示小圆点
        },
      ],
    };
    this.LineOption = LineOption;
    this.initLineEcharts();
    // 饼图数据
    const PaiOption = {
      zlevel: 0,
      title: {
        text: "总订单量",
        subtext: "  5350",
        x: "left",
        top: "46%",
        left: "16%",

        textStyle: {
          color: "#767373",
          fontStyle: "normal",
          fontWeight: "500",
          fontFamily: "Noto Sans S Chinese",
          fontSize: 23,
        },
        subtextStyle: {
          color: "#767373",
          fontStyle: "normal",
          fontWeight: "500",
          fontFamily: "Noto Sans S Chinese",
          fontSize: 23,
        },
      },
      color: ["#FF5000","#0096FF", "#00C760" ],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      // 图例设置
      legend: {
        icon: "circle",
        orient: "vertical",
        x: "415px",
        y: "170px",
        textStyle: {
          color: "#4A3939",
          fontSize: 14,
          fontFamily: " Noto Sans S Chinese",
          fontWeight: "400",
        },
        itemGap: 22,
        borderColor: "#ccc",
      },
      // 值域设置
      series: [
        {
          name: "订单分析",
          type: "pie",
          radius: ["40%", "78%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          zlevel: 2,
          emphasis: {
            label: {
              show: true,
              fontSize: "21",
              fontWeight: "400",
              color: "#767373",
              formatter: "{b}\n\n{c}", // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
              padding: [20, 20, 20, 20],
              backgroundColor: "#FFF",
            },
          },
          center: ["22%", "53%"],
          labelLine: {
            show: false,
            // show:true
          },
          data: [
            { value: 3500, name: "设备维修" },
            { value: 500, name: "设备新装" },
            { value: 1350, name: "设备巡检" },
          ],
        },
      ],
    };
    this.PaiOption = PaiOption;
    this.initPaiEcharts();
  },
  methods: {
    // 初始化折线图信息
    initLineEcharts() {
      // 重置提示框内容
      this.LineOption.tooltip.formatter = function (params) {
        let res = "<div>" + params[0].name + "</div>\n";
        for (let i = 0; i < params.length; i++) {
          res +=
            "<div>" +
            params[i].marker +
            params[i].seriesName +
            "下单数:" +
            "&nbsp&nbsp" +
            params[i].value +
            "</div>";
        }
        return res;
      };
      this.chart = echarts.init(this.$refs.line_echarts);
      this.chart.setOption(this.LineOption);
    },
    // 初始化饼图信息
    initPaiEcharts() {
      // 获取订单量
      let value = this.PaiOption.series[0].data.map((item) => {
        return item.value;
      });
      // 订单总数
      let total = value.reduce((next, curr) => next + curr);
      // 重置legend内容
      this.PaiOption.formatter = function (name) {
        let res = "";
        switch (name) {
          case "设备维修":
            return (res +=
              name +
              " :  " +
              value[0] +
              "     " +
              ((value[0] / total) * 100).toFixed(2) +
              "%");
            break;
          case "设备新装":
            return (res +=
              name +
              " :  " +
              value[1] +
              "     " +
              ((value[1] / total) * 100).toFixed(2) +
              "%");
            break;
          case "设备巡检":
            return (res +=
              name +
              " :  " +
              value[2] +
              "     " +
              ((value[2] / total) * 100).toFixed(2) +
              "%");
            break;
          default:
            return "";
            break;
        }
      };
      this.chart = echarts.init(this.$refs.pie_echarts);
      this.chart.setOption(this.PaiOption);
    },
  },
};
</script>

<style lang="less" scoped>
.order_analyse {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  padding: 30px 0 0 25px;
  height: 442px;
}
.line_echarts {
  flex: 1;
}
.right {
  position: relative;
  flex: 1;
  span {
    position: absolute;
    left: 0;
    top: -8px;
    color: #4a3939;
    font-weight: 500;
    font-family: Noto Sans S Chinese;
    font-size: 22px;
  }
  .pie_echarts {
    width: 100%;
    height: 100%;
  }
}
</style>