<template>
  <div class="customerManagement">
    <panel-title :title="$route.meta.title">

    </panel-title>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="expand"
        fixed
        width="50">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        fixed
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        label="身份证"
        width="200">
        <template scope="scope">
          <span v-if="isEdit && scope.$index ===index"><el-input v-model="params.idcard" placeholder="请输入内容"></el-input></span>
          <span v-else>{{ scope.row.idcard }}</span>

        </template>
      </el-table-column>
      <el-table-column
        label="婚姻状况"
        prop="marry"
        width="120">

      </el-table-column>
      <el-table-column
        label="教育程度"
        prop="education"
        width="120">

      </el-table-column>
      <el-table-column
        label="所在城市"
        prop="city"
        width="120">

      </el-table-column>
      <el-table-column
        label="工作"
        prop="job"
        width="120">

      </el-table-column>
      <el-table-column
        label="收入"
        prop="salary"
        width="120">

      </el-table-column>
      <el-table-column
        label="手机号码"
        prop="mobile"
        width="180">

      </el-table-column>
      <el-table-column
        label="银行卡号"
        prop="bankCard"
        width="190">

      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        width="220"
        label="地址"
        >
      </el-table-column>
      <el-table-column label="操作" width="200" show-overflow-tooltip fixed="right">
        <template scope="scope">

          <span  v-if="isEdit && scope.$index === index">
            <el-button
            size="small"
            type="danger"
            @click="handleSave(scope.$index, scope.row)">保存</el-button>
            <el-button

              size="small"
              type="danger"
              @click="handleQuit(scope.$index, scope.row)">取消</el-button>
          </span>
          <el-button
            v-else
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>


  </div>
</template>
<script>
  import '../../assets/scss/main.scss'
  import {panelTitle} from 'components'

  export default {
    data() {
      return {
        isEdit:false,
        index:0,
        params:{
          idcard:'',
          date:'',
          name:'',
          address:'',
          bankCard:'',
          city:'',
          mobile:'',
          education:'',
          marry:'',
          salary:'',
          job:''
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          idcard:'1279847238947242894729',
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          salary:1000,
          bankCard:'12312312312',
          mobile:13265821398,
          job:'web前端'
        }, {
          date: '2016-05-02',
          name: '王大虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          idcard:'1279847238947242894729',
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-04',
          bankCard:'12312312312',
          mobile:13265821398,
          name: '王三虎',
          address: '上海市普陀区金沙江路 1518 弄',
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          idcard:'1279847238947242894729',
          bankCard:'12312312312',
          mobile:13265821398,
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-01',
          name: '王四虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          idcard:'1279847238947242894729',
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          idcard:'1279847238947242894729',
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          idcard:'1279847238947242894729',
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          idcard:'1279847238947242894729',
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          salary:1000,
          job:'web前端'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          idcard:'1279847238947242894729',
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-02',
          name: '王大虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          idcard:'1279847238947242894729',
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-04',
          name: '王三虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          idcard:'1279847238947242894729',
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-01',
          name: '王四虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          idcard:'1279847238947242894729',
          salary:1000,
          job:'web前端'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          bankCard:'12312312312',
          mobile:13265821398,
          city:'杭州',
          education:'本科',
          marry:'单身狗',
          idcard:'1279847238947242894729',
          salary:1000,
          job:'web前端'
        }],
        multipleSelection: []
      }
    },
    components: {
      panelTitle
    },
    methods:{
      handleEdit(index,rowData) {
        this.isEdit = true;
        this.index = index ;
        this.params = rowData
        console.log(index)
        console.log(rowData)
      },
      handleSave() {
        this.isEdit = false;
      },
      handleQuit() {
        this.isEdit = false;
      }
    }
  }
</script>
