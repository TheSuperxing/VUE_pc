<template>
	<div class="search_team">
		<div class="search-wrap">
			<input type="text" placeholder="请搜索团队" />
		</div>
		<div class="hotWordsWrap">
			<p v-for="(item,index) in hotWords" @click="choseHot(index)">{{item}}</p>
		</div>
		<div class="result-wrap">
			<div class="stateNone">
				在月球也没找到~
			</div>
		</div>
		<div class="hot-list">
			<h1><span>热门团队</span></h1>
			<ul v-for="ul in teamMsg" >
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
		name:"SearchTeam",
		data:function(){
			return{
				teamMsg:[
			    	[
			    		{
							"img":require("../../assets/img/header/图层108.png"),
						},{
							"img":require("../../assets/img/header/图层108.png"),
						},{
							"img":require("../../assets/img/header/图层108.png"),
						},
			    	],
			    	
			    ],
			    searchText:"",
			    hotWords:["全程","迈格设计","迈博","钜力结构","DI机电"],
			    resultList:[],
			    hotList:[],
			    current_page: 1, //当前页
		        pages: "5", //总页数
		        changePage:'1',//跳转页
			}
		},
		computed: {
    		show: function() {
    			return this.pages && this.pages != 1
    		},
    		pstart: function() {
    			return this.current_page == 1;
    		},
    		pend: function() {
    			return this.current_page == this.pages;
    		}, 	 	
    		efont: function() {
    			if(this.pages <= 7) return false;
    			if(this.pages==8) return false;
    			return this.current_page > 5
    		},
    		ebehind: function() {
    			if(this.pages <= 7) return false;
    			if(this.pages==8) return false;
    			var nowAy = this.indexs;
    			return nowAy[nowAy.length - 1] != this.pages;
    		},
    		indexs: function() {

    			var left = 1,
    				right = this.pages,
    				ar = [];
    			if(this.pages >= 7) {
    				if(this.current_page > 5 && this.current_page < this.pages - 4) {
    					left = Number(this.current_page) - 3;
    					right = Number(this.current_page) + 3;
    				} else {
    					if(this.current_page <= 5) {
    						left = 1;
    						if(this.pages==7&&this.current_page <=2){
    							right = 6;
    						}else{
    							right = 7;
    						}
    						if(this.pages==8&&(this.current_page ==4||this.current_page ==5)){
    							right = 8;
    						}
    						if(this.pages==9&&this.current_page ==5){
    							right = 9;
    						}
    					} else {
    						right = this.pages;
    						if(this.pages==7){  //正好等于7的情况
    							left = this.pages - 5;
    						}else{
    							left = this.pages - 6;
    						}
    					}
    				}
    			}
    			while(left <= right) {
    				ar.push(left);
    				left++;
    			}
    			return ar;
    		},
    	},
    	methods:{
    		searchClick(current_page){
				this.jumpPage(current_page);
				this.current_page = 1;
			},
    		jumpPage(current_page){
    			
    			var that = this;
				var url = 
				this.current_page = current_page;
//				
    		},
    		pagePlus() {
    			this.current_page++;
//  			return this.current_page;
    		},
    		pageMinus() {
    			this.current_page--;
//  			return this.current_page;
    		},
    		choseHot(index){
    			this.searchText = this.hotWords[index]
    		},
    		getHotList(){
				var that = this;
				var url = MyAjax.urlsy+"/ediHomePage/popTeams";
				MyAjax.ajax({
					type: "GET",
					url:url,
					dataType:"json",
					async: false,
//					contentType:"application/json;charset=utf-8",
					ifFreeLogin:true,//是否能够进行免登录获取数据,true能够无登陆获取
				}, function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"hotList",data.msg)
					}
				},function(err){
//					router.push("/error/404")
					console.log(err)
				})
			}
    	}
	}
</script>

<style lang="scss" scoped="scoped">
  $themeColor:#ff7403; 
	.search_team{
		.search-wrap{
			width: 700px;
			height: 50px;
			border-radius: 25px;
			box-shadow: 0 0 15px rgba(179,179,179,.5);
			padding: 0 20px;
			margin: 0px auto 0;
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
		.hotWordsWrap{
			width: 700px;
			margin: 10px auto;
    		height: 20px;
    		p{
    			display: inline-block;
    			padding-right: 10px;
    			margin-left: 12px;
    			font-size: 14px;
    			height: 14px;
    			line-height: 14px;
    			border-right: 2px solid #353535;
    			cursor: pointer;
    		}
    		p:last-child{
    			border-right: none;
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