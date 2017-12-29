<template>
	<div class="search_project">
		<div class="search-wrap" @keydown="keySearch($event)">
			<input type="text" placeholder="请搜索项目" v-model="searchText"/>
			<span class="searchButton" @click="jumpPage(current_page)"></span>
		</div>
		<div class="hotWordsWrap">
			<p v-for="(item,index) in hotWords" @click="choseHot(index)">{{item}}</p>
		</div>
		<div class="result-wrap">
			<ul class="">
				<li v-for="pro in resultList">
					<img :src="pro.pic" />
					<div class="projectDetail">
						<h3>{{pro.projectName}}</h3>
						<p>{{pro.projectDescription}}</p>
						<router-link :to="{name:'projectDetail',query:{id:pro.pkid}}" class="more" target="_blank"></router-link>
					</div>
				</li>
			</ul>
			<div class="page" v-if="haveResult">
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
	import MyAjax from "../../assets/js/MyAjax.js"
	import Vue from "vue"
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
	        		},{
	        			"img":require("../../assets/img/images/12.jpg"),
	        			"projectName":"上海中心",
	        		},
	        		
			    ],
			    searchText:"",
			    hotWords:["李彦宏","马化腾","马云","优秀"],
			    resultList:[],
			    current_page: 1, //当前页
	        pages: "", //总页数
	        changePage:'1',//跳转页
	        haveResult:false,
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
    			if(this.pages > 7) {
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
    	created(){
    		console.log(this.$route.query)
//  		Vue.set(this,"searchText",this.$route.query.kw)
//  		if(this.$route.query.kw=="all"){
//  			Vue.set(this,"searchText","")
//  		}else{
//  			Vue.set(this,"searchText",this.$route.query.kw)
//  		}
    		this.search(this.current_page);
    	},
		methods:{
			jumpPage(current_page){
    			
    			location.hash = location.hash=location.hash.split("=")[0]+"="+ this.searchText;
    			var that = this;
    			if(that.searchText.trim().length!=0){
    				var url = MyAjax.urlsy+"/ediHomePage/searchProjsByKeyWords/"+ current_page +"/"+that.searchText
						MyAjax.ajax({
							type: "GET",
							url:url,
							dataType:"json",
							async: false,
		//					contentType:"application/json;charset=utf-8",
						}, function(data){
							console.log(data)
							if(data.code==0){
								Vue.set(that,"resultList",data.msg.records)
								Vue.set(that,"pages",data.msg.pages)
								Vue.set(that,"current_page",data.msg.current)
								if(that.resultList.length!=0){
									that.haveResult = true;
								}else{
									that.haveResult = false;
								}
							}
						},function(err){
		//					router.push("/error/404")
							console.log(err)
						})
    			}else{
    				that.search(current_page)
    			}
    			
				
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
    		search(current_page){
//  			location.hash = location.hash=location.hash.split("=")[0]+"="+ this.searchText;
    			
    			var that =this ;
    			var url = MyAjax.urlsy + "/ediHomePage/searchProjs/"+ current_page ;
    			MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"resultList",data.msg.records)
						Vue.set(that,"pages",data.msg.pages)
						Vue.set(that,"current_page",data.msg.current)
						
						if(that.resultList.length!=0){
								that.haveResult = true;
							}else{
								that.haveResult = false;
							}
					}
				},function(err){
					console.log(err)
				})
    		},
    		keySearch($event){//enter
		      	var event = $event || window.event;  
			 	if(event.keyCode==13){ 
			     this.jumpPage(this.current_page);
		         event.returnValue = false;    
		         event.cancelBubble=true;
		         event.preventDefault();
		         //event.stopProgagation();
		         return false;
		      	} 
		
			},
		},
		watch:{
			current_page:function(){
	//				location.hash=location.hash.split("=")[0]+"="+this.current_page
				this.jumpPage(this.current_page);
				
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
			margin-top: 30px;
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
							min-height: 180px;
							overflow : hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 8;
							-webkit-box-orient: vertical;
							margin-bottom: 5px;
							margin-top: 20px;
						}
						.more{
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
							background: #FFFFFF;
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