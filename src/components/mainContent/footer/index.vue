<template>
  <footer class="footer" v-once>Copyright &copy; {{getYear}} 维信金科 All Rights Reserved</footer>
</template>
<script type="text/javascript">
  export default {
    computed: {
      getYear(){
        return new Date().getFullYear()
      }
    }
  }
</script>
<style lang="scss" scoped>
  footer{
    position: fixed;
    bottom:0;
  }
</style>
