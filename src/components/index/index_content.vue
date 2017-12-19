<template>
	<div>
		<header-nav></header-nav>
			<div class="index_content">
				<router-view></router-view>
			</div>
		<footer-nav></footer-nav>
	</div>
	
</template>

<script>
	import FooterNav from "../footer.vue";
	import HeaderNav from "../header.vue";
	export default{
		name:"IndexContent",
		data:function(){
			return{
				
			}
		},
		components:{
			HeaderNav,
			FooterNav,
			
		},
	}
</script>

<style lang="scss" scoped="scoped">

</style>