<template>
	<div class="search_personal">
		<div class="search-wrap">
			<input type="text" placeholder="请搜索个人" />
		</div>
		<div class="result-wrap">
			<div class="stateNone">
				在月球也没找到~
			</div>
			<div class="list-wrap">
				<ul>
					<li></li>
				</ul>
				<div class="page">
				    <div class="pagelist">
				      <span class="pre" :class="{disabled:pstart}"  @click="pageMinus"></span>
				      <span v-show="current_page>5" class="jump" @click="jumpPage(1)">1</span>
				      <span class="ellipsis"  v-show="efont">...</span>
				      <span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
				      <span class="ellipsis"  v-show="ebehind">...</span>
				      <span v-show="current_page<pages-4" class="jump" @click="jumpPage(pages)">{{pages}}</span>
				      <!--<span class="jumppoint">跳转到：</span>-->
				      <span class="jumpinp"><input type="text" v-model="changePage"><em @click="jumpPage(changePage)"></em></span>
				     <!-- <span class="gobtn" >GO</span>-->
				      <span :class="{disabled:pend}" class="next" @click="pagePlus"></span>
				    </div>
				  </div>
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
	import MyAjax from "../../assets/js/MyAjax.js"
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
			    	
			    ],
			    current_page: 1, //当前页
		        pages: "5", //总页数
		        changePage:'1',//跳转页
		        nowIndex: 0,
		        goodsIArr:[],
		        goodsTArr:[],
		        dataInfo:[],
				haveCollect:[],//有没有在收藏里
			    
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
    			return this.current_page > 5
    		},
    		ebehind: function() {
    			if(this.pages <= 7) return false;
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
    						right = 7;
    					} else {
    						right = this.pages;

    						left = this.pages - 6;
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
			jumpPage(num){
    			
    			var that = this;
				var url = "http://datainfo.duapp.com/shopdata/getGoods.php"
	//			MyAjax.fetchJsonp(url, function(data){
	//				console.log(data)
	////				data = data.replace("callback(","");
	////				Vue.set(this,"dataInfo",data);
	////				console.log(this.dataInfo);
	//				
	//			},function(err){
	//				console.log(err)
	//			})
				this.current_page = num;
//				$.ajax({
//					type: "POST",
//					url:url,
//					data: {classID:this.current_page},
//					success:function(data){
//						data = data.replace("callback(","").slice(0,-1);
//		//				data = data.slice(0,-1);
//						data = JSON.parse(data);
////						console.log(data)
//						that.dataInfo = data
////						console.log(that.dataInfo)
//					},
//					error:function(err){
//						console.log(err)
//					}
//				})
    		},
    		pagePlus() {
    			this.current_page++;
//  			return this.current_page;
    		},
    		pageMinus() {
    			this.current_page--;
//  			return this.current_page;
    		},
		},
		watch:{
			current_page:function(){
				this.jumpPage(this.current_page);
			}
		}
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
				display: none;
			}
			.list-wrap{
				.page {
					/*min-width: 900px;*/
					text-align: center;
					color: #888888;
					
					 /*transform:translateX(-50%);
					 -webkit-transform:translateX(-50%);
					-moz-transform:translateX(-50%);
					-ms-transform:translateX(-50%);
					-o-transform:translateX(-50%);*/
					 display: table;
		   			 margin: 30px auto 80px;
					
					.pagelist {
						font-size: 0;
						height: 34px;
						/*line-height: 50px;*/
						span {
							font-size: 14px;
							float: left;
							width: 28px;
							height: 28px;
							line-height: 28px;
							margin-right: 14px;
							
						}
						.jump {
							border: 1px solid $themeColor;
							width: 28px;
							height: 28px;
							line-height: 26px;
							text-align: center;
							-webkit-border-radius: 14px;
							-moz-border-radius: 14px;
							border-radius: 14px;
							cursor: pointer;
							margin-top: 3px;
							
							
						}
						.pre,.next{
							width: 34px;
							height: 34px;
							border: none;
							-webkit-border-radius: 17px;
							-moz-border-radius: 17px;
							border-radius: 17px;
							background: url(../../assets/img/header/2525.png) no-repeat;
						}
						.pre{
							margin-right: 50px;
							transform: rotateY(180deg);
							-webkit-transform: rotateY(180deg);    /* for Chrome || Safari */
		           			-moz-transform: rotateY(180deg);       /* for Firefox */
		           			-ms-transform: rotateY(180deg);        /* for IE */
			                -o-transform: rotateY(180deg);         /* for Opera */
						}
						.next{
							margin-left: 50px;
						}
						.bgprimary {
							cursor: default;
							line-height: 23px;
							/*color: #fff;*/
							/*background: #337ab7;*/
							border: 3px solid $themeColor;
							
						}
						.jumpinp{
							margin-top: 3px;
							height:28px;
							width: 79px;
							border: 1px solid $themeColor;
							
							-webkit-border-radius: 14px;
							-moz-border-radius: 14px;
							border-radius: 14px;
							padding-left: 10px;
							/*background: url(../../assets/img/demand/icon010.png) no-repeat center;*/
							overflow: hidden;
							input{
								width: 40px;
								height: 24px;
								font-size: 13px;
								text-align: center;
								margin-top: 2px;
								float: left;
								background: none;
							}
							em{
								width: 24px;
								height: 24px;
								float: right;
								margin-top: 1px;
								margin-right: 2px;
								background: url(../../assets/img/demand/icon001.png) no-repeat right center;
							}
						}
						
						
						.ellipsis {
							padding: 0px 8px;
						}
						
						.jumppoint {
							margin-left: 30px;
						}
						.gobtn {
							font-size: 12px;
						}
						.disabled {
							pointer-events: none;
							background: #F7F7F7;
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
							height: 54px;
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