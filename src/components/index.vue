<template>
  <div>
		<header-nav></header-nav>
		<div id="indexCont">
			<h1>{{msg}}</h1>
		</div>
		<footer-nav></footer-nav>
  </div>
</template>

<script>
  import MyAjax from "../assets/js/MyAjax.js"
	import FooterNav from "./footer.vue";
  import HeaderNav from "./header.vue";
  export default {
		components:{
			HeaderNav,
			FooterNav
		},
    name: 'Index',
    data:function(){
      return {
        msg:"首页"
      }
    },
    mounted(){
    	var that = this;
    	var url = MyAjax.urlhw+"/accountmanainfo/home";
    	MyAjax.ajax({
				type: "GET",
				url:url,
//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
				dataType: "json",
//				contentType:"application/json;charset=utf-8",
				async: false,
			},function(data){
				console.log(data)
				data = data.msg;
				that.baseInfo = data;
			},function(err){
				console.log(err)
			})
    	$(document.body).css("overflow-y","scoll");
    }
  }
</script>
<style scoped lang="scss">
#indexCont{
	width: 1200px;
	min-height: 600px;
	color: #FFFFFF;
	font-size: 20px;
	margin: 150px auto;
	 /*background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));*/
	background: -webkit-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,0.5)); /* Safari 5.1 - 6 */
  background: -o-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,0.5)); /* Opera 11.1 - 12*/
  background: -moz-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,0.5)); /* Firefox 3.6 - 15*/
  background: linear-gradient(to top, rgba(109,125,155,0), rgba(109,125,155,0.5)); /* 标准的语法 */
 	h1{
 		line-height: 250px;
 		text-align: center;
 	}
}
</style>
