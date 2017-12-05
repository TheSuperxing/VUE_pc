<template>
	<div>
		<header-nav></header-nav>
		<div id="trading">
			<router-view></router-view>
		</div>
		<footer-nav></footer-nav>
	</div>
</template>

<script>
	import FooterNav from "../footer.vue";
  import HeaderNav from "../header.vue";
	export default{
		components:{
			HeaderNav,
			FooterNav
		},
		name:"trading",
		data:function(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;

#trading{
	width: 1200px;
	margin: 150px auto;
}
</style>