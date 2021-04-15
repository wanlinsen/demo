<template>
  <div class="order_query">
    <!-- 订单页面form区域 -->
    <el-form
      ref="orderFormRef"
      :model="orderForm"
      label-width="90px"
      v-show="isShowForm"
    >
      <el-form-item label="订单搜索:" prop="orderSearch">
        <el-select v-model="orderForm.orderSearch" placeholder="订单编号">
          <el-option label="订单编号" value="shanghai"></el-option>
          <el-option label="工程师" value="beijing"></el-option>
        </el-select>
        <el-input v-model="orderForm.input"></el-input>
      </el-form-item>
      <el-form-item label="下单时间: " class="data" prop="time">
        <el-date-picker
          v-model="orderForm.start"
          type="date"
          placeholder="开始时间"
          :clearable="false"
        >
        </el-date-picker>
        <span class="text"> 至 </span>
        <el-date-picker
          v-model="orderForm.end"
          type="date"
          placeholder="结束时间"
          :clearable="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-row>
        <el-col :span="5.5">
          <el-form-item label="设备名称:" prop="name">
            <el-select v-model="orderForm.name" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5.5">
          <el-form-item label="订单类型:" prop="type">
            <el-select v-model="orderForm.type" placeholder="全部"> </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5.5">
          <el-form-item label="付款方式:" prop="payWay">
            <el-select v-model="orderForm.payWay" placeholder="全部">
              <el-option label="全部" value="1232"></el-option>
              <el-option label="待接单" value="1232"></el-option>
              <el-option label="待执行" value="1232"></el-option>
              <el-option label="服务中" value="1232"></el-option>
              <el-option label="待验收" value="1232"></el-option>
              <el-option label="未付款" value="1232"></el-option>
              <el-option label="已付款" value="1232"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5.5">
          <el-form-item label="订单状态:" prop="state">
            <el-select v-model="orderForm.state" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5.5">
          <el-form-item label="城市区域:" prop="region">
            <el-cascader
              placeholder="全部"
              v-model="orderForm.region"
              :options="cityData"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button class="filterBtn" @click="filter">筛选</el-button>
        <span class="reset" @click="resetForm">重置筛选条件</span>
      </el-form-item>
    </el-form>

    <!-- 订单页面tabs区域 -->
    <div class="tabs">
      <el-tabs v-model="activeTab" type="card" @tab-click="tabClick">
        <el-tab-pane
          v-for="item in tabsList"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <transition>
            <keep-alive>
              <!-- <component :is="item.content" :tableData="tableData"></component> -->
              <List :ListData="ListData" />
            </keep-alive>
          </transition>
        </el-tab-pane>
      </el-tabs>
      <router-link to="/order/addorder">
        <el-button class="addOrder">新增订单</el-button>
      </router-link>
      <el-button class="filterBtn btn" @click="showForm">筛选</el-button>
    </div>
  </div>
</template>

<script>
import List from "./List";
import cityData from "../../plugins/cityData";
export default {
  name: "Query",
  data() {
    return {
      // 表单数据
      orderForm: {
        name: "",
        region: [],
        start: "",
        end: "",
        type: [],
        resource: "",
        orderSearch: "",
        payWay: "",
        state: "",
        input: "",
      },
      activeTab: "待接单", //默认显示的tab
      // tabs数据
      tabsList: [
        {
          name: "全部",
          title: "全部",
          content: List,
        },
        {
          name: "待接单",
          title: "待接单",
        },
        {
          name: "待审核",
          title: "待审核",
        },
        {
          name: "待执行",
          title: "待执行",
        },
        {
          name: "服务中",
          title: "服务中",
        },
        {
          name: "待验收",
          title: "待验收",
        },
        {
          name: "未付款",
          title: "未付款",
        },
        {
          name: "已付款",
          title: "已付款",
        },
        {
          name: "无效订单",
          title: "无效订单",
        },
      ],
      // 省市区联动js
      cityData,
      // 表单是否显示
      isShowForm: false,
     ListData: [
        {
          orderNumber: "WX882021030114152679",
          time: "2021-03-01  14:15:26",
          equipment: "医疗设备高档雾化器",
          type: "设备维修",
          price: "825.00",
          engineer: "",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "待接单",
          handle: "取消订单",
          engineer: "张三",
        },
        {
          orderNumber: "WX882021030114152678",
          time: "2021-03-01  14:15:26",
          equipment: "医疗设备身体射线精密医院仪器1111",
          type: "设备巡检",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科111111111111111111111",
          engineer: "张三",
          state: "待执行",
          handle: "取消订单",
        },
        {
          orderNumber: "WX882021030114152677",
          time: "2021-03-01  14:15:26",
          equipment: "医疗设备身体射线精密医院仪器",
          type: "设备新装",
          engineer: "张三",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "服务中",
          handle: "取消订单",
        },
        {
          orderNumber: "WX882021030114152676",
          equipment: "医疗设备身体射线精密医院仪器",
          time: "2021-03-01  14:15:26",
          type: "设备新装",
          engineer: "张三",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "待验收",
          handle: "取消订单",
        },
        {
          orderNumber: "WX882021030114152676",
          equipment: "医疗设备身体射线精密医院仪器",
          time: "2021-03-01  14:15:26",
          type: "设备新装",
          engineer: "张三",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "待验收",
          handle: "取消订单",
        },
        {
          orderNumber: "WX882021030114152676",
          equipment: "医疗设备身体射线精密医院仪器",
          time: "2021-03-01  14:15:26",
          type: "设备新装",
          engineer: "张三",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "待验收",
          handle: "取消订单",
        },
      ],
    };
  },
  components: {
    List,
  
  },
  methods: {
    // 重置表单内容
    resetForm() {
      this.orderForm = {};
      this.$nextTick(() => {
        this.$refs.orderFormRef.resetFields();
      });
    },
    // 筛选内容
    filter() {},
    // tabs点击事件
    tabClick(thisTab) {
      //  thisTab:当前选中的tabs的实例
      // let val = this.tableData.filter((item) => thisTab.name == item.state);
      switch (thisTab.name) {
        case "全部":
          console.log(1);
          break;
        case "待接单":
          console.log(1);
          break;
        case "待审核":
          console.log(1);
          break;
        case "待执行":
          console.log(1);
          break;
        case "服务中":
          console.log(1);
          break;
        case "待验收":
          console.log(1);
          break;
        case "未付款":
          console.log(1);
          break;
        case "已付款":
          console.log(1);
          break;
        case "无效订单":
          console.log(1);
          break;
        default:
          break;
      }
    },
    // 控制表单显示隐藏
    showForm() {
      this.isShowForm = !this.isShowForm;
      let btn = document.querySelector(".btn");
      this.isShowForm ? (btn.textContent = "收起") : (btn.textContent = "筛选");
    },
  },
};
</script>
<style lang="less" scoped>
.order_query {
  width: 100%;
  height: 100%;
  padding: 30px 0 0 30px;
  background-color: #fff;
  .el-form-item {
    padding-bottom: 20px;
  }
  .el-input,
  .el-select {
    width: 250px;
    margin-right: 20px;
  }
  /deep/.el-form-item__label,
  .text {
    font-size: 18px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #767373;
  }
  .data /deep/.el-input__icon {
    position: absolute;
    top: 0;
    right: -230px;
  }
  /deep/.el-input__inner {
    font-size: 16px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #4a3939;
  }
  /deep/.el-input--prefix .el-input__inner {
    padding-left: 16px;
  }
  .text {
    padding: 0 7px;
  }
  .el-date-editor {
    margin: 0;
  }
  .filterBtn,
  .addOrder {
    width: 100px;
    background: #ff5000;
    border-radius: 10px;
    border: none;
    color: #fff;
    font-size: 22px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    margin: -10px 49px 0 10px;
    cursor: pointer;
    outline: none;
  }
  .reset {
    font-size: 18px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #ff5000;
    cursor: pointer;
  }
}
.addOrder {
  position: absolute;
  right: 615px;
  top: 10px;
  line-height: 15px;
  font-size: 20px !important;
  cursor: pointer !important;
  text-align: center;
  width: 150px !important;
  // margin: 0 0 34px 0 !important;
}
.btn {
  position: absolute;
  right: 525px;
  top: 10px;
  width: 80px !important;
  line-height: 15px;
  font-size: 20px !important;
  cursor: pointer !important;
}
.tabs {
  position: relative;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
  font-size: 18px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #767373;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 8px 8px 0 0;
}
/deep/.el-tabs__item.is-active {
  color: #4a3939;
}
/deep/.el-cascader .el-input .el-input__inner {
  width: 300px !important;
}
</style>