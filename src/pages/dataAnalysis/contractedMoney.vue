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
        <el-radio-button :size="large" label="汇总"></el-radio-button>
        <el-radio-button :size="large" label="分部"></el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="radio2" class="databutton_small" style="position:absolute;bottom:10px;left:250px;" @change="timeItem">
        <el-radio-button :size="large" label="按日"></el-radio-button>
        <el-radio-button :size="large" label="按月"></el-radio-button>
        <el-radio-button :size="large" label="按年"></el-radio-button>
      </el-radio-group>
    </div>
    <div v-show="radio1=='汇总'">
      <div class="panel">
        <div style="background-color:white;padding:50px;display:flex">
          <section style="width:180px;height:60px;">
            <p style="padding-top:15px;">客户签约情况统计</p>
            <div slot="tip" class="el-upload__tip" style="margin-left:14px;">（单位：元）</div>
          </section>
          <section style="flex:1;">
            <div>
              <img style="width:60px;margin-bottom:20px;margin-right:10px;" src="./images/contractedMoneyImg.png"/>
              <i style="font-size:40px;line-height:60px;">{{contractedMoney}}</i>
            </div>
          </section>
        </div>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线上申请量</p></panel-title>
            <div class="panel-body">
              <div ref="chartsA" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel" style="margin-left: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线下交单量</p></panel-title>
            <div class="panel-body">
              <div ref="chartsB" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线上通过金额</p></panel-title>
            <div class="panel-body">
              <div ref="chartsC" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel" style="margin-left: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线下签约金额</p></panel-title>
            <div class="panel-body">
              <div ref="chartsD" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-show="radio1=='分部'">
      <el-row>
        <div class="panel">
          <panel-title style="position:relative"><p style="position:absolute;left:20px;">签约金额环比图</p></panel-title>
          <div class="panel-body" style="text-align:center;">
            <div ref="chartsE" style="height:400px"></div>
          </div>
        </div>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线上申请量</p></panel-title>
            <div class="panel-body">
              <div ref="chartsF" style="height:400px"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel" style="margin-left: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线下交单量</p></panel-title>
            <div class="panel-body">
              <div ref="chartsG" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线上预审通过量</p></panel-title>
            <div class="panel-body">
              <div ref="chartsH" style="height:400px"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel" style="margin-left: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线下审核通过量</p></panel-title>
            <div class="panel-body">
              <div ref="chartsI" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线上预审件均</p></panel-title>
            <div class="panel-body">
              <div ref="chartsJ" style="height:400px"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel" style="margin-left: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线下签约</p></panel-title>
            <div class="panel-body">
              <div ref="chartsK" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  var a,b,c,d,e,f,g,h,i,j,k;
  export default{
    data(){
      return {
        contractedMoney: 650000000,
        echarts_instance: null,
        radio1: '汇总',
        radio2: '按日',
        dataF:[],
        dataA:[]
      }
    },
    created(){
      /**
       * 按需引入 ECharts 图表和组件，这里先全部引入
       * doc: http://echarts.baidu.com
       */
      this.dataA=[1,1,1,1,1,1,1];
      this.echarts_instance = null;
      require(['echarts'], echarts => {
        this.echarts_instance = echarts;
        this.$nextTick(this.get_echarts_instance)
      })
    },
    methods: {

      branch(){
        //按分部
        if (this.radio1 == "分部") {
          this.dataF = [1, 1, 1, 1, 1, 1, 1];
          require(['echarts'], echarts => {
            this.echarts_instance = echarts;
            this.$nextTick(this.get_echarts_instance2)
          });
          if (this.radio2 == "按日") {
            this.dataF = [1, 1, 1, 1, 1, 1, 1];
            this.clear_echarts_instance2();
            this.get_echarts_instance2();
          } else if (this.radio2 == "按月") {
            this.dataF = [200, 215, 300, 334, 290, 230, 220];
            this.clear_echarts_instance2();
            this.get_echarts_instance2();
            console.log(this.dataF);
          } else if (this.radio2 == "按年") {
            this.dataF = [200, 200, 200, 200, 200, 200, 200];
            this.clear_echarts_instance2();
            this.get_echarts_instance2();
          }
          console.log("mmmmmmmmmmmmmm");
        } else if (this.radio1 == '汇总') {
          this.clear_echarts_instance2();
          if (this.radio2 == "按日") {
            this.dataA = [1, 1, 1, 1, 1, 1, 1];
            this.clear_echarts_instance();
            this.get_echarts_instance();
          } else if (this.radio2 == "按月") {
            this.dataA = [200, 215, 300, 334, 290, 230, 220];
            this.clear_echarts_instance();
            this.get_echarts_instance();
            console.log(this.dataA);
          } else if (this.radio2 == "按年") {
            this.dataA = [200, 200, 200, 200, 200, 200, 200];
            this.clear_echarts_instance();
            this.get_echarts_instance();
          }
        }
      },
      timeItem(){
        if(this.radio1=="分部"){
          if (this.radio2 == "按日") {
            this.dataF=[1, 1, 1, 1, 1, 1, 1];
            this.clear_echarts_instance2();
            this.get_echarts_instance2();
          } else if (this.radio2 == "按月") {
            this.dataF=[200, 215, 300, 334, 290, 230, 220];
            this.clear_echarts_instance2();
            this.get_echarts_instance2();
            console.log(this.dataF);
          } else if (this.radio2 == "按年") {
            this.dataF=[200, 200, 200, 200, 200, 200, 200];
            this.clear_echarts_instance2();
            this.get_echarts_instance2();
          }
        }else if(this.radio1=="汇总"){
          if (this.radio2 == "按日") {
            this.dataA=[1,1,1,1,1,1,1];
            this.clear_echarts_instance();
            this.get_echarts_instance();
            console.log("111");
          } else if (this.radio2 == "按月") {
            this.dataA=[200, 200, 200, 200, 200, 200, 200];
            this.clear_echarts_instance();
            this.get_echarts_instance();
            console.log("222");
          } else if (this.radio2 == "按年") {
            this.dataF=[100, 100, 100, 100, 100, 100, 100];
            this.clear_echarts_instance();
            this.get_echarts_instance();
            console.log("333");
          }
        }
      },
      get_echarts_instance(){
        this.create_chartsA();
        this.create_chartsB();
        this.create_chartsC();
        this.create_chartsD();
      },
      get_echarts_instance2(){
        this.create_chartsE();
        this.create_chartsF();
        this.create_chartsG();
        this.create_chartsH();
        this.create_chartsI();
        this.create_chartsJ();
        this.create_chartsK();
      },
      clear_echarts_instance(){
        this.delete_chartsA();
        this.delete_chartsB();
        this.delete_chartsC();
        this.delete_chartsD();
      },
      clear_echarts_instance2(){
        this.delete_chartsE();
        this.delete_chartsF();
        this.delete_chartsG();
        this.delete_chartsH();
        this.delete_chartsI();
        this.delete_chartsJ();
        this.delete_chartsK();
      },
      create_chartsA(){
        let _dom = this.$refs.chartsA
        let myChartA = this.echarts_instance.init(_dom)
        a=myChartA;
        myChartA.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['O2O汇总交单量', 'O2O汇总通过率']
          },
          xAxis: [
            {
              type: 'category',
              data: ['06-27', '06-28', '06-29', '06-30', '07-01', '07-02', '07-03'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '申请量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '通过率（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value} '
              }
            }
          ],
          series: [
            {
              name: 'O2O汇总交单量',
              type: 'bar',
              data: this.dataA
            },
            {
              name: 'O2O汇总通过率',
              type: 'line',
              yAxisIndex: 1,
              data: [20, 20, 30, 34, 36, 40, 45]
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
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['O2O汇总交单量', 'O2O汇总通过率']
          },
          xAxis: [
            {
              type: 'category',
              data: ['06-27', '06-28', '06-29', '06-30', '07-01', '07-02', '07-03'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '交单量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '通过率（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value} '
              }
            }
          ],
          series: [
            {
              name: 'O2O汇总交单量',
              type: 'bar',
              data: [220.0, 224.9, 307.0, 323.2, 425.6, 476.7, 535.6]
            },
            {
              name: 'O2O汇总通过率',
              type: 'line',
              yAxisIndex: 1,
              data: [20, 20, 30, 34, 36, 40, 45]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartB.resize();
        });
      },
      create_chartsC(){
        let _dom = this.$refs.chartsC;
        let myChartC = this.echarts_instance.init(_dom);
        c=myChartC;
        myChartC.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['O2O汇总交单量', 'O2O汇总通过率']
          },
          xAxis: [
            {
              type: 'category',
              data: ['06-27', '06-28', '06-29', '06-30', '07-01', '07-02', '07-03'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '通过金额（元）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '通过件均（件）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value} '
              }
            }
          ],
          series: [
            {
              name: 'O2O汇总交单量',
              type: 'bar',
              data: [220.0, 224.9, 307.0, 323.2, 425.6, 476.7, 535.6]
            },
            {
              name: 'O2O汇总通过率',
              type: 'line',
              yAxisIndex: 1,
              data: [20, 20, 30, 34, 36, 40, 45]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartC.resize();
        });
      },
      create_chartsD(){
        let _dom = this.$refs.chartsD;
        let myChartD = this.echarts_instance.init(_dom);
        d=myChartD;
        myChartD.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['O2O汇总交单量', 'O2O汇总通过率']
          },
          xAxis: [
            {
              type: 'category',
              data: ['06-27', '06-28', '06-29', '06-30', '07-01', '07-02', '07-03'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '签约金额（元）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '签约件均（件）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value} '
              }
            }
          ],
          series: [
            {
              name: 'O2O汇总交单量',
              type: 'bar',
              data: [220.0, 224.9, 307.0, 323.2, 425.6, 476.7, 535.6]
            },
            {
              name: 'O2O汇总通过率',
              type: 'line',
              yAxisIndex: 1,
              data: [20, 20, 30, 34, 36, 40, 45]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartD.resize();
        });
      },
      //分部
      create_chartsE(){
        let _dom = this.$refs.chartsE;
        let myChartE = this.echarts_instance.init(_dom);
        e=myChartE;
        myChartE.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} 万 ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['上海', '杭州', '苏州', '成都', '南京','武汉','青岛','沈阳']
          },
          series: [
            {
              name: '签约金额（元）',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 1234, name: '上海'},
                {value: 789, name: '杭州'},
                {value: 765, name: '苏州'},
                {value: 856, name: '成都'},
                {value: 674, name: '南京'},
                {value: 425, name: '武汉'},
                {value: 424, name: '青岛'},
                {value: 422, name: '沈阳'}
              ]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartE.resize();
        });
      },
      create_chartsF(){
        let _dom = this.$refs.chartsF;
        let myChartF = this.echarts_instance.init(_dom);
        f=myChartF;
        myChartF.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['01-上海', '02-杭州', '03-苏州', '04-成都', '05-南京', '06-武汉', '07-青岛'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '申请量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: this.dataF
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartF.resize();
        });
      },
      create_chartsG(){
        let _dom = this.$refs.chartsG;
        let myChartG = this.echarts_instance.init(_dom);
        g=myChartG;
        myChartG.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['01-上海', '02-杭州', '03-苏州', '04-成都', '05-南京', '06-武汉', '07-青岛'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '交单量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [200, 215, 300, 334, 290, 230, 220]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartG.resize();
        });
      },
      create_chartsH(){
        let _dom = this.$refs.chartsH;
        let myChartH = this.echarts_instance.init(_dom);
        h=myChartH;
        myChartH.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['01-上海', '02-杭州', '03-苏州', '04-成都', '05-南京', '06-武汉', '07-青岛'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '预审通过量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [200, 215, 300, 334, 290, 230, 220]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartH.resize();
        });
      },
      create_chartsI(){
        let _dom = this.$refs.chartsI;
        let myChartI = this.echarts_instance.init(_dom);
        i=myChartI;
        myChartI.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['01-上海', '02-杭州', '03-苏州', '04-成都', '05-南京', '06-武汉', '07-青岛'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '审核通过量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [200, 215, 300, 334, 290, 230, 220]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartI.resize();
        });
      },
      create_chartsJ(){
        let _dom = this.$refs.chartsJ;
        let myChartJ = this.echarts_instance.init(_dom);
        j=myChartJ;
        myChartJ.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['01-上海', '02-杭州', '03-苏州', '04-成都', '05-南京', '06-武汉', '07-青岛'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '预审件均（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [200, 215, 300, 334, 290, 230, 220]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartJ.resize();
        });
      },
      create_chartsK(){
        let _dom = this.$refs.chartsK;
        let myChartK = this.echarts_instance.init(_dom);
        k=myChartK;
        myChartK.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['01-上海', '02-杭州', '03-苏州', '04-成都', '05-南京', '06-武汉', '07-青岛'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '签约件均（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [200, 215, 300, 334, 290, 230, 220]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartK.resize();
        });
      },
      delete_chartsA(){
        a.clear();
        a.dispose();
      },
      delete_chartsB(){
        b.clear();
        b.dispose();
      },
      delete_chartsC(){
        c.clear();
        c.dispose();
      },
      delete_chartsD(){
        d.clear();
        d.dispose();
      },
      delete_chartsE(){
        e.clear();
        e.dispose();
      },
      delete_chartsF(){
        f.clear();
        f.dispose();
      },
      delete_chartsG(){
        g.clear();
        g.dispose();
      },
      delete_chartsH(){
        h.clear();
        h.dispose();
      },
      delete_chartsI(){
        i.clear();
        i.dispose();
      },
      delete_chartsJ(){
        j.clear();
        j.dispose();
      },
      delete_chartsK(){
        k.clear();
        k.dispose();
      },
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
</style>
