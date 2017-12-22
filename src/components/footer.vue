<template>
  <div class="foot">
    <h3>BuildingShop</h3>
   	<p>
   		<span>联系手机：<em>150-8888-9999</em></span>
   		<span>办公室电话：<em>020-666-8888&nbsp;&nbsp;&nbsp;&nbsp;020-8888-666</em></span>
   	</p>
   	<p>联系地址：<em>上海市杨浦区1758号奚地国际</em></p>
    <p>Copyring &copy;2014CCDI&nbsp;&nbsp;All&nbsp;&nbsp;right&nbsp;&nbsp;reserved&nbsp;&nbsp;沪ICP备16030624号-2</p>
  </div>
</template>


<script>
  export default {
    name: 'foot',
    data:function() {
    	return{
        mContact:"联系手机:150-8888-9999",
        cContact:"办公室电话：020-666-8888&nbsp;&nbsp;&nbsp;&nbsp;020-8888-666",
        contactAds:"联系地址：上海市杨浦区1758号奚地国际"
    	}
    }
  }
</script>
<style scoped lang="scss">
 $themeColor:#ff7403; 
  .foot{
    width:100%;
    min-width: 1200px;
    height: 232px;
    overflow: hidden;
    background: url(../assets/img/header/footer.png) no-repeat;
    font-size: 14px;
    color:#FFFFFF;
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
</style>

































