<template>
	<div class="search_all">
		<div class="menu">
			<ul>
				<li v-for="(item,index) in tab">
					<router-link :to='{name:item.rout}'>{{item.text}}</router-link>
				</li>
				
			</ul>
			
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import router from "../../router"
	export default{
		name:"search_all",
		data:function(){
			return{
				tab:[
					{
						text:"搜个人",
						rout:"SearchPersonal",
					},{
						text:"搜团队",
						rout:"SearchTeam",
					},{
						text:"搜公司",
						rout:'SearchCompany',
					},{
						text:"搜项目",
						rout:'SearchProject',
					},
					
				],
				indexActive:""
			}
		},
		methods:{
			tabChange(urlname){
				router.push({name:urlname})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
.search_all{
	padding-top: 70px;
	
	background: #FFFFFF;
	.menu{
		width: 1200px;
		margin: 70px auto;
		ul{
			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			border-bottom:2px solid #ff7403;
			background:#FFFFFF;
			li{
				float: left;
				width: 25%;
				height: 50px;
				a{
					display: block;
					width: 100%;
					height: 52px;
					line-height: 52px;
					text-align: center;
					font-size: 16px;
					color: #333333;
					
				}
				.router-link-active{
					color: #ff7403;
					/*background: #ff7403;*/
					border: 2px solid #ff7403;
					border-radius: 5px 5px 0 0;
					border-bottom: 2px solid #FFFFFF;
					font-weight: bold;
				}
				&:hover{
					/*background: rgba(255,116,3,.3);*/
				}
			}
		}
	}
}
</style>