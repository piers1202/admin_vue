<template>
  <el-row>
    <div class="panel">
      <panel-title :title="$route.meta.title">
        <el-button @click.stop="on_refresh" size="small">
          <i class="fa fa-refresh"></i>
        </el-button>
      </panel-title>
    </div>
    <div style="position:relative;width:100%;height:30px;">
      <el-radio-group v-model="radio" @change="timeType" class="databutton_small" style="position:absolute;bottom:10px;left:0px;">
        <el-radio-button :size="large" label="按日"></el-radio-button>
        <el-radio-button :size="large" label="按月"></el-radio-button>
        <el-radio-button :size="large" label="按年"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <div class="panel">
        <section class="leiji_title">
          <p style="padding-top:15px;">全国累计签约金额</p>
          <div slot="tip" class="el-upload__tip">（单位：元）</div>
        </section>
        <div style="background-color:white;padding:30px;display:flex">
          <section class="title_flex">
            <div>
              <img src="./images/register.png"/>
              <i>{{data1?data1:'XXXXXXXX'}}</i>
            </div>
            <div slot="tip" class="el-upload__tip i_font_size" >累计注册</div>
          </section>
          <section class="title_flex">
            <div>
              <img src="./images/shiming.png"/>
              <i>{{data2?data2:'XXXXXXXX'}}</i>
            </div>
            <div slot="tip" class="el-upload__tip i_font_size" >累计实名注册</div>
          </section>
          <section class="title_flex">
            <div>
              <img src="./images/shenqing.png"/>
              <i>{{data3?data3:'XXXXXXXX'}}</i>
            </div>
            <div slot="tip" class="el-upload__tip i_font_size" >累计申请</div>
          </section>
          <section class="title_flex">
            <div>
              <img src="./images/success.png"/>
              <i>{{data4?data4:'XXXXXXXX'}}</i>
            </div>
            <div slot="tip" class="el-upload__tip i_font_size" >累计审核通过</div>
          </section>
        </div>
      </div>
      <el-row>
        <div class="panel" style="margin-right: 10px">
          <panel-title style="position:relative"><p style="position:absolute;left:20px;">线上申请量</p></panel-title>
          <div class="panel-body">
            <div ref="chartsA" style="height:500px"></div>
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="panel" style="margin-right: 10px">
          <panel-title style="position:relative"><p style="position:absolute;left:20px;">地区详情</p></panel-title>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="district"
              label="地区"
              width="200">
            </el-table-column>
            <el-table-column
              prop="accumulatedAmount"
              label="累计签约金额（元）"
              width="220">
            </el-table-column>
            <el-table-column
              prop="accumulatedRegister"
              label="累计注册"
              width="220">
            </el-table-column>
            <el-table-column
              prop="accumulatedRealnameRegister"
              label="累计实名注册"
              width="220">
            </el-table-column>
            <el-table-column
              prop="accumulatedApply"
              label="累计申请"
              width="200">
            </el-table-column>
            <el-table-column
              prop="accumulatedSuccess"
              label="累计审核通过">
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </div>
  </el-row>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import 'echarts/map/js/china.js';
  var a;
  export default{
    data(){
      return {
        data1: 650000000,
        data2: 650000000,
        data3: 650000000,
        data4: 650000000,
        echarts_instance: null,
        radio: '按日'
      }
    },
    created(){
      /**
       * 按需引入 ECharts 图表和组件，这里先全部引入
       * doc: http://echarts.baidu.com
       */
      this.echarts_instance = null;
      require(['echarts'], echarts => {
        this.echarts_instance = echarts;
        this.$nextTick(this.get_echarts_instance)
      })
    },
    methods: {
      timeType(){
//        if(this.radio=='按年'){
//            this.clear_echarts_instance();
//        }
      },
      get_echarts_instance(){
        this.create_chartsA();
      },
      clear_echarts_instance(){
        this.delete_chartsA();
      },
      create_chartsA(){
        let _dom = this.$refs.chartsA
        let myChartA = this.echarts_instance.init(_dom)
        a=myChartA;
        myChartA.setOption ({
          title : {
            text: '地区签约金额显示',
            subtext: '单位：亿元',
            x:'center'
          },
          tooltip : {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            x:'left',
            data:['签约金额']
          },
          dataRange: {
            min: 0,
            max: 15,
            x: 'left',
            y: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
          },
          toolbox: {
            show: true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          roamController: {
            show: true,
            x: 'right',
            mapTypeControl: {
              'china': true
            }
          },
          series : [
            {
              name: 'iphone3',
              type: 'map',
              mapType: 'china',
              roam: false,
              itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
              },
              data:[
                {name: '北京',value: Math.round(Math.random()*10)},
                {name: '天津',value: Math.round(Math.random()*10)},
                {name: '上海',value: Math.round(Math.random()*10)},
                {name: '重庆',value: Math.round(Math.random()*10)},
                {name: '河北',value: Math.round(Math.random()*10)},
                {name: '河南',value: Math.round(Math.random()*10)},
                {name: '云南',value: Math.round(Math.random()*10)},
                {name: '辽宁',value: Math.round(Math.random()*10)},
                {name: '黑龙江',value: Math.round(Math.random()*10)},
                {name: '湖南',value: Math.round(Math.random()*10)},
                {name: '安徽',value:Math.round(Math.random()*10)},
                {name: '山东',value: Math.round(Math.random()*10)},
                {name: '新疆',value: Math.round(Math.random()*10)},
                {name: '江苏',value: Math.round(Math.random()*10)},
                {name: '浙江',value: Math.round(Math.random()*10)},
                {name: '江西',value: Math.round(Math.random()*10)},
                {name: '湖北',value: Math.round(Math.random()*10)},
                {name: '广西',value: Math.round(Math.random()*10)},
                {name: '甘肃',value: Math.round(Math.random()*10)},
                {name: '山西',value: Math.round(Math.random()*10)},
                {name: '内蒙古',value: Math.round(Math.random()*10)},
                {name: '陕西',value: Math.round(Math.random())},
                {name: '吉林',value: Math.round(Math.random())},
                {name: '福建',value: Math.round(Math.random())},
                {name: '贵州',value: Math.round(Math.random())},
                {name: '广东',value: Math.round(Math.random())},
                {name: '青海',value: Math.round(Math.random())},
                {name: '西藏',value: Math.round(Math.random())},
                {name: '四川',value: Math.round(Math.random())},
                {name: '宁夏',value: Math.round(Math.random())},
                {name: '海南',value: Math.round(Math.random())},
                {name: '台湾',value: Math.round(Math.random())},
                {name: '香港',value: Math.round(Math.random())},
                {name: '澳门',value: Math.round(Math.random())}
              ]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartA.resize();
        });
      },
      delete_chartsA(){
        a.clear();
        a.dispose();
      }
    },
    components: {
      panelTitle
    },
    destroyed(){
      this.echarts_instance = null
    }
  }
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss">
  .databutton_large {
    .el-radio-button__inner {
      padding: 15px 40px !important;
      }
  }
  .databutton_small {
    .el-radio-button__inner {
    padding: 5px 15px !important;
    }
  }
  .panel{
    .leiji_title{
      width:160px;
      height:60px;
      text-align:center;
    }
    .title_flex{
      flex:1;text-align:center;
      div{
        height:60px;
        img{
          width:60px;margin-bottom:20px;margin-right:10px;
        }
        i{
          font-size:40px;line-height:60px;
        }
      }
      .i_font_size{
        font-size:20px!important;
      }
    }
  }
</style>
