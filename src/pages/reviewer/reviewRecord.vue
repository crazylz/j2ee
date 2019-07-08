<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <el-dialog :visible.sync="detailVisible" top="5vh" width="40%" v-if="user!=null">
        <div class="card-div">
          <div
            style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 10px"
          >| 基本资料</div>

          <div style="margin-top: 60px; float: left;">
            <img src="../../assets/user.png" />
          </div>
          <el-form ref="base-form" class="base-form" label-position="right" label-width="200px">
            <el-form-item>
              <label style="float:left;margin-left:40px">用户名</label>
              <br />
              <label
                style="font-size:30px; float:left; margin-top:5px; margin-left:40px; color:#2b3080"
              >{{user.name}}</label>
            </el-form-item>

            <el-form-item label="性别：" label-width="200px">
              <img
                v-if="user.gender==0"
                src="../../assets/hide.png"
                style="width: 30px; float:left; margin-top:5px"
              />
              <img
                v-else-if="user.gender==1"
                src="../../assets/boy.png"
                style="width: 30px; float:left; margin-top:5px"
              />
              <img
                v-else
                src="../../assets/girl.png"
                style="width: 30px; float:left; margin-top:5px"
              />
            </el-form-item>

            <el-form-item label="手机：" style="text-align:left">{{user.phoneNumber}}</el-form-item>
            <el-form-item label="工龄：" style="text-align:left">{{user.lengthOfService}}年</el-form-item>
            <el-form-item label="工资：" style="text-align:left">￥{{user.salary}}</el-form-item>
            <div
              style="background:#afaaaa; height:1px; margin-left: 100px; margin-right: 50px; margin-bottom:25px"
            />
            <el-form-item label="失信次数：" style="text-align:left">{{user.discreditedRecords}}</el-form-item>
            <el-form-item label="信用评级：" style="text-align:left">{{user.rank}}</el-form-item>
          </el-form>
        </div>
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
                <el-button
                  size="mini"
                  plain
                  round
                  type="info"
                  @click="getuser(scope.row.userId);"
                >{{scope.row.userId}}</el-button>
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

          <el-table-column align="center" label="描述">
            <template slot-scope="scope">
              <span>{{ getDesc(scope.row.state, scope.row.evaluationDesc) }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="评级">
            <template slot-scope="scope">
              <span>{{ getRank(scope.row.state, scope.row.evaluationRank) }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="审核状态" width="120px" fixed="right">
            <template slot-scope="scope">
              <div style="200px; text-align:left;margin-left:20px">
                <img :src="getStateImg(scope.row.state)" width="15px" />
                <span
                  :class="textColor(scope.row.state)"
                  style="margin-left:5px"
                >{{ getState(scope.row.state) }}</span>
              </div>
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
import wrongImg from "../../assets/wrong.png";
import successImg from "../../assets/green_circle.png";
import warningImg from "../../assets/warning.png";

export default {
  data() {
    return {
      detailVisible: false,
      requestData: [],
      pageIndex: 1,
      user: []
    };
  },
  methods: {
    bell: function() {
      this.$router.push({ path: "/reviewer/reviewerinformation" });
    },

    getuser(id) {
      var res = get("/api/userProfile/" + id, {});
      res.then(bdata => {
        this.user = bdata.data;
        this.user == null
          ? (this.detailVisible = false)
          : (this.detailVisible = true);
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
        if (file.code != 1) {
          const content = file;
          const blob = new Blob([content]);
          const fileName = path;
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }

          this.$msgbox({
            title: "提示",
            message: "开始下载",
            type: "success"
          });
        } else {
          this.$msgbox({
            title: "提示",
            message: "下载失败",
            type: "error"
          });
        }
      });
    },

    getDesc(state, desc) {
      if (state == 0) return "--";
      else return desc;
    },

    getRank(state, rank) {
      if (state == 0) return "--";
      else return rank;
    },

    getState(state) {
      if (state == 0) return "未审核";
      else if (state == 1) return "属实";
      else return "不属实";
    },

    textColor(state) {
      return {
        yellow: state == 0,
        green: state == 1,
        red: state == 2
      };
    },

    getStateImg(state) {
      if (state == 0) return warningImg;
      else if (state == 1) return successImg;
      else return wrongImg;
    },

    getData() {
      var req = get("/api/audit/allAuditedInformation", {});
      req.then(rdata => {
        console.log(rdata);
        this.requestData = rdata.data;
      });
    },

    handleSizeChange(val) {},

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

.yellow {
  color: #e6a23c;
}

.green {
  color: #67c23a;
}
.red {
  color: #f56c6c;
}
</style>