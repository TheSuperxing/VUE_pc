<template>
  <div class="index_demand">
    <h2>DEMANDS</h2>
    <h1>需求大厅</h1>
    <div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container gallery-demand swiper-container-horizontal">  
			<div class="swiper-wrapper">  
				<ul v-for="ul in perMsg" class="swiper-slide swiper-slide-next">
					<li v-for="item in ul">
							<div class="name-wrap">
								<img :src="item.img" alt=""/>
								<em>用户15653245463</em>
							</div>
							<div class="detail-wrap">
								<h3>我有一个需求建造一幢大楼然后炸掉再建一幢再炸掉再建一幢再炸掉再建一幢再炸掉</h3>
								<p>发布时间：<em>2017.12.06</em></p>
								<p>需求对象：<em>团队</em></p>
								<p>需求酬劳：<em>150W-200W</em></p>
							</div>
							<div class="more">
								<router-link :to="{name:'DemandDetail',query:{id:item.demandID,watchTimes:item.watchTimes}}">
									查看需求详情>>
								</router-link>
							</div>
					</li>
				</ul>
			  <!--<div v-for="value in lbt" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 10px;" v-bind:style="{backgroundImage: 'url(' + value.imgs + ')'}"></div>-->  
			</div>  
			<div class="swiper-pagination swiper-pagination-personal"></div>
			</div>  
			<div class="search">
				<router-link to="">更多需求等你发现>></router-link>
			</div>
  </div>
</template>

<script>
	import Swiper from "../../assets/js/lib/swiper/swiper.js"
  import MyAjax from "../../assets/js/MyAjax.js"
	let galleryDemand
  export default {
    name: 'index_demand',
    data:function(){
      return {
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
        		},{
        			"img":require("../../assets/img/header/图层97.png"),
        		},
        		
        	],
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
        		},{
        			"img":require("../../assets/img/header/图层97.png"),
        		},
        	],
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
        		},{
        			"img":require("../../assets/img/header/图层97.png"),
        		},
        	],
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
        		},{
        			"img":require("../../assets/img/header/图层97.png"),
        		},
        	],
        ]
        
      }
    },
    mounted(){
    	var that = this;
    	that.getData();
    	that.lunbo()  
    },
    methods:{
    	getData(){
    		var url = MyAjax.urlsy + "/ediHomePage/findDemands";
    		MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: true,
				},function(data){
					console.log(data)
					//给获取的数据分组
//					for(var i=0,len=data.msg.length;i<len;i+=3){
//					   that.perMsg.push(data.msg.slice(i,i+3));
//					}
//					console.log(that.perMsg)
				},function(err){
					console.log(err)
				})
    	},
			lunbo () {  
	      galleryDemand = new Swiper('.gallery-demand', {  
//	        navigation: {
//				    nextEl: '.swiper-button-next',
//				    prevEl: '.swiper-button-prev',
//				  }, 
	        spaceBetween: 15,  
	        initialSlide: 0,  
	        slideToClickedSlide: true,
	        preventLinksPropagation : false,
	        autoplayDisableOnInteraction: false,
	        pagination: {
			      el: '.swiper-pagination',
			      clickable:true,
			    },
	      })  
	      galleryDemand.params.control = galleryDemand   
	    },  
	    stopPlay () {  
	      galleryDemand.autoplay.stop();  
	    },  
	    play () {  
	      galleryDemand.autoplay.start();
	    } 
		}
  }
</script>
<style scoped lang="scss">
  $themeColor:#ff7403; 
	.index_demand{
		width: 1230px;
		/*height: 740px;*/
		margin: 50px auto 30px;
		
		h1{
			height: 30px;
			line-height: 30px;
			text-align: center;
			font-size: 30px;
			font-weight: bold;
			color: $themeColor;
			background: url(../../assets/img/header/矩形17副本.png) no-repeat top center;
		}
		h2{
			height: 30px;
			line-height: 30px;
			text-align: center;
			font-size: 30px;
			color: #808080;
		}
		.gallery-demand{
			margin: 40px auto 0px;
			padding-bottom: 40px;
			padding-left: 15px;
			.swiper-wrapper{
				width: 1200px;
				.swiper-slide{
					width: 1200px;
					padding-top: 15px;
					li{
						float: left;
						width: 285px;
						height: 200px;
						margin-right: 20px;
						margin-bottom: 20px;
						background: #ffffff;
						border-radius: 5px;
						overflow: hidden;
						position:relative; 
						&:nth-child(4n){
							margin-right: 0;
						}
						&:hover{
							.name-wrap{
								background: $themeColor;
								color: #FFFFFF;
							}
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
							from {bottom: -65px;}
							to {bottom:0;}
						}
						
						@-webkit-keyframes mymove /*Safari and Chrome*/
						{
							from {bottom: -65px;}
							to {bottom:0;}
						}
						.name-wrap{
							height: 64px;
							line-height: 64px;
							overflow: hidden;
							background: #CCCCCC;
							padding-left: 20px;
							img{
								vertical-align: middle;
								width: 41px;
								height: 41px;
								border-radius: 50%;
								margin-right: 15px;
								
							}
							em{
								color: #FFFFFF;
								font-size: 16px;
								/*overflow : hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;*/
							}
						}
						.detail-wrap{
							padding: 12px 15px;
							h3{
								height: 50px;
								line-height: 24px;
								font-size: 16px;
								font-weight: bold;
								color: #333333;
								overflow : hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								margin-bottom: 5px;
							}
							p{
								color: #808080;
								line-height: 18px;
								font-size: 14px;
								
								
							}
						}
						.more{
							position: absolute;
							bottom: -65px;
							left: 0;
							width: 100%;
							height: 65px;
							line-height: 65px;
							text-align: center;
							background: #F7F7F7;
							a{
								font-size: 18px;
								font-weight: bold;
							color: $themeColor;
							}
							

						}
						
					}
				}
				.swiper-pagination-bullets{
					.swiper-pagination-bullet{
						width: 50px;
						height: 6px;
					}
				}
			}
		}
		.search{
			height: 24px;
			line-height: 24px;
			text-align: center;
			a{
				font-size: 14px;
				color: #808080;
			}
			
		}
	}
</style>
