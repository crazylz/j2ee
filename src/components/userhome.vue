<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <!-- 顶栏 -->
      <el-header>
        <div style="float:left">
          <big>
          <i class="el-icon-menu" @mouseenter="mouseIn()" @mouseleave="mouseOut()" />
          </big>
        </div>
        <span class="system-name" style="font-size:28px">
          <img src="../assets/logo.png" style="width:25px" />
          {{systemName}}
          <span style="font-size:14px">P2P小额贷款平台</span>
        </span>
        <div class="bell">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <big>
                <i class="el-icon-message-solid" style="color:#ffffff"></i>
              </big>
              <!-- 点击获取未读消息 -->
              <i class="el-icon-caret-bottom el-icon--right" @click="getNoReadMessage()"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- 点击跳转 -->
              <div @click="bell()">
                <el-dropdown-item class="clearfix">
                  未读消息
                  <el-badge class="mark" :value="msgNum" :hidden="msgBadgeHidden" />
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="users">
          <el-dropdown>
            <span style="color: white">
              <big>
                <i class="el-icon-user-solid"></i>
              </big>
              {{userName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <div @click="investVisible=true;getBalance();clearRecharge()">
                <el-dropdown-item icon="el-icon-wallet">充值</el-dropdown-item>
              </div>
              <div @click="withdrawVisible=true;getBalance();clearWithdraw()">
                <el-dropdown-item icon="el-icon-wallet">提现</el-dropdown-item>
              </div>
              <a href="#/login">
                <el-dropdown-item icon="el-icon-unlock">登出</el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!--充值对话框  -->
      <el-dialog :visible.sync="investVisible">
        <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">充值</h2>
        <p style="color: #606266; font-size:18px">
          第三方账户余额：￥
          <label style="margin-left:10px;font-size:30px;color:orange">{{money_remain}}</label>
        </p>
        <el-form
          ref="investForm"
          :model="invest"
          label-width="200px"
          :rules="investrules"
          label-position="right"
        >
          <el-form-item label="充值金额" prop="number" class="input">
            <el-input v-model="invest.number" placeholder="请输入充值金额" clearable style="width:60%"></el-input>
          </el-form-item>

          <el-form-item label="支付密码">
            <span v-for="(item,index) in RechargeList" :key="item.id">
              <input
                type="password"
                v-model="item.val"
                class="border-input-recharge"
                @keyup="nextFocusRecharge($event,index)"
                @keydown="changeValueRecharge(index)"
              />
            </span>
          </el-form-item>

          <div style="color:#f56c6c;">{{rechargeTxt}}</div>

          <el-button type="primary" @click="expiryRecharge()">确认</el-button>
        </el-form>
      </el-dialog>

      <el-dialog :visible.sync="withdrawVisible">
        <h2 style="margin-top:-30px;text-align: center;color: #606266; font-size:30px">提现</h2>
        <p style="color: #606266; font-size:18px">
          第三方账户余额 ¥
          <label style="margin-left:10px;font-size:30px;color:orange">{{money_remain}}</label>
        </p>
        <el-form
          ref="withdrawForm"
          :model="withdraw"
          label-width="200px"
          :rules="withdrawrules"
          label-position="right"
        >
          <el-form-item label="提现金额" prop="money" class="input">
            <el-input v-model="withdraw.money" placeholder="请输入提现金额" clearable style="width:60%"></el-input>
          </el-form-item>

          <el-form-item label="支付密码">
            <span v-for="(item,index) in WithdrawList" :key="item.id">
              <input
                type="password"
                v-model="item.val"
                class="border-input-withdraw"
                @keyup="nextFocusWithdraw($event,index)"
                @keydown="changeValueWithdraw(index)"
              />
            </span>
          </el-form-item>

          <div style="color:#f56c6c;">{{withdrawTxt}}</div>

          <el-button type="primary" @click="expiryWithdraw()">确认</el-button>
        </el-form>
      </el-dialog>

      <!-- 需要将侧栏和主页面设置当一个容器里面 -->
      <el-container>
        <!-- 侧栏 -->
        <el-aside :style="{width:  widthVal + 'px'}">
          <el-menu :default-active="$route.path" router unique-opened>
            <el-menu-item index="/userhome/personalinfo" style="text-align:left" class="item">
              <i class="el-icon-user"></i>个人资料
            </el-menu-item>

            <el-menu-item index="/userhome/loans" style="text-align:left" class="item">
              <i class="el-icon-discount"></i>借款
            </el-menu-item>

            <el-submenu index="1" style="text-align:left" class="product">
              <template slot="title" class="title">
                <i class="el-icon-shopping-cart-2"></i>
                <span style="color: white">产品</span>
              </template>
              <el-menu-item-group class="group">
                <el-menu-item index="/userhome/newproducts" class="item">购买产品</el-menu-item>
                <el-menu-item index="/userhome/producted" class="item">已购产品</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/userhome/repay" style="text-align:left" class="item">
              <i class="el-icon-sold-out"></i>还款
            </el-menu-item>

            <el-menu-item index="/userhome/record" style="text-align:left" class="item">
              <i class="el-icon-notebook-2"></i>资金流转记录
            </el-menu-item>

            <el-menu-item index="/userhome/credit" style="text-align:left" class="item">
              <i class="el-icon-user"></i>个人征信
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
          <!-- 底部 -->
          <el-footer>
            <label
              style="color: #969696;margin-right:30px"
              @click="aboutUsDialogVisible=true;getAboutUsHtml()"
            >关于我们</label>
            <label
              style="color: #969696;margin-right:30px"
              @click="lawDialogVisible=true;getLawHtml()"
            >法律声明及隐私权政策</label>
            <label
              style="color: #969696;margin-right:30px"
              @click="reportDialogVisible=true;getReportHtml()"
            >廉政举报</label>
            <label
              style="color: #969696;margin-right:30px"
              @click="contactUsDialogVisible=true;getContactUsHtml()"
            >联系我们</label>
            <br />
            <label style="color: #969696;">© 2019 SCUT 软件学院</label>
          </el-footer>

          <!-- 底部的四个弹窗 -->
          <el-dialog class="footer-item-dialog" :visible.sync="aboutUsDialogVisible">
            <h2>关于我们</h2>
            <p v-html="aboutushtml" style="text-align:left" />
          </el-dialog>

          <el-dialog
            class="footer-item-dialog"
            :visible.sync="lawDialogVisible"
            style="margin-top:-100px"
          >
            <h2>法律声明及隐私权政策</h2>
            <p v-html="lawhtml" style="text-align:left"></p>
          </el-dialog>

          <el-dialog class="footer-item-dialog" :visible.sync="reportDialogVisible">
            <h2>廉政举报</h2>
            <p v-html="reporthtml" style="text-align:left" />
          </el-dialog>
          <el-dialog class="footer-item-dialog" :visible.sync="contactUsDialogVisible">
            <h2>联系我们</h2>
            <p v-html="contactushtml"></p>
          </el-dialog>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import { post, get, storageObj, getObj } from "../request/http.js";
let Base64 = require("js-base64").Base64;

export default {
  data() {
    return {
      investVisible: false,
      withdrawVisible: false,
      aboutUsDialogVisible: false,
      lawDialogVisible: false,
      reportDialogVisible: false,
      contactUsDialogVisible: false,
      msgBadgeHidden: false,
      msgNum: 0,
      lawhtml: "",
      aboutushtml: "",
      contactushtml: "",
      reporthtml: "",
      money_remain: 0,
      systemName: "时不我贷",
      userName: "null",
      rechargeTxt: "",
      withdrawTxt: "",
      sidebarVisible: false,
      widthVal: 0,

      RechargeList: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ],
      WithdrawList: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ],
      rechargepassword: "",
      withdrawpassword: "",

      invest: {
        number: null
      },
      withdraw: {
        money: null
      },

      investrules: {
        number: [{ required: true, message: "充值额不能为空", trigger: "blur" }]
      },
      withdrawrules: {
        money: [
          { required: true, message: "提现金额不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
  },
  mounted: function() {
    this.getUser();
    let that = this;
    document.onmousemove = function(event) {
      // 如果侧边栏不可见或者鼠标没有在侧边栏上
      if (!that.sidebarVisible || event.x > 200) {
        that.sidebarVisible = false;
        that.widthVal = 0;
      }
    };
  },
  methods: {
    changeBarWidth() {
      if (this.sidebarVisible) {
        this.widthVal = 200;
      } else {
        this.widthVal = 0;
      }
    },
    mouseIn() {
      this.sidebarVisible = true;
      this.widthVal = 200;
    },
    mouseOut() {
      this.sleep(1000).then(() => {
        // 侧边栏可见，但是1秒之后如果鼠标没有在侧边栏就隐藏侧边栏
        if (!this.sidebarVisible) this.widthVal = 0;
      });
    },

    sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },

    bell: function() {
      this.$router.push({ path: "/userhome/message" });
    },

    getNoReadMessage() {
      var res = get("/api/message", { state: 0 });
      res.then(info => {
        var msgArray = info.data;
        this.msgNum = msgArray.length;
        if (this.msgNum == 0) this.msgBadgeHidden = true;
        else this.msgBadgeHidden = false;
      });
    },

    clearWithdraw() {
      this.WithdrawList = [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ];
      this.withdrawTxt = "";
      this.withdrawpassword = "";
    },

    clearRecharge() {
      this.RechargeList = [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ];
      this.rechargeTxt = "";
      this.rechargepassword = "";
    },

    nextFocusRecharge(el, index) {
      var dom = document.getElementsByClassName("border-input-recharge"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];

      if (el.keyCode != 8) {
        if (index < this.RechargeList.length - 1) {
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

    nextFocusWithdraw(el, index) {
      var dom = document.getElementsByClassName("border-input-withdraw"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];

      if (el.keyCode != 8) {
        if (index < this.WithdrawList.length - 1) {
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

    changeValueRecharge(index) {
      this.RechargeList[index].val = "";
    },

    changeValueWithdraw(index) {
      this.WithdrawList[index].val = "";
    },

    expiryRecharge() {
      let rechargeInput = document.getElementsByClassName(
        "border-input-recharge"
      );
      let reg = /^[0-9]+$/;

      for (let i = 0; i < rechargeInput.length; i++) {
        if (rechargeInput[i].value === "") {
          this.rechargeTxt = "请填写完整的密码";
          this.rechargepassword = "";
          this.RechargeList = [
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" }
          ];
          return;
        }
        if (!reg.test(rechargeInput[i].value)) {
          this.rechargeTxt = "请填写数字";
          this.rechargepassword = "";
          this.RechargeList = [
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" }
          ];
          return;
        }
      }

      for (let i = 0; i < rechargeInput.length; i++) {
        this.rechargepassword += rechargeInput[i].value;
      }

      this.handleInvest();
      this.rechargepassword = "";
      this.RechargeList = [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ];
      this.rechargeTxt = "";
    },

    expiryWithdraw() {
      let withdrawInput = document.getElementsByClassName(
        "border-input-withdraw"
      );
      let reg = /^[0-9]+$/;

      for (let i = 0; i < withdrawInput.length; i++) {
        if (withdrawInput[i].value === "") {
          this.withdrawTxt = "请填写完整的密码";
          this.withdrawpassword = "";
          this.WithdrawList = [
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" }
          ];
          return;
        }
        if (!reg.test(withdrawInput[i].value)) {
          this.withdrawTxt = "请填写数字";
          this.withdrawpassword = "";
          this.WithdrawList = [
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" },
            { val: "" }
          ];
          return;
        }
      }

      for (let i = 0; i < withdrawInput.length; i++) {
        this.withdrawpassword += withdrawInput[i].value;
      }

      this.handleWithdraw();
      this.withdrawpassword = "";
      this.WithdrawList = [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ];
      this.withdrawTxt = "";
    },

    getUser() {
      var userres = get("/api/userProfile", {});
      userres.then(user => {
        this.userName = getObj("userinfo").name;
        // console.log(getObj("userinfo"));
      });
    },

    getBalance() {
      var remainres = get("/api/userProfile/balance", {});
      remainres.then(remain => {
        this.money_remain = remain.data.paymentBalance;
      });
    },

    handleInvest: function() {
      var res = post("/api/account/deposit", {
        amount: this.invest.number,
        password: Base64.encode(this.rechargepassword)
      });
      res.then(data => {
        console.log(data);
        if (data.code == 0) {
          this.getBalance();

          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "success"
          });
          this.invest.number = null;
          this.investVisible = false;
        } else {
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "error"
          });
        }
      });
    },

    handleWithdraw: function() {
      var res = post("/api/account/withdraw", {
        amount: this.withdraw.money,
        password: Base64.encode(this.withdrawpassword)
      });
      res.then(data => {
        console.log(data);
        if (data.code == 0) {
          this.getBalance();

          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "success"
          });
          this.withdraw.money = null;
          this.withdrawVisible = false;
        } else {
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "error"
          });
        }
      });
    },

    getLawHtml() {
      var res = get("/static/law.html", {});
      res.then(data => {
        this.lawhtml = data;
      });
    },
    getReportHtml() {
      var res = get("static/report.html", {});
      res.then(data => {
        this.reporthtml = data;
      });
    },
    getAboutUsHtml() {
      var res = get("/static/aboutus.html", {});
      res.then(data => {
        // console.log(data);
        this.aboutushtml = data;
      });
    },
    getContactUsHtml() {
      var res = get("/static/contactus.html");
      res.then(data => {
        // console.log(data);
        this.contactushtml = data;
      });
    }
  }
};
</script>

<style scoped="scoped">
/* 设置min-height调节最小高度来实现样式统一 */
.el-header {
  background-color: #1b2226;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #272a2d;
  color: #333;
  text-align: center;
  line-height: 200px;
  min-height: 90vh;
}
.item {
  background-color: #272a2d;
  color: white;
}
.title {
  margin-top: 0%;
  margin-bottom: 0%;
  background-color: #272a2d;
  color: white;
}
.group {
  margin-top: 0%;
  margin-bottom: 0%;
  background-color: #272a2d;
  color: white;
}
.product {
  margin-top: 0%;
  margin-bottom: 0%;
  background-color: #272a2d;
  color: white;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 30px;
  min-height: 90vh;
}

.el-footer {
  background-color: #e9eef3;
}

.system-name {
  float: left;
  margin-left: 35px;
  font-size: 20px;
}

.bell {
  float: right;
  margin-right: 70px;
}

.users {
  font-size: 18px;
  float: right;
  margin-right: 30px;
}

.border-input-recharge {
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

.border-input-withdraw {
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

.showBar {
  width: 200px;
}

.hideBar {
  width: 0px;
}
</style>