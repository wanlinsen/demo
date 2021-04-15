 <template>
  <el-container class="home" direction="vertical"> 
    <!-- 头部 -->
    <Header />
    <el-container>
      <!-- 侧边栏 -->
      <Aside />
      <!-- 右侧主体区域 -->
      <el-main>
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Aside from "@/views/layout/components/sideBar/Aside";
import Header from "@/views/layout/components/Header";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
export default {
  created() {
    // this.getMenuList()
    this.activePath = sessionStorage.getItem("active");
  },
  name: "Home",
  components: {
    Header,
    Aside,
    Breadcrumb
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}

.el-main {
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  padding-right: 0;
  overflow: hidden !important;
}
</style>