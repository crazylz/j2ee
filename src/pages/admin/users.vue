<template>
  <div>
    <el-breadcrumb
      separator="/"
      style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;"
    >
      <el-breadcrumb-item :to="{ path: '/adminhome' }">管理员</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminhome/users' }">管理用户</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片布局 -->
    <div style="margin-right:0px; padding: 10px;background:#fff;text-align:left">
      <img src="../../assets/laba.png" style="width:20px;margin-top:10px;margin-right:10px" />
      <span style="color:gray; font-size:14px">请管理员谨慎管理系统数据资料，避免误删错删，恢复数据请联系数据库管理人员。</span>
      <br />
      <!-- 新建贷款button -->
      <el-button
        icon="el-icon-plus"
        style="float:right;margin-right:20px"
        plain
        type="info"
        size="small"
        @click="addOneVisible = true"
      >手动导入用户</el-button>
      <el-button
        icon="el-icon-upload"
        style="float:right;margin-right:20px"
        plain
        type="info"
        size="small"
        @click="addBatchVisible = true"
      >批量导入用户</el-button>
      <br />
    </div>

    <!-- 导入单个用户弹窗 -->
    <el-dialog
      style=" font-size: 14px "
      :visible.sync="addOneVisible"
      @close="closeDialog('employeeInfoForm')"
    >
      <h2 style="text-align: center;color: #606266; font-size:30px">手动导入用户</h2>
      <p style="align:left">注意：请确保所有字段均填写完毕，并保证导入用户资料的真实性。</p>
      <el-form
        ref="employeeInfoForm"
        :model="employeeInfo"
        label-width="200px"
        :rules="employeeInfoRules"
        label-position="right"
        style="margin-right:10%; text-align:left"
      >
        <el-form-item label="工号" prop="employeeId" class="input">
          <el-input
            v-model="employeeInfo.employeeId"
            type="text"
            placeholder="请输入员工工号"
            maxlength="20"
            show-word-limit
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" class="input">
          <el-input
            v-model="employeeInfo.name"
            type="text"
            maxlength="10"
            show-word-limit
            placeholder="请输入员工姓名"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCardNumber" class="input">
          <el-input
            v-model="employeeInfo.idCardNumber"
            type="text"
            maxlength="18"
            show-word-limit
            placeholder="请输入员工身份证，如 441723***708110034"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" class="input" prop="gender">
          <el-select v-model="employeeInfo.gender" label="性别">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工资（¥）" prop="salary" class="input">
          <el-input
            v-model="employeeInfo.salary"
            type="text"
            placeholder="请输入员工月薪"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工龄（年）" prop="lengthOfService" class="input">
          <el-input
            v-model="employeeInfo.lengthOfService"
            type="text"
            placeholder="请输入员工工龄"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="第三方支付账号" prop="paymentAccount" class="input">
          <el-input
            v-model="employeeInfo.paymentAccount"
            show-word-limit
            placeholder="请输入员工绑定的第三方支付账号"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankAccount" class="input">
          <el-input
            v-model="employeeInfo.bankAccount"
            type="text"
            placeholder="请输入员工的工资卡号"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="info" @click="addOneVisible=false">取消导入</el-button>
      <el-button type="primary" @click="handleAddOneEmployee()">确认导入</el-button>
    </el-dialog>

    <!-- 批量导入用户弹窗 -->
    <el-dialog style="font-size: 14px" :visible.sync="addBatchVisible" @close="closeUploadDialog">
      <h2 style="text-align: center;color: #606266; font-size:30px">批量导入用户</h2>

      <div style="text-align:left">
        <p>请按照指定格式批量导入员工资料，选择类型为 xls/xlsx 的文件上传，文件的格式如下：</p>
        <img src="../../assets/upload_file_example.png" width="100%" />
        <p>注意：为了文件能被正确解析，请确保所有字段都已经填写完毕，其中性别可选填“未设置／男／女”，“身份证／第三方支付账号／银行卡账号”的字段需要避免被识别为数字，可以输入半角单引号后键入回车，如 '441723199701010001。</p>
        <el-upload
          ref="upload"
          action="/api/admin/batchImportUserProfile"
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
          <el-button icon="el-icon-plus" slot="trigger" size="small" type="success">选取文件</el-button>
        </el-upload>
        <p style="color:gray;font-size:12px">最大上传10MB的文件</p>
      </div>
      <el-button type="info" @click="addBatchVisible=false">取消导入</el-button>
      <el-button type="primary" @click="uploadSummit()">确认导入</el-button>
    </el-dialog>

    <!-- 导入数据弹窗 -->
    <el-dialog style="font-size: 14px " width="500px" :visible.sync="addBatchResVisible">
      <h2 style="text-align: center;color: #606266; font-size:30px">文件解析处理完毕</h2>
      <p>{{ addBatchResMsg }}</p>
      <el-table :data="addBatchRes" max-height="435px">
        <el-table-column label="工号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="信息" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.msg}}</span>
          </template>
        </el-table-column>
        <el-table-column label="导入结果" align="center">
          <template slot-scope="scope">
            <img :src="getCodeImg(scope.row.code)" height="15px"/>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 所有用户信息表格 -->
    <el-table ref="filterTable" :data="all_tableData.slice(pageIndex*10-10, pageIndex*10)">
      <el-table-column type="expand" width="100px">
        <template slot-scope="props">
          <div style="float:left;margin-left:70px;margin-right:70px;width:600px;">
            <el-row>
              <el-col :span="5">
                <span>手机号码</span>
              </el-col>
              <el-col :span="7">
                <span>{{ handleNull(props.row.phoneNumber) }}</span>
              </el-col>
              <el-col :span="3">
                <span>QQ</span>
              </el-col>
              <el-col :span="9">
                <span>{{ handleNull(props.row.qq) }}</span>
              </el-col>
              <el-col :span="5">
                <span>身份证</span>
              </el-col>
              <el-col :span="7">
                <span>{{ props.row.idCardNumber }}</span>
              </el-col>
              <el-col :span="3">
                <span>地址</span>
              </el-col>
              <el-col :span="9">
                <span>{{ handleNull(props.row.address) }}</span>
              </el-col>
              <el-col :span="5">
                <span>第三方支付账号</span>
              </el-col>
              <el-col :span="7">
                <span>{{ props.row.paymentAccount }}</span>
              </el-col>
              <el-col :span="3">
                <span>银行卡</span>
              </el-col>
              <el-col :span="9">
                <span>{{ props.row.bankAccount }}</span>
              </el-col>
              <el-col :span="5">
                <span>失信次数</span>
              </el-col>
              <el-col :span="7">
                <span>{{ props.row.discreditedRecords }}</span>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="用户id" align="center" sortable prop="userId">
        <template slot-scope="scope">
          <span>{{ handleId(scope.row.bindId, scope.row.userId)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="工号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.employeeId}}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" align="center" sortable prop="gender">
        <template slot-scope="scope">
          <span>{{getGender(scope.row.gender)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="工资" align="center" sortable prop="salary">
        <template slot-scope="scope">
          <span>{{scope.row.salary}}</span>
        </template>
      </el-table-column>

      <el-table-column label="信用评级" align="center" sortable prop="rank">
        <template slot-scope="scope">
          <span>{{ handleRank(scope.row.rank) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工龄" align="center" sortable prop="lengthOfService">
        <template slot-scope="scope">
          <span>{{scope.row.lengthOfService}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" fixed="right" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleFrozen(scope.row)">账户冻结</el-button>
          <el-button size="mini" type="primary" @click="handleUnfrozen(scope.row)">解除冻结</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="100*(all_tableData.length/10)"
    ></el-pagination>
  </div>
</template>



<script>
import { post, get } from "../../request/http.js";
import green_circle from "../../assets/green_circle.png";
import red_circle from "../../assets/wrong.png";

export default {
  data() {
    return {
      all_tableData: [],
      pageIndex: 1,
      addOneVisible: false,
      addBatchVisible: false,
      addBatchResVisible: false,
      fileList: [],
      addBatchRes: [],
      addBatchResMsg: null,

      employeeInfo: {
        employeeId: null,
        salary: null,
        name: null,
        idCardNumber: null,
        paymentAccount: null,
        bankAccount: null,
        lengthOfService: null,
        gender: null
      },

      employeeInfoRules: {
        employeeId: [
          { required: true, message: "工号不能为空", trigger: "blur" }
        ],
        salary: [{ required: true, message: "工资不能为空", trigger: "blur" }],
        idCardNumber: [
          {
            required: true,
            message: "身份证不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "名字不能为空",
            trigger: "blur"
          }
        ],
        paymentAccount: [
          {
            required: true,
            message: "第三方支付账号不能为空",
            trigger: "blur"
          }
        ],
        bankAccount: [
          {
            required: true,
            message: "银行卡号不能为空",
            trigger: "blur"
          }
        ],
        lengthOfService: [
          {
            required: true,
            message: "工龄不能为空",
            trigger: "blur"
          }
        ],
        gender: [
          {
            required: true,
            message: "请选择员工性别",
            trigger: "blur"
          }
        ]
      },

      genderOptions: [
        { value: 0, label: "不设置" },
        { value: 1, label: "男" },
        { value: 2, label: "女" }
      ]
    };
  },
  methods: {
    handleFrozen(row) {
      this.$confirm("确认冻结该用户？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        var res = post("/api/admin/frozenAccount", { id: row.userId });
        res.then(result => {
          if (result.code == 0) {
            this.$msgbox({
              title: "提示",
              message: result.msg,
              type: "success"
            });
            var res1 = get("/api/admin/users", {});
            res1.then(user => {
              this.all_tableData = user.data;
            });
          } else {
            this.$msgbox({
              title: "提示",
              message: result.msg,
              type: "error"
            });
          }
        });
      });
    },

    handleUnfrozen(row) {
      this.$confirm("确认解冻该用户？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        var res = post("/api/admin/unfrozenAccount", { id: row.bindId });
        res.then(result => {
          if (result.code == 0) {
            this.$msgbox({
              title: "提示",
              message: result.msg,
              type: "success"
            });
            var res1 = get("/api/admin/users", {});
            res1.then(user => {
              this.all_tableData = user.data;
            });
          } else {
            this.$msgbox({
              title: "提示",
              message: result.msg,
              type: "error"
            });
          }
        });
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
    },

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    getGender(state) {
      if (state == 0) {
        return "未设置";
      } else {
        return state == 1 ? "男" : "女";
      }
    },

    handleNull(str) {
      if (str == null || str == "") return "-";
      else return str;
    },

    handleRank(rank) {
      if (rank == 0) return "-";
      else return rank;
    },

    handleId(bindId, id) {
      if (bindId == 0) return "该员工未注册";
      else if (id == 0) return "该账号被冻结";
      else return id;
    },

    closeDialog(formRule) {
      this.$refs[formRule].resetFields();
    },

    isEmpty(str) {
      if (str == null || str == "") return true;
      return false;
    },

    handleAddOneEmployee() {
      if (
        this.isEmpty(this.employeeInfo.employeeId) ||
        this.isEmpty(this.employeeInfo.salary) ||
        this.isEmpty(this.employeeInfo.name) ||
        this.isEmpty(this.employeeInfo.idCardNumber) ||
        this.isEmpty(this.employeeInfo.paymentAccount) ||
        this.isEmpty(this.employeeInfo.bankAccount) ||
        this.isEmpty(this.employeeInfo.lengthOfService)
      ) {
        this.$msgbox({
          title: "提示",
          message: "资料不完整，请确保所有资料填写完毕",
          type: "error"
        });
        return;
      }

      if (this.isEmpty(this.employeeInfo.gender)) this.employeeInfo.gender = 0;

      var res = post("/api/admin/importUserProfile", {
        employeeId: this.employeeInfo.employeeId,
        salary: this.employeeInfo.salary,
        name: this.employeeInfo.name,
        idCardNumber: this.employeeInfo.idCardNumber,
        paymentAccount: this.employeeInfo.paymentAccount,
        bankAccount: this.employeeInfo.bankAccount,
        lengthOfService: this.employeeInfo.lengthOfService,
        gender: this.employeeInfo.gender
      });
      res.then(data => {
        if (data.code == 0) {
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "success"
          });
          this.addOneVisible = false;
          this.getAllUser();
        } else {
          this.$msgbox({
            title: "提示",
            message: data.msg,
            type: "error"
          });
        }
      });
    },

    getAllUser() {
      var res = get("/api/admin/users", {});
      res.then(user => {
        this.all_tableData = user.data;
      });
    },

    uploadSummit() {
      this.$refs.upload.submit();
    },

    closeUploadDialog() {
      this.fileList = [];
    },

    handleSuccess(response, file, fileList) {
      if (response.code == 0) {
        this.addBatchVisible = false;
        this.addBatchRes = response.data;
        this.addBatchResVisible = true;
        this.addBatchResMsg = response.msg;
      } else {
        this.$msgbox({
          title: "提示",
          message: response.msg,
          type: "error"
        });
      }
      return 0;
    },

    handleExceed() {
      this.$msgbox({
        title: "提示",
        message: "最大上传个数为1",
        type: "error"
      });
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    handlePreview(file) {
      // console.log(file);
    },

    getCodeImg(code) {
      if (code == 1) return red_circle;
      else return green_circle;
    }
  },

  computed: {
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
  },

  mounted() {
    this.getAllUser();
  }
};
</script>

<style scoped>
.el-table {
  width: 100%;
}
.el-table.column {
  width: 9.09%;
}
</style>