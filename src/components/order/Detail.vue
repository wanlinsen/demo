<template>
  <div class="detail">
    <el-steps
      :active="orderStatus"
      :space="173"
      finish-status="success"
      align-center
    >
      <!-- <el-step title="下单成功" description="12"></el-step>
      <el-step title="审核完成" description="34"></el-step>
      <el-step title="已接单" description="56"></el-step>
      <el-step title="服务中" description="78"></el-step>
      <el-step title="验收通过" description="78"></el-step>
      <el-step title="已付款" description="78"></el-step> -->
      <el-step
        :title="item.title"
        :description="item.description"
        v-for="(item, index) in items"
        :key="index"
      ></el-step>
    </el-steps>
    <el-steps :active="3" :space="173" finish-status="success" align-center>
      <el-step title="下单成功" description="12"></el-step>
      <el-step title="审核完成" description="34"></el-step>
      <el-step title="已接单" description="56"></el-step>
      <el-step title="服务中" description="78"></el-step>
      <el-step title="验收通过" description="78"></el-step>
      <el-step title="已付款" description="78"></el-step>
      <el-step title="已付款" description="78"></el-step>
      <el-step title="已付款" description="78"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "Detail",

  data() {
    return {
      items: [
        {
          title: "下单成功",
          description: "aaa",
        },
        {
          title: "审核完成",
          description: "bbb",
        },
        {
          title: "789",
          description: "ccc",
        },
        {
          title: "135",
          description: "",
        },
      ],
      //  步骤条当前进度
      orderStatus: 1,
    };
  },

  created() {
    this.getInfo();
    console.log(this.$route.query.info);
  },
  methods: {
    getInfo() {
      // 取到路由带过来的参数
      // const routerParams = this.$route.query.id
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  padding: 30px 0 0 30px;
  background-color: #fff;
}
/deep/.el-steps {
  margin-left: -55px;
  .el-step__title.is-success {
    color: #4a3939;
  }
  .el-step__head.is-success {
    color: #00b9bb;
    border-color: #00b9bb;
    border-radius: 1px;
  }
  .el-step__description.is-success {
    font-size: 12px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #a6a2a2;
  }
  .el-step__icon {
    width: 21px;
    height: 21px;
  }
}
</style>