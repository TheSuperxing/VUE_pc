<template>
	<div class="search_company">
		<div class="search-wrap">
			<input type="text" placeholder="请搜索公司" />
		</div>
		<div class="result-wrap">
			<div class="stateNone">
				在月球也没找到~
			</div>
		</div>
		<div class="hot-list">
			<h1><span>热门公司</span></h1>
			<ul v-for="ul in perMsg" >
				<li v-for="item in ul">
					<dl>
						<dd>
							<img :src="item.img" alt=""/>
						</dd>
						<dt>
							<h3>名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字</h3>
							<p>认证员工<em>12</em></p>
							<p>介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍</p>
							<div class="more">
								<router-link to="">
									MORE>>
								</router-link>
							</div>
						</dt>
					</dl>
					
				</li>
			</ul>
			<div class="change">不感兴趣  换一批</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"SearchCompany",
		data:function(){
			return{
				perMsg:[
			    	[
			    		{
							"img":require("../../assets/img/header/图层108.png"),
						},{
							"img":require("../../assets/img/header/图层108.png"),
						},{
							"img":require("../../assets/img/header/图层108.png"),
						},
			    	],
			    	
			    ]
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
 $themeColor:#ff7403; 
	.search_company{
		.search-wrap{
			width: 700px;
			height: 50px;
			border-radius: 25px;
			box-shadow: 0 0 15px rgba(179,179,179,.5);
			padding: 0 40px;
			margin: 120px auto 0;
			background: url(../../assets/img/header/1717.png) no-repeat right center;
			background-color: #FFFFFF;
			background-position: 650px;
			input{
        		width: 100%;
        		height: 100%;
        		background: none;
        		font-size: 16px;
        	}
		}
		.result-wrap{
			min-height: 300px;
			.stateNone{
				width: 100%;
				min-height: 200px;
				line-height: 200px;
				text-align: center;
				font-size: 16px;
				color: #808080;
				background: url(../../assets/img/header/图层109.png) no-repeat center;
			}
		}
		.hot-list{
			width: 1200px;
			margin: 0 auto;
			h1{
				border-bottom: 2px solid #333333;
				margin-bottom: 20px;
				span{
					background: #333333;
					color: #FFFFFF;
					width: 90px;
					line-height: 36px;
					font-size: 14px;
					text-align: center;
					display: block;
					border-radius: 5px 5px 0 0;
	
				}
			}
			ul{
				width: 1200px;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
					li{
						float: left;
						width: 380px;
						height: 140px;
						margin-right: 30px;
						margin-bottom: 30px;
						background: #ffffff;
						border-radius: 5px;
						overflow: hidden;
						&:hover{
							box-shadow: 0 10px 15px rgba(160,160,160,.6);
							dt{
								h3{
									color: $themeColor;
								}
								
								.more{
									animation:mymove 0.5s 1;
									-webkit-animation:mymove 0.5s 1; /*Safari and Chrome*/
									-webkit-animation-fill-mode:forwards;
								}
							}
						}
						
						&:nth-child(3n){
							margin-right: 0;
						}
						
						@keyframes mymove
						{
							from {bottom: -55px;}
							to {bottom:0;}
						}
						
						@-webkit-keyframes mymove /*Safari and Chrome*/
						{
							from {bottom: -55px;}
							to {bottom:0;}
						}
						dd{
							width: 140px;
							height: 140px;
							text-align: center;
							overflow: hidden;
							float: left;
							img{
								display: inline-block;
								height: 100%;
								width: 100%;
							}
						}
						dt{
							width: 240px;
							height: 140px;
							float: left;
							position:relative; 
							padding: 18px;
							h3{
								line-height:24px;
								text-align: center;
								color: #333333;
								font-size: 18px;
								font-weight: bold;
								margin-bottom: 18px;
								overflow : hidden;
								flex-wrap: wrap;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								
							}
							p{
								color: #333333;
								line-height: 18px;
								font-size: 14px;
								overflow : hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
								em{
									margin-left: 10px;
									color: $themeColor;
								}
							}
							.more{
								position: absolute;
								bottom: -55px;
								left: 0;
								width: 100%;
								height: 55px;
								line-height: 55px;
								text-align: center;
								background: #333333;
								
								a{
									color: #FFFFFF;
									font-size: 18px;
								}
		
							}
						}
						
						
					}
			}
			.change{
				height: 24px;
				line-height: 24px;
				text-align: center;
				font-size: 14px;
				color: $themeColor;
				margin-bottom: 50px;
			}
		}
	}
</style>