<template>
  <div class="add">
    <el-form
      :model="addOrderForm"
      :rules="addOrderRules"
      ref="addOrderForm"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item prop="equipment" class="manageUpload">
        <label slot="label"
          ><span style="color: #f56c6c">*</span>&nbsp;设备图片:</label
        >
        <div class="uploader" @click="dialogVisible = true">
          <img v-if="imageUrl" :src="imageUrl" class="img" />
          <i v-else class="el-icon-plus img-uploader-icon"></i>
        </div>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="name">
            <label slot="label"
              ><span style="color: #f56c6c">*</span>&nbsp;设备名称:</label
            >
            {{ addOrderForm.name }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="classify">
            <label slot="label"
              ><span style="color: #f56c6c">*</span>&nbsp;设备分类:</label
            >
            {{ addOrderForm.classify }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单类型:" prop="orderType">
            <el-select
              v-model="addOrderForm.orderType"
              placeholder="请选择"
              clearable
              @change="handleOrderType"
            >
              <el-option label="设备维修" value="maintain"></el-option>
              <el-option label="设备巡检" value="inspection"></el-option>
              <el-option label="设备新装" value="install"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务价格:" prop="price">
            <el-input
              v-model="addOrderForm.price"
              style="width: 250px"
              placeholder="请填写"
              @input="formatNum(addOrderForm.price, 'price')"
            ></el-input>
            元
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="预约时间:" prop="date">
            <el-date-picker
              v-model="addOrderForm.date"
              type="date"
              placeholder="请选择"
              class="date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="派单方式:" prop="way">
            <el-radio-group
              v-model="addOrderForm.way"
              @change="radioChange"
              text-color="#4A3939"
              fill="#ccc"
            >
              <el-radio label="1">抢单</el-radio>
              <el-radio label="2">工程师</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工程师:" prop="engineer" v-if="engineerIsShow">
            <el-select
              v-model="addOrderForm.engineer"
              placeholder="请选择"
              clearable
            >
              <!-- 暂时做展示 -->
              <el-option label="123" value="123"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="医院地址:" prop="address" class="address">
        <el-cascader
          placeholder="请选择地区"
          v-model="addOrderForm.region"
          :options="cityData"
          clearable
          class="region"
        ></el-cascader>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入详细地址"
          v-model="addOrderForm.address"
          resize="none"
        >
        </el-input>
      </el-form-item>

      <el-form-item
        label="故障设备图片:"
        prop="img"
        class="manageUpload labelPosition"
        v-if="isShow"
      >
        <el-upload
          class="img-uploader"
          :action="uploadURL"
          accept=".jpg, .jpeg, .png"
          :show-file-list="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          list-type="picture-card"
          :limit="3"
          :before-upload="beforePicUpload"
        >
          <i class="el-icon-plus img-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="故障设备视频:"
        prop="video"
        v-if="isShow"
        class="labelPosition manageVideoUpload"
      >
        <el-upload
          class="video-uploader img-uploader"
          action="上传地址"
          :data="{ FoldPath: '上传目录', SecretKey: '安全验证' }"
          :on-progress="uploadVideoProcess"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
          :show-file-list="false"
        >
          <video
            v-if="videoForm.showVideoPath != '' && !videoFlag"
            :src="videoForm.showVideoPath"
            class="img video-avatar"
            controls="controls"
          >
            您的浏览器不支持视频播放
          </video>
          <i
            v-else-if="videoForm.showVideoPath == '' && !videoFlag"
            class="el-icon-plus img-uploader-icon"
          ></i>
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            :percentage="videoUploadPercent"
          ></el-progress>
        </el-upload>
        <p class="Upload_pictures">最多可以上传1个视频，最大50M，推荐格式mp4</p>
      </el-form-item>
      <el-form-item label="备注:" prop="remark" class="labelPosition remark">
        <el-input
          type="textarea"
          :rows="7"
          v-model="addOrderForm.remark"
          resize="none"
        >
        </el-input>
      </el-form-item>
      <el-form-item class="submit">
        <el-button @click="cancelAdd('addOrderForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('addOrderForm')"
          >保存</el-button
        >
      </el-form-item>
      <!-- 点击设备图片展开对话框 -->
      <el-dialog :visible.sync="dialogVisible">
        <el-button @click="addEquipment">新增设备</el-button>
        <Table
          :tableData="tableData"
          :tableLabel="tableLabel"
          :isRadioShow="true"
          @handleRadioChange="handleRadioChange"
          @handleSelectionChange="handleSelectionChange"
        />
        <Pagination />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialog">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 图片放大显示对话框 -->
      <el-dialog title="图片预览" :visible.sync="picDialogVisible" width="50%">
        <img :src="previewPath" alt="" class="picImg" />
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import cityData from "../../plugins/cityData";
import Table from "./Table";
import Pagination from "./Pagination";
export default {
  name: "AddOrder",
  data() {
    return {
      addOrderForm: {
        name: "", //设备名称
        date: "", //预约时间
        orderType: "", //订单类型
        classify: "", //设备分类
        equipment: "", //设备图片
        price: "", //服务价格
        state: "", //订单状态
        way: "", //派单方式
        engineer: "", //工程师
        region: "", //省市区联动
        address: "", //医院地址
        video: "", //设备故障视频
        img: "", //设备故障图片
        remark: "", //备注
        pics: [], // 图片的数组
      },
      // 表格数据
      tableData: [
        {
          id: 1,
          orderNumber: "WX882021030114152679",
          time: "2021-03-01  14:15:26",
          equipment: "医疗设备高档雾化器",
          type: "设备维修",
          price: "825.00",
          engineer: "",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "待接单",
          handle: "取消订单",
          engineer: "张三",
        },
        {
          id: 2,
          orderNumber: "WX882021030114152678",
          time: "2021-03-01  14:15:26",
          equipment: "医疗设备身体射线精密医院仪器11111111111111",
          type: "设备巡检",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          engineer: "张三",
          state: "待执行",
          handle: "取消订单",
        },
        {
          id: 3,
          orderNumber: "WX882021030114152677",
          time: "2021-03-01  14:15:26",
          equipment: "医疗设备身体射线精密医院仪器",
          type: "设备新装",
          engineer: "张三",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "服务中",
          handle: "取消订单",
        },
        {
          id: 4,
          orderNumber: "WX882021030114152676",
          equipment: "医疗设备身体射线精密医院仪器",
          time: "2021-03-01  14:15:26",
          type: "设备新装",
          engineer: "张三",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "待验收",
          handle: "取消订单",
        },
        {
          id: 5,
          orderNumber: "WX882021030114152676",
          equipment: "医疗设备身体射线精密医院仪器",
          time: "2021-03-01  14:15:26",
          type: "设备新装",
          engineer: "张三",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "待验收",
          handle: "取消订单",
        },
        {
          id: 6,
          orderNumber: "WX882021030114152676",
          equipment: "医疗设备身体射线精密医院仪器",
          time: "2021-03-01  14:15:26",
          type: "设备新装",
          engineer: "张三",
          price: "825.00",
          hospital: "云南省昆明市中医医院耳鼻喉口腔科",
          state: "待验收",
          handle: "取消订单",
        },
      ],
      // 表格label
      tableLabel: [
        { label: "设备", prop: "equipment" },
        { label: "类型", prop: "type" },
        { label: "厂商/代理商", prop: "hospital" },
      ],                         
      videoFlag: false, //是否显示进度条
      videoUploadPercent: "", //进度条的进度，
      isShowUploadVideo: false, //显示上传按钮
      videoForm: {
        showVideoPath: "",
      },
      dialogVisible: false, // 新增设备对话框
      cityData, // 省市区联动js
      uploadURL: "", // 上传图片的URL
      imageUrl: "", // 图片地址
      //图片上传组件的handers请求头对象，因为图片上传时没有携带token，导致上传失败,这里是给其配置携带token
      // headerObj: {
      //   Authorization: sessionStorage.getItem('token')
      // },
      picDialogVisible: false, // 控制图片预览对话框显示隐藏
      previewPath: "", // 图片预览的路径
      isShow: false, // 控制上传故障图片和视频显示或隐藏
      engineerIsShow: false, // 控制工程师选择框显示或隐藏
      multipleSelection: [], //table组件多选框数据
      currentSelectItem: {}, // table组件单选框数据
      // 验证规则
      addOrderRules: {
        price: [{ required: true, trigger: "blur", message: "请输入金额" }],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        orderType: [
          {
            required: true,
            message: "请选择订单类型",
            trigger: ["change", "blur"],
          },
        ],
        engineer: [
          { required: true, message: "请选择工程师", trigger: "change" },
        ],
        way: [{ required: true, message: "请选择派单方式", trigger: "change" }],
        address: [
          { required: true, message: "请选择医院地址", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    Table,
    Pagination,
  },
  methods: {
    // 提交新增订单时
    submitForm(addOrderForm) {
      this.$refs[addOrderForm].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消新增订单时
    cancelAdd(addOrderForm) {
      this.$refs[addOrderForm].resetFields();
      this.currentSelectItem = {};
      this.$router.push("/order/query");
    },
    // 订单类型改变时，控制视频与图片上传框隐藏
    handleOrderType() {
      if (this.addOrderForm.orderType === "maintain") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    // 控制用户输入价格的格式
    formatNum(val, key) {
      let temp = val.toString();
      temp = temp.replace(/。/g, ".");
      temp = temp.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
      temp = temp.replace(/^\./g, ""); //验证第一个字符是数字
      temp = temp.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
      temp = temp.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      this.addOrderForm[key] = temp;
    },
    // 当派单方式发生变化时
    radioChange(val) {
      val === "2"
        ? (this.engineerIsShow = true)
        : (this.engineerIsShow = false);
    },
    // 视频上传前
    beforeVideoUpload(file) {
      let fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //视频上传进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    // 视频上传成功时
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     layer.msg("上传失败，请重新上传");
      //}

      //后台上传地址
      // if (res.Code == 0) {
      //   this.videoForm.showVideoPath = res.Data;
      // } else {
      //   layer.msg(res.Message);
      // }
    },
    // 处理table组件单选事件
    handleRadioChange(row) {
      console.log(row);
      this.currentSelectItem = row;
    },
    // 处理table组件多选事件
    handleSelectionChange(row) {
      console.log(row);
      this.multipleSelection = row;
    },
    // 点击对话框确定时
    handleDialog(val) {
      this.addOrderForm.name = this.currentSelectItem.equipment;
      this.addOrderForm.classify = this.currentSelectItem.type;
      this.dialogVisible = false;
    },
    //处理图片预览效果
    handlePreview(file) {
      this.previewPath = file.response.data.url;
      this.picDialogVisible = true;
    },
    // 删除图片操作
    handleRemove(file) {
      //1. 获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path;
      //2.使用findIndex方法，操作数组，找到图片对应的索引值 x是包含数组中每一项的值
      const i = this.addOrderForm.pics.findIndex((x) => {
        x.pic === filePath;
      });
      //3.调用数组splice方法，将对应的图片从数组中移除
      this.addOrderForm.pics.splice(i, 1);
    },
    // 图片上传成功操作
    handleSuccess(response) {
      // 拼接得到一个图片信息对象
      const picInfo = {
        pic: response.data.tmp_path,
      };
      this.addOrderForm.pics.push(picInfo);
    },
    // 上传图片之前检验图片
    beforePicUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/JPEG/PNG 格式!");
      }
      if (!isLt8M) {
        this.$message.error("上传图片大小不能超过 8MB!");
      }
      return isJPG && isLt8M;
    },
    // 新增设备
    addEquipment() {
      this.$router.push("/equipment/addequipment");
    },
  },
};
</script>

<style lang="less" scoped>
.add {
  width: 100%;
  height: 100%;
  padding: 30px 0 0 30px;
  background-color: #fff;
}
/deep/.el-form-item__label {
  font-size: 18px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #767373;
}
.manageUpload {
  display: flex;
  align-items: center;
}
/deep/.img-uploader .el-upload,
.uploader {
  background: #f6f6f6;
  border: 1px solid #e4e0de;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 0;
  width: 100px;
  height: 100px;
  text-align: center;
}
/deep/.img-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .el-upload--picture-card {
  line-height: 0;
}
.img-uploader-icon {
  font-size: 35px;
  color: #bdb0aa;
  line-height: 100px;
  text-align: center;
}
// 日期
/deep/.date {
  position: relative;
  .el-input__inner {
    padding: 0 30px 0 15px;
  }
  .el-input__icon {
    position: absolute;
    left: 215px;
    top: 0;
  }
  .el-icon-date:before {
    font-size: 18px;
  }
}

.img {
  width: 100px;
  height: 100px;
  display: block;
}
// label位置
.labelPosition {
  padding-left: 13px;
}

/deep/.el-form-item {
  padding-bottom: 15px;
  .el-input__inner,
  .el-textarea__inner {
    width: 250px;
    font-size: 16px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #a6a2a2;
  }
}
/deep/.address {
  .el-cascader {
    .el-input__inner {
      width: 400px;
    }
  }
  .el-textarea__inner {
    margin: 20px 0 0 100px;
  }
}

/deep/.el-textarea__inner {
  width: 500px !important;
}
/deep/.el-radio-group {
  .el-radio__label {
    font-size: 18px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #4a3939;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #4a3939;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background: #fff;
    border-color: #767373;
  }
  .el-radio__inner::after {
    width: 12px;
    height: 12px;
    background: #fd7624;
    border-radius: 50%;
  }
  .el-radio__inner {
    width: 20px;
    height: 20px;
    &:hover {
      border-color: #fd7624;
    }
  }
}

/deep/.el-dialog {
  position: relative;
  width: 1100px;
  height: 1000px;
  background: #ffffff;
  border-radius: 5px;
  .el-dialog__header {
    padding: 0;
  }
  .el-button {
    width: 150px;
    background: #ff5000 !important;
    color: #fffefe !important;
    margin-top: -10px;
  }
  .dialog-footer {
    .el-button {
      position: absolute;
      bottom: 14px;
      right: 15px;
      &:first-child {
        right: 175px;
      }
    }
  }
}
.el-button {
  width: 100px;
  height: 50px;
  background: #ff5000;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 22px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #fffefe;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &:first-child {
    border: 1px solid #ff5000;
    border-radius: 10px;
    color: #ff5000;
    background-color: #fff;
  }
}
/deep/.el-progress-circle {
  width: 100px !important;
  height: 100px !important;
}
/deep/.manageVideoUpload {
  .el-form-item__label {
    margin-top: 32px;
  }
  p {
    margin: -10px 0 0 120px;
  }
}
.remark {
  display: flex;
  align-self: start;
}
.submit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  margin: 50px 0 0 -30px;
  padding: 0;
  box-shadow: 0px 0px 15px 3px #f6f6f6;
  .el-button:first-child {
    margin-right: 50px;
  }
}
</style>