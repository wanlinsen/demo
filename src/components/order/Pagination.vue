<template>
  <div class="pagination">
    <el-pagination
     @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next,sizes"
      :page-sizes="[10, 20, 30, 40]"
      :total="total"
      :current-page="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 100,
      },
      total: 200,
    };
  },
  methods: {
    // 当前页码改变时
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    // 每页显示条数改变时
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    },
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  float: right;
  margin-right: 50px;
  /deep/.el-input__inner {
  
    &:hover {
      border-color: #e4e0de;
    }
  }
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fff;
  border: 2px solid #ff5000;
  color: #ff5000;
}
/deep/.el-pager li {
  border: 2px solid transparent;
  line-height: 24px;
}
// 去除内容背景色
/deep/.el-pagination.is-background .btn-next,
/deep/.el-pagination.is-background .btn-prev,
/deep/.el-pagination.is-background .el-pager li {
  background-color: #fff;
}
</style>