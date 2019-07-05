<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/userhome'}">用户</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/personalinfo' }">个人资料</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dialog :visible.sync="editpassword">
      <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">设置支付密码</h2>

      <h3>请输入6位原密码</h3>
      <div>
        <span v-for="(item,index) in oldList" :key="item.id">
          <input
            type="password"
            v-model="item.val"
            class="border-input-old"
            @keyup="nextFocusOld($event,index)"
            @keydown="changeValueOld(index)"
          />
        </span>
      </div>
      <h3>请输入6位新密码</h3>
      <div>
        <span v-for="(item,index) in newList" :key="item.id">
          <input
            type="password"
            v-model="item.val"
            class="border-input-new"
            @keyup="nextFocusNew($event,index)"
            @keydown="changeValueNew(index)"
          />
        </span>
      </div>
      <h3>请输入确认密码</h3>
      <div>
        <span v-for="(item,index) in okList" :key="item.id">
          <input
            type="password"
            v-model="item.val"
            class="border-input-ok"
            @keyup="nextFocusOk($event,index)"
            @keydown="changeValueOk(index)"
          />
        </span>
      </div>
      <div>{{hintTxt}}</div>
      <br />
      <el-button type="primary" @click="expiry">确认</el-button>
    </el-dialog>

    <el-row :gutter="10">
      <el-col :span="16">
        <!-- 基本资料卡片 -->
        <div class="card-div">
          <div
            style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px"
          >| 基本资料</div>

          <!-- 头像 -->
          <div style="margin-top: 80px; float: left;">
            <img src="../../assets/user.png" />
          </div>

          <el-form ref="base-form" class="base-form" label-position="right" label-width="130px">
            <el-form-item>
              <label style="float:left;margin-left:40px;color:gray;font-size:15px ">用户名</label>
              <br />
              <label
                style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080"
                v-if="editable == false"
              >{{user.name}}</label>

              <el-input v-model="user.name" v-else style="float:left;margin-left:40px;"></el-input>
            </el-form-item>

            <el-form-item style="text-align:left">
              <label style="float:left;color:gray;font-size:15px;margin-left:30px">工号：</label>
              <label v-if="editable == false">{{user.employeeId}}</label>
              <el-input v-model="user.employeeId" v-else disabled></el-input>
            </el-form-item>

            <el-form-item>
              <label style="float:left;color:gray;font-size:15px;margin-left:30px">性别：</label>
              <!-- 根据性别动态显示图标 -->
              <img
                v-if="user.gender==0 && editable==false"
                src="../../assets/hide.png"
                style="width: 30px; float:left; margin-top:5px"
              />
              <img
                v-else-if="user.gender==1 && editable==false"
                src="../../assets/boy.png"
                style="width: 30px; float:left; margin-top:5px"
              />
              <img
                v-else-if="user.gender==2 && editable==false"
                src="../../assets/girl.png"
                style="width: 30px; float:left; margin-top:5px"
              />
              <!-- <el-input v-model="user.gender" v-else-if="editable==true"></el-input> -->
              <el-select
                v-model="user.gender"
                placeholder="请选择性别"
                label="性别"
                v-else-if="editable==true"
                style="width:60%;float:left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item style="text-align:left">
              <label style="color:gray;font-size:15px ">手机号码：</label>
              <label v-if="editable == false">{{user.phoneNumber}}</label>
              <el-input v-model="user.phoneNumber" v-else disabled></el-input>
            </el-form-item>

            <el-form-item style="text-align:left">
              <label style="color:gray;font-size:15px;margin-left:30px">QQ：</label>
              <label v-if="editable == false">{{user.qq}}</label>
              <el-input v-model="user.qq" v-else></el-input>
            </el-form-item>

            <el-form-item style="text-align:left">
              <label style="color:gray;font-size:15px ">家庭地址：</label>
              <label v-if="editable == false">{{user.address}}</label>
              <el-input v-model="user.address" v-else></el-input>
            </el-form-item>

            <el-form-item style="text-align:left">
              <label style="color:gray;font-size:15px;margin-left:30px">工龄：</label>
              <label v-if="editable == false">{{user.lengthOfService}}年</label>
              <el-input v-model="user.lengthOfService" v-else disabled></el-input>
            </el-form-item>

            <el-form-item style="text-align:left">
              <label style="color:gray;font-size:15px;margin-left:30px">工资：</label>
              <label v-if="editable == false">￥{{user.salary}}</label>
              <el-input v-model="user.salary" v-else disabled></el-input>
            </el-form-item>

            <el-form-item style="text-align:left">
              <label style="color:gray;font-size:15px ">身份证号：</label>
              <label v-if="editable == false">{{user.idCardNumber}}</label>
              <el-input v-model="user.idCardNumber" v-else disabled></el-input>
            </el-form-item>

            <!-- 中间加条横线 -->
            <div
              style="background:#b6afaf; height:3px; margin-left: 100px; margin-bottom:25px"
            />

            <el-form-item style="text-align:left">
              <label style="color:gray;font-size:15px ">失信次数：</label>
              <label v-if="editable == false" style="color:#f56c6c;font-size:30px">{{user.discreditedRecords}} <span style="color:gray;font-size:15px"> 次 </span> </label>
              <el-input v-model="user.discreditedRecords" v-else disabled></el-input>
            </el-form-item>

            <el-form-item style="text-align:left">
              <label style="color:gray;font-size:15px ">信用评级：</label>
              <label v-if="editable == false" style="color:#67c23a;font-size:30px">{{user.rank}}</label>
              <el-input v-model="user.rank" v-else disabled></el-input>
            </el-form-item>
          </el-form>

          <div style="text-align: left; margin-left:180px;">
            <el-button type="info" round @click="editable = true" v-if="editable == false">编辑</el-button>
            <div v-else>
              <el-button type="danger" round @click="editable = false;getLocalUser()">取消编辑</el-button>
              <el-button type="success" round @click="handleDetail">保存</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <!-- 概况卡片 -->
        <el-row>
          <div class="card-div">
            <label
              style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px;"
            >| 公告栏</label>
            <br />
            <p style="font-size:15px;color:gray;text-align:left;padding:10px">
              今天是
              <span style="color:black;font-weigth:bold">{{ getDay() }}</span>，你有什么想对我们说的可以点击底部的“联系我们”哦～
              <br />
              <br />
              <a href="#" style="font-size:15px;color:gray">“时不我贷”p2p小额贷款平台正式开始投入使用...</a>
              <br />
              <a href="#" style="font-size:15px;color:gray">p2p小额贷款平台迎来高速发展的历史新时机...</a>
              <br />
              <a href="#" style="font-size:15px;color:gray">第八届中国（广州）国际金融交易·博览会新闻发布会...</a>
              <br />
              <a href="#" style="font-size:15px;color:gray">6月20号本站将停机维护，次日凌晨恢复使用...</a>
              <br />
              <a href="#" style="font-size:15px;color:blue;float:right;">更多</a>
            </p>
          </div>
        </el-row>
        <el-row>
          <!-- 支付卡片 -->
          <div class="card-div" style="margin-top: 10px">
            <div
              style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 20px;"
            >| 支付模块</div>

            <el-form
              ref="base-form"
              label-position="right"
              label-width="200px"
              style="padding-top: 80px;"
            >
              <el-form-item label="银行卡号码：" style="text-align:left">
                <label v-if="editable == false">{{user.bankAccount}}</label>
                <el-input v-model="user.bankAccount" v-else disabled></el-input>
              </el-form-item>

              <el-form-item label="第三方账户号码：" style="text-align:left">
                <label v-if="editable == false">{{user.paymentAccount}}</label>
                <el-input v-model="user.paymentAccount" v-else disabled></el-input>
              </el-form-item>

              <el-form-item label="支付密码：" style="text-align:left">
                <el-button type="primary" round @click="editpassword = true">设置支付密码</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { post, get, post2, getObj, storageObj } from "../../request/http.js";
let Base64 = require("js-base64").Base64;

export default {
  data() {
    return {
      user: {
      name:'暂无数据',
      gender:0,
      salary: '暂无数据',
      phoneNumber: '暂无数据',
      paymentAccount: '暂无数据',
      bankAccount: '暂无数据',
      lengthOfService:'暂无数据',
      idCardNumber:'暂无数据',
      discreditedRecords:'暂无数据',
      rank:'暂无数据',
      userId:null
      },


      paypassword:{
        oldpassword: "",
        newpassword: "",
        checkpassword: ""
      },

      editable: false,
      editpassword: false,

      newList: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ],
      oldList: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ],
      okList: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ],
      hintTxt: "",

      detailrules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        gender: [
          { required: true, message: "性别不能为空", trigger: "blur" }
          // {min:5,message:'密码长度必须大于5个字符字符',}
        ],
        phoneNumber: [
          { required: true, message: "电话不能为空", trigger: "blur" }
        ],
        salary: [{ required: true, message: "工资不能为空", trigger: "blur" }],
        paymentAccount: [
          { required: true, message: "第三方支付账号不能为空", trigger: "blur" }
        ],
        bankAccount: [
          { required: true, message: "银行卡帐号不能为空", trigger: "blur" }
        ],
        idCardNumber: [
          { required: true, message: "身份证号不能为空", trigger: "blur" }
        ],
        lengthOfService: [
          { required: true, message: "工龄不能为空", trigger: "blur" }
        ]
      },

      options: [
        {
          value: 0,
          label: "未设置"
        },
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        }
      ]
    };
  },

  methods: {
    getLocalUser() {
      this.user = getObj("userinfo");
      console.log(this.user);
      // var userres = get("/api/userProfile", {});
      // userres.then(user => {
      //   this.user.name = user.data.name;
      //   this.user.gender = user.data.gender;
      //   this.user.salary = user.data.salary;
      //   this.user.phoneNumber = user.data.phoneNumber;
      //   this.user.paymentAccount = user.data.paymentAccount;
      //   this.user.bankAccount = user.data.bankAccount;
      //   this.user.lengthOfService = user.data.lengthOfService;
      //   this.user.idCardNumber = user.data.idCardNumber;
      //   this.user.discreditedRecords = user.data.discreditedRecords;
      //   this.user.rank = user.data.rank;
      //   this.user.qq = user.data.qq;
      //   this.user.address = user.data.address;
      //   this.user.employeeId = user.data.employeeId;
      // });
    },

    getUser() {
      var userres = get("/api/userProfile", {});
      userres.then(user => {
        storageObj("userinfo", user.data);
        // console.log(getObj("userinfo"));
      });
    },

    handleDetail() {
      console.log(this.user);
      var res = post("/api/userProfile", {
        idCardNumber: this.user.idCardNumber,
        phoneNumber: this.user.phoneNumber,
        gender: this.user.gender,
        paymentAccount: this.user.paymentAccount,
        bankAccount: this.user.bankAccount,
        salary: this.user.salary,
        name: this.user.name,
        lengthOfService: this.user.lengthOfService,
        qq: this.user.qq,
        address: this.user.address,
        employeeId: this.user.employeeId
      });

      res.then(result => {
        console.log(result);
        if (result.code == 0) {
          this.$msgbox({
            title: "提示",
            message: result.msg,
            type: "success"
          });
          this.editable = false;
          this.getUser();
        } else {
          this.$msgbox({
            title: "提示",
            message: result.msg,
            type: "error"
          });
        }
      });
    },

    handlePassword() {
      var res = post("/api/account/set_password", {
        oldPassword: Base64.encode(this.paypassword.oldpassword),
        newPassword1: Base64.encode(this.paypassword.newpassword),
        newPassword2: Base64.encode(this.paypassword.checkpassword)
      });

      res.then(result => {
        if (result.code == 0) {
          this.$msgbox({
            title: "提示",
            message: result.msg,
            type: "success"
          });
          this.newList = [
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" }
          ];
          this.oldList = [
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" }
          ];
          this.okList = [
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" }
          ];
          this.editpassword = false;
        } else {
          this.$msgbox({
            title: "提示",
            message: result.msg,
            type: "error"
          });
        }
        console.log(result);
      });
    },

    expiry() {
      let oInput = document.getElementsByClassName("border-input-old");
      let nInput = document.getElementsByClassName("border-input-new");
      let okInput = document.getElementsByClassName("border-input-ok");
      let reg = /^[0-9]+$/;

      for (let i = 0; i < oInput.length; i++) {
        if (
          oInput[i].value === "" ||
          nInput[i].value === "" ||
          okInput[i].value === ""
        ) {
          this.hintTxt = "请填写完整的密码";
          return;
        }
        if (
          !reg.test(oInput[i].value) ||
          !reg.test(nInput[i].value) ||
          !reg.test(okInput[i].value)
        ) {
          this.hintTxt = "请填写数字";
          return;
        }
      }

      for (let i = 0; i < nInput.length; i++) {
        this.paypassword.oldpassword += oInput[i].value;
        this.paypassword.newpassword += nInput[i].value;
        this.paypassword.checkpassword += okInput[i].value;

        if (okInput[i].value != nInput[i].value) {
          this.hintTxt = "请检查两次输入是否一致";
          return;
        }
      }

      this.handlePassword();
      this.paypassword.oldpassword = "";
      this.paypassword.newpassword = "";
      this.paypassword.checkpassword = "";
    },

    nextFocusOld(el, index) {
      var dom = document.getElementsByClassName("border-input-old"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];

      if (el.keyCode != 8) {
        if (index < this.oldList.length - 1) {
          nextInput.focus();
        } else {
          currInput.blur();
        }
      } else {
        if (index != 0) {
          lastInput.focus();
        }
      }
    },

    nextFocusNew(el, index) {
      var dom = document.getElementsByClassName("border-input-new"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];

      if (el.keyCode != 8) {
        if (index < this.newList.length - 1) {
          nextInput.focus();
        } else {
          currInput.blur();
        }
      } else {
        if (index != 0) {
          lastInput.focus();
        }
      }
    },

    nextFocusOk(el, index) {
      var dom = document.getElementsByClassName("border-input-ok"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];

      if (el.keyCode != 8) {
        if (index < this.okList.length - 1) {
          nextInput.focus();
        } else {
          currInput.blur();
        }
      } else {
        if (index != 0) {
          lastInput.focus();
        }
      }
    },

    changeValueOld(index) {
      this.oldList[index].val = "";
    },

    changeValueNew(index) {
      this.newList[index].val = "";
    },

    changeValueOk(index) {
      this.okList[index].val = "";
    },

    getDay: function() {
      var today = new Date();
      var nowTime = today.getTime();
      var oYear = today.getFullYear();
      var oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = "0" + oMoth;
      var oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = "0" + oDay;
      return oYear + "年" + oMoth + "月" + oDay + "日";
    }
  },

  mounted() {
    this.getLocalUser();
  }
};
</script>

<style scoped>
/* .el-form{
    text-align:left;
    width: 60%;
  } */
.card-div {
  background-color: #ffffff;
  padding: 5px；;
  padding-bottom: 10px;
  border-radius: 7px;
}
.base-form {
  /* float: left; */
  padding-top: 120px;
  font-size: 50px;
}

.el-input {
  width: 60%;
}

.border-input-old {
  background: #ffffff;
  width: 30px;
  font-size: 30px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
  border-bottom: 1px solid #333333;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

.border-input-new {
  background: #ffffff;
  width: 30px;
  font-size: 30px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
  border-bottom: 1px solid #333333;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

.border-input-ok {
  background: #ffffff;
  width: 30px;
  font-size: 30px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
  border-bottom: 1px solid #333333;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

.my{
  color: #b6afaf
}
</style>