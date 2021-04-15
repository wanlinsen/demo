<template>
  <div class="tabs">
    <el-tabs
      v-model="childEditableTabsValue"
      type="card"
      ref="MonitorInfoTab"
      editable
      @edit="handleTabsEdit"

    >

      <el-tab-pane
        :key="item.name"
        v-for="item in editableTabs"
        :label="item.title"
        :name="item.name"
      >
      {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "CommonTabs",
  props: {
    editableTabs: {
      type: Array,
    },
    editableTabsValue: {
      type: String,
    },
    tabIndex: {
      type: Number,
    },
  },
  data() {
    return {
      //  将数据保存在子组件中，修改时不会影响父组件
      childEditableTabsValue: this.editableTabsValue,
    };
  },

  methods: {
    // 控制tabs的显示或隐藏
    handleTabsEdit(targetName, action) {
      // 当点击恢复按钮时
      if (action === "add") {
        // 隐藏恢复按钮
        document.querySelector(".el-tabs__new-tab").style.display = "none";
        // 恢复隐藏的tabs
        for (let i = 0; i < this.tabIndex; i++) {
          this.$refs.MonitorInfoTab.$children[0].$refs.tabs[i].style.display =
            "inline-block";
        }
      }
      // 当点击移除按钮时
      if (action === "remove") {
        let tabs = this.editableTabs;
        // 当前活跃的tabs
        let activeName = this.childEditableTabsValue;
        // 显示恢复按钮
        document.querySelector(".el-tabs__new-tab").style.display =
          "inline-block";
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            // 隐藏tabs
            this.$refs.MonitorInfoTab.$children[0].$refs.tabs[
              targetName - 1
            ].style.display = "none";
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
        this.childEditableTabsValue = activeName;
      }
    },
    
  },
  mounted() {
    // 添加的恢复tabs标签按钮
    document.querySelector(".el-tabs__new-tab").textContent = "恢复";
  },
};
</script>

<style lang="less">
.el-tabs__new-tab {
  display: none;
  width: 40px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  margin: 0;
  margin-right: 15px;
  color: #303133;
  outline: none;
}

.el-tabs__item {
  border: 1px solid transparent;
}
.el-tabs__item.is-active {
  border-bottom-color: #409eff !important;
}
</style>