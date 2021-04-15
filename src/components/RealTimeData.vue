<template>
  <div class="real_time_data">
    <div class="timer">
      <span>实时数据</span>
      <span> 更新时间：{{ times }}</span>
    </div>
    <ul>
      <li>
        <span>今日订单数</span>
        <h4>0</h4>
        <p>昨日：0</p>
      </li>
      <li>
        <span>今日完成订单数</span>
        <h4>0</h4>
        <p>昨日：0</p>
      </li>
      <li>
        <span>新增医院数</span>
        <h4>0</h4>
        <p>昨日：0</p>
      </li>
      <li>
        <span>新增代理商</span>
        <h4>0</h4>
        <p>昨日：0</p>
      </li>
      <li>
        <span>支付订单数</span>
        <h4>0</h4>
        <p>昨日：0</p>
      </li>
      <li>
        <span>支付金额(元)</span>
        <h4>0.00</h4>
        <p>昨日：0.00</p>
      </li>
      <li>
        <span>新增工程师</span>
        <h4>0</h4>
        <p>昨日：0</p>
      </li>
      <li>
        <span>待审核数</span>
        <h4>0</h4>
        <p>昨日：0</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: "", //格式化之后的当前时间
      currentTime: new Date(), //当前时间
    };
  },
  mounted() {
    this.getTimes();
  },
  // 在Vue实例销毁前，清除我们的定时器
  beforeDestroy() {
    if (this.times) {
      clearInterval(this.getTimesInterval);
    }
  },
  methods: {
    getTimes() {
      setInterval(this.getTimesInterval, 1000);
    },
    getTimesInterval: function () {
      let _this = this;
      let year = new Date().getFullYear(); //获取当前时间的年份
      let month = new Date().getMonth() + 1; //获取当前时间的月份
      let day = new Date().getDate(); //获取当前时间的天数
      let hours = new Date().getHours(); //获取当前时间的小时
      let minutes = new Date().getMinutes(); //获取当前时间的分数
      let seconds = new Date().getSeconds(); //获取当前时间的秒数
      //当小于 10 的是时候，在前面加 0
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      //拼接格式化当前时间
      _this.times =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    },
  },
};
</script>

<style lang="less" scoped>
.real_time_data {
  background-color: #fff;
  overflow: hidden;
  padding-left: 30px;
  padding-top: 25px;
  width: 100%;
}
.timer span:first-child {
  font-size: 22px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4a3939;
  margin-right: 3px;
}
.timer span:nth-child(2) {
  font-size: 16px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #767373;
}
ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 0 0 20px;
}
ul li {
  flex: 1;
  width: 25%;
  min-width: 25%; 
  max-width: 25%; 
  margin-bottom: 25px;
  span {
    font-size: 16px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #a6a2a2;
  }
  h4 {
    padding: 13px 0;
    margin: 0;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #767373;
  }
}
</style>
