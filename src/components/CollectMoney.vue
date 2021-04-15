<template>
  <div class="collect_money">
    <div class="title">
      <span>年度收款走势</span>
      <!-- Select 选择器 -->
      <span>
        <el-select
          v-model="value"
          placeholder="2021"
          size="small"
          @change="handleChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </span>
    </div>
    <div id="bar_echarts" ref="bar_echarts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
export default {
  name: "CollectMoney",
  data() {
    return {
      // select数据
      options: [
        {
          value: "2021",
          label: "2021",
        },
        {
          value: "2020",
          label: "2020",
        },
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2018",
          label: "2018",
        },
        {
          value: "2017",
          label: "2017",
        },
      ],
      value: "2021",
      BarOption: null,
    };
  },
  mounted() {
    // 柱状图配置
    const BarOption = {
      tooltip: {
        trigger: "axis",
        textStyle: {
          color: "#fff",
        },
        axisPointer: {
          type: "line",
          lineStyle: {
            width: 2,
            color: "#767373",
            type: "solid",
            opacity: 0.5,
          },
        },
        backgroundColor: "rgba(0,0,0,0.7)",
        extraCssText: "width:180px;",
      },
      color: ["#0084FF", "#00B9BB"],

      grid: {
        left: 66,
        right: 88,
        bottom: 30,
        containLabel: true,
      },
      legend: {
        data: [],
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "订单量(单)",
          min: 0,
          max: 1000,
          interval: 200,
          axisLabel: {
            formatter: "{value}",
          },
          nameTextStyle:{
            align:'right',
            padding:[0,0,14,0]
          }
        },
        {
          type: "value",
          name: "收款额(万元)",
          min: 0,
          max: 2500,
          interval: 500,
          axisLabel: {
            formatter: "{value}",
          },
          nameTextStyle:{
            align:'left',
            padding:[0,0,14,0]
          }
        },
      ],
      series: [
        {
          name: "下单量",
          type: "bar",
          data: [10, 50, 80, 40, 52, 82, 35, 72, 36, 20, 64, 330],
          barWidth: 20,
        },

        {
          name: "收款金额",
          type: "line",
          data: [260, 590, 900, 464, 587, 907, 1456, 1522, 487, 2500, 601, 538],
          yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true, //平滑曲线显示
          showSymbol: false, //鼠标经过时显示小圆点
          symbol: "circle", //标记的图形为实心圆
        },
      ],
    };
    this.BarOption = BarOption;
    this.initBarEcharts();
  },
  methods: {
    // 初始化柱状图信息
    initBarEcharts() {
      let _this = this;
      // 重置提示框内容
      this.BarOption.tooltip.formatter = function (params) {
        let res = "<div>" + _this.value + "- " + params[0].name + "</div>\n";
        for (let i = 0; i < params.length; i++) {
          res +=
            params[i].marker +
            params[i].seriesName +
            " :" +
            "&nbsp&nbsp" +
            params[i].value +
            "<br />";
        }
        return res;
      };
      this.chart = echarts.init(this.$refs.bar_echarts);
      this.chart.setOption(this.BarOption);
    },
    // select变化时
    handleChange(value) {
      this.value = value;
    },
  },
};
</script>

<style lang="less" scoped>
.collect_money {
  width: 100%;
  background-color: #fff;
  margin-top: 20px;
}
#bar_echarts {
  width: 100%;
  height: 510px;
}
.title {
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4a3939;
  padding: 30px 30px 0;
  span:first-child {
    font-size: 22px;
    padding-right: 30px;
  }
}
/deep/.el-select {
  width: 100px;
}
</style>