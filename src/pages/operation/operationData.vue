<template>
  <div class="operationData">
    <panel-title :title="$route.meta.title"></panel-title>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="DDK首页BANNER" name="first">
          <el-table :data="tableData"
            highlight-current-row
            style="width: 100%"
            v-loading="loading"
            element-loading-text="拼命加载中..."
            border>
            <el-table-column
              property="seq"
              label="权重"
              width="120">
              <template scope="props">
                <el-input v-model="form.seq" controls-position="right" v-if="!isEditNotSave && id === props.row.id"></el-input>
                <span v-else>{{props.row.seq}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="图片地址"
              width="240">
              <template scope="props">
                <div v-if="!isEditNotSave && id === props.row.id">
                  <input type="file" @change="getFile($event)" >
                </div>
                <img :src="props.row.imgUrl" alt="banner图片" style="width:200px;" v-else>
              </template>
            </el-table-column>
            <el-table-column
              label="标题"
              width="180">
              <template scope="props">
                <el-input v-if="!isEditNotSave && id === props.row.id" v-model="form.title" ></el-input>
                <span v-else>{{props.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="链接地址">
              <template scope="props">
                <el-input v-if="!isEditNotSave && id === props.row.id" v-model="form.linkUrl" ></el-input>
                <span v-else>{{props.row.linkUrl}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="260px;">
              <template scope="props">
                <el-button @click="onSubmit(props)" :type="!isEditNotSave && id === props.row.id ? 'success' : ''">{{!isEditNotSave && id === props.row.id ? '保存': '编辑'}}</el-button>
                <el-button @click="isEditNotSave = !isEditNotSave" v-if="!isEditNotSave && id === props.row.id" type="danger">取消</el-button>
                <el-button @click="onDelete(props)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="onAddTable">添加banner</el-button>

      </el-tab-pane>
      </el-tab-pane>

      <!--消息管理-->
      <el-tab-pane label="DDK首页公告" name="second">
        <el-table :data="noticeTableData"
          highlight-current-row
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          border>
            <el-table-column
              property="seq"
              label="权重"
              width="120">
              <template scope="props">
                <el-input v-model="noticeForm.seq" controls-position="right" v-if="!isNoticeEdit && noticeId === props.row.noticeId"></el-input>
                <span v-else>{{props.row.seq}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="内容">
              <template scope="props">
                <el-input v-if="!isNoticeEdit && noticeId === props.row.noticeId" v-model="noticeForm.content" ></el-input>
                <span v-else>{{props.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="260px;">
              <template scope="props">
                <el-button @click="onNoticeSubmit(props)" :type="!isNoticeEdit && noticeId === props.row.noticeId ? 'success' : ''">{{!isNoticeEdit && noticeId === props.row.noticeId ? '保存': '编辑'}}</el-button>
                <el-button @click="isNoticeEdit = !isNoticeEdit" v-if="!isNoticeEdit && noticeId === props.row.noticeId" type="danger">取消</el-button>
                <el-button @click="onNoticeDelete(props)" type="danger">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="onAddNoticeTable">添加消息</el-button>
      </el-tab-pane>

      <el-tab-pane label="DDK广告位" name="third">
        <div class="advertisement">
          <el-table :data="advertisementTableData"
            highlight-current-row
            style="width: 100%"
            v-loading="loading"
            element-loading-text="拼命加载中..."
            border>
            <!--<el-table-column
              property="seq"
              label="权重"
              width="120">
              <template scope="props">
                <el-input v-model="form.seq" controls-position="right" v-if="!isEditNotSave && id === props.row.id"></el-input>
                <span v-else>{{props.row.seq}}</span>
              </template>
            </el-table-column>-->
            <el-table-column
              label="图片地址"
              width="240">
              <template scope="props">
                <div v-if="!isAdvertisementEdit && advertiseId === props.row.id">
                  <input type="file" @change="getAdvertiseFile($event)" >
                </div>
                <img :src="props.row.imgUrl" alt="banner图片" style="width:200px;" v-else>
              </template>
            </el-table-column>
            <el-table-column
              label="标题"
              width="180">
              <template scope="props">
                <el-input v-if="!isAdvertisementEdit && advertiseId === props.row.id" v-model="advertiseForm.title" ></el-input>
                <span v-else>{{props.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="链接地址">
              <template scope="props">
                <el-input v-if="!isAdvertisementEdit && advertiseId === props.row.id" v-model="advertiseForm.linkUrl" ></el-input>
                <span v-else>{{props.row.linkUrl}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="200px;">
              <template scope="props">
                <el-button @click="onAdvertiseSubmit(props)" :type="!isAdvertisementEdit && advertiseId === props.row.id ? 'success' : ''">{{!isAdvertisementEdit && advertiseId === props.row.id ? '保存': '编辑'}}</el-button>
                <el-button @click="isAdvertisementEdit = !isAdvertisementEdit" v-if="!isAdvertisementEdit && advertiseId === props.row.id" type="danger">取消</el-button>
                <!--<el-button @click="onAdvertiseDelete(props)" type="danger">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-tab-pane>

    </el-tabs>

  </div>
</template>
<script type="text/javascript">
  import { panelTitle } from 'components';
  import {
    getDdkHomeBannerList,
    changeBannerData,
    uploadBannerImage,
    addBannerData,
    deleteBannerData,
    getNoticeDataList,
    changeNoticeData,
    addNoticeData,
    deleteNoticeData,
    getAdvertisementDataList,
    changeAdvertisementData,
    addAdvertisementData
  } from '../../service/getOperationData';
  export default {
    name: 'operationData',
    components:{
      panelTitle
    },
    data() {
      return{
        activeName:'first',
        loading:false,
        id:-1,
        isEditNotSave:true,
        form:{
          seq:1,
          title:'',
          imgUrl:'',
          linkUrl:'',
          id:''
        },
        tableData:[],         //ddk首页banner数据
        /** 消息tab数据 */
        noticeTableData:[],
        isNoticeEdit:true,
        noticeId:'',
        noticeForm:{
          seq:1,
          content:'',
          id:''
        },
        /**广告位数据 */
        advertisementTableData:[],
        isAdvertisementEdit:true,
        advertiseId:'',
        advertiseForm:{
          title:'',
          imgUrl:'',
          linkUrl:'',
          id:''
        }
      }
    },
    created() {
      this.getDdkBannerList();
    },
    watch:{
      activeName(current) {
        if(current === 'second') {
          this.getNoticeList()
        }
        if(current === 'third') {
          this.getAdvertisementList()
        }
      }
    },
    methods:{
      onSubmit(props) {
        console.log(props.row.id)
        this.id = props.row.id;
        this.isEditNotSave = !this.isEditNotSave;
        if(!this.isEditNotSave) { //编辑
          this.form.title = props.row.title;
          this.form.seq = props.row.seq;
          this.form.imgUrl = props.row.imgUrl;
          this.form.linkUrl = props.row.linkUrl;
          this.form.id = props.row.id;
        }else{  //保存
          if(!props.row.id) { //没有id,则说明是新增
            addBannerData(this.form).then(data => {
              if(data.error) return;
              this.$message({
                message: '添加成功',
                center: true
              });
              this.getDdkBannerList();
            })
            return ;
          }
          changeBannerData(this.form).then(data => {
            if(data.error) return;

            this.$message({
              message: '修改成功',
              center: true
            });
            this.getDdkBannerList();
          })

        }
      },
      getDdkBannerList() {
        getDdkHomeBannerList().then(data => {
          this.tableData = data.data
        })
      },

      getFile(e) {
        this.file = e.target.files[0];
        let formData = new FormData();
        formData.append('file',this.file);
        uploadBannerImage(formData).then(data => {
          if(data.error) return;
          this.form.imgUrl = data.data.imageUrl;
        })
      },
      onDelete(props) {
        const id = props.row.id;
        if(!id) return;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBannerData({
            id:id
          }).then(data => {
            if(data.error) return;
            this.$message({
              message: '删除成功',
              center: true
            });
            this.getDdkBannerList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      onAddTable() {
        const table = {
          seq:'',
          imgUrl:'',
          title:'',
          linkUrl:'',
          id:''
        }
        this.tableData.push(table)
      },
      /**以下是消息列表逻辑 */
      getNoticeList() {
        getNoticeDataList().then(data => {
          if(data.error) return ;
          this.noticeTableData = data.data;
        })
      },
      onNoticeSubmit(props) {
        this.noticeId = props.row.noticeId;
        this.isNoticeEdit = !this.isNoticeEdit;
        if(!this.isNoticeEdit) { //编辑
          this.noticeForm.content = props.row.content;
          this.noticeForm.seq = props.row.seq;
          this.noticeForm.id = props.row.noticeId;
        }else{  //保存
          if(!props.row.noticeId) { //没有id,则说明是新增
            addNoticeData(this.noticeForm).then(data => {
              if(data.error) return;
              this.$message({
                message: '新增成功',
                center: true
              });
              this.getNoticeList();
            })
            return ;
          }
          changeNoticeData(this.noticeForm).then(data => {
            if(data.error) return;
            this.$message({
              message: '修改成功',
              center: true
            });
            this.getNoticeList();
          })

        }
      },
      onNoticeDelete(props) {
        const id = props.row.noticeId;
        if(!id) return;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteNoticeData({
            id:id
          }).then(data => {
            if(data.error) return;
            this.$message({
              message: '删除成功',
              center: true
            });
            this.getNoticeList();
          })
        })
      },
      onAddNoticeTable() {
        const table = {
          seq:'',
          content:'',
          id:''
        }
        this.noticeTableData.push(table)
      },

      /** 以下是广告位逻辑 */
      getAdvertisementList() {
        getAdvertisementDataList().then(data => {
          this.advertisementTableData = data.data;
        })
      },
      onAdvertiseSubmit(props) {
        this.advertiseId = props.row.id;
        this.isAdvertisementEdit = !this.isAdvertisementEdit;
        if(!this.isAdvertisementEdit) { //编辑
          this.advertiseForm.title = props.row.title;
          this.advertiseForm.imgUrl = props.row.imgUrl;
          this.advertiseForm.linkUrl = props.row.linkUrl;
          this.advertiseForm.id = props.row.id;
        }else{  //保存
          if(!props.row.id) { //没有id,则说明是新增
            addAdvertisementData(this.advertiseForm).then(data => {
              if(data.error) return;
              this.$message({
                message: '新增成功',
                center: true
              });
              this.getAdvertisementList();
            })
            return ;
          }
          changeAdvertisementData(this.advertiseForm).then(data => {
            if(data.error) return;
            this.$message({
              message: '修改成功',
              center: true
            });
            this.getAdvertisementList();
          })
        }
      },
      /** 上传照片 */
      getAdvertiseFile(e) {
        this.file = e.target.files[0];
        let formData = new FormData();
        formData.append('file',this.file);
        uploadBannerImage(formData).then(data => {
          if(data.error) return;
          this.advertiseForm.imgUrl = data.data.imageUrl;
        })
      }

    }
  }
</script>
<style lang="scss">
  .operationData{
    .el-form-item {
      width:30%;
    }
    // .el-input{
    //   width:500px;
    // }
    // .el-input-number{
    //   width:200px;
    // }
  }
</style>
