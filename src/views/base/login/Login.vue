<template>
  <div class="login_container">
    <!-- logo区域 -->
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="" />
      <span>云易修</span>
    </div>
    <div class="login_box">
      <div class="loginWay">
        <span class="loginOfPws" @click="PwsToLogin">密码登录</span>
        <span class="loginOfCode" @click="CodeToLogin">验证码登录</span>
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="auto"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户 -->
        <el-form-item prop="Account">
          <el-input
            v-model="loginForm.Account"
            placeholder="手机号/用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码登录 -->
        <el-form-item prop="Password" v-if="isShowPageOfPwd">
          <el-input
            v-model="loginForm.Password"
            type="password"
            show-password
            placeholder="输入登录密码"
          ></el-input>
        </el-form-item>
        <!-- 短信验证码登录 -->
        <el-form-item prop="NoteCode" v-if="isShowPageOfCode">
          <el-input
            v-model="loginForm.NoteCode"
            autofocus
            placeholder="输入短信验证码"
          >
            <template slot="append">
              <el-button
                type="text"
                class="noteCode"
                @click="getNoteCode"
                :disabled="getCodeBtnDisable"
                >{{ buttonName }}</el-button
              >
            </template>
          </el-input>
        </el-form-item>
        <div class="msg" v-show="isMsgShow">验证码已发送，5分钟内输入有效</div>
        <!-- 验证码 -->
        <el-form-item prop="CheckCode">
          <el-input
            v-model="loginForm.CheckCode"
            placeholder="输入验证码"
            type="text"
            @keyup.enter.native="login()"
          >
            <template slot="append">
              <el-button class="code" type="text"
                ><img :src="code" alt=""
              /></el-button>
            </template>
          </el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item label="" class="btns">
          <el-button @click="login" class="loginBtn" :loading="loading"
            >登录</el-button
          >
        </el-form-item>
        <!-- 忘记密码区域 -->
        <el-form-item marginBottom>
          <el-checkbox v-model="remPs">记住密码</el-checkbox>
          <el-button class="forgetPwd" type="text" @click="forgetPwd"
            >忘记密码？</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { baseUrl, token } from "@/network/api"; // 导入我们的api接口
export default {
  name: "Login",
  data() {
    let Account = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!/^[\u4e00-\u9fa5A-Za-z0-9]{2,16}$/.test(value)) {
        callback(new Error("用户名只能输入中文、英文、数字组合，且长度为2-8"));
      } else {
        callback();
      }
    };
    let Password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[A-Za-z0-9]{6,16}$/.test(value)) {
        callback(new Error("密码可以是数字、英文，且长度为6-16"));
      } else {
        callback();
      }
    };
    let CheckCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value != this.loginForm.CheckCode) {
        callback(new Error("验证码输入错误"));
      } else {
        callback();
      }
    };
    let NoteCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入短信验证码"));
      } else if (value != this.loginForm.NoteCode) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      // 初始登录信息
      loginForm: {
        Account: "", //账号
        Password: "", //密码
        CheckCode: "", //验证码
        NoteCode: "", //短信验证码
        LoginType: 0, //登录类型 0:默认登录 1：验证码判断：为1时CheckCode参数有效 3：其他
      },
      code: this.$url + "/api/v1.0/check/vcode", //验证码图片
      remPs: false, //是否勾选记住密码
      loading: false, //loading加载
      isShowPageOfPwd: true, //密码登录界面
      isShowPageOfCode: false, //短信验证码登录界面
      buttonName: "获取验证码", // 获取验证码按钮文字
      getCodeBtnDisable: false, //控制发送验证码按钮
      time: 60, //获取验证码超时时间
      isMsgShow: false, //提示验证码发送信息是否显示
      // 登录验证规则
      loginFormRules: {
        Account: [{ required: true, trigger: "blur", validator: Account }],
        Password: [{ required: true, trigger: "blur", validator: Password }],
        CheckCode: [{ required: true, trigger: "blur", validator: CheckCode }],
        NoteCode: [{ required: true, trigger: "blur", validator: NoteCode }],
      },
    };
  },
  methods: {
    //  登录
    login() {
      //vaildate验证表单是否合法
      this.$refs.loginFormRef.validate(async (vaild) => {
        if (!vaild) return;
        this.$message.success("登录成功");
        // const res = await token(this.loginForm);
        // if (res.tip && res.tip.status == 200) {
        //   this.$message.success(res.tip.msg);
        //   //将token保存在sessStrorage中，只在用户处于当前页面时保存token
        //   window.localStorage.setItem("token", 111);
         
        // }
       sessionStorage.setItem("token", 111);
         this.$router.push('/home');
        // console.log(res);
        this.loading = true;
        //先判断是否勾选了记住密码
        let obj = window.localStorage.getItem("remember");
        if (obj != null) {
          this.remPs = obj.remember;
          this.loginForm.Account = obj.user.Account;
          this.loginForm.Password = obj.user.Password;
        }
      });
    },
    // 切换密码登录
    PwsToLogin() {
      this.$refs.loginFormRef.resetFields();
      this.isShowPageOfCode = false;
      this.isShowPageOfPwd = true;
      this.isMsgShow = false;
    },
    // 切换验证码登录
    CodeToLogin() {
      this.$refs.loginFormRef.resetFields(); //切换登录方式，重置表单
      this.isShowPageOfCode = true;
      this.isShowPageOfPwd = false;
    },
    // 获取短信验证码
    getNoteCode() {
      let _this = this;
      _this.getCodeBtnDisable = true;
      let interval = window.setInterval(function () {
        _this.buttonName = "重新获取" + _this.time + "s";
        --_this.time;
        if (_this.time < 0) {
          _this.buttonName = "重新发送";
          _this.time = 60;
          _this.getCodeBtnDisable = false;
          window.clearInterval(interval);
        }
      }, 1000);
      this.isMsgShow = true;
    },
    // 忘记密码
    forgetPwd() {
      console.log(12);
    },
  },
};
</script>

<style lang="less" scoped >
.login_container {
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/images/login-bg.jpg");
  background-size: 100%;
  .logo {
    position: absolute;
    top: 42px;
    left: 101px;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 20px;
    }
    span {
      font-size: 36px;
      font-family: Noto Sans S Chinese;
      font-weight: bold;
      color: #4a3939;
      margin-left: 22px;
    }
  }
}
.login_box {
  width: 600px;
  background: #ffffff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding-top: 72px;
}
.login_form {
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}
.loginWay {
  margin-left: 89px;
  margin-bottom: 72px;
  span {
    height: 29px;
    font-size: 28px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #4a3939;
    line-height: 23px;
    cursor: pointer;
  }
  .loginOfPws {
    margin-right: 163px;
  }
}

.msg {
  position: absolute;
  top: 350px;
  right: 59px;
  font-size: 14px;
  font-family: Noto Sans S Chinese;
  font-weight: 300;
  color: #767373;
}
.loginBtn {
  width: 500px;
  height: 68px;
  background: linear-gradient(225deg, #ff854d, #ff5000);
  opacity: 0.3;
  border-radius: 10px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #ffffff;
  font-size: 28px;
  margin-top: 16px;
  padding: 0;
}
/deep/.el-input {
  font-size: 22px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #cfcfcf;
}
/deep/.el-input__inner {
  height: 78px;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #cfcfcf;
  padding: 0;
  line-height: 10px;
}
/deep/.el-input-group__append {
  padding: 0px;
  border: none;
  border-bottom: 1px solid #cfcfcf;
  border-radius: 0;
  background-color: #fff;
}
.noteCode {
  font-size: 18px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #ff854d !important;
  margin-right: 2px;
}
.code {
  img {
    width: 120px;
    height: 48px;
    vertical-align: middle;
    margin-right: 17px;
  }
}
.el-checkbox {
  float: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}
/deep/ .el-checkbox__label {
  font-size: 22px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #767373;
}
/deep/.el-checkbox__inner {
  zoom: 200%;
  &:hover {
    border-color: #ff5000;
  }
}
/deep/.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #c6c4c4;
}

/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #767373;
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ff5000;
  border-color: #ff5000;
}
.forgetPwd {
  float: right;
  font-size: 22px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #767373;
  padding: 0;
  margin-bottom: 71px;
}
</style>