<template>
  <div class="app-container">
    <div class="right-items" style="float: right">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新建监控</el-button
      >
      <el-dialog title="新建监控" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="股票名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="股票代码" :label-width="formLabelWidth">
            <el-input v-model="form.stock_code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="涨幅" :label-width="formLabelWidth">
            <el-input v-model="form.max_proportion" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="跌幅" :label-width="formLabelWidth">
            <el-input v-model="form.min_proportion" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddStock()"
            >保存</el-button
          >
        </span>
      </el-dialog>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
        <p> {{ scope.$index+1 }}</p>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.name }}</p>
            <p>股票代码: {{ scope.row.stock_code }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="涨幅" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.max_proportion }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="跌幅" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.min_proportion }}%</span>
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
          <el-button size="mini" @click="handleDetails(scope.row.id)"
            >编辑</el-button
          >
      <el-dialog title="编辑" :visible.sync="EditStockFormVisible">
        <el-form :model="form">
          <el-form-item label="股票名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="股票代码" :label-width="formLabelWidth">
            <el-input v-model="form.stock_code" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="涨幅" :label-width="formLabelWidth">
            <el-input v-model=" form.max_proportion" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="跌幅" :label-width="formLabelWidth">
            <el-input v-model="form.min_proportion" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditStockFormVisible = false">取消</el-button>
          <el-button :plain="true" type="primary" @click="handleEdit(form.id)"
            >保存</el-button
          >
        </span>
      </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStockList, addStock, putStock, deleteStock,  getStockDetail} from '@/api/stock'
import store from '@/store/'
export default {
  data() {
    getStockList().then(res =>
      {
        this.tableData = res
      }
    )

    return {
      tableData: [
        // {
        //   id: 1,
        //   date: "2016-05-03",
        //   name: "洛阳钼业",
        //   address: "sz00089",
        //   max_proportion: "2%",
        //   min_proportion: "-3%",
        //   polling_interval: 30,
        // }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      EditStockFormVisible: false,
      form: {
        id: 0,
        name: '',
        stock_code: '',
        max_proportion: '',
        min_proportion: '',
        user: '',
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    handleDetails(id) {
      console.log(id);
      getStockDetail(id).then(
         res =>{
            this.form = res
            this.EditStockFormVisible = true
        }
      )
    },
    handleEdit(id) {
      console.log(id,  this.form);
      putStock(id, this.form).then(
         res =>{
          getStockList().then(res =>
            {
              this.tableData = res
              this.EditStockFormVisible = false
              this.$message({
                showClose: true,
                message: "保存成功",
                type: 'success'
              });
            }
          )
        }
      )
    },
    handleDelete(id) {
      console.log(id);
      deleteStock(id).then(res =>
        {
            getStockList().then(res =>
              {
                this.tableData = res
                this.$message({
                  showClose: true,
                  message: "删除成功",
                  type: 'success'
                });
              }
            )
        }
    )

    },
    handleAddStock() {
      this.form.user = store.getters.user
      addStock(this.form).then(
        res =>{
          this.dialogFormVisible = false
          getStockList().then(res =>
            {
              this.tableData = res
              this.$message({
                showClose: true,
                message: "保存成功",
                type: 'success'
              });
            }
          )
        }
      )


    },
    handleGetStockList() {
      let res = getStockList()
      console.log(res)
      this.tableData = res
    },
  },
};
</script>

// https://blog.csdn.net/zhanghs11/article/details/86251533?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161763971316780271535648%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=161763971316780271535648&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-86251533.pc_search_result_before_js&utm_term=el-button+%E5%8F%B3%E5%AF%B9%E9%BD%90