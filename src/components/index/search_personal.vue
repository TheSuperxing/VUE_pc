<template>
	<div class="search_personal">
		<div class="search-wrap">
			<input type="text" placeholder="请搜索个人" />
		</div>
		<div class="result-wrap">
			<div class="stateNone">
				在月球也没找到~
			</div>
		</div>
		<div class="hot-list">
			<h1><span>热门用户</span></h1>
			<ul v-for="ul in perMsg">
				<li v-for="item in ul">
					<dl>
						<dd>
							<img :src="item.img" alt=""/>
						</dd>
						<dt>
							<h3>名字</h3>
							<p>介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍</p>
						</dt>
					</dl>
					<div class="more">
						<router-link to="">
							<img src="../../assets/img/header/more.png" />
						</router-link>
					</div>
				</li>
			</ul>
			<div class="change">不感兴趣  换一批</div>
		</div>
	</div>
</template>

<script>
	
	export default{
		name:"SearchPersonal",
		data:function(){
			return{
				perMsg:[
			    	[
			    		{
			    			"img":require("../../assets/img/header/图层97.png"),
			    		},{
			    			"img":require("../../assets/img/header/图层97.png"),
			    		},{
			    			"img":require("../../assets/img/header/图层97.png"),
			    		},{
			    			"img":require("../../assets/img/header/图层97.png"),
			    		},{
			    			"img":require("../../assets/img/header/图层97.png"),
			    		},{
			    			"img":require("../../assets/img/header/图层97.png"),
			    		},
			    	],
			    	
			    ]
			    
			}
		},
		
	}
</script>

<style lang="scss" scoped="scoped">
  $themeColor:#ff7403; 
	.search_personal{
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
					width: 183px;
					height: 200px;
					margin-right: 20px;
					margin-bottom: 20px;
					background: #ffffff;
					border-radius: 5px;
					padding: 24px 10px;
					overflow: hidden;
					position:relative; 
					&:nth-child(6n){
						margin-right: 0;
					}
					&:hover{
						h3{
							color: $themeColor;
						}
						box-shadow: 0 0 15px rgba(160,160,160,.6);
						.more{
							animation:mymove 0.5s 1;
							-webkit-animation:mymove 0.5s 1; /*Safari and Chrome*/
							-webkit-animation-fill-mode:forwards;
						}
					}
					@keyframes mymove
					{
						from {bottom: -73px;}
						to {bottom:0;}
					}
					
					@-webkit-keyframes mymove /*Safari and Chrome*/
					{
						from {bottom: -73px;}
						to {bottom:0;}
					}
					dd{
						height: 61px;
						line-height: 60px;
						text-align: center;
						border-radius:50% ;
						overflow: hidden;
					}
					dt{
						h3{
							height: 40px;
							line-height: 40px;
							text-align: center;
							color: #333333;
							font-size: 18px;
							font-weight: bold;
							
						}
						p{
							color: #808080;
							line-height: 18px;
							font-size: 12px;
							overflow : hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
							
						}
					}
					.more{
						position: absolute;
						bottom: -73px;
						left: 0;
						width: 100%;
						height: 73px;
						line-height: 73px;
						text-align: center;
						background: #F7F7F7;

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