<template>
  <div class="homepage">
    <!-- 卡片显示数据区域 -->
    <panel-group />
    <!-- 实时数据区域 -->
    <real-time-data />
    <!-- 订单统计分析 -->
    <order-analyse />
    <!-- 年度收款走势 -->
    <collect-money />
    <!-- 订单地域分布 -->
    <Regional />
  </div>
</template>

<script>
import PanelGroup from "@/components/PanelGroup";
import RealTimeData from "@/components/RealTimeData";
import OrderAnalyse from "@/components/OrderAnalyse";
import CollectMoney from "@/components/CollectMoney";
import Regional from "@/components/Regional";
export default {
  name: "HomePage",
  components: {
    PanelGroup,
    RealTimeData,
    OrderAnalyse,
    CollectMoney,
    Regional
  },
};
</script>

<style lang="less" scoped>
.homepage {
  height: 100%;
}
</style>