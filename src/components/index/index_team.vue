<template>
  <div class="index_team">
    <h2>TEAM</h2>
    <h1>团队推介</h1>
    <div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container gallery-team swiper-container-horizontal">  
			<div class="swiper-wrapper">  
				<ul v-for="ul in perMsg" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 15px;">
					<li v-for="item in ul">
						<dl>
							<dd>
								<img :src="item.pic" alt=""/>
							</dd>
							<dt>
								<h3>{{item.teamName}}</h3>
								<p>认证员工<em>{{item.cerCounts}}</em></p>
								<p>{{item.companyName}}</p>
								<div class="more">
									<router-link :to="{name:'teamReferral',query:{id:item.accountID}}" target="_blank">
										MORE>>
									</router-link>
								</div>
							</dt>
						</dl>
						
					</li>
				</ul>
			  <!--<div v-for="value in lbt" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 10px;" v-bind:style="{backgroundImage: 'url(' + value.imgs + ')'}"></div>-->  
			</div>  
			<div class="swiper-pagination swiper-pagination-personal"></div>
			</div>  
			<div class="search">
				<router-link :to='{name:"SearchTeam",query:{kw:"all"}}'>去看看更多大牛团队>></router-link>
			</div>
  </div>
</template>

<script>
	import Swiper from "../../assets/js/lib/swiper/swiper.js"
  import MyAjax from "../../assets/js/MyAjax.js"
	let galleryTeam
  export default {
    name: 'index_team',
    data:function(){
      return {
        perMsg:[]
        
      }
    },
    mounted(){
    	var that = this;
    	that.getData();
    	that.lunbo();  
    },
    methods:{
    	getData(){
    		var that = this;
    		var url = MyAjax.urlsy + "/ediHomePage/findTeams";
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
					for(var i=0,len=data.msg.records.length;i<len;i+=9){
					   that.perMsg.push(data.msg.records.slice(i,i+9));
					}
					
				},function(err){
					console.log(err)
				})
    	},
			lunbo () {  
	      galleryTeam = new Swiper('.gallery-team', {  
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
	      
	      galleryTeam.params.control = galleryTeam   
	    },  
	    stopPlay () {  
	      galleryTeam.autoplay.stop();  
	    },  
	    play () {  
	      galleryTeam.autoplay.start();
	    } 
		}
  }
</script>
<style scoped lang="scss">
  $themeColor:#ff7403; 
	.index_team{
		width: 100%;
		/*height: 740px;*/
		background: #FFFFFF;
		padding: 50px 0;
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
		.gallery-team{
			width: 1230px;
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
						width: 380px;
						height: 140px;
						margin-right: 30px;
						margin-bottom: 30px;
						background: #f7f7f7;
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
								height: 48px;
								text-align: left;
								color: #333333;
								font-size: 18px;
								font-weight: bold;
								/*margin-bottom: 18px;*/
								overflow : hidden;
								flex-wrap: wrap;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								
							}
							p{
								color: #333333;
								line-height: 20px;
								height: 20px;
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

