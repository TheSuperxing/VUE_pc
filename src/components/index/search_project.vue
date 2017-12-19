<template>
	<div class="search_project">
		<div class="search-wrap">
			<input type="text" placeholder="请搜索团队" />
		</div>
		<div class="result-wrap">
			<ul class="">
				<li v-for="pro in proMsg">
					<img :src="pro.img" />
					<div class="projectDetail">
						<h3>{{pro.projectName}}</h3>
						<p>国家游泳馆，又叫水立方，国家游泳中心，是北京市委市政府指定的唯一一个由港澳台侨同胞捐资建设的标志性奥运场馆。国家游泳中心位于北京市奥林匹克公园中心区的南部，规划用地6.95公顷，主体建筑紧邻城市中轴线，并与国家体育场相对于中轴线均衡布置。国家游泳中心赛时建筑面积近8万平方米，标准坐席17000个，其中永久坐席6000个，临时坐席约11000个（赛后拆除）。2008年北京奥运会期间，承担游泳、跳水、花样游泳等比赛，产生42枚金牌。</p>
						<span></span>
					</div>
				</li>
			</ul>
			<div class="stateNone">
				在月球也没找到~
			</div>
		</div>
		<div class="hot-list">
			<h1><span>热门团队</span></h1>
			<ul>
				<li v-for="item in proMsg">
					<img :src="item.img" />
					<p>{{item.projectName}}</p>
				</li>
			</ul>
			<div class="change">不感兴趣  换一批</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"SearchProject",
		data:function(){
			return{
				proMsg:[
		    		{
	        			"img":require("../../assets/img/images/10.jpg"),
	        			"projectName":"国家游泳馆",
	        		},{
	        			"img":require("../../assets/img/images/11.jpg"),
	        			"projectName":"上海迪士尼",
	        		},{
	        			"img":require("../../assets/img/images/12.jpg"),
	        			"projectName":"上海中心",
	        		},
			    ]
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$themeColor:#ff7403; 
	.search_project{
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
				display: none;
			}
			ul{
				width: 949px;
				margin: 0 auto;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				
				li{
					width: 949px;
					height: 342px;
					padding: 10px;
					background: #333333;
					margin: 20px 0;
					cursor: pointer;
					&:hover{
						background: #FFFFFF;
						box-shadow: 0 0 25px rgba(179,179,179,.5);
						.projectDetail{
							p{
								color: #333333;
							}
						}
						
					}
					img{
						width: 465px;
						height: 322px;
						float: left;
					}
					.projectDetail{
						width: 415px;
						float: left;
						margin: 15px 0px 0 30px;
						h3{
							font-size: 18px;
							font-weight: bold;
							line-height: 24px;
							flex-wrap: wrap;
							color: #f57b21;
						}
						p{
							text-align: justify;
							font-size: 14px;
							color: #FFFFFF;
							line-height: 24px;
							overflow : hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 8;
							-webkit-box-orient: vertical;
							margin-bottom: 5px;
							margin-top: 20px;
						}
						span{
							float:right;
							width: 102px;
							height: 34px;
							border-radius: 17px;
							background: url(../../assets/img/header/more.png) no-repeat;
							margin-top: 15px;
						}
						.meng{
							width: 100%;
							height: 100%;
							background-color:#000;filter:Alpha(Opacity=60);opacity:0.6;
							position: absolute;
							top: 0;left: 0;
							z-index: 1;
							
						}
					}
				}
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
				margin-bottom:30px; 
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				
				li{
					width: 285px;
					margin-right: 20px;
					float: left;
					&:last-child{
						margin-right: 0;
					}
					img{
						width: 285px;
						height: 160px;
						
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