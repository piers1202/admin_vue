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
      <el-select v-model="value1" placeholder="请选择" v-show="radio1==='分部'" @change="choosebranch">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-radio-group v-model="radio2" class="databutton_small" style="position:absolute;right:0;bottom:5px;"
                      @change="timeItem">
        <el-radio-button :size="large" label="按日"></el-radio-button>
        <el-radio-button :size="large" label="按月"></el-radio-button>
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
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">线上申请量</p></panel-title>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="签约金额" name="first">
                <div class="panel-body">
                  <div id="a-chart" ref="chartsA" style="height: 400px"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="签约件数/签约均件" name="second">
                <div class="panel-body">
                  <div id="b-chart" ref="chartsB" style="height: 400px"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="评分/通过率" name="third">
                <div class="panel-body">
                  <div id="c-chart" ref="chartsC" style="height: 400px"></div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="month"
            label="月份"
            width="200">
          </el-table-column>
          <el-table-column
            prop="applyAmount"
            label="申请量"
            width="220">
          </el-table-column>
          <el-table-column
            prop="contractedAmount"
            label="签约量"
            width="220">
          </el-table-column>
          <el-table-column
            prop="contractedMoney"
            label="签约金额"
            width="220">
          </el-table-column>
          <el-table-column
            prop="contractedAverage"
            label="签约件均"
            width="200">
          </el-table-column>
          <el-table-column
            prop="passingRate"
            label="通过率"
            width="180">
          </el-table-column>
          <el-table-column
            prop="rate"
            label="评分">
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </el-row>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  var a, b, c;
  export default{
    data(){
      return {
        contractedMoney: 650000000,
        echarts_instance: null,
        total: true,
        radio1: '汇总',
        radio2: '按日',
        options1: [{
          value: '选项1',
          label: '第一分部'
        }, {
          value: '选项2',
          label: '第二分部'
        }, {
          value: '选项3',
          label: '第三分部'
        }, {
          value: '选项4',
          label: '第四分部'
        }, {
          value: '选项5',
          label: '第五分部'
        }],
        value1: '',
        activeName: 'first',
        tableData: [{
          month: '17-06',
          applyAmount: '12345678',
          contractedAmount: '12345678',
          contractedMoney: '12345678',
          contractedAverage: '12345678',
          passingRate: '88',
          rate: '88'
        }]
      }
    },
    created(){
      /**
       * 按需引入 ECharts 图表和组件，这里先全部引入
       * doc: http://echarts.baidu.com
       */
      require(['echarts'], echarts => {
        this.echarts_instance = echarts;
        this.$nextTick(this.create_chartsA());
      })
    },
    methods: {
      create_chartsA(){
        let _dom = this.$refs.chartsA
        let myChartA = this.echarts_instance.init(_dom)
        a = myChartA;
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
            data: ['签约金额']
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
            }],
          series: [
            {
              type: 'bar',
              data: [220.0, 224.9, 307.0, 323.2, 425.6, 476.7, 535.6]
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
        b = myChartB;
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
            data: ['签约量', '签约件均']
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
              name: '签约量（件）',
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
              name: '签约量',
              type: 'bar',
              data: [220.0, 224.9, 307.0, 323.2, 425.6, 476.7, 535.6]
            },
            {
              name: '签约件均',
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
        c = myChartC;
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
            data: ['评分', '通过率']
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
              name: '评分',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value} '
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
              name: '评分',
              type: 'bar',
              data: [88.0, 88.9, 85.0, 93.2, 85.6, 96.7, 85.6]
            },
            {
              name: '通过率',
              type: 'line',
              yAxisIndex: 1,
              data: [60, 80, 60, 74, 76, 70, 85]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartC.resize();
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
      handleClick(tab, event) {
        if (this.activeName == 'second') {
          require(['echarts'], echarts => {
            this.echarts_instance = echarts;
            this.$nextTick(this.create_chartsB());
          });
        } else if (this.activeName == 'third') {
          require(['echarts'], echarts => {
            this.echarts_instance = echarts;
            this.$nextTick(this.create_chartsC());
          });
        } else if (this.activeName == 'first') {
          require(['echarts'], echarts => {
            this.echarts_instance = echarts;
            this.$nextTick(this.create_chartsA());
          });
        }
      },
      choosebranch(){
        if (this.value1) {
          if (this.radio2 == '按日') {
            if (this.value1 == "签约金额") {
              this.delete_chartsA();
              this.create_chartsA();
            } else if (this.value1 == "签约件数/签约均件") {
              this.delete_chartsB();
              this.create_chartsB();
            } else if (this.value1 == "评分/通过率") {
              this.delete_chartsC();
              this.create_chartsC();
            }
          } else if (this.radio2 == "按月") {
            if (this.value1 == "签约金额") {
              this.delete_chartsA();
              this.create_chartsA();
            } else if (this.value1 == "签约件数/签约均件") {
              this.delete_chartsB();
              this.create_chartsB();
            } else if (this.value1 == "评分/通过率") {
              this.delete_chartsC();
              this.create_chartsC();
            }
          }
        }
      },
      branch(){
        if (this.radio1 == "分部") {
          choosebranch();
        } else if (this.radio1 == "汇总") {
          if (this.radio2 == '按日') {
            if (this.value1 == "签约金额") {
              this.delete_chartsA();
              this.create_chartsA();
            } else if (this.value1 == "签约件数/签约均件") {
              this.delete_chartsB();
              this.create_chartsB();
            } else if (this.value1 == "评分/通过率") {
              this.delete_chartsC();
              this.create_chartsC();
            }
          } else if (this.radio2 == "按月") {
            if (this.value1 == "签约金额") {
              this.delete_chartsA();
              this.create_chartsA();
            } else if (this.value1 == "签约件数/签约均件") {
              this.delete_chartsB();
              this.create_chartsB();
            } else if (this.value1 == "评分/通过率") {
              this.delete_chartsC();
              this.create_chartsC();
            }
          }
        }
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
  .btnlarge {
    padding: 15px 40px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .btnsmall {
    padding: 5px 20px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

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
