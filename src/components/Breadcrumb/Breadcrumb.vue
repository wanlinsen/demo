<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     
    </el-breadcrumb>
  </div>
</template> 
<script>
export default {
  name: "Breadcrumb",
  props: { 
    active: {
      type: String,
    },
  },
};
</script>

<style>
</style>