<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <el-form ref="form" :model="form" label-width="80px" style="display:flex;">
      <el-form-item label="门店名称" prop="storeName">
        <el-input
          class="width_input"
          v-model="form.storeName"
          placeholder="按门店名称查询"
          icon="search"
          :on-icon-click="submitForm"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="城市名称" prop="city">
        <el-input
          class="width_input"
          v-model="form.city"
          placeholder="请输入城市名称"
          icon="search"
          :on-icon-click="submitForm"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="门店状态" prop="storeState1">
        <el-radio-group v-model="form.closeStatus">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">关闭</el-radio-button>
          <el-radio-button label="0">未关闭</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="网外城市" prop="offnetCity1">
        <el-radio-group v-model="form.extended">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">网外城市</el-radio-button>
          <el-radio-button label="0">非网外城市</el-radio-button>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <el-form label-width="150px">
      <el-form-item label="分部-销售部-城市" prop="selectBranch">
        <el-cascader
          expand-trigger="hover"
          placeholder="试试搜索城市"
          :options="cities"
          v-model="orgCity"
          filterable
          clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" @click="submitForm">查询</el-button>
        <el-button icon="edit" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中..."
      border>
      <el-table-column
        property="id"
        type="index"
        width="55">
      </el-table-column>
      <el-table-column
        property="department"
        label="销售部"
        width="120">
      </el-table-column>
      <el-table-column
        property="realCityName"
        label="城市名称"
        width="120">
      </el-table-column>
      <el-table-column
        property="city"
        label="城市"
        width="120">
      </el-table-column>

      <!--<el-table-column
        property="storePhone"
        label="门店固定电话"
        width="130">
      </el-table-column>-->

      <!--<el-table-column
        property="storeMobile"
        label="门店电话"
        width="130">
      </el-table-column>-->
      <el-table-column
        property="storeName"
        label="门店名称"
        width="120">
      </el-table-column>

      <!--<el-table-column
        property="storeId"
        label="门店id"
        width="260">
      </el-table-column>-->

      <el-table-column
        property="branch"
        label="分部名称"
        width="120">
      </el-table-column>

      <el-table-column
        property="address"
        label="门店地址"
        width="350">
      </el-table-column>
      <!--<el-table-column
        property="specifiedSale"
        label="有无固定的自然流入接单销售"
        width="150">
        <template scope="scope">
          <span>{{ scope.row.specifiedSale ? '有' : '无'  }}</span>
        </template>
      </el-table-column>-->
      <!--<el-table-column
        property="customRelationShipLimit"
        label="门店绑定天数"
        width="120">
      </el-table-column>-->
      <el-table-column
        property="closeStatus"
        label="是否关闭"
        width="120">
        <template scope="scope">
          <span>{{ scope.row.close ? '是' : '否'  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="extended"
        label="是否扩大经营范围"
        width="150">
        <template scope="scope">
          <span>{{ scope.row.extended ? '是' : '否'  }}</span>
        </template>
      </el-table-column>
      <!--操作分支-->
      <el-table-column
        label="操作"
        fixed="right"
        v-if="permissions.indexOf(12) > -1 && permissions.indexOf(13) > -1"
        width="300px;">
        <template scope="props">
          <el-button
            style="margin:5px!important;"
            v-if="permissions.indexOf(13) > -1"
            :plain="true"
            type="warning" size="small"
            @click="addToOtherCity(props.row.id)"
            icon="edit">
            添加到网外城市
          </el-button>
          <el-dialog title="添加门店到网外城市" :visible.sync="isAddStore" :modal-append-to-body=false  >
            <el-input
              v-model="targetCity"
              class="width_input"
              placeholder="请输入城市名"
            >
            </el-input>
            <el-button type="primary" @click="addCity">确定</el-button>
          </el-dialog>
          <el-button
            style="margin:5px!important;"
            v-if="permissions.indexOf(12) > -1"
            @click="closeTargetStore(props.row.id)"
            :plain="true"
            type="danger" size="small"
            icon="close"
            :disabled="props.row.close">
            关闭门店
          </el-button>
          <el-dialog
            title="确定要关闭门店吗"
            :visible.sync="isConfirmClose"
            :modal-append-to-body=false
            size="tiny"
          >
            <span slot="footer" class="dialog-footer">
              <el-button @click="isConfirmClose = false">取 消</el-button>
              <el-button type="primary" @click="confirmCloseStore">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="onPageSizeChange"
        @current-change="onPageNoChange"
        :current-page="form.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import '../../assets/scss/main.scss'
  import { panelTitle,bottomToolBar } from 'components'
  import { searchBranchDepartment ,getStoreList,extendStore,closeStore} from '../../service/getData';
  export default {
    data() {
      return {
        form: {
          closeStatus:"", //是否关闭
          city:'',
          storeName:'',
          extended:'',  //是否为网外城市
          pageNo:1,
          pageSize:10
        },
        total:0,
        cities:[],
        loading:false,
        tableData: [],
        isAddStore:false,
        targetCity:'',
        orgCity:[],
        storeId:'',
        isConfirmClose:false,
        sourceId:'',
        permissions:''
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      this.permissions = this.$store.state.permissions;
      searchBranchDepartment().then(data => {
        this.cities = data.data;
      })
      this.getDataList();
    },
    watch: {
      'form.extended':function(curVal,oldVal) {
        this.form.extended = curVal ;
        this.getDataList();
      },
      'form.closeStatus':function(curVal,oldVal) {
        this.form.closeStatus = curVal ;
        this.getDataList();
      },
      orgCity(curVal) {           //三级城市级联
        this.form.city = curVal[2];
        this.getDataList();
      }
    },
    methods: {
      getDataList(){
        this.loading = true ;
        getStoreList(this.form).then(data => {
          this.loading = false ;
          if(data.error) return ;
          this.tableData = data.data.data;
          this.total = data.data.total;
        })
      },
      confirmCloseStore() {
        closeStore({
          id:this.storeId
        }).then(data => {
          this.isConfirmClose = false;
          if(data.error) return;
          this.getDataList();
          this.$message({
            message: '您已成功关闭该门店',
            type: 'success'
          });
        })
      },

      closeTargetStore(id){
        this.storeId = id;
        this.isConfirmClose = true;
      },
      addToOtherCity(id) {
        this.isAddStore = true;
        this.sourceId = id;
      },
      addCity() {
        extendStore({
          sourceId:this.sourceId,
          targetCity:this.targetCity
        }).then(data => {
          if(data.error) return ;
          this.isAddStore = false;
          this.getDataList();
          this.$message({
            message: '恭喜您，修改成功',
            type: 'success'
          });
        })
      },
      submitForm(){
        this.getDataList();
      },
//      清空
      resetForm() {
        this.form.storeName = '';
        this.form.city = '';
        this.form.extended = '';
        this.form.closeStatus = '';
      },
      onPageSizeChange(val) {
        this.form.pageSize=val;
        this.getDataList();
      },
      onPageNoChange(val) {
        this.form.pageNo = val;
        this.getDataList();
      }
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
.panel{
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
