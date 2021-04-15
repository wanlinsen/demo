<template>
  <div class="table">
    <el-table
      :data="tableData"
      ref="tableRef"
      style="width: 100%"
      highlight-current-row
      @current-change="handleRadioChange"
      @selection-change="handleSelectionChange"
      :header-cell-style="{
        'background-color': headerBackColor,
        color: '#767373',
        fontSize: '18px',
      }"
   
    >
      <el-table-column
        width="55"
        v-if="isRadioShow"
        :key="Math.random()"
        align="center"
      >
        <template v-slot="scope">
          <el-radio v-model="checked" :label="scope.row.id">
            {{ " " }}</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55"
        :key="Math.random()"
        align="center"
        v-else
      />
      <template v-for="(item, index) in tableLabel">
        <el-table-column
          v-if="item.label === '设备'"
          :label="item.label"
          :prop="item.prop"
          :key="index"
          align="left"
        >
          <template v-slot="scope">
            <div class="equipmentBox">
              <img :src="imgURL" alt="" />
              <div class="equipment">
                <span>{{ scope.row.equipment }}</span>
                <span class="type">型号：TP-MNF800</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :label="item.label"
          :prop="item.prop"
          :key="index"
          align="left"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: null, //使用单选框,定义一个model值
      imgURL:'@/assets/images/logo-bg.jpg'
    };
  },
  props: {
    //表格数据
    tableData: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    //表格label
    tableLabel: {
      require: true,
      type: Array,
      default: function () {
        return [];
      },
    },
    //默认显示多选框
    isRadioShow: {
      type: Boolean,
      default: false,
    },
    headerBackColor: {
      // 表头背景颜色
      type: String,
      default: "#F6F6F6",
    },
  },
  methods: {
    // 单选时
    handleRadioChange(row) {
      this.$emit("handleRadioChange", row);
    },
    //多选时
    handleSelectionChange(row) {
      this.$emit("handleSelectionChange", row);
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
/deep/.el-table .cell {
  font-family: Noto Sans S Chinese;
  font-weight: 400;
}
/deep/.el-table td div {
  font-size: 16px;
  color: #4a3939;
}
.equipmentBox {
  display: flex;
  word-break: break-all;
}
.equipment {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    // width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 控制多行的行数
    -webkit-box-orient: vertical;
  }
}
// 设备型号
.type {
  font-size: 12px;
  color: #a6a2a2;
}
img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  margin-right: 10px;
}
/deep/.el-table td, /deep/.el-table th{
  padding: 9px 0;
}
</style>