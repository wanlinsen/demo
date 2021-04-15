<template>
  <el-row :gutter="100" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-department">
          <i class="el-icon-user-solid card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">医院科室数</div>
          <count-to
            :start-val="0"
            :end-val="102400"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-agent">
          <i class="el-icon-user card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">代理商总人数</div>
          <count-to
            :start-val="0"
            :end-val="81212"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-engineer">
          <i class="el-icon-user card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">工程师总人数</div>
          <count-to
            :start-val="0"
            :end-val="81212"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  name: "PanelGroup",
  components: {
    CountTo,
  },
};
</script>

<style lang="less" scoped>
.panel-group {
  // margin-top: 18px;

  .card-panel-col {
    margin-bottom: 18px;
  }

  .card-panel {
    height: 100px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-department {
        background: #f4516c;
      }

      .icon-agent {
        background: #0084ff;
      }

      .icon-engineer {
        background: #0084ff;
      }
    }

    .icon-department {
      background-color: #40c9c6;
    }

    .icon-agent {
      background-color: #34bfa3;
    }

    .icon-engineer {
      background-color: #ff5000;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 18px 19px 0 30px;
      transition: all 0.38s ease-out;
      width: 64px;
      height: 64px;
      line-height: 75px;
      text-align: center;
      border-radius: 50%;
    }

    .card-panel-icon {
      font-size: 30px;
      color: #fff;
    }

    .card-panel-description {
      margin: 25px 0 18px 10px;

      .card-panel-text {
        font-weight: 400;
        font-family: Noto Sans S Chinese;
        line-height: 23px;
        color: #767373;
        font-size: 16px;
        margin-bottom: 2px;
      }

      .card-panel-num {
        font-size: 24px;
        font-family: Noto Sans S Chinese;
        font-weight: 500;
        color: #4a3939;
      }
    }
  }
}
</style>