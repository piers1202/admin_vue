<template>
  <div class="main-content ofh" :class="{'changeWidth':mainMsg}">
    <el-row>
      <el-col :span="24">
        <div style="height:20px;"></div>
        <div class="wrapper" style="z-index:101">
          <div class="pageContent">
            <el-row>
              <el-col :spContan="24">
                <slot></slot>
              </el-col>
            </el-row>
          </div>
        </div>
        <v-footer style="z-index:100"></v-footer>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  import vFooter from './footer'

  export default{
    name: 'content',
    props:['mainMsg'],
    components: {
      vFooter
    }
  }
</script>
<style lang="scss">
  .pageContent{
    overflow:hidden;
  }
  .changeWidth{
    margin-left:20px !important;
    .menu-right{
      right:100px;
    }
  }
</style>

