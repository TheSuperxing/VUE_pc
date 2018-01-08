<template>
  <div>
		<!--<header-nav></header-nav>-->
		<div id="indexCont">
			<div class="banner">
				<div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container gallery-top swiper-container-horizontal">  
					<div class="swiper-wrapper">  
					   <div v-for="value in lbt" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 10px;" v-bind:style="{backgroundImage: 'url(' + value.imgs + ')'}"></div>  
					</div>  
					<div class="swiper-pagination"></div>
					<div class="swiper-button-next swiper-button-white"></div>  
					<div class="swiper-button-prev swiper-button-white "></div>  
					</div>  
					<div class="swiper-container gallery-thumbs swiper-container-horizontal">  
					<div class="swiper-wrapper">  
					  <div v-for="value in lbt" class="swiper-slide swiper-slide-next" style="margin-right: 10px;" v-bind:style="{backgroundImage: 'url(' + value.imgs + ')'}"></div>  
					</div>  
				</div>  
			</div>
			<div class="search-board">
				<ul>
					<li>
						<router-link :to='{name:"SearchPersonal",query:{kw:"all"}}'>
							<h1>找个人</h1>
							<p>找个人？找同事？</p>
							<p>即可进入搜索页，找到他们</p>
						</router-link>
						
					</li>
					<li>
						<router-link :to='{name:"SearchTeam",query:{kw:"all"}}'>
							<h1>找团队</h1>
							<p>进来试试吧</p>
							<p>找到属于你的super team</p>
						</router-link>
						
					</li>
					<li>
						<router-link :to='{name:"SearchCompany",query:{kw:"all"}}'>
							<h1>找公司</h1>
							<p>来这里！来这里！</p>
							<p>你能找到更多业内公司</p>
						</router-link>
						
					</li>
					<li>
						<router-link :to='{name:"SearchProject",query:{kw:"all"}}'>
							<h1>找项目</h1>
							<p>一个与你相关的</p>
							<p>中国最知名的建筑项目</p>
						</router-link>
					</li>
				</ul>
			</div>
			<index-personal></index-personal>
			<div class="middle-banner"></div>
			<index-team></index-team>
			<index-demand></index-demand>
			<index-project></index-project>
			<div class="aboutUs">
				<h2>ABOUT US</h2>
    		<h1>关于我们</h1>
    		<ul>
    			<li>Buildingshop是面向建筑行业的信息汇总平台及在线服务市场。
在这里，建筑行业内各专业的专家、知名团队和公司组成了Buildingshop的用户群。
为使得用户可以通过Buildingshop扩充行业内人脉圈，网站搭建了项目数据库，涵盖了国内著名的建筑项目，用户可以通过项目经历与参与过相同项目的其他用户结成“关系圈”。
秉承“找专业人做专业事”的理念，在Buildingshop中，还有专门面向建筑领域的在线服务市场，使得发布需求、承接需求得以一站实现。 
欢迎您在Buildingshop中体验网站的功能，如有建议或问题，期待您与我们联系。</li>
					
					<li>
						<h3>联系我们</h3>
						<h6>Contact us</h6>
						<p>电话客服1：<em>021-45658989</em></p>
						<p>电话客服2：<em>021-45658999</em></p>
						<p>联系微信：<em>45656862</em></p>
						<p>联系QQ : <em>143563153</em></p>
						<p>电子邮箱：<em>464645225@ccdi.com.cn</em></p>
					</li>
    		</ul>
			</div>
		</div>
		<!--<footer-nav></footer-nav>-->
  </div>
</template>

<script>
  import MyAjax from "../../assets/js/MyAjax.js"
	import FooterNav from "../footer.vue";
	import HeaderNav from "../header.vue";
	import indexPersonal from "./index_personal.vue"
	import indexTeam from "./index_team.vue"
	import indexDemand from "./index_demand.vue"
	import indexProject from "./index_project.vue"
	import Swiper from "../../assets/js/lib/swiper/swiper.js"

	let galleryTop  
	let galleryThumbs  
  export default {
		components:{
			HeaderNav,
			FooterNav,
			indexPersonal,
			indexTeam,
			indexDemand,
			indexProject
		},
    name: 'Index',
    data:function(){
      return {
				msg:"首页",
				lbt: [  
	        {  
	          'imgs': require('../../assets/img/header/banner8.jpg')
	        }, {  
	          'imgs': require('../../assets/img/header/banner1.jpg') 
	        }, {  
	          'imgs': require('../../assets/img/header/banner6.jpg') 
	        },{  
	          'imgs': require('../../assets/img/header/banner5.jpg') 
	        },
	      ]  
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
				data = data.msg;
				that.baseInfo = data;
			},function(err){
				console.log(err)
			})
    	//$(document.body).css("overflow-y","scoll");
    	 that.lunbo()  
    	 console.log(galleryTop)
		},
		methods:{
			lunbo () {  
	      galleryTop = new Swiper('.gallery-top', {  
	        navigation: {
				    nextEl: '.swiper-button-next',
				    prevEl: '.swiper-button-prev',
				  },   
	        spaceBetween: 0,  
	        initialSlide: 0,  
	        autoplayDisableOnInteraction: false ,
	        pagination: {
			      el: '.swiper-pagination',
			      clickable:true,
			    },
	      })  
	      galleryThumbs = new Swiper('.gallery-thumbs', {  
	        spaceBetween: 10,  
	        autoplay: 4000,  
	        initialSlide: 1,  
	        centeredSlides: true,  
	        slidesPerView: 'auto',  
	        touchRatio: 0.2,  
	        slideToClickedSlide: true,  
	        autoplayDisableOnInteraction: false,  
	        grabCursor: true  
	      })  
	      galleryTop.params.control = galleryTop   
	      galleryThumbs.params.control = galleryThumbs 
	    },  
	    stopPlay () {  
	      galleryTop.autoplay.stop();  
	      galleryThumbs.autoplay.stop();
	    },  
	    play () {  
	      galleryTop.autoplay.start();
	      galleryThumbs.autoplay.start(); 
	    } 
		}
  }
</script>
<style scoped lang="scss">
@import url("../../assets/js/lib/swiper/swiper.css"); 
 $themeColor:#ff7403; 
 
#indexCont{
	width: 100%;
	min-height: 600px;
	color: #FFFFFF;
	font-size: 20px;
	margin: 70px auto;
  position: relative;
 	background:#f7f7f7;
 	.gallery-top{
 		height: 500px;
 		
 		&:hover{
 			.swiper-button-next,.swiper-button-prev{
 				display: block;
 			}
 		}
 		.swiper-slide{
 			background-size: 100% 100%;
 		}
 		.swiper-button-next,.swiper-button-prev{
 				display: none;
 		}
 		.swiper-pagination{
 			position: absolute;
 			bottom: 80px;
 			.swiper-pagination-bullet{
 				width: 15px;
 				height: 15px;
 				border-radius: 50%;
 				
 			}
 			.swiper-pagination-bullet-active{
 				background: $themeColor;
 			}
 		}
 		
 	}
 	.search-board{
 		width: 1000px;
 		height: 150px;
 		position: absolute;
 		z-index: 9;
 		top: 500px; left: 50%;
 		transform:translate(-50%,-50%);
		 -webkit-transform:translate(-50%,-50%);
		-moz-transform:translate(-50%,-50%);
		-ms-transform:translate(-50%,-50%);
		-o-transform:translate(-50%,-50%);
		background: #FFFFFF;
		border-radius: 10px;
		box-shadow: 0 0 20px rgba(160,160,160,.9);
		
		ul{
			width: 100%;
			height: 100%;
			li{
				width: 25%;
				height: 100%;
				float: left;
				padding: 20px 0;
				
				&:nth-child(1n){
					background: url(../../assets/img/header/003.png) no-repeat center;
				}
				&:nth-child(2n){
					background: url(../../assets/img/header/004.png) no-repeat center;
				}
				&:nth-child(3n){
					background: url(../../assets/img/header/005.png) no-repeat center;
					border: none;
				}
				&:nth-child(4n){
					background: url(../../assets/img/header/006.png) no-repeat center;
					a{
						border: none;
					}
					
				}
				a{
					display: block;
					width: 100%;
					height: 100%;
					border-right:1px dotted #d9d9d9 ;
					&:hover{
						h1{
							color: $themeColor;
						};
						p{
							color: #353535;
						}
					}
					h1{
						color: #333333;
						font-weight: bold;
						height: 45px;
						line-height: 45px;
						text-align: center;
						margin-top: 8px;
					}
					p{
						height: 24px;
						line-height: 24px;
						text-align: center;
						font-size: 14px;
						color: #808080;
						
					}
				}
				
			}
		}
 	}
 	.middle-banner{
 		width: 100%;
 		height: 218px;
 		background: url(../../assets/img/header/中间banner.png) no-repeat;
 		background-size: 100% 100%;
 	}
 	.aboutUs{
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
		ul{
			width: 1200px;
			margin: 10px auto;
			overflow: hidden;
			li{
				float: left;
				padding: 20px;
				width: 75%;
				min-height: 240px;
				color: #333333;
				border-right: 1px dashed #808080;
				text-align: justify;
				font-size: 16px;
				&:last-child{
					width: 25%;
					border: none;
					h3{
						color: $themeColor;
						font-size: 24px;
						font-weight: bold;
					}
					h6{
						font-size: 24px;
						font-weight: bold;
					}
					p{
						color: #333333;
						font-size: 14px;
						line-height: 24px;
					}
				}
				

			}
		}
 	}
}
</style>
