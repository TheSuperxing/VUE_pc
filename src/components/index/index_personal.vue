<template>
  <div class="index_personal">
    <h2>PERSONAL</h2>
    <h1>个人推介</h1>
    <div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container gallery swiper-container-horizontal">  
			<div class="swiper-wrapper">  
				<ul v-for="ul in perMsg" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 15px;">
					<li v-for="item in ul">
						<dl>
							<dd>
								<img :src="item.pic" alt=""/>
							</dd>
							<dt>
								<h3>{{item.psnName}}</h3>
								<p>{{item.selfIntroduction}}</p>
							</dt>
						</dl>
						<div class="more">
							<router-link :to="{name:'personDetail',query:{id:item.accountID}}" target="_blank">
								<img src="../../assets/img/header/more.png" />
							</router-link>
						</div>
					</li>
				</ul>
			  <!--<div v-for="value in lbt" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 10px;" v-bind:style="{backgroundImage: 'url(' + value.imgs + ')'}"></div>-->  
			</div>  
			<div class="swiper-pagination swiper-pagination-personal"></div>
			</div>  
			<div class="search">
				<router-link :to='{name:"SearchPersonal",query:{kw:"all"}}'>去看看更多新伙伴>></router-link>
			</div>
  </div>
</template>

<script>
	import Swiper from "../../assets/js/lib/swiper/swiper.js"
  import MyAjax from "../../assets/js/MyAjax.js"
	let gallery
  export default {
    name: 'index_personal',
    data:function(){
      return {
        perMsg:[],
        
      }
    },
    created(){
    	var that = this;
    	that.getData();
    },
    mounted(){
    	var that = this;
    	
    	that.lunbo()  
			
    },
    methods:{
    	getData(){
    		var that = this;
    		var url = MyAjax.urlsy + "/ediHomePage/findPersons";
    		MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
					ifFreeLogin:true,//是否能够进行免登录获取数据,true能够无登陆获取
				},function(data){
					console.log(data)
					//给获取的数据分组
					that.perMsg = [];
					for(var i=0,len=data.msg.records.length;i<len;i+=12){
					   that.perMsg.push(data.msg.records.slice(i,i+12));
					}
//					console.log(that.perMsg)
				},function(err){
					console.log(err)
				})
    	},
			lunbo () {  
	      gallery = new Swiper('.gallery', {  
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
	      
	      gallery.params.control = gallery   
	    },  
	    stopPlay () {  
	      gallery.autoplay.stop();  
	    },  
	    play () {  
	      gallery.autoplay.start();
	    } 
		}
  }
</script>
<style scoped lang="scss">
  $themeColor:#ff7403; 
	.index_personal{
		width: 1230px;
		/*height: 740px;*/
		margin: 130px auto 30px;
		
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
		.gallery{
			width: 1230px;
			margin: 40px auto 0px;
			padding-bottom: 40px;
			padding-left: 15px;
			.swiper-wrapper{
				width: 1200px;
				.swiper-slide{
					width: 1200px;
					/*margin: 0 15px;*/
					padding-top: 15px;
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
							height: 62px;
							line-height: 60px;
							text-align: center;
							border-radius:50% ;
							overflow: hidden;
							img{
								width: 60px;
								height: 60px;
								border-radius: 50%;
							}
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
