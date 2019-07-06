<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/userhome' }">用户</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userhome/credit' }">个人征信</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 征信资料卡片 -->
    <div class="credit_table">
      <label
        style="font-weigth:bold; font-size: 20px; float: left; margin-left: 10px; margin-top: 10px;"
      >| 填写征信资料</label>

      <br />
      <br />
      <label
        style="font-size: 15px; float: left; margin-left: 5%;color:gray;width:80%; text-align:left"
      >
        温馨提示：请准确填写下列征信审核资料，并上传相应的征信报告。征信报告分为个人信用报告以及企业信用报告，是由中国人民银行征信中心出具的记载个人信用信息的记录，个人信用报告是信用历史的客观记录，记录个人欠债还清、合同履行、遵纪守法等信息，获取请
        <a
          href="http://www.pbccrc.org.cn/"
          target="_blank"
          style="color:gray"
        >点击这里</a>。
      </label>

      <br />
      <br />
      <el-form ref="form" :model="form" label-position="right" class="inner_credit">
        <h5>| 资金情况</h5>
        <el-form-item label="负债金额">
          <el-input v-model="form.debt" placeholder="无负债请填写 “0”" style="width: 23%" size="medium"></el-input>
        </el-form-item>

        <el-form-item label="房产">
          <el-select v-model="form.house" placeholder="请选择房产类型" size="medium">
            <el-option label="无房产" value="0"></el-option>
            <el-option label="有房产，价值0~30w" value="150000"></el-option>
            <el-option label="有房产，价值30~50w" value="400000"></el-option>
            <el-option label="有房产，价值50~100w" value="750000"></el-option>
            <el-option label="有房产，价值100w以上" value="1150000"></el-option>
          </el-select>
        </el-form-item>

        <h5>| 家庭情况</h5>
        <el-form-item label="配偶是否有工作">
          <el-radio-group v-model="form.spouse">
            <el-radio label="配偶有工作"></el-radio>
            <el-radio label="目前无配偶或配偶无工作"></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>-->
        <h5>| 材料</h5>
        <el-form-item label="附件材料">
          <el-upload
            ref="upload"
            action="/api/audit/auditedInformation/file"
            :headers="heads"
            :data="paras"
            :multiple="false"
            :limit="1"
            :on-exceed="handleExceed"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <div slot="tip" class="el-upload__tip">最大上传10MB大小的文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
        <br />
      </el-form>
    </div>
    <br />
    <el-table :data="tableData">
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

      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">
          <span>{{ scope.row.commitTime | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="审核结果">
        <template slot-scope="scope">
          <span>{{result(scope.row.state)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="审核评价">
        <template slot-scope="scope">
          <span>{{ scope.row.evaluationDesc }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center">
        <template slot="header">
          <span>信用评级</span>
          <el-tooltip effect="dark" placement="top">
            <div slot="content">
              信用评级是审核员对用户资料真实性<br />
              和资金状况的评价，范围在 1～5 内，<br/>
              审核资料没有通过将不会显示本栏。
            </div>
            <i class="el-icon-question" style="color:#409eff"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span style="font-size:28px;color:orange">{{ rankState(scope.row.evaluationRank) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { post, get, post2 } from "../../request/http.js";

export default {
  data() {
    return {
      form: {
        debt: null,
        house: null,
        spouse: "",
        spouseValue: null
      },
      tableData: [],
      fileList: []
    };
  },

  methods: {
    onSubmit() {
      this.$refs.upload.submit();

      var res = post("/api/audit/auditedInformation", {
        unpaidLoan: this.form.debt,
        propertyValue: this.form.house,
        isSpouseWork: this.form.spouseValue
      });
      res.then(result => {
        console.log(result);
        if (result.code == 0) {
          this.$msgbox({
            title: "提示",
            message: result.msg,
            type: "success"
          });
        } else {
          this.$msgbox({
            title: "提示",
            message: result.msg,
            type: "error"
          });
        }
      });
    },

    handleSuccess() {
      return 0;
    },

    handleExceed() {
      this.$msgbox({
        title: "提示",
        message: "最大上传个数为1",
        type: "error"
      });
    },

    submitUpload() {
      this.$refs.upload.submit();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
      console.log(file);
    },
    spouseState(state) {
      return state == 0 ? "目前无配偶或配偶无工作" : "配偶有工作";
    },

    rankState(rank) {
      if (rank != null) {
        if (rank == 0) return "";
        else return rank;
      }
    },

    result(state) {
      if (state != null) {
        if (state == 0) return "未审核";
        else if (state == 1) return "属实";
        else return "不属实";
      }
    },

    getFile(path) {
      var res = get("/api/audit/downloadFile", { filePath: path });
      res.then(file => {
        if (file.code != 1) {
          const content = file;
          const blob = new Blob([content]);
          const fileName = path.substring(path.lastIndexOf("/")+1);
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
    }
  },

  mounted() {
    var res = get("/api/audit/auditedInformation", {});
    res.then(cinfo => {
      this.tableData.push(cinfo.data);
      console.log(this.tableData);
    });
  },

  watch: {
    newValue(val, oldVal) {
      if (val == "配偶有工作") {
        this.form.spouseValue = 1;
      } else {
        this.form.spouseValue = 0;
      }
      console.log(this.form.spouseValue);
    }
  },

  computed: {
    newValue() {
      return this.form.spouse;
    },

    paras() {
      let params = {
        file: this.fileList[0]
      };
      return params;
    },

    heads() {
      let head = {
        "Access-Session": localStorage.getItem("session")
      };
      return head;
    }
  }
};
</script>

<style scoped>
.el-form {
  text-align: left;
  width: 50%;
}
.credit_table {
  background: white;
  width: 100%;
  border-radius: 20px;
  margin: 0 auto;
}
.inner_credit {
  text-align: left;
  margin-left: 5%;
}
.el-tooltip__popper {
  max-width: 50px;
  line-height: 180%;
}
</style>