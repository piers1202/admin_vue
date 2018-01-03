<template>
  <div class="operationData">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="editor">
      <section>
        <vue-editor
          id="editor"
          useCustomImageHandler
          placeholder="请输入文本"
          @imageAdded="handleImageAdded"
          v-model="content">
        </vue-editor>
        <el-button @click="save">保存</el-button>
      </section>
      <section>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in phoneList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div v-html="content" :class="`phoneType phoneType${value}`">
        </div>
      </section>


    </div>

  </div>
</template>
<script type="text/javascript">
  import axios from 'axios';
  import { panelTitle } from 'components';
  import { VueEditor } from 'vue2-editor';
  export default {
    name: 'richTextEditor',
    components:{
      panelTitle,
      VueEditor
    },
    data() {
      return{
        content: '',
        value:1,
        phoneList:[{
          label:'iphone6',
          value:1
        },{
          label:'iphone6plus',
          value:2
        },{
          label:'iphone5',
          value:3
        },{
          label:'安卓',
          value:4
        }]
      }
    },
    watch:{
      content(cur,old) {
        console.log(cur)
      }
    },
    methods:{
      handleImageAdded(file, Editor, cursorLocation){
        console.log(file)
        var formData = new FormData();
        formData.append('file', file)
        formData.password = 'P@ssw0rd_vcredit';
        axios({
          url:'http://ddk-dev.vcredit.com/DDKService/common/image/upload?password=P%40ssw0rd_vcredit',
          method: 'POST',
          data: formData
        }).then(res =>{

          let url = res.data.data.imageUrl;
          Editor.insertEmbed(cursorLocation, 'image', url);
        }).catch(e =>{
          alert(e)
        })
      },
      save() {
        console.log('saved!')

      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .editor{
    margin-top:10px;
    display: flex;
    justify-content: space-start;
    section{
      width:48%;
      margin-right:1%;
    }
    .phoneType{
      border:1px solid #f00;
      padding:5px 10px;
      margin-top:10px;
      img{
        display: block;
        width:60%;
        margin:5px 20%;
      }
      h1,h2,h3,h4,h5,h6{
        width:100%;
        text-align: center;
      }
    }
    .phoneType1{
      width: 375px;
      height: 667px;
    }
    .phoneType2{
      width: 414px;
      height: 736px;
    }
    .phoneType3{
      width: 320px;
      height: 568px;
    }
    .phoneType4{
      width: 360px;
      height: 640px;
    }
  }

</style>
