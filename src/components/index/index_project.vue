<template>
	<div id="index_project">
		<h2>BUILDING PROJECTS</h2>
   	 	<h1>项目展示</h1>
		<div class="swiper-container  gallery-project">
			<div class="swiper-wrapper">
				<div v-for="pro in proMsg" class="swiper-slide">
					<router-link :to="{name:'projectDetail',query:{id:pro.pkid}}" target="_blank">
						<div class="img"><img :src="pro.pic" /></div>
						<div class="projectDetail">
							<h3>{{pro.projectName}}</h3>
							<p>{{pro.projectDescription}}</p>
							<span class="more"></span>
							<div class="meng"></div>
						</div>
					</router-link>
				</div>
			
			</div>
		</div>
		<div class="swiper-pagination"></div>
		<div class="swiper-button-prev swiper-button-white"></div>
		<div class="swiper-button-next swiper-button-white"></div>
		<div class="search">
			<router-link :to='{name:"SearchProject",query:{kw:"all"}}'>更多优质项目等你发掘>></router-link>
		</div>
	</div>
</template>

<script>
	import Swiper from "../../assets/js/lib/swiper/swiper.js"
  	import MyAjax from "../../assets/js/MyAjax.js"
  	import Vue from "vue"
  	import router from "../../router"
	let galleryProject
  	export default {
	    name: 'index_project',
	    data:function(){
	      return {
	        proMsg:[
//	        		{
//	        			"img":require("../../assets/img/images/10.jpg"),
//	        			"projectName":"国家游泳馆",
//	        		},{
//	        			"img":require("../../assets/img/images/11.jpg"),
//	        			"projectName":"上海迪士尼",
//	        		},{
//	        			"img":require("../../assets/img/images/12.jpg"),
//	        			"projectName":"上海中心",
//	        		},{
//	        			"img":require("../../assets/img/images/13.jpg"),
//	        			"projectName":"金茂大厦",
//	        		},{
//	        			"img":require("../../assets/img/images/26.jpg"),
//	        			"projectName":"东方明珠",
//	        		},{
//	        			"img":require("../../assets/img/images/31.jpg"),
//	        			"projectName":"五角大楼",
//	        		},{
//	        			"img":require("../../assets/img/images/14.jpg"),
//	        			"projectName":"香格里拉酒店",
//	        		},{
//	        			"img":require("../../assets/img/images/15.jpg"),
//	        			"projectName":"国际会展中心",
//	        		},{
//	        			"img":require("../../assets/img/images/16.jpg"),
//	        			"projectName":"世博园",
//	        		},{
//	        			"img":require("../../assets/img/images/17.jpg"),
//	        			"projectName":"还有啥",
//	        		},{
//	        			"img":require("../../assets/img/images/22.jpg"),
//	        			"projectName":"想不出",
//	        		},{
//	        			"img":require("../../assets/img/images/30.jpg"),
//	        			"projectName":"赶紧的",
//	        		},
	        	],
	        	slidesNum:"",
	        
	      }
	    },
	    created(){
	    	this.getData();
	    },
	    mounted(){
//	    	console.log(this.slidesNum)
	    	this.lunbo(this.slidesNum)
	    },
	    methods:{
	    	getData(){
	    		var that = this;
	    		var url = MyAjax.urlsy + "/ediHomePage/findProjs";
	    		MyAjax.ajax({
						type: "GET",
						url:url,
						dataType: "json",
						async: false,
					},function(data){
						console.log(data)
						//给获取的数据分组
						Vue.set(that,"proMsg",data.msg)
						Vue.set(that,"slidesNum",data.msg.length)
//						that.proMsg = data.msg.records;
//						for(var i=0,len=data.msg.records.length;i<len;i+=3){
//						   that.perMsg.push(data.msg.records.slice(i,i+3));
//						}
//					console.log(that.slidesNum)
					},function(err){
						console.log(err)
					})
	    	},
	    	lookMore(id){
	    		router.push({name:"projectDetail",id:id})
	    	},
	    	lunbo(slidesNum){
	    		var that = this;
	    		galleryProject = new Swiper('#index_project .gallery-project', {
				watchSlidesProgress: true,
				slidesPerView: 'auto',
				centeredSlides: true,
				loop: true,
				loopedSlides: slidesNum,
				autoplay: false,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
//					el: '.swiper-pagination',
					//clickable :true,
				},
				on: {
					progress: function(progress) {
						
						for (var i = 0; i < this.slides.length; i++) {
							var slide = this.slides.eq(i);
							var slideProgress = this.slides[i].progress;
							var modify = 1;
							if (Math.abs(slideProgress) > 1) {
								modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
							}
							let translate = slideProgress * modify * 520 + 'px';
							let scale = 1 - Math.abs(slideProgress) / 5;
							let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
							slide.transform('translateX(' + translate + ') scale(' + scale + ')');
							slide.css('zIndex', zIndex);
							slide.css('opacity', 1);
							slide.find(".meng").css('display', "block")
							if (Math.abs(slideProgress) > 1) {
								slide.css('opacity', 0);
								
							}
							if(Math.abs(slideProgress)==0){
								slide.find(".meng").css('display', "none")
							}
						}
					},
					setTransition: function(transition) {
						for (var i = 0; i < this.slides.length; i++) {
							var slide = this.slides.eq(i)
							slide.transition(transition);
//							$(".swiper-slide-active").find(".meng").css('opacity', 0)
							
						}
					}
				}
			
			})
	    	}
	    }
    }
</script>

<style lang="scss" scoped="scoped">
@import url("../../assets/js/lib/swiper/swiper_pro.css"); 
  $themeColor:#ff7403; 
#index_project{
	background: #FFFFFF;
	padding: 35px 0;
	h1{
		width: 320px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 30px;
		font-weight: bold;
		color: $themeColor;
		background: url(../../assets/img/header/矩形17副本.png) no-repeat top center;
		background-size: 100%;
		margin: 0px auto;
	}
	h2{
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 30px;
		color: #808080;
		
	}
	.gallery-project{
		margin-top: 50px;
		.swiper-slide{
			padding: 10px;
			a{
				display: block;
				width: 100%;
				height: 100%;
			}
			.img{
				width: 465px;
				height: 322px;
				float: left;
				img{
					width: 100%;
					height: 100%;
				}
			}
			
			.projectDetail{
				width: 285px;
				float: left;
				margin: 15px 7px 0 20px;
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
					height: 192px;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 8;
					-webkit-box-orient: vertical;
					margin-bottom: 5px;
					margin-top: 20px;
				}
				/*p::after {
				    content:"...";
				    font-weight:bold;
				    position:absolute;
				    bottom:0;
				    right:0;
				    padding:0 20px 1px 45px;
				    background:url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;
				}*/
				.more{
					float:right;
					width: 102px;
					height: 34px;
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