<template>
	<div>
		<header-nav></header-nav>
		<div  id="users">
			<router-view></router-view>
		</div>
		<footer-nav></footer-nav>
	</div>
</template>

<script>
	import {cookieTool} from "../assets/js/cookieTool.js"
	import router from "../router"
	import FooterNav from "./footer.vue";
  	import HeaderNav from "./header.vue";
	export default{
		components:{
			HeaderNav,
			FooterNav
		},
		name:"Users",
		data:function(){
			return{

			}
		},
		mounted(){
			if(cookieTool.getCookie("token")==null){
				router.push("/login")
			}
		}
	}
</script>
<style lang="scss" scoped>
	#users{
		width: 1200px;
		margin: 150px auto;
		height: 100%;
	}
</style>

