<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-button @click="$router.back()" icon="d-arrow-left" type="info" size="large" style="margin-bottom:10px;">
          返回
        </el-button>
        <el-col :span="100">
          <el-form ref="form" :model="form" label-width="150px">
            <el-table :data="recommendedData">
              <el-table-column property="loginAccount" label="登录账号" width="150"></el-table-column>
              <el-table-column property="accountStatus" label="账户状态" width="150"></el-table-column>
              <el-table-column property="registerTime" label="注册时间" width="180"></el-table-column>
              <el-table-column property="customerSource" label="客户来源" width="150"></el-table-column>
              <el-table-column property="isAgent" label="是否是代理人" width="150"></el-table-column>
              <el-table-column property="firstBindTime" label="首次绑定时间" width="180"></el-table-column>
              <el-table-column property="ZJSlockedTime" label="转介绍关系锁定时间" width="180"></el-table-column>
              <el-table-column property="marketpeopleName" label="营销人姓名" width="150"></el-table-column>
              <el-table-column property="marketpeopleAccount" label="营销人账号" width="150"></el-table-column>
              <el-table-column property="marketpeopleStore" label="营销人门店" width="150"></el-table-column>
              <el-table-column property="marketpeopleTeam" label="营销人团队" width="150"></el-table-column>
              <el-table-column property="agentAccount" label="代理人账号" width="150"></el-table-column>
              <el-table-column property="isBindinWX" label="是否绑定微信账号" width="150"></el-table-column>
              <el-table-column property="agentAccount" label="代理人账号" width="150"></el-table-column>
              <el-table-column property="isBindinWX" label="是否绑定微信账号" width="150"></el-table-column>
              <el-table-column label="操作" width="600px;">
                <template scope="props">
                  <el-button
                    style="margin:5px!important;"
                    :plain="true"
                    @click="dialogTableVisible1 = true"
                    type="info" size="small"
                    icon="search">查看二维码扫描记录</el-button>
                  <el-dialog title="二维码扫描日志记录" :visible.sync="dialogTableVisible1" :modal-append-to-body=false>
                    <el-table :data="scanData">
                      <el-table-column property="wxSign" label="微信标示" width="150"></el-table-column>
                      <el-table-column property="scanTime" label="扫码时间" width="180"></el-table-column>
                      <el-table-column property="scanExpiration" label="扫码记录过期时间" width="180"></el-table-column>
                      <el-table-column property="scaninWhichRole" label="二维码所属角色类型" width="180"></el-table-column>
                      <el-table-column property="scaninWhichAccount" label="二维码所属登录账号" width="180"></el-table-column>
                      <el-table-column property="marketpeopleName" label="营销人姓名" width="150"></el-table-column>
                      <el-table-column property="marketpeopleTeam" label="营销人团队" width="150"></el-table-column>
                      <el-table-column property="marketpeopleStore" label="营销人门店" width="150"></el-table-column>
                    </el-table>
                    <!--页码-->
                    <div class="block">
                      <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page="currentPage2"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                      </el-pagination>
                    </div>
                  </el-dialog>
                  <el-button
                    style="margin:5px!important;"
                    @click="dialogTableVisible2 = true"
                    :plain="true"
                    type="info"
                    size="small"
                    icon="search">查看公众号关注记录</el-button>
                  <el-dialog title="公众号关注记录" :visible.sync="dialogTableVisible2" :modal-append-to-body=false>
                    <el-table :data="followData">
                      <el-table-column property="wxSign2" label="微信标示" width="150"></el-table-column>
                      <el-table-column property="signinOfficial" label="用户在公众号中的标示" width="180"></el-table-column>
                      <el-table-column property="handleByUser" label="用户操作" width="180"></el-table-column>
                      <el-table-column property="handleTime" label="用户操作时间" width="180"></el-table-column>
                      <el-table-column property="followType" label="关注类型" width="180"></el-table-column>
                      <el-table-column property="officialName" label="公众号名称" width="150"></el-table-column>
                      <el-table-column property="scaninWhichRole2" label="二维码所属角色类型" width="180"></el-table-column>
                      <el-table-column property="scaninWhichAccount2" label="二维码所属登录账号" width="180"></el-table-column>
                    </el-table>
                    <div class="block">
                      <el-pagination
                        @size-change="handleSizeChange3"
                        @current-change="handleCurrentChange3"
                        :current-page="currentPage3"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                      </el-pagination>
                    </div>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
            <!--页码-->
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        load_data: false,
        on_submit_loading: false,
        loginAccount:this.$route.params.loginAccount,
        marketPeopleAccount:this.$route.params.marketPeopleAccount,
        marketPeopleName:this.$route.params.marketPeopleName,
        dialogTableVisible1:false,
        dialogTableVisible2:false,
        recommendedData:[{loginAccount:'15958027886',
          accountStatus:'正常',registerTime:'2017-06-23 16:30',
          customerSource:'转介绍巴拉',isAgent:'是',firstBindTime:'2017-06-23 16:30',
          ZJSlockedTime:'2017-06-23 16:30',marketpeopleName:'ALICE',
          marketpeopleAccount:'15958027886',marketpeopleStore:'西湖门店',
          marketpeopleTeam:'啦啦啦团队',agentAccount:'15958027886',isBindinWX:'是',
          agentAccount:'15958027886',isBindinWX:'是'
        }]
      }
    },
    created(){
      //this.route_id && this.get_form_data()
      console.log(this.marketPeopleName);
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_table.get({
          id: this.route_id,
        })
          .then(({data}) => {
            this.form = data
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .width_input{
    width:30%;
  }
</style>
