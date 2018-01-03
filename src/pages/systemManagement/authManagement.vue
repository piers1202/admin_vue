<template>
  <div class="authManagement">
    <panel-title :title="$route.meta.title"></panel-title>
    <el-tabs v-model="activeName" @tab-click="onTabsChange">
      <el-tab-pane label="权限管理" name="first">
        <el-table
          :data="tableData"
          border
          style="width: 100%">

          <el-table-column
            prop="loginName"
            label="姓名"
            width="220">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="ID"
            width="220">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="220">
          </el-table-column>

          <el-table-column
            label="操作">
            <template scope="props">
              <el-button @click="onCheckDetail(props)" type="primary" :disabled="props.row.status !=='正常'">查看</el-button>
              <el-button @click="onDisable(props)" :type="props.row.status ==='正常' ? 'warning': 'danger'">{{props.row.status ==='正常' ? '禁用' : '启用'}}</el-button>
              <!--<el-button @click="onDisable(props)" :disabled="props.row.status !=='正常'">禁用</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="second">
        <el-form :inline="true" >
          <el-form-item label="用户名">
            <el-input v-model="form.loginName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onAddAdministrator">确定</el-button>
      </el-tab-pane>

    </el-tabs>

  <el-dialog
    title="权限列表"
    :modal-append-to-body="false"
    :visible.sync ="isDialogShow">
    <div class="tagsList">

      <el-transfer
        v-model="permissions"
        @change="onTransferChange"
        :button-texts="['删除', '添加']"
        :titles="['所有权限', '拥有权限']"
        :props="{
          key: 'id',
          label: 'name',
          id:'id'
        }"
        :data="tags">
        <el-button class="transfer-footer" slot="right-footer" size="small" @click="onSubmit" type="primary">确定</el-button>
      </el-transfer>
    </div>

  </el-dialog>
  </div>
</template>
<script>
  import '../../assets/scss/main.scss';
  import md5 from 'js-md5';
  import {panelTitle} from 'components';
  import { getAuthTagList, getAdministratorList, ManageAdministratorTags, onAddUser, disableUser } from '../../service/getData';
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    data() {
      return {
        loading:false,
        isDialogShow:false,
        disableBtnType:'warning',
        activeName:'first',
        userId:0,
        password:'',
        form:{
          loginName:'',
          password:''
        },
        tableData: [],
        tags: [],
        permissions:[]
      }
    },
    created() {
      getAuthTagList().then(data => {
        this.tags = data.data;
      })
      this.getAdministrators();
    },
    components: {
      panelTitle
    },
    // watch:{
    //   permissions(cur) {
    //     console.log(cur)
    //   }
    // },
    methods: {
      getAdministrators() {
        getAdministratorList().then(data => {
          this.tableData = data.data.data;
        })
      },
      onCheckDetail(props) {
        this.isDialogShow = true;
        this.userId = props.row.userId
        this.permissions = props.row.permissions;
        // props.row.permissions.map(e => {
        //   this.permissions.push(e.id)
        // })
        console.log(props.row.permissions)
      },
      onTransferChange(value, direction, movedKeys) {
        console.log(value);
        // console.log(direction);
        // console.log(movedKeys)
      },
      onSubmit() {
        ManageAdministratorTags({
          ids:this.permissions,
          userId:this.userId
        }).then(data => {
          if(data.error) return;
          this.isDialogShow = false;
          this.getAdministrators(); //刷新列表
        })
      },
      onAddAdministrator() {
        onAddUser({
          loginName:this.form.loginName,
          password:md5(this.form.password).toUpperCase()
        }).then(data => {
          if(data.error) return;
          this.form.loginName = '';
          this.form.password = '';
          this.$message({
            message: '添加成功',
            center: true
          });
        })
      },
      onTabsChange() {
        if(this.activeName === 'second') return ;
        this.getAdministrators();
      },
      onDisable(props) {
        disableUser({
          userId:props.row.userId
        }).then(data => {
          if(data.error) return ;
          this.$message({
            message: '操作成功',
            center: true
          });
          this.getAdministrators();
        })
      }

    }
  }
</script>
<style lang="scss" >
  .authManagement{
    margin-bottom:44px;
    .el-button--primary {
      color: #fff;
      background-color: #20a0ff;
      border-color: #20a0ff;
      margin-top:1px;
      margin-right:0;
    }
    .panel-title{
      margin: 10px 0;
    }
    .el-tag{
      margin:5px 6px;
    }
    .tagsList{
      width:100%;
      display: flex;
      flex-wrap: wrap;
    }
    .transfer-footer {
      margin-left: 20px;
      padding: 6px 5px;
    }
  }
</style>
