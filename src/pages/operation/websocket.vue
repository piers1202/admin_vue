<template>
  <div class="websocket">
    <div>即时通讯</div>
    <!--<div v-for="(item,index) in content" :key="index">
      <div v-html="item"></div>
    </div>-->
    <main>
      <header>聊天室</header>
      <section >
        <p v-html="item" v-for="(item,index) in content" :key="index"></p>
      </section>
      <footer>
        <el-input placeholder="请输入信息" v-model="message"></el-input><el-button @click="onSubmit">发送</el-button>
      </footer>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content:[],
        message:''
      }
    },
    mounted() {
      this.socket = new WebSocket('ws://121.40.165.18:8088');
      let that = this;
      this.socket.addEventListener('open', function (event) {
        that.socket.send(that.message);
      })
      this.socket.addEventListener('message', function (event) {
        console.log(event.data);
        that.content.push(event.data)
      });
    },
    methods:{
      onSubmit() {
        this.content.push(this.message)
        this.socket.send(this.message)
        this.message = ''
      }
    }
  }
</script>

<style lang="scss">
.websocket{
  margin-bottom:50px;
  button{
    margin:0;
  }
}

  main{
    display: flex;
    flex-direction: column;
    width: 375px;

    height:667px;
    border:1px solid #000;
    // border-radius: 15px ;
  }
  section{
    flex:1;
    padding:0 15px;
    overflow: auto;
  }
  header{
    text-align: center;
    width:100%;
    height:48px;
    line-height:48px;
    background: #666;
  }
  footer{
    display: flex;
    width:100%;
    background: #666;
    height:50px;
    align-items: center;
  }
</style>

