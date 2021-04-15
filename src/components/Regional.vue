<template>
  <div class="regional">
    <div class="china_map" ref="china_map"></div>
    <div class="rightData">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="序号" width="210">
        </el-table-column>
        <el-table-column prop="city" label="城市" width="210">
        </el-table-column>
        <el-table-column prop="orders" label="订单数" width="210">
        </el-table-column>
        <el-table-column prop="proportion" label="占比" width="210">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts/core";
import "../plugins/china";
export default {
  name: "Regional",
  data() {
    return {
      orderData: [], //订单量数据
      mapBoxOption: null,
      //   表格数据
      tableData: [
        {
          number: "1",
          city: "大理",
          orders: "85112",
          proportion: "40%",
        },
        {
          number: "2",
          city: "大理",
          orders: "85112",
          proportion: "40%",
        },
        {
          number: "3",
          city: "大理",
          orders: "85112",
          proportion: "40%",
        },
        {
          number: "4",
          city: "大理",
          orders: "85112",
          proportion: "40%",
        },
        {
          number: "5",
          city: "大理",
          orders: "85112",
          proportion: "40%",
        },
        {
          number: "6",
          city: "大理",
          orders: "85112",
          proportion: "40%",
        },
      ],
    };
  },
  mounted() {
    // 指定相关的配置项和数据
    const mapBoxOption = {
      // 头部title
      title: {
        text: "订单地域分布",
        textStyle: {
          color: "#4A3939",
          fontWeight: "500",
          fontFamily: "Noto Sans S Chinese",
          fontSize: 22,
        },
      },
      layoutCenter: ["42%", "48%"], //地图位置
      layoutSize: "87%", //地图大小
      // 提示框
      tooltip: {
        trigger: "item",
        textStyle: {
          color: "#fff",
          fontSize: 16,
          fontFamily: "Noto Sans S Chinese",
          fontWeight: 400,
        },
        backgroundColor: "rgba(0,0,0,0.7)",
        extraCssText: "width:217px;height:64px",

        // 重置提示框内容
        formatter(val) {
          let vals = val.value;
          if (isNaN(vals)) {
            vals = 0;
          }
          return val.name + "<br /> " + "总单量 :" + " " + vals;
        },
      },
      series: [
        {
          type: "map",
          name: "中国地图",
          map: "china",
          // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
          // roam: "scale",
          label: {
            show: false, //显示省份标签
            emphasis: {
              //对应的鼠标悬浮效果
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },

          aspectScale: 0.75, //这个参数用于 scale 地图的长宽比。最终的 aspect 的计算方式是：geoBoundingRect.width / geoBoundingRect.height * aspectScale
          // zoom: 1.8, //当前视角的缩放比例
          itemStyle: {
            borderWidth: 1, //区域边框宽度
            borderColor: "#ffffff", //区域边框颜色
            areaColor: "#CCCCCC", //地图背景颜色
            emphasis: {
              //鼠标滑过地图高亮的相关设置
              borderWidth: 0.5,
              borderColor: "#FF5000",
              areaColor: "#FF5000",
            },
          },
          data: [
            { name: "云南", value: 735213562 },
            { name: "贵州", value: 13 },
            { name: "广西", value: 13 },
          ],
        },
      ],
    };
    this.mapBoxOption = mapBoxOption;
    this.initChinaMap();
 
  },
  //   初始化地图信息
  methods: {
    initChinaMap() {
      this.chart = echarts.init(this.$refs.china_map);
      // 使用制定的配置项和数据显示图表
      this.chart.setOption(this.mapBoxOption);
    },
  },
};
</script>

<style lang="less" scoped>
.regional {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  padding: 30px 0 0 25px;
  height: 583px;
}
.china_map {
  flex: 0.6;
}
.rightData {
  flex: 1;
}
/deep/.el-table {
  margin-top: 50px;
}
/deep/.el-table th {
  height: 80px;
  background-color: #f6f6f6;
  color: #767373;
  font-size: 22px;
}
/deep/.el-table td,
/deep/.el-table th {
  text-align: center;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
}
/deep/.el-table td {
  height: 68px;
  color: #4a3939;
  font-size: 20px;
  line-height: 68px;
}
</style>