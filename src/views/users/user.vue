<template>
  <div class="app-container">
    <div class="right-items" style="float: right">
      <el-button
        type="primary"
        :style="{ display: show_button }"
        @click="dialogFormVisible = true"
        >新建用户</el-button
      >
      <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth">
            <el-input
              v-model="form.confirmPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="监控间隔" :label-width="formLabelWidth">
            <el-input
              v-model="form.polling_interval"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="钉钉token" :label-width="formLabelWidth">
            <el-input
              v-model="form.dingding_token"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddUser()">保存</el-button>
        </span>
      </el-dialog>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <p>{{ scope.$index + 1 }}</p>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="监控间隔" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px"
            >{{ scope.row.polling_interval }}秒</span
          >
        </template>
      </el-table-column>
      <el-table-column label="钉钉token" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.dingding_token }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.create_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleUserDetails(scope.row.id, 'dingding')"
            >修改钉钉</el-button
          >
          <el-dialog title="修改钉钉" :visible.sync="EditdingdingVisible">
            <el-form :model="form">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input
                  v-model="form.username"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="监控间隔" :label-width="formLabelWidth">
                <el-input
                  v-model="form.polling_interval"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="钉钉token" :label-width="formLabelWidth">
                <el-input
                  v-model="form.dingding_token"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="EditdingdingVisible = false">取消</el-button>
              <el-button
                :plain="true"
                type="primary"
                @click="handleEditUser(form.id)"
                >保存</el-button
              >
            </span>
          </el-dialog>
          <el-button
            size="mini"
            type="warning"
            @click="handleUserDetails(scope.row.id, 'password')"
            >修改密码</el-button
          >
          <el-dialog title="修改密码" :visible.sync="EditUserFormVisible">
            <el-form :model="form">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input
                  v-model="form.username"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="原密码" :label-width="formLabelWidth">
                <el-input
                  v-model="form.originPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="修改密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input
                  v-model="form.confirmPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="EditUserFormVisible = false">取消</el-button>
              <el-button
                :plain="true"
                type="primary"
                @click="handleEditPassword()"
                >保存</el-button
              >
            </span>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            :style="{ display: show_button }"
            @click="handleDeleteUser(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import {
  getUserList,
  addUser,
  putUser,
  deleteUser,
  getUserDetail,
  changePassword,
} from "@/api/user";
import store from "@/store/";
export default {
  data() {
    getUserList().then((res) => {
      this.tableData = res;
      this.show_button = store.getters.is_superuser == true ? "" : "none";
    });
    console.log(store.getters.is_supseruser);

    return {
      tableData: [],
      show_button: "none",
      dialogFormVisible: false,
      EditdingdingVisible: false,
      EditUserFormVisible: false,
      form: {
        id: 0,
        username: "",
        password: "",
        originPassword: "",
        confirmPassword: "",
        dingding_token: "",
        polling_interval: 30,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleUserDetails(id, type) {
      getUserDetail(id).then((res) => {
        this.form = res;
        if (type == "dingding") {
          this.EditdingdingVisible = true;
        } else {
          this.EditUserFormVisible = true;
        }
      });
    },
    handleEditUser(id) {
      putUser(id, this.form).then((res) => {
        getUserList().then((res) => {
          this.tableData = res;
          this.EditdingdingVisible = false;
          this.$message({
            showClose: true,
            message: "保存成功",
            type: "success",
          });
        });
      });
    },
    handleEditPassword() {
      console.log(this.form);
      changePassword(this.form).then((res) => {
        if (res.code == 20000) {
          getUserList().then((res) => {
            this.tableData = res;
            this.EditUserFormVisible = false;
            this.$message({
              showClose: true,
              message: "保存成功",
              type: "success",
            });
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleDeleteUser(id) {
      console.log(id);
      deleteUser(id).then((res) => {
        getUserList().then((res) => {
          this.tableData = res;
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
        });
      });
    },
    handleAddUser() {
      this.form.user = store.getters.user;
      addUser(this.form).then((res) => {
        if (res.code == 20000) {
          this.dialogFormVisible = false;
          getUserList().then((res) => {
            this.tableData = res;
            this.$message({
              showClose: true,
              message: "保存成功",
              type: "success",
            });
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleGetUserkList() {
      let res = getUserList();
      console.log(res);
      this.tableData = res;
    },
  },
};
</script>
