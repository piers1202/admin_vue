<template>
  <el-row>
    <div class="panel">
      <panel-title :title="$route.meta.title">
        <el-button @click.stop="on_refresh" size="small">
          <i class="fa fa-refresh"></i>
        </el-button>
      </panel-title>
    </div>
    <div style="position:relative;">
      <el-radio-group v-model="radio1" class="databutton_large" style="margin-bottom:10px;" @change="branch">
        <el-radio-button :size="large" label="全部渠道"></el-radio-button>
        <el-radio-button :size="large" label="分渠道"></el-radio-button>
      </el-radio-group>
      <el-select v-model="value1" placeholder="请选择" v-show="radio1==='分渠道'" @change="channelItem">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-radio-group v-model="radio2" class="databutton_small" style="position:absolute;right:0;bottom:5px;" >
        <el-radio-button :size="large" label="按日"></el-radio-button>
        <el-radio-button :size="large" label="按月"></el-radio-button>
        <el-radio-button :size="large" label="按年"></el-radio-button>
      </el-radio-group>
      <!--<el-button @click="get_total()" type="primary" class="btnlarge">汇总</el-button>-->
      <!--<el-button @click="get_branch()" class="btnlarge">分部</el-button>-->
      <!--<el-button type="primary" class="btnsmall" style="margin-left:50px;!important">按日</el-button>-->
      <!--<el-button class="btnsmall">按月</el-button>-->
      <!--<el-button class="btnsmall">按年</el-button>-->
    </div>
    <div style="float:right;"></div>
    <div>
      <el-row>
        <el-col>
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">注册量/预审通过量/签约量</p></panel-title>
              <div class="panel-body" style="text-align:center;">
                <div ref="chartsA" style="height:400px"></div>
              </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">预审通过率/签约率</p></panel-title>
              <div class="panel-body" style="text-align:center;">
                <div ref="chartsB" style="height:400px"></div>
              </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  var a,b;
  export default{
    data(){
      return {
        contractedMoney:650000000,
        echarts_instance: null,
        total:true,
        radio1: '全部渠道',
        radio2: '按日',
        options1:[{
          value: '选项1',
          label: '渠道1'
        }, {
          value: '选项2',
          label: '渠道2'
        }, {
          value: '选项3',
          label: '渠道3'
        }, {
          value: '选项4',
          label: '渠道4'
        }, {
          value: '选项5',
          label: '渠道5'
        }],
        value1:'',
      }
    },
    created(){
      /**
       * 按需引入 ECharts 图表和组件，这里先全部引入
       * doc: http://echarts.baidu.com
       */
      require(['echarts'], echarts => {
        this.echarts_instance = echarts;
        this.$nextTick(this.get_echarts_instance());
      })
    },
    methods: {
      branch(){},
      channelItem(){
          console.log(this.value1);
//          if(this.value1=="选项3"){
//              this.clear_echarts_instance();
//          }
      },
      get_echarts_instance(){
        this.create_chartsA();
        this.create_chartsB();
      },
      clear_echarts_instance(){
        this.delete_chartsA();
        this.delete_chartsB();
      },
      create_chartsA(){
        let _dom = this.$refs.chartsA
        let myChartA = this.echarts_instance.init(_dom)
        a=myChartA;
        myChartA.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['注册量','预审通过量','签约量']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value',
            name: '单位（件）',
            min: 0,
            max: 550,
            interval: 50,
            axisLabel: {
              formatter: '{value} 万'
            }
          },
          series: [
            {
              name:'注册量',
              type:'line',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'预审通过量',
              type:'line',
              data:[220, 182, 191, 234, 290, 43, 310]
            },
            {
              name:'签约量',
              type:'line',
              data:[150, 232, 201, 154, 190, 240, 210]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartA.resize();
        });
      },
      create_chartsB(){
        let _dom = this.$refs.chartsB
        let myChartB = this.echarts_instance.init(_dom)
        b=myChartB;
        myChartB.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['预审通过率','签约率']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value',
            name: '比率（%）',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: '{value} '
            }
          },
          series: [
            {
              name:'预审通过率',
              type:'line',
              data:[12, 13, 10, 13, 9, 23, 21]
            },
            {
              name:'签约率',
              type:'line',
              data:[20, 18, 19, 23, 29, 33, 31]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartB.resize();
        });
      },
      delete_chartsA(){
        a.clear();
        a.dispose();
      },
      delete_chartsB(){
        b.clear();
        b.dispose();
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
  .btnlarge{
    padding:15px 40px;
    margin-bottom:20px;
    border-radius:5px;
  }
  .btnsmall{
    padding:5px 20px;
    margin-bottom:20px;
    border-radius:5px;
  }
  .databutton_large{
  .el-radio-button__inner{
    padding:15px 40px!important;
  }
  }
  .databutton_small{
  .el-radio-button__inner {
    padding: 5px 15px !important;
  }
  }
</style>
