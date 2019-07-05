<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">

      <el-dialog :visible.sync="detailVisible" top="5vh" width="40%">
      <div class="card-div">
        <div
          style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 10px"
        >| 基本资料</div>

        <!-- 头像 -->
        <div style="margin-top: 60px; float: left;">
          <img src="../../assets/user.png" />
        </div>
        <el-form ref="base-form" class="base-form" label-position="right" label-width="200px">
          <el-form-item>
            <label style="float:left;margin-left:40px">用户名</label>
            <br />
            <!-- 这里需要把“没有查询结果”替换为对应的用户名 -->
            <label
              style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080"
            >{{borrower.name}}</label>
          </el-form-item>

          <el-form-item label="性别：" label-width="200px">
            <!-- 根据性别动态显示图标 -->
            <img
              v-if="borrower.gender==0"
              src="../../assets/hide.png"
              style="width: 30px; float:left; margin-top:5px"
            />
            <img
              v-else-if="borrower.gender==1"
              src="../../assets/boy.png"
              style="width: 30px; float:left; margin-top:5px"
            />
            <img v-else src="../../assets/girl.png" style="width: 30px; float:left; margin-top:5px" />
          </el-form-item>

          <el-form-item label="手机：" style="text-align:left">{{borrower.phoneNumber}}</el-form-item>
          <el-form-item label="工龄：" style="text-align:left">{{borrower.lengthOfService}}年</el-form-item>
          <el-form-item label="工资：" style="text-align:left">￥{{borrower.salary}}</el-form-item>
          <!-- 中间加条横线 -->
          <div
            style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"
          />
          <el-form-item label="失信次数：" style="text-align:left">{{borrower.discreditedRecords}}</el-form-item>
          <el-form-item label="信用评级：" style="text-align:left">{{borrower.rank}}</el-form-item>
        </el-form>
      </div>
    </el-dialog>

      <el-dialog style=" font-size: 14px " :visible.sync="addVisible" :rules="rules">
        <h2 style="text-align: center;color: #606266; font-size:30px">审核</h2>

        <el-form
          :model="review"
          label-width="130px"
          label-position="left"
          :rules="rules"
          style="text-align:left;margin-left:10%;margin-right:10%"
        >
          <el-form-item label="内容是否属实" prop="state" style>
            <el-radio-group v-model="review.state">
              <el-radio label="内容属实"></el-radio>
              <el-radio label="内容不属实"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- <span style="display:inline-block;text-align:center;">
            分期
          </span>-->
          <el-form-item label="评级" class="input" prop="rank">
            <el-select v-model="review.rank" placeholder="请选择评级" label="评级" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="描述" prop="desc" class="input">
            <el-input
              v-model="review.desc"
              autocomplete="off"
              placeholder="请输入描述"
              type="textarea"
              aotosize
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="handleSave()">提交审核</el-button>
      </el-dialog>

      <el-main>
        <el-table
          :data="requestData.slice(pageIndex*10-10, pageIndex*10)"
          border
          default-expand-all
        >
          <el-table-column align="center" prop="userId" label="申请人id" sortable>
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-button size="mini" @click="getBorrower(scope.row.userId);detailVisible=true">{{scope.row.userId}}</el-button>
                </div>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="commitTime" label="提交时间" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.commitTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="负债金额">
            <template slot-scope="scope">
              <span>￥{{ scope.row.unpaidLoan }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="名下房产价值">
            <template slot-scope="scope">
              <span>￥{{ scope.row.propertyValue }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="配偶工作情况">
            <template slot-scope="scope">
              <span>{{ spouseState(scope.row.isSpouseWork) }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="附件材料">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="getFile(scope.row.filePath)">点击下载</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="success"
                round
                size="mini"
                @click="addVisible = true; userId = scope.row.userId"
              >审核</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="100*(requestData.length/10)"
        ></el-pagination>
      </el-main>
    </el-container>
  </div>
</template>



<script>
import { post, get } from "../../request/http.js";

export default {
  data() {
    return {
      detailVisible: false,
      addVisible: false,
      systemName: "审核员界面",
      requestData: [],
      pageIndex: 1,
      borrower: [],
      userId: null,
      options: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        },
        {
          value: 5,
          label: "5"
        }
      ],

      review: {
        rank: null,
        state: null,
        desc: null
      },
      // 校验规则
      rules: {
        rank: [{ required: true, message: "评级不能为空", trigger: "blur" }],
        state: [
          { required: true, message: "是否属实不能为空", trigger: "blur" }
          // {min:5,message:'密码长度必须大于5个字符字符',}
        ],
        desc: [
          { required: true, message: "评价不能为空", trigger: "blur" }
          // {min:5,message:'密码长度必须大于5个字符字符',}
        ]
      }
    };
  },
  methods: {
    bell: function() {
      this.$router.push({ path: "/reviewer/reviewerinformation" });
    },

    getBorrower(id) {
      var res = get("/api/userProfile/" + id, {});
      res.then(bdata => {
        this.borrower = bdata.data;
        console.log(this.borrower);
      });
    },

    getGender(state) {
      if (state == 0) {
        return "未设置";
      } else {
        return state == 1 ? "男" : "女";
      }
    },
    spouseState(state) {
      return state == 0 ? "目前无配偶或配偶无工作" : "配偶有工作";
    },

    getFile(path) {
      var res = get("/api/audit/downloadFile", { filePath: path });
      res.then(file => {
        console.log(file);
        console.log(path);
        if (file.code == 0) {
          this.$msgbox({
            title: "提示",
            message: file.msg,
            type: "success"
          });
        } else {
          this.$msgbox({
            title: "提示",
            message: file.msg,
            type: "error"
          });
        }
      });
    },
    result(state) {
      if (state != null) {
        return state == 1 ? "属实" : "不属实";
      }
    },

    getState(str) {
      if (str == "内容属实") {
        this.review.stateValue = 1;
      } else {
        this.review.stateValue = 2;
      }
    },

    getData() {
      var req = get("/api/audit/allToProcess", {});
      req.then(rdata => {
        this.requestData = rdata.data;
        console.log(rdata);
      });
    },

    handleSave() {
      var stateValue = this.review.state == "内容属实" ? 1 : 2;

      var res = post("/api/audit/processAuditedInformation", {
        userId: this.userId,
        state: stateValue,
        desc: this.review.desc,
        rank: this.review.rank
      });
      res.then(data => {
        console.log(data);
        if (data.code == 0) {
          this.addVisible = false;
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "success"
          });

          this.getData();
        } else {
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "error"
          });
        }
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
    }
  },

  mounted() {
    this.getData();
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

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 30px;
  min-height: 90vh;
}

.system-name {
  float: left;
  margin-left: 70px;
  font-size: 20px;
}

.el_table {
  width: 100%;
}

.bell {
  float: right;
  margin-right: 70px;
}
.reviewer {
  font-size: 18px;
  float: right;
  margin-right: 30px;
}
</style>