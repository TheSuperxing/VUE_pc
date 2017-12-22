<template>
  <div class="error">
    <router-view></router-view>
    <div data-v-f7b5dab8="" data-v-ca620b54="" class="error_footer">
        <p data-v-f7b5dab8="">
            <span data-v-f7b5dab8="">
                联系手机：<em data-v-f7b5dab8="">150-8888-9999</em>
            </span> 
            <span data-v-f7b5dab8="">
                办公室电话：<em data-v-f7b5dab8="">020-666-8888&nbsp;&nbsp;&nbsp;&nbsp;020-8888-666</em>
            </span>
        </p> 
        <p data-v-f7b5dab8="">
            联系地址：<em data-v-f7b5dab8="">上海市杨浦区1758号奚地国际</em>
        </p> 
        <p data-v-f7b5dab8="">
            Copyring ©2014CCDI&nbsp;&nbsp;All&nbsp;&nbsp;right&nbsp;&nbsp;reserved&nbsp;&nbsp;沪ICP备16030624号-2
        </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Error',
        mounted(){
            $(".copyring").remove()
        }
    }
</script>
<style scoped lang="scss">
  $themeColor:#ff7403; 
  .error{
    width: 100%;

    .error_footer{
        width:100%;
        min-width: 1200px;
        overflow: hidden;
        font-size: 14px;
        position: fixed;
        left: 0;
        bottom: 0;
        h3{
            width: 201px;
            margin: 58px auto;
            margin-bottom: 30px;
            font-size: 34px;
            line-height: 34px;
            text-align: center;
            color: $themeColor;
        }
        p{
            line-height: 28px;
            text-align: center;
        }
        
    }
    
  }
  
</style>
