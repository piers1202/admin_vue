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
      <el-radio-group v-model="radio" @change='chooseItem' class="databutton_small" style="position:absolute;bottom:10px;left:0px;">
        <el-radio-button :size="large" label="按日"></el-radio-button>
        <el-radio-button :size="large" label="按月"></el-radio-button>
        <el-radio-button :size="large" label="按年"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">户籍</p></panel-title>
            <div class="panel-body">
              <div ref="chartsA" style="height:400px"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel" style="margin-left: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">学历</p></panel-title>
            <div class="panel-body">
              <div ref="chartsB" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">婚姻</p></panel-title>
            <div class="panel-body">
              <div ref="chartsC" style="height:400px"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel" style="margin-left: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">缴金</p></panel-title>
            <div class="panel-body">
              <div ref="chartsD" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">性别</p></panel-title>
            <div class="panel-body">
              <div ref="chartsE" style="height:400px"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel" style="margin-left: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">年龄</p></panel-title>
            <div class="panel-body">
              <div ref="chartsF" style="height: 400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="panel" style="margin-right: 10px">
            <panel-title style="position:relative"><p style="position:absolute;left:20px;">评分</p></panel-title>
            <div class="panel-body">
              <div ref="chartsG" style="height:400px"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>
<script type="text/javascript">
  import {panelTitle,bottomToolBar} from 'components'
  import 'echarts/map/js/china.js';
  var a,b,c,d,e,f,g;
  export default{
    data(){
      return {
        echarts_instance: null,
        radio: '按日',
        Gdata:[1,1,1,1,1,1,1],
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
      chooseItem(){
        if(this.radio=='按日'){
          console.log('按日');
        }else if(this.radio=='按月'){
          console.log('按月');
        }else if(this.radio=='按年'){
          console.log('按年');
          this.Gdata=[2,2,2,2,2,2,2];
          console.log(this.Gdata);
          this.clear_echarts_instance();
          this.get_echarts_instance();
        }
      },
      get_echarts_instance(){
        this.create_chartsA();
        this.create_chartsB();
        this.create_chartsC();
        this.create_chartsD();
        this.create_chartsE();
        this.create_chartsF();
        this.create_chartsG();
      },
      clear_echarts_instance(){
        this.delete_chartsA();
        this.delete_chartsB();
        this.delete_chartsC();
        this.delete_chartsD();
        this.delete_chartsE();
        this.delete_chartsF();
        this.delete_chartsG();
      },
      create_chartsA(){
        let _dom = this.$refs.chartsA
        const myChartA = this.echarts_instance.init(_dom);
        a=myChartA;
        myChartA.showLoading({
          text: '正在努力的读取数据中...',    //loading话术
        });
        myChartA.hideLoading();
        myChartA.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          toolbox: {
//            feature: {
//              dataView: {show: true, readOnly: false},
//              magicType: {show: true, type: ['line', 'bar']},
//              restore: {show: true},
//              saveAsImage: {show: true}
//            }
//          },
          legend: {
            data:['本地籍','非本地籍','','本地籍%','非本地籍%','总体%']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type: 'value',
              name: '预审量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '占比（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'本地籍',
              type:'bar',
              stack: '户籍',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'非本地籍',
              type:'bar',
              stack: '户籍',
              data:[220, 182, 191, 234, 290, 100, 310]
            },
            {
              name:'本地籍%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f7a71c',
                  lineStyle:{
                      color:'#f7a71c'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
            },
            {
              name:'非本地籍%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#78adf5',
                  lineStyle:{
                    color:'#78adf5'
                  }
                }
              },
              yAxisIndex: 1,
              data:[5, 6, 7, 8, 9, 10, 11]
            },
            {
              name:'总体%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#a962b1',
                  lineStyle:{
                    color:'#a962b1'
                  }
                }
              },
              yAxisIndex: 1,
              data:[10, 11, 12, 13, 14, 15, 16]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartA.resize();
        });
      },
      create_chartsB(){
        let _dom = this.$refs.chartsB
        const myChartB = this.echarts_instance.init(_dom)
        b=myChartB;
        myChartB.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          toolbox: {
//            feature: {
//              dataView: {show: true, readOnly: false},
//              magicType: {show: true, type: ['line', 'bar']},
//              restore: {show: true},
//              saveAsImage: {show: true}
//            }
//          },
          legend: {
            data:['本科','大专','大专以下','','本科%','大专%','大专以下%','总体%']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type: 'value',
              name: '预审量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '占比（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'本科',
              type:'bar',
              stack: '学历',
              data:[120, 132, 101, 134, 90, 130, 110]
            },
            {
              name:'大专',
              type:'bar',
              stack: '学历',
              data:[120, 182, 191, 134, 190, 100, 110]
            },
            {
              name:'大专以下',
              type:'bar',
              stack: '学历',
              data:[20, 82, 21, 34, 20, 10, 20]
            },
            {
              name:'本科%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f7a71c',
                  lineStyle:{
                    color:'#f7a71c'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
            },
            {
              name:'大专%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#78adf5',
                  lineStyle:{
                    color:'#78adf5'
                  }
                }
              },
              yAxisIndex: 1,
              data:[5, 6, 7, 8, 9, 10, 11]
            },
            {
              name:'大专以下%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#70d691',
                  lineStyle:{
                    color:'#70d691'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2, 2, 2, 2, 2, 2, 2]
            },
            {
              name:'总体%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#a962b1',
                  lineStyle:{
                    color:'#a962b1'
                  }
                }
              },
              yAxisIndex: 1,
              data:[22, 22, 22, 22, 22, 22, 22]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartB.resize();
        });
      },
      create_chartsC(){
        let _dom = this.$refs.chartsC
        const myChartC = this.echarts_instance.init(_dom)
        c=myChartC;
        myChartC.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          toolbox: {
//            feature: {
//              dataView: {show: true, readOnly: false},
//              magicType: {show: true, type: ['line', 'bar']},
//              restore: {show: true},
//              saveAsImage: {show: true}
//            }
//          },
          legend: {
            data:['未婚','离婚','已婚','其他','','未婚%','离婚%','已婚%','其他%','总体%']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type: 'value',
              name: '预审量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '占比（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'未婚',
              type:'bar',
              stack: '婚姻',
              data:[120, 132, 101, 134, 90, 130, 110]
            },
            {
              name:'离婚',
              type:'bar',
              stack: '婚姻',
              data:[11, 18, 11, 13, 19, 10, 11]
            },
            {
              name:'已婚',
              type:'bar',
              stack: '婚姻',
              data:[20, 82, 21, 34, 20, 10, 20]
            },
            {
              name:'其他',
              type:'bar',
              stack: '婚姻',
              data:[10, 82, 21, 34, 20, 10, 20]
            },
            {
              name:'未婚%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f7a71c',
                  lineStyle:{
                    color:'#f7a71c'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
            },
            {
              name:'离婚%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#78adf5',
                  lineStyle:{
                    color:'#78adf5'
                  }
                }
              },
              yAxisIndex: 1,
              data:[5, 6, 7, 8, 9, 10, 11]
            },
            {
              name:'已婚%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#70d691',
                  lineStyle:{
                    color:'#70d691'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2, 2, 2, 2, 2, 2, 2]
            },
            {
              name:'其他%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f5f748',
                  lineStyle:{
                    color:'#f5f748'
                  }
                }
              },
              yAxisIndex: 1,
              data:[3, 3, 3, 3, 3, 3, 3]
            },

            {
              name:'总体%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#a962b1',
                  lineStyle:{
                    color:'#a962b1'
                  }
                }
              },
              yAxisIndex: 1,
              data:[22, 22, 22, 22, 22, 22, 22]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartC.resize();
        });
      },
      create_chartsD(){
        let _dom = this.$refs.chartsD
        const myChartD = this.echarts_instance.init(_dom)
        d=myChartD;
        myChartD.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          toolbox: {
//            feature: {
//              dataView: {show: true, readOnly: false},
//              magicType: {show: true, type: ['line', 'bar']},
//              restore: {show: true},
//              saveAsImage: {show: true}
//            }
//          },
          legend: {
            data:['缴金','不缴金','','缴金%','不缴金%','总体%']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type: 'value',
              name: '预审量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '占比（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'缴金',
              type:'bar',
              stack: '是否缴金',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'不缴金',
              type:'bar',
              stack: '是否缴金',
              data:[220, 182, 191, 234, 290, 100, 310]
            },
            {
              name:'缴金%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f7a71c',
                  lineStyle:{
                    color:'#f7a71c'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
            },
            {
              name:'不缴金%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#78adf5',
                  lineStyle:{
                    color:'#78adf5'
                  }
                }
              },
              yAxisIndex: 1,
              data:[5, 6, 7, 8, 9, 10, 11]
            },
            {
              name:'总体%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#a962b1',
                  lineStyle:{
                    color:'#a962b1'
                  }
                }
              },
              yAxisIndex: 1,
              data:[10, 11, 12, 13, 14, 15, 16]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartD.resize();
        });
      },
      create_chartsE(){
        let _dom = this.$refs.chartsE
        const myChartE = this.echarts_instance.init(_dom)
        e=myChartE;
        myChartE.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          toolbox: {
//            feature: {
//              dataView: {show: true, readOnly: false},
//              magicType: {show: true, type: ['line', 'bar']},
//              restore: {show: true},
//              saveAsImage: {show: true}
//            }
//          },
          legend: {
            data:['男','女','','男%','女%','总体%']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type: 'value',
              name: '预审量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '占比（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'男',
              type:'bar',
              stack: '性别',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'女',
              type:'bar',
              stack: '性别',
              data:[220, 182, 191, 234, 290, 100, 310]
            },
            {
              name:'男%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f7a71c',
                  lineStyle:{
                    color:'#f7a71c'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
            },
            {
              name:'女%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#78adf5',
                  lineStyle:{
                    color:'#78adf5'
                  }
                }
              },
              yAxisIndex: 1,
              data:[5, 6, 7, 8, 9, 10, 11]
            },
            {
              name:'总体%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#a962b1',
                  lineStyle:{
                    color:'#a962b1'
                  }
                }
              },
              yAxisIndex: 1,
              data:[10, 11, 12, 13, 14, 15, 16]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartE.resize();
        });
      },
      create_chartsF(){
        let _dom = this.$refs.chartsF
        const myChartF = this.echarts_instance.init(_dom)
        f=myChartF;
        myChartF.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          toolbox: {
//            feature: {
//              dataView: {show: true, readOnly: false},
//              magicType: {show: true, type: ['line', 'bar']},
//              restore: {show: true},
//              saveAsImage: {show: true}
//            }
//          },
          legend: {
            data:['[0,20)','[20,30)','[30,40)','[40,50)','[50,+)','','[0,20)%','[20,30)%','[30,40)%','[40,50)%','[50,+)%','总体%']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type: 'value',
              name: '预审量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '占比（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'[0,20)',
              type:'bar',
              stack: '年龄',
              data:[1, 1, 1, 1, 1, 1, 1]
            },
            {
              name:'[20,30)',
              type:'bar',
              stack: '年龄',
              data:[11, 18, 11, 13, 19, 10, 11]
            },
            {
              name:'[30,40)',
              type:'bar',
              stack: '年龄',
              data:[20, 82, 21, 34, 20, 10, 20]
            },
            {
              name:'[40,50)',
              type:'bar',
              stack: '年龄',
              data:[10, 82, 21, 34, 20, 10, 20]
            },
            {
              name:'[50,+)',
              type:'bar',
              stack: '年龄',
              data:[1, 8, 2, 2, 2, 1, 2]
            },
            {
              name:'[0,20)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f7a71c',
                  lineStyle:{
                    color:'#f7a71c'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
            },
            {
              name:'[20,30)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#78adf5',
                  lineStyle:{
                    color:'#78adf5'
                  }
                }
              },
              yAxisIndex: 1,
              data:[5, 6, 7, 8, 9, 10, 11]
            },
            {
              name:'[30,40)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#70d691',
                  lineStyle:{
                    color:'#70d691'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2, 2, 2, 2, 2, 2, 2]
            },
            {
              name:'[40,50)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f5f748',
                  lineStyle:{
                    color:'#f5f748'
                  }
                }
              },
              yAxisIndex: 1,
              data:[3, 3, 3, 3, 3, 3, 3]
            },
            {
              name:'[50,+)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#797979',
                  lineStyle:{
                    color:'#797979'
                  }
                }
              },
              yAxisIndex: 1,
              data:[3, 3, 3, 3, 3, 3, 3]
            },
            {
              name:'总体%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#a962b1',
                  lineStyle:{
                    color:'#a962b1'
                  }
                }
              },
              yAxisIndex: 1,
              data:[22, 22, 22, 22, 22, 22, 22]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartF.resize();
        });
      },
      create_chartsG(){
        let _dom = this.$refs.chartsG
        const myChartG = this.echarts_instance.init(_dom)
        g=myChartG;
        myChartG.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          toolbox: {
//            feature: {
//              dataView: {show: true, readOnly: false},
//              magicType: {show: true, type: ['line', 'bar']},
//              restore: {show: true},
//              saveAsImage: {show: true}
//            }
//          },
          legend: {
            data:['A[630,+)','B[590,630)','C[550,590)','D[510,550)','E[0,510)','A[630,+)%','','B[590,630)%','C[550,590)%','D[510,550)%','E[0,510)%','总体%']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type: 'value',
              name: '预审量（件）',
              min: 0,
              max: 550,
              interval: 50,
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '占比（%）',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'A[630,+)',
              type:'bar',
              stack: '评分',
              data:this.Gdata
            },
            {
              name:'B[590,630)',
              type:'bar',
              stack: '评分',
              data:[11, 18, 11, 13, 19, 10, 11]
            },
            {
              name:'C[550,590)',
              type:'bar',
              stack: '评分',
              data:[20, 82, 21, 34, 20, 10, 20]
            },
            {
              name:'D[510,550)',
              type:'bar',
              stack: '评分',
              data:[10, 82, 21, 34, 20, 10, 20]
            },
            {
              name:'E[0,510)',
              type:'bar',
              stack: '评分',
              data:[1, 8, 2, 2, 2, 1, 2]
            },
            {
              name:'A[630,+)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f7a71c',
                  lineStyle:{
                    color:'#f7a71c'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
            },
            {
              name:'B[590,630)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#78adf5',
                  lineStyle:{
                    color:'#78adf5'
                  }
                }
              },
              yAxisIndex: 1,
              data:[5, 6, 7, 8, 9, 10, 11]
            },
            {
              name:'C[550,590)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#70d691',
                  lineStyle:{
                    color:'#70d691'
                  }
                }
              },
              yAxisIndex: 1,
              data:[2, 2, 2, 2, 2, 2, 2]
            },
            {
              name:'D[510,550)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#f5f748',
                  lineStyle:{
                    color:'#f5f748'
                  }
                }
              },
              yAxisIndex: 1,
              data:[3, 3, 3, 3, 3, 3, 3]
            },
            {
              name:'E[0,510)%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#797979',
                  lineStyle:{
                    color:'#797979'
                  }
                }
              },
              yAxisIndex: 1,
              data:[3, 3, 3, 3, 3, 3, 3]
            },
            {
              name:'总体%',
              type:'line',
              itemStyle:{
                normal:{
                  color:'#a962b1',
                  lineStyle:{
                    color:'#a962b1'
                  }
                }
              },
              yAxisIndex: 1,
              data:[22, 22, 22, 22, 22, 22, 22]
            }
          ]
        });
        window.addEventListener("resize", function () {
          myChartG.resize();
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
      }
    },
    components: {
      panelTitle,
      bottomToolBar
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
