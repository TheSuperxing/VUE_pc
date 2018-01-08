<template>
	<div class="tradingIndex">
		
		<div class="google" @keydown="keySearch($event)">
			<input type="text" placeholder="搜索需求" v-model="searchText"/>
			<span class="searchButton" @click="searchClick(current_page)"></span>
		</div>
		<div class="result-table">
			<ul class="table-head">
				<li>名称</li>
				<li>发布日期</li>
				<li>酬劳</li>
				<li>申请/查看</li>
				<li>需求对象</li>
			</ul>
			<ul class="result-list">
				<li class="stateNone" v-if="!haveResult">没有查到相关需求~</li>
				<li v-for="(item,index) in dataInfo" class="list-wrap">
					<div><router-link :to="{name:'DemandDetail',query:{id:item.demandID}}">{{item.demandName}}</router-link></div>
					<div>{{item.publishTime}}</div>
					<div>{{item.reword}}</div>
					<div>{{item.appTimes}}/{{item.watchTimes}}</div>
					<div class="obj-wrap">
						<span class="demandObj" v-for="demand in item.demandobjs">{{demand}}<i>;</i></span>
						<!-- <span class="demandObj">{{item.className}}<i>;</i></span> -->
					</div>
					<div class="collect">
						<span class="cancelBtn" @click="cancelCollect(item.demandID,index)" v-if="haveCollect[index]">
							取消收藏
						</span>
						<span class="collectBtn" v-if="!haveCollect[index]" @click="collectThis(item.demandID,index)">
							<img src="../../assets/img/demand/icon002.png"/>
							收藏
						</span>
					</div>
				</li>
			</ul>
			<div class="M-box3"></div>
			
			  <div class="page"  v-show="show">
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
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../assets/js/modal.js"
	import router from '../../router'
	import MyAjax from "../../assets/js/MyAjax.js"
	export default{
		name:"tradingIndex",
		data:function(){
			return{
				current_page: 1, //当前页
		        pages: "1", //总页数
		        changePage:'1',//跳转页
		        nowIndex: 0,
		        goodsIArr:[],
		        goodsTArr:[],
		        dataInfo:[],
				haveCollect:[],//有没有在收藏里
				searchText:"",
			    hotWords:["李彦宏","马化腾","马云","优秀"],
			    resultList:[],
			    haveResult:false,
		    }
		},
		created(){
			this.searchText = this.$route.query.kw;
			this.jumpPage(this.current_page);
//			this.searchAll(this.current_page)
			
		},
        mounted() {
//			this.jumpPage(this.current_page);
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
    	methods: {
    		searchClick(current_page){
				this.jumpPage(current_page);
				this.current_page = 1;
			},
    		jumpPage(current_page){
    			location.hash = location.hash.split("=")[0]+"="+ this.searchText;
    			var that = this;
    			if(that.searchText.trim().length!=0){
    				that.haveCollect=[];
						var url = MyAjax.urlsy+"/tradeHall/findDemand/"+ that.searchText +"/"+current_page
						MyAjax.ajax({
							type: "GET",
							url:url,
							dataType:"json",
							async: false,
		//					contentType:"application/json;charset=utf-8",
						}, function(data){
								console.log(data)
							if(data.code==0){
								that.dataInfo = data.msg.records;//取出当前获取的所有需求
								that.current_page=data.msg.current;//设置当前页
								that.pages=data.msg.pages;//设置最大页数
								if(that.dataInfo.length!=0){
									that.haveResult = true;
								}else{
									that.haveResult = false;
								}
								for(let i=0;i<that.dataInfo.length;i++){
									that.dataInfo[i].demandobjs= that.dataInfo[i].demandObjCode.split(",")
									for(let j=0;j<that.dataInfo[i].demandobjs.length;j++){
										switch (that.dataInfo[i].demandobjs[j]){
											case "1001":
												Vue.set(that.dataInfo[i].demandobjs,[j],"个人")
												break;
											case "1002":
												Vue.set(that.dataInfo[i].demandobjs,[j],"公司")
												break;
											case "1003":
												Vue.set(that.dataInfo[i].demandobjs,[j],"团队")
												break;
											default:
												break;
										}
									}
									console.log(that.dataInfo[i].demandobjs)
									that.dataInfo[i].status=="1"?that.haveCollect.push(true):that.haveCollect.push(false);
									
								}
							}else{
								// if(data.msg=="100003"||data.msg=="100004"){//没有成功登陆
								// 	window.location.hash="/login"
								// }
							}
						},function(err){
		//					router.push("/error/404")
							console.log(err)
						})
    			}else{
    				that.searchAll(current_page)
    			}
				
			},
			tradeColl(id,status){
				var url = MyAjax.urlsy +"/tradeHall/collect/"+id+"/"+status
				var that=this;
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
//					data: JSON.stringify(that.dataInfo[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.jumpPage(that.current_page);
					}
				},function(err){
					console.log(err)
				})//更新到服务器
			},
    		pagePlus() {//向上翻页
				this.current_page<this.pages?this.current_page++:this.current_page;
    		},
			pageMinus() {//向上翻页
				this.current_page>1?this.current_page--:this.current_page;
    		},
    		cancelCollect(id,index){//取消收藏
				Vue.set(this.haveCollect,[index],false)
//				this.dataInfo[index].status="0"
				this.tradeColl(id,"0");
			},
			collectThis(id,index){//收藏这条
				Vue.set(this.haveCollect,[index],true)
//				this.dataInfo[index].status="1"
				this.tradeColl(id,"1");
			},
			searchAll(current_page){
    			this.haveCollect=[];
				var that = this;
				var url = MyAjax.urlsy+"/tradeHall/findDemands/" + current_page
				MyAjax.ajax({
					type: "GET",
					url:url,
					dataType:"json",
					async: false,
					contentType:"application/json;charset=utf-8",
				}, function(data){
					//console.log(data)
					if(data.code==0){
						that.dataInfo = data.msg.records;//取出当前获取的所有需求
						that.current_page=data.msg.current;//设置当前页
						that.pages=data.msg.pages;//设置最大页数
						if(that.dataInfo.length!=0){
							that.haveResult = true;
						}else{
							that.haveResult = false;
						}
						for(let i=0;i<that.dataInfo.length;i++){
							that.dataInfo[i].demandobjs= that.dataInfo[i].demandObjCode.split(",")
							for(let j=0;j<that.dataInfo[i].demandobjs.length;j++){
								switch (that.dataInfo[i].demandobjs[j]){
									case "1001":
										Vue.set(that.dataInfo[i].demandobjs,[j],"个人")
										break;
									case "1002":
										Vue.set(that.dataInfo[i].demandobjs,[j],"公司")
										break;
									case "1003":
										Vue.set(that.dataInfo[i].demandobjs,[j],"团队")
										break;
									default:
										break;
								}
							}
							console.log(that.dataInfo[i].demandobjs)
							that.dataInfo[i].status=="1"?that.haveCollect.push(true):that.haveCollect.push(false);
							
						}
						
					}else{
						if(data.msg=="100003"||data.msg=="100004"){//没有成功登陆
							that.searchAllNotLogin(current_page)
						}
					}
				},function(err){
	//					router.push("/error/404")
					console.log(err)
				})
    		},
    		keySearch($event){//enter键登录事件
		      	var event = $event || window.event;  
				 	if(event.keyCode==13){ 
				     this.jumpPage(this.current_page);
			         event.returnValue = false;    
			         event.cancelBubble=true;
			         event.preventDefault();
			         //event.stopProgagation();
			         return false;
			      	} 
				this.current_page = 1;
			},
			searchAllNotLogin(current_page){
    			this.haveCollect=[];
				var that = this;
				var url = MyAjax.urlsy+"/tradeHall/findDemandsNoRegister/" + current_page
				MyAjax.ajax({
					type: "GET",
					url:url,
					dataType:"json",
					async: false,
					contentType:"application/json;charset=utf-8",
				}, function(data){
					//console.log(data)
					if(data.code==0){
						that.dataInfo = data.msg.records;//取出当前获取的所有需求
						that.current_page=data.msg.current;//设置当前页
						that.pages=data.msg.pages;//设置最大页数
						if(that.dataInfo.length!=0){
							that.haveResult = true;
						}else{
							that.haveResult = false;
						}
						for(let i=0;i<that.dataInfo.length;i++){
							that.dataInfo[i].demandobjs= that.dataInfo[i].demandObjCode.split(",")
							for(let j=0;j<that.dataInfo[i].demandobjs.length;j++){
								switch (that.dataInfo[i].demandobjs[j]){
									case "1001":
										Vue.set(that.dataInfo[i].demandobjs,[j],"个人")
										break;
									case "1002":
										Vue.set(that.dataInfo[i].demandobjs,[j],"公司")
										break;
									case "1003":
										Vue.set(that.dataInfo[i].demandobjs,[j],"团队")
										break;
									default:
										break;
								}
							}
							console.log(that.dataInfo[i].demandobjs)
							that.dataInfo[i].status=="1"?that.haveCollect.push(true):that.haveCollect.push(false);
							
						}
						
					}else{
						
					}
				},function(err){
	//					router.push("/error/404")
					console.log(err)
				})
    		}

    	},
    	watch:{
    		current_page:function(){
				
				this.jumpPage(this.current_page);
				
    		},
    		$route:function(){
    			this.searchText = this.$route.query.kw;
				this.jumpPage(this.current_page);	
    		}
    	}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor : #ffffff;
.tradingIndex{
	width: 1200px;
	min-height: 500px;
	background: $bfColor;
	padding-top: 1px;
	border-radius: 10px;
	padding-bottom: 50px;
	position: relative;
	.google{
		width: 700px;
		height: 50px;
		border-radius: 25px;
		box-shadow: 0 0 15px rgba(179,179,179,.5);
		padding: 0 20px ;
		margin: 50px auto;
		background-color: #FFFFFF;
		input{
    		width: 95%;
    		height: 100%;
    		background: none;
    		font-size: 16px;
    	}
    	.searchButton{
    		width: 5%;
    		height: 100%;
    		float: right;
    		background: url(../../assets/img/header/1717.png) no-repeat center;
    		cursor: pointer;
    	}
	}
	.result-table{
		width: 1200px;
		/*min-height: 600px;*/
		position: relative;
		.table-head{
			width: 1200px;
			height: 58px;
			background: #f8f8f8;
			border: 1px solid #E0E0E0;
			padding: 0 20px;
			li{
				float: left;
				height: 58px;
				line-height: 58px;
				text-align: center;
				&:nth-child(1){
					text-align: left;
					width: 230px;
				}
				&:nth-child(2){
					width: 176px;
				}
				&:nth-child(3){
					width: 250px;
				}
				&:nth-child(4){
					width: 170px;
				}
				&:nth-child(5){
					width: 170px;
				}
			}
		}
		.result-list{
			padding:5px 20px;
			min-height:250px;
			.stateNone{
				height: 100px;
				line-height: 100px;
				text-align: center;
				color: #808080;
			}
			.list-wrap{
				height: 50px;
				line-height: 50px;
				border-bottom:1px dotted #E0E0E0 ;
				>div{
					height: 50px;
					line-height: 50px;
					text-align: center;
					float: left;
					&:nth-child(1){
						text-align: left;
						width: 230px;
						text-overflow:ellipsis; white-space:nowrap; overflow:hidden;
						cursor: pointer;
						a{
							color: #535353;
						}
					}
					&:nth-child(2){
						width: 176px;
					}
					&:nth-child(3){
						width: 250px;
					}
					&:nth-child(4){
						width: 170px;
					}
					&:nth-child(5){
						width: 170px;
					}
					
					
					
				}
				.obj-wrap{
					display: -moz-box;
				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: flex;
				    -moz-box-align: center;
				    -webkit-box-align: center;
				    -ms-flex-align: center;
				    -webkit-align-items: center;
				    align-items: center;
				    -moz-box-pack: center;
				    -webkit-box-pack: center;
				    -ms-flex-pack: center;
				    -webkit-justify-content: center;
				    /*for ie9*/
				    justify-content: center;
					.demandObj{
						margin-right: 5px;
						&:last-of-type{
							margin-right:0;
							i{
								display: none;
							}
						}
					}
				}
				.collect{
					float:right;
					/*margin-right: 30px;*/
					.cancelBtn{
						float: right;
						width: 80px;
						height: 30px;
						line-height: 30px;
						margin-top: 10px;
						color: #FFFFFF;
						cursor: pointer;
						font-size: 14px;
						margin-left: 15px;
						background: #333333;
						border-radius:5px; 
						&:last-of-type{
							/*margin-right: 20px;*/
						}
						
						
					}
					.collectBtn{
						width: 80px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						color: #FFFFFF;
						float: right;
						background: url(../../assets/img/demand/icon007.png) no-repeat;
						font-size: 14px;
						cursor: pointer;
						/*margin-right: 20px;*/
						margin-top: 10px;
						img{
							/*display: inline-block;*/
							margin-bottom: 3px;
		
						}
						
					}
				}
				&:hover{
					color: #f27519;
					a{
						color:#f27519 !important;
					}
					.collectBtn{
						background: url(../../assets/img/demand/icon008.png) no-repeat;
					}
				}
			}
		}
		.page {
			/*min-width: 900px;*/
			text-align: center;
			color: #888888;
			/*position: absolute;
			bottom: 0;
			left: 50%;
			 transform:translateX(-50%);
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
					border: 1px solid #6d7d9b;
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
					background: url(../../assets/img/demand/icon013.png) no-repeat;
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
					border: 3px solid #6d7d9b;
					
				}
				.jumpinp{
					margin-top: 3px;
					height:28px;
					width: 79px;
					/*border: 1px solid #ccc;*/
					
					-webkit-border-radius: 14px;
					-moz-border-radius: 14px;
					border-radius: 14px;
					padding-left: 10px;
					background: url(../../assets/img/demand/icon010.png) no-repeat center;
					overflow: hidden;
					input{
						width: 40px;
						height: 24px;
						font-size: 13px;
						text-align: center;
						margin-top: 2px;
						float: left;
					}
					em{
						width: 24px;
						height: 24px;
						float: right;
						margin-top: 2px;
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
					background: #ffffff;
				}
			}
		}
	}
}
</style>