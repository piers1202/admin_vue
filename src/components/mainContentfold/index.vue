<template>
  <div
    class="divide"
    style="position:relative;"
    @click="fold()">
    <i
      :class="{'el-icon-arrow-down':isDown,'el-icon-arrow-up':!isDown}"
      style="color:white;font-size:12px;width:100%;height:20px;line-height:20px;position:absolute;bottom:-20px;display:inline-block!important;text-align:center;"
    >
    </i>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        isDown: false
      }
    },
    methods:{
      fold(){
        this.isDown=!this.isDown;
        this.$emit('mainfold');
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .divide{
    border-bottom:20px solid #20a0ff;
    margin:20px 0;
  }
</style>

