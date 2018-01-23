<template>
	<div class="teamReferral">
		<div class="banner">
			<div class="title">
				<h1>团队推介</h1>
				<h2>TEAM</h2>
			</div>
		</div>
		<div class="basic-wrap">
			<div class="content">
				<div class="img-wrap">
					<img src="" />
				</div>
				<div class="describe-wrap">
					<h1>ccdi悉地国际</h1>
					<p>一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介
					一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介一些简介</p>
				</div>
			</div>
		</div>
		<div class="middle-banner"></div>
		<div class="pro-wrap">
			<div class="title">
				<h2>PROJECT EXPERIENCES</h2>
				<h1>项目经历</h1>
			</div>
			<div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container galleryPro swiper-container-horizontal">  
				<div class="swiper-wrapper">  
					<ul v-for="ul in proMsg" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 15px;">
						<li v-for="item in ul">
							<dl>
								<dd>
									<img :src="item.pic" alt=""/>
								</dd>
								<dt>
									<h3>{{item.projectName}}</h3>
									<p>参与角色： {{item.takeOffice}}</p>
								</dt>
							</dl>
							<!--<div class="more">
								<router-link :to="{name:'personReferral',query:{id:item.accountID}}" target="_blank">
									<img src="../../assets/img/header/more.png" />
								</router-link>
							</div>-->
						</li>
					</ul>
				</div>  
				<div class="swiper-pagination swiper-pagination-personal"></div>
			</div>
		</div>
		<div class="leadingMenber-wrap">
			<div class="title">
				<h2>LEADING MEMBER</h2>
				<h1>主要成员</h1>
			</div>
			<div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container galleryMember swiper-container-horizontal">  
				<div class="swiper-wrapper">  
					<ul v-for="ul in proMsg" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 15px;">
						<li v-for="item in ul">
							<dl>
								<dd>
									<img :src="item.pic" alt=""/>
								</dd>
								<dt>
									<h3>{{item.projectName}}</h3>
									<p>参与角色： {{item.takeOffice}}</p>
								</dt>
							</dl>
							<!--<div class="more">
								<router-link :to="{name:'personReferral',query:{id:item.accountID}}" target="_blank">
									<img src="../../assets/img/header/more.png" />
								</router-link>
							</div>-->
						</li>
					</ul>
				</div>  
				<div class="swiper-pagination swiper-pagination-personal"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import MyAjax from "../../assets/js/MyAjax.js"
	import Swiper from "../../assets/js/lib/swiper/swiper.js"
	import Vue from "vue"
	let galleryPro
	let galleryMember5
	export default{
		name:"teamReferral",
		data:function(){
			return{
				teamInfo:{},
				proMsg:[]
			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				var that = this;
				var url = MyAjax.urlsy+"/ediHomePage/teamPersonalityPage/" + that.$route.query.id
			    	MyAjax.ajax({
							type: "GET",
							url:url,
							dataType: "json",
							async:false,
						},function(data){
							console.log(data)
								if(data.code==0){
									console.log(data.msg)
									Vue.set(that,"teamInfo",data.msg)
									for(var i=0,len=that.personInfo.psnProjExpes.length;i<len;i+=12){
									   that.proMsg.push(that.personInfo.psnProjExpes.slice(i,i+12));
									}
								}
							console.log(that.teamInfo)
						},function(err){
							console.log(err)
						})
			},
			lunbo () {  
		      galleryPro = new Swiper('.galleryPro', {  
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
		      galleryMember = new Swiper('.galleryMember', {  
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
		        
		        galleryPro.params.control = galleryPro   
		        galleryMember.params.control = galleryMember   
		    }, 
		    stopPlay () {  
		        galleryPro.autoplay.stop();  
		    },  
		    play () {  
		        galleryPro.autoplay.start();
		    } 
		}
	}
</script>

<style scoped="scoped" lang="scss">
@import url("../../assets/js/lib/swiper/swiper.css"); 
$themeColor:#f7931e; 
.teamReferral{
	.banner{
		height: 335px;
		width: 100%;
		background: url(../../assets/img/header/banner8.jpg) no-repeat;
		position:relative;
		.title{
			width: 533px;
			height: 108px;
			position: absolute;
			z-index: 9;
	 		top: 335px; left: 50%;
	 		transform:translate(-50%,-50%);
			 -webkit-transform:translate(-50%,-50%);
			-moz-transform:translate(-50%,-50%);
			-ms-transform:translate(-50%,-50%);
			-o-transform:translate(-50%,-50%);
			background: #FFFFFF;
			border-radius: 10px;
			box-shadow: 0 0 20px rgba(160,160,160,.9);
			padding:15px 0;
			h1{
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 30px;
				font-weight: 600;
				color: $themeColor;
				/*background: url(../../assets/img/header/矩形17副本.png) no-repeat top center;*/
			}
			h2{
				height: 55px;
				line-height: 55px;
				text-align: center;
				font-size: 30px;
				color: $themeColor;
			}
		}
	}
	.basic-wrap{
		height: 735px;
		background: #FFFFFF;
		padding-top: 130px;
		.content{
			width: 1196px;
			overflow:hidden;
			margin:0px auto;
			.img-wrap{
				width: 485px;
				height: 485px;
				float: left;
				background: #F7F7F7;
			}
			.describe-wrap{
				width: 711px;
				height: 485px;
				float: left;
				background: url(../../assets/img/header/888.png) no-repeat left;
				padding-left: 128px;
				h1{
					height: 150px;
					line-height: 150px;
					font-size: 30px;
					color: #333333;
					font-weight: bold;
				}
				p{
					text-align: justify;
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
 	.pro-wrap,.leadingMenber-wrap{
 		.title{
 			width:400px;
 			margin:55px auto;
 			h1{
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 30px;
				font-weight: bold;
				color: #f15a24;
				
			}
			h2{
				height: 80px;
				line-height: 80px;
				text-align: center;
				font-size: 30px;
				color: #808080;
				background: url(../../assets/img/header/矩形17副本.png) no-repeat bottom center;
				background-size: 100%;
			}
 		}
 	}
 	.leadingMenber-wrap{
 		
 	}
}
</style>