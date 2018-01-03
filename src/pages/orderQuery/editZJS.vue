<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <p class="title_underline" style="width:150px;">原转介绍关系展示</p>
        <div style="padding:0 25px;">
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey">订单号</div>
            </el-col>
            <el-col :span="6">
              <div>明月几时有</div>
            </el-col>
            <el-col :span="2">
              <div class="grey">转介绍人类型</div>
            </el-col>
            <el-col :span="6">
              <div>把酒问青天</div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey">征信报告类型</div>
            </el-col>
            <el-col :span="6">
              <div>我欲乘风归去</div>
            </el-col>
            <el-col :span="2">
              <div class="grey">征信上传时间</div>
            </el-col>
            <el-col :span="6">
              <div>又恐琼楼玉宇</div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey">推荐人登录账号</div>
            </el-col>
            <el-col :span="6">
              <div>我欲乘风归去</div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey">营销人工号</div>
            </el-col>
            <el-col :span="6">
              <div>我欲乘风归去</div>
            </el-col>
            <el-col :span="2">
              <div class="grey">营销人姓名</div>
            </el-col>
            <el-col :span="6">
              <div>又恐琼楼玉宇</div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey">营销人团队</div>
            </el-col>
            <el-col :span="6">
              <div>我欲乘风归去</div>
            </el-col>
            <el-col :span="2">
              <div class="grey">营销人门店</div>
            </el-col>
            <el-col :span="6">
              <div>又恐琼楼玉宇</div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey">接单人工号</div>
            </el-col>
            <el-col :span="6">
              <div>我欲乘风归去</div>
            </el-col>
            <el-col :span="2">
              <div class="grey">接单人姓名</div>
            </el-col>
            <el-col :span="6">
              <div>又恐琼楼玉宇</div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey">接单人团队</div>
            </el-col>
            <el-col :span="6">
              <div>我欲乘风归去</div>
            </el-col>
            <el-col :span="2">
              <div class="grey">接单人门店</div>
            </el-col>
            <el-col :span="6">
              <div>又恐琼楼玉宇</div>
            </el-col>
          </el-row>
        </div>
        <div class="divide"></div>
        <p class="title_underline" style="width:150px;">修改转介绍人关系</p>
        <div style="padding:0 25px;">
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey line_height1">订单号</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.orderNumber" placeholder="请输入订单号"></el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grey line_height1">转介绍人类型</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-select v-model="TypeofZJSperson" clearable placeholder="请选择转介绍人类型" style="width:80%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey line_height1">营销人工号</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.marketPeopleNumber" placeholder="请输入营销人工号"></el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grey line_height1">营销人姓名</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.marketPeopleName" placeholder="请输入营销人姓名"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey line_height1">营销人团队</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.marketPeopleTeam" placeholder="请输入营销人团队"></el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grey line_height1">营销人门店</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.marketPeopleStore" placeholder="请输入营销人门店"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey line_height1">接单人工号</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.orderReceivedNumber" placeholder="请输入接单人工号"></el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grey line_height1">接单人姓名</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.orderReceivedName" placeholder="请输入接单人姓名"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="row_margin">
            <el-col :span="2">
              <div class="grey line_height1">接单人团队</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.orderReceivedTeam" placeholder="请输入接单人团队"></el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grey line_height1">接单人门店</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input style="width:80%;" v-model="input.orderReceivedStore" placeholder="请输入接单人门店"></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin-left:25px;">
          <el-button type="primary" icon="check" @click="submitForm('form')">提交</el-button>
          <el-button type="warning" :plain="true" icon="close" @click="$router.back()">取消</el-button>
        </div>
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
        input:{
          marketPeopleNumber:'',
          marketPeopleName:'',
          marketPeopleTeam:'',
          marketPeopleStore:'',
          orderReceivedNumber:'',
          orderReceivedName:'',
          orderReceivedTeam:'',
          orderReceivedStore:''
        },
        options: [{
          value: '选项1',
          label: '销售'
        }, {
          value: '选项2',
          label: '客户'
        }],
        TypeofZJSperson:''
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
<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
  .grey {
    color: #666;
  }
  .line_height1{
    line-height:36px;
  }
  .row_margin {
    margin: 30px 0;
  }
  .title_underline{
    border-bottom:1px solid #20a0ff;
    font-weight:bold;
    text-align:center;
    width:100px;
  }
</style>
