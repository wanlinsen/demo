<template>
  <div class="list">
    <!-- 表格上方指示栏 -->
    <el-row>
      <el-col v-for="(item, index) in headerTitle" :key="index"
        ><div class="grid-content">{{ item }}</div></el-col
      >
    </el-row>
    <!-- 主体区域 -->
    <el-row v-for="(item, index) in ListData" :key="index" class="order">
      <el-col>
        <div class="header">
          <span>订单号:{{ item.orderNumber }}</span>
          <span>下单时间:{{ item.time }}</span>
          <span v-show="index === 2" class="payway">开票/微信支付</span>
          <span  @click="handleDetail(item)">详情-备注</span>
        </div>
      </el-col>
      <el-col>
        <ul>
          <li>
            <img src="../../assets/images/login-bg.jpg" alt="" />
            <div class="equipment">
              <span>{{ item.equipment }}</span>
              <span class="type" v-if="index === 1">型号：TP-MNF800</span>
            </div>
          </li>
          <li>{{ item.type }}</li>
          <li>
            <div class="price">
              <span>￥{{ item.price }}</span>
              <span
                class="modify"
                v-if="index == 0 || index == 1 || index == 2"
                @click="modifyPrice(item)"
                >修改价格</span
              >
            </div>
          </li>
          <li>
            <span v-if="item.state !== '待接单'"> {{ item.engineer }}</span>
          </li>
          <li>
            {{ item.hospital }}
          </li>
          <li>{{ item.state }}</li>
          <li @click="cancleOrder(item)">{{ item.handle }}</li>
        </ul>
      </el-col>
      <el-col v-if="index === 1" class="remark"
        >备注：此设备在质保范围内，须和代理商协商报价</el-col
      >
    </el-row>

    <!-- 分页模块 -->
    <Pagination />
    <!-- 修改价格对话框 -->
    <el-dialog
      title="修改价格"
      :visible.sync="dialogTableVisible"
      @close="dialogClosed"
    >
      <div class="warning">
        <svg-icon icon-class="warning" class="icon" />
        只有订单在未付款状态才支持改价，改价后请联系用户刷新核实订单金额后再支付.
      </div>
      <el-table :data="currTableData" cell-class-name="cellClassName">
        <el-table-column property="equipment" label="设备" width="210">
          <template v-slot="scope">
            <div class="equipmentBox">
              <img src="../../assets/images/login-bg.jpg" alt="" />
              <div class="equipment">
                <span>{{ scope.row.equipment }}</span>
                <span class="type">型号：TP-MNF800</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="type" label="订单类型"></el-table-column>
        <el-table-column property="price" label="订单原价">
          <template v-slot="scope"> ￥{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column property="address" label="改价后">
          <template v-slot="scope">
            <el-input v-model="input" placeholder=""></el-input>
          </template>
        </el-table-column>

        <el-table-column label="新增配件数"></el-table-column>

        <el-table-column label="配件金额"></el-table-column>
        <el-table-column property="hospital" label="医院/科室" width="190">
          <template v-slot="scope">
            <span class="hospital">{{ scope.row.hospital }}</span>
          </template>
        </el-table-column>
        <el-table-column property="address" label="实付金额"></el-table-column>
      </el-table>
      <p>改价后用户付款金额按照实付金额支付</p>
      <p>改价金额不包含新增配件的费用,服务费+配件费用为最后用户需要支付的费用
      </p>
      <button @click="dialogTableVisible = false">确定</button>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "./Pagination";
export default {
  data() {
    return {
      headerTitle: [
        "设备",
        "订单类型",
        "服务价格",
        "工程师",
        "医院/科室",
        "订单状态",
        "操作",
      ],
      // 对话框
      dialogTableVisible: false,
      // 点击修改价格之后的当前数据
      currTableData: [],
    };
  },
  // 数据由父组件传递
  props: ["ListData"],
  components: {
    Pagination,
  },
  methods: {
    // 取消订单
    async cancleOrder(row) {
      const removeConfirm = await this.$confirm(
        "订单取消后无法恢复，请谨慎操作！",
        "订单提醒",
        {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
        }
      ).catch((err) => err);
      //如果用户取消取消，返回字符串 cancel
      //如果用户确认取消，返回字符串 confirm
      if (removeConfirm !== "confirm") return this.$message.info("已取消");
      const { data: res } = await this.$http.delete(`users/${id}`);
      if (res.meta.status !== 200) return this.$message.error("取消订单失败");
      this.$message.success("取消订单成功");
    },
    // 修改价格,获取当前点击行的数据
    modifyPrice(row) {
      this.currTableData.push(row);
      // this.$nextTick(() => {
      //   this.currTableData = data
      // });
      console.log(this.currTableData);

      this.dialogTableVisible = true;
    },
    dialogClosed() {
      this.currTableData = [];
    },
    // 跳转订单详情页面
    handleDetail(item){
      this.$router.push({query:{info:item},path:"/order/detail"})
    }
  },
};
</script>

<style lang="less" scoped>
.el-row {
  font-size: 16px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;

  &:first-child {
    margin-bottom: 20px;
    color: #767373;
    margin-top: 15px;
    background: #f6f6f6;
    display: flex;
    padding-left: 20px;
  }
  div {
    flex: 1;
    &:first-child {
      flex: 1.65;
    }
    &:nth-child(5) {
      flex: 1.5;
    }
    &:last-child {
      flex: 0.6;
    }
  }
}

.header {
  display: flex;
  line-height: 40px;
  background: #f6f6f6;
  border: 1px solid #e4e0de;
  padding-left: 20px;
  span {
    &:first-child {
      margin-right: 105px;
    }
    &:nth-child(2) {
      margin-right: 180px;
    }
    &:last-child {
      margin-left: 773px;
      color: #00b9bb;
      cursor: pointer;
    }
  }
  .payway {
    margin-right: -103px;
  }
}

.price {
  display: flex;
  flex-direction: column;
  .modify {
    padding-left: 5px;
    color: #00b9bb;
    cursor: pointer;
    padding-top: 5px;
  }
}

ul {
  display: flex;
  width: 100%;
  padding: 0 0 0 20px;
  margin: 0;
  border: 1px solid #e4e0de;
  border-top: none;
  margin-bottom: 20px;
  height: 80px;
  align-items: center;
  justify-content: center;
}
ul li {
  flex: 1;
  &:first-child {
    display: flex;
    flex: 1.65;
    padding: 0;
  }
  &:nth-child(5) {
    flex: 1.45;
  }
  &:nth-child(6) {
    margin-left: 5px;
  }
  &:last-child {
    flex: 0.7;
    color: #00b9bb;
    cursor: pointer;
  }
}
.equipmentBox {
  display: flex;
  word-break: break-all;
}
.equipment {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  span {
    // width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 控制多行的行数
    -webkit-box-orient: vertical;
  }
}

.grid-content {
  line-height: 50px;
}
img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  margin-right: 10px;
}
// 备注
.remark {
  margin: -20px 0 20px;
  line-height: 28px;
  background-color: #fff2eb;
  padding-left: 20px;
  color: #ff5000;
}
// 设备型号
.type {
  font-size: 12px;
  color: #a6a2a2;
}
// 对话框
/deep/.el-dialog {
  width: 1100px;
  height: 483px;
}
/deep/.el-dialog__header {
  border-bottom: 1px solid #e4e0de;
}
/deep/.el-dialog__body {
  position: relative;
  padding: 0 0 0 20px;
  .warning {
    margin-top: 17px;
    line-height: 40px;
    background: #fff2eb;
    color: #4a3939;
  }
  p::before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 15px;
    background: #00b9bb;
    border-radius: 50%;
    margin-right: 10px;
  }
  button {
    width: 100px;
    height: 50px;
    background: #ff5000;
    border: none;
    border-radius: 10px;
    outline: none;
    font-size: 22px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #fffefe;
    cursor: pointer;
    position: absolute;
    bottom: -80px;
    right: 22px;
    &:hover {
      opacity: 0.7;
    }
  }
  .el-table {
    font-size: 16px;
    margin-bottom: 40px;
  }
  .hospital {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 控制多行的行数
    -webkit-box-orient: vertical;
  }
  .icon {
    width: 17px;
    height: 14px;
    margin: 0 8px;
  }
}
</style>