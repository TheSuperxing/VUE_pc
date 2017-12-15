<template>
  <div id="error_404" class="clear">
      <h1>杯具啊！</h1>
      <ul>
          <li>HTTP 404……<br>可能这个页面已经飞走了</li>
          <li><button type="button" onclick="window.location.href='#/index'">回首页</button></li>
      </ul>
      <div class="error_404_pic">
          <img src="https://static.segmentfault.com/v-5a30f5dc/global/img/404.svg" alt="杯具啊">
      </div>
  </div>
</template>

<script>
    import Vue from "vue";
    export default {
        name: 'Error_404',
        data(){
            return{

            }
        },
    }

</script>
<style lang="scss" scoped>
  #error_404{
    position: fixed;
    left: 30%;
    top: 20%;
    padding: 40px;
    background-color: #fff;
    width: 540px;
    color: #353535;
    line-height: 1.7;
    h1{
        color: #555;
        font-size: 2em;
    }
    ul{
        float:left;
        li{
            margin: 10px 0 15px;
        }
        li:nth-child(2){
            button{
                min-width: 80px;
                background-color: #009a61;
                text-align: center;
                color: #fff;
                cursor: pointer;
                font-size: 16px;
                padding: 6px 10px;
                border: none;
                border-radius: 2px;
            }
        }
    }
    .error_404_pic{
        float: right;
        margin-top:-47px;
    }
  }
</style>

