<template>
  <el-header class="header">
    <div class="leftArea">
      <!-- 左侧logo -->
      <img src="@/assets/images/logo1.png" alt="" />
      <span>云易修</span>
    </div>
    <!-- 右侧个人信息区域 -->
    <div class="rightArea">
      <!-- 消息提示区域 -->
      <el-popover
        placement="bottom-end"
        width="200"
        trigger="click"
        content="123"
      >
        <el-tabs :stretch="true" v-model="activeName">
          <el-tab-pane label="通知" name="notice">
            <notice-list></notice-list>
          </el-tab-pane>
          <el-tab-pane label="消息" name="message">
            <notice-list></notice-list>
          </el-tab-pane>
          <el-tab-pane label="待办" name="todos">
            <notice-list></notice-list>
          </el-tab-pane>
        </el-tabs>
        <el-tooltip
          class="item"
          effect="dark"
          content="系统通知"
          placement="bottom"
          slot="reference"
        >
          <el-badge :value="12">
            <i class="el-icon-bell" style="font-size: 35px"></i>
          </el-badge>
        </el-tooltip>
      </el-popover>
      <!-- 个人信息区域 -->
      <el-dropdown trigger="hover" placement="bottom" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :src="url"> </el-avatar>
          {{ userName }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人信息</el-dropdown-item>
          <el-dropdown-item command="updatePass">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  name:'Header',
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      noticeVisible: false,
      activeName: "notice",
      userName: "运营部李凝",
    };
  },
  methods: {
    //   退出登录
    logout() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    //个人信息按钮
    handleCommand(command) {
      if (command === "profile") {
        this.$router.push({
          path: "/profile",
        });
      } else if (command === "updatePass") {
        this.$router.push({
          path: "/updatePass",
        });
      } else if (command == "logout") {
        this.$router.push({
          path: "/login",
        });
      }
    },

    dropdownVivibleHandle(visible) {
      this.dropdownVivible = visible;
    },
    handleDropdownCommand(dropdownItem) {
      switch (dropdownItem.name) {
        case "退出登录":
          this.$router.replace("/login");
          break;
        default:
          this.$message.info(`click on item ${dropdownItem.name}`);
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  background-color: #fff;
  box-sizing: border-box;
  .leftArea {
    font-size: 20px;
    color: #4a3939;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    img {
      width: 56px;
      height: 56px;
      vertical-align: middle;
      margin: 0 18px 0 41px;
    }
  }
}
.el-dropdown-link {
  font-size: 18px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #767373;
  margin-right: 50px;
  cursor: pointer;
  .el-avatar {
    width: 50px;
    height: 50px;
    margin-right: 17px;
    vertical-align: middle;
    padding: 0;
  }
}
/deep/.el-popover__reference-wrapper {
  margin-right: 79px;
  cursor: pointer;
}
</style>``