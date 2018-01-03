<template>
  <div class="storeAdd">
    <panel-title :title="$route.meta.title">
    </panel-title>
    <el-form ref="form" :model="form" label-width="150px" >
      <el-form-item label="分部-销售部-城市" prop="selectBranch">
        <el-select class="width_input" v-model="form.selectBranch" clearable placeholder="请选择分部信息">
          <el-option label="是" value="yes"></el-option>
          <el-option label="否" value="no"></el-option>
        </el-select>
        <el-select class="width_input" v-model="form.selectSaledepartment" clearable placeholder="请选择销售部信息"
                   :disabled="form.selectBranch===''">
          <el-option label="是" value="yes"></el-option>
          <el-option label="否" value="no"></el-option>
        </el-select>
        <el-select class="width_input" v-model="form.selectCity" clearable placeholder="请选择城市信息"
                   :disabled="form.selectSaledepartment===''|| form.selectBranch===''">
          <el-option label="是" value="yes"></el-option>
          <el-option label="否" value="no"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门店名称" prop="storeName">
        <el-input class="width_input" v-model="form.storeName" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item label="门店地址" prop="storeAddress">
        <el-input class="width_input" v-model="form.storeAddress" placeholder="请输入门店地址"></el-input>
      </el-form-item>
      <el-form-item label="是否关闭" prop="isClosed">
        <el-radio-group v-model="form.isClosed">
          <el-radio label="未关闭"></el-radio>
          <el-radio label="已关闭"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否扩大经营" prop="isExpanded">
        <el-radio-group v-model="form.isExpanded">
          <el-radio label="否" ></el-radio>
          <el-radio label="是" ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否添加网外城市" prop="isAddtoOffNet">
        <el-radio-group v-model="form.isAddtoOffNet">
          <el-radio label="否"></el-radio>
          <el-radio label="是"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="add" @click="addForm('form')">添加</el-button>
        <el-button icon="edit" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="divide"></div>
  </div>
</template>
<script>
  import '../../assets/scss/main.scss'
  import {panelTitle,bottomToolBar,mainContentfold} from 'components'
  export default {
    data() {
      return {
        form: {
          storeName:'',
          storeAddress:'',
          selectBranch:'',
          selectCity:'',
          selectSaledepartment:'',
          isClosed:'未关闭',
          isExpanded:'否',
          isAddtoOffNet:'否',
        },
        dialogVisible:false,
        isFold:false,
        currentPage:1,
        total:20,
        length:15,
        load_data:false,
        tableData: [{loginAccount:'15088754169',accountStatus:'正常',
          saleNumber:'00300200425',accountNumber:'00300200425',saleName:'程珊珊',
          level:'FP2',standardScore:'940',position:'客户经理',isOrdered:'是',team:'程艳红团队',store:'上城',city:'杭州',saleDepartment:'杭州',inwhichDepartment:'第二分部',isbindinWechat:'o-YZ9wLNouLqlKHrHf_l9ktMtd_Q'}],
        currentRow: null
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
      mainContentfold
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      fold(){
        this.isFold = !this.isFold;
      },
      on_refresh(){
        //this.get_table_data();
        //this.load_data=true;
      },
      addForm(val){
        if(this.form.storeName==''||this.form.storeAddress==''||this.form.selectBranch==''|| this.form.selectCity==''|| this.form.selectSaledepartment==''|| this.form.isClosed==''||this.form.isExpanded==''||this.form.isAddtoOffNet==''){
          this.$confirm('您有未填项，请完善资料!', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          console.log('您有未填项，请完善资料!');
        }else{
          this.$message.success("已添加")
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.selectSaledepartment='';
        this.form.selectCity='';
        this.form.isClosed='未关闭';
        this.form.isExpanded='否';
        this.form.isAddtoOffNet='否';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style lang="scss" >
.storeAdd{
  .el-form-item{
    margin:15px 0;
  }
  .width_input{
    width:30%;
  }
  .el-button{
    padding:10px 20px;
    margin-right:5px;
    margin-top:10px;
  }
  .block{
    text-align:center;
  }
  .el-pagination{
    padding:20px 10px;
  }
}

</style>
