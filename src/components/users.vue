<template>
	<div id="users">
		<router-view></router-view>
	</div>
</template>

<script>
	import {cookieTool} from "../assets/js/cookieTool.js"
	import router from "../router"
	
	export default{
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

