<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <section>

    </section>


  </div>
</template>
<script type="text/javascript">
  import { panelTitle } from 'components'
  export default{
    data(){
      return {

      }
    },

    components: {
      panelTitle
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }

  }
</script>
<style lang="scss">
  .panel{

  }
</style>

