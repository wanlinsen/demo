<template>
  <!-- 侧边栏区域 -->
  <el-aside style="width: 200px">
    <!-- 侧边栏菜单区 -->
    <el-menu
      background-color="#FFFAF7"
      text-color="#767373"
      active-text-color="#F86300"
      unique-opened
      collapse-transition
      :default-active="activePath"
      router
      @open="getIndex"
    >
      <!-- 一级菜单 动态绑定index，目的在于防止一动全动-->
      <el-submenu
        :index="item.id + ''"
        v-for="item in menusList"
        :key="item.id"
      >
        <!-- 一级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <!-- 点击后图标更改 -->
          <svg-icon
            :icon-class="iconActive[item.id]"
            v-if="activeIndex == item.id"
          />
          <!-- 静默原始图标 -->
          <svg-icon :icon-class="iconObj[item.id]" v-else />
          <!-- 文本 -->
          <span>{{ item.title }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="'/' + subItem.path"
          v-for="subItem in item.children"
          :key="subItem.id"
          @click="saveNavState('/' + subItem.path)"
        >
          <template slot="title">
            <!-- 图标
            <i class="el-icon-menu"></i> -->
            <!-- 文本 -->
            <span>{{ subItem.title }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      //被点击路由
      activePath: "",
      // 被点击主菜单的索引
      activeIndex: "",
      dropdownList: [
        {
          name: "个人中心",
          icon: "person",
        },
        {
          name: "个人设置",
          icon: "setting",
        },
        {
          name: "退出登录",
          divided: true,
          icon: "login-out",
        },
      ],
      // mock的数据 真实数据进行请求即可
      menusList: [
        {
          id: 1,
          title: "主页",
          path: "home",
        },
        {
          id: 2,
          title: "设备",
          children: [
            {
              id: 21,
              path: "/equipment/manage",
              title: "设备管理",
            },
              {
              id: 22,
              path: "/equipment/classifi",
              title: "设备分类",
            },
          ],
        },
        {
          id: 3,
          title: "订单",
          children: [
            {
              id: 32,
              path: "order/query",
              title: "订单查询",
            },
            {
              id: 33,
              path: "evalManage",
              title: "评价管理",
            },
          ],
        },
        {
          id: 4,
          title: "财务",
          children: [
            {
              id: 41,
              path: "home",
              title: "子菜单四",
            },
          ],
        },
        {
          id: 5,
          title: "组织",
          children: [
            {
              id: 51,
              path: "home",
              title: "子菜单四",
            },
          ],
        },
        {
          id: 6,
          title: "数据",
          children: [
            {
              id: 61,
              path: "home",
              title: "子菜单四",
            },
          ],
        },
        {
          id: 7,
          title: "运营",
          children: [
            {
              id: 71,
              path: "home",
              title: "子菜单四",
            },
          ],
        },
        {
          id: 8,
          title: "设置",
          children: [
            {
              id: 81,
              path: "home",
              title: "子菜单四",
            },
          ],
        },
      ],
      //   默认侧边栏图标
      iconObj: {
        1: "homepage",
        2: "shebei",
        3: "dingdan",
        4: "caiwu",
        5: "zuzhi",
        6: "shuju",
        7: "yunying",
        8: "shezhi",
      },
      iconActive: {
        1: "homepage-01",
        2: "shebei-01",
        3: "dingdan-01",
        4: "caiwu-01",
        5: "zuzhi-01",
        6: "shuju-01",
        7: "yunying-01",
        8: "shezhi-01",
      },
    };
  },
  methods: {
    //保存连接激活状态
    saveNavState(activePath) {
      sessionStorage.setItem("active", activePath);
      this.activePath = activePath;
    },
    // 获取当前点击菜单的索引
    getIndex(index) {
      this.activeIndex = index;
      if (index === "1") {
        this.$router.push("/homepage");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  height: 100%;
  // overflow: hidden;
}
/deep/.el-submenu__title {
  margin-left: 10px;
  font-size: 20px;
  border-left: 4px solid transparent !important ;
}
/deep/.el-submenu__title:hover {
  background-color: #ffe9de !important;
  box-shadow: 0px 3px 8px 0px rgba(248, 99, 0, 0.3) !important  ;
  border-left: 4px solid #ff8b55 !important ;
  z-index: 1;
}
/deep/.el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow,
/deep/.el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: none;
  font-size: 14px;
  padding-top: 5px;
}
.el-menu-item {
  padding-left: 65px !important;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #767373;
}

/deep/.el-menu-item:hover {
  background-color: #ffe9de !important;
}
</style>