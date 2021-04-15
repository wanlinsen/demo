<template>
  <div class="list">
    <!-- 头部面包屑 -->
    <Breadcrumb :breadlist="breadlist" :active="active"/>
    <!-- 卡片区域 -->
    <CommonTabs :editableTabs="editableTabs" :editableTabsValue="editableTabsValue"
    :tabIndex="tabIndex"
   />
  </div>
</template>

<script>
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import CommonTabs from "../CommonTabs/CommonTabs"
export default {
  name: "List",
  components: {
    Breadcrumb,
    CommonTabs
  },
  data() {
    return {
      // 将面包屑信息传递给子组件
      breadlist: [
        { title: "用户管理",path:'/user',id:0 },
        { title: "配置管理",path:'/config',id:1 },
        { title: "角色管理",path:'/role',id:2 },
        { title: "定时任务补偿",path:'/timing',id:3 },
      ],
      active:'',
      // 卡片组件的参数
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "用户管理",
          name: "1",
          content: "用户管理",
        },
        {
          title: "配置管理",
          name: "2",
          content: "配置管理",
          
        },
        {
          title: "角色管理",
          name: "3",
          content: "角色管理",
         
        },
        {
          title: "定时任务补偿",
          name: "4",
          content: "定时任务补偿",
         
        },
      ],
      tabIndex: 4,
    };
  },
 
};
</script>

<style lang="less">

</style>