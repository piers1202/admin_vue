<template>
  <div
    class="divide"
    :class="{'foldWidth':isFold}" @click="fold()"
    style="position:relative;">
    <i
      :class="{'el-icon-arrow-down':isDown,'el-icon-arrow-up':!isDown}"
      style="color:white;font-size:12px;width:100%;height:20px;line-height:20px;position:absolute;bottom:-20px;display:inline-block!important;text-align:center;"
    >
    </i>
  </div>
</template>

<script>

</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .foldWidth{
    left:0!important;
  }
</style>
