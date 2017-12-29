<template>
	<div class="tradingRecord">
		<h1 class="flow-title"><span>交易记录</span><em>如对交易记录有疑问，请联系管理员</em></h1>
		<table class="flow-wrap" border="0" cellpadding="0" cellspacing="0">
			<tr class="f-title">
				<th>交易时间</th>
				<th>金额</th>
				<th>交易对象</th>
				<th>关联协议</th>
				<th>状态</th>
				<th></th>
			</tr>
			
			<tr v-for="(item,index) in flowInfo">
				<td>{{item.operTime}}&nbsp;&nbsp;{{item.time}}</td>
				<td>{{item.price}}</td>
				<td>{{item.obj}}</td>
				<td>{{item.dealName}}</td>
				<td>{{item.taskTypeVal}}</td>
				<td ><span v-if="item.taskTypeVal=='待确认'" @click="goToConfirm(item.dealID,item.creAccountID)">去确认</span></td>
			</tr>
			
		</table>
		<div v-if="!haveValue" class="stateNone">暂无交易记录</div>
		<div class="page" v-if="haveValue">
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
</template>

<script>
	import Vue from "vue"
	import router from "../../../router"
	import MyAjax from "../../../assets/js/MyAjax.js"
	export default{
		name:"tradingRecord",
		data:function(){
			return{
				flowInfo:[
					{
						tradingNum:"FDAD1545426",
						tradingDate:"2013.05.06",
						time:"14:30",
						amount:"5000",
						remain:"13000",
						dealName:"与万达的协议",
						tradingType:"协议内付款",
						tradingObj:"万达",
						operate:"收款",
						status:"待确认"
						
					},
				],
				current_page: 1, //当前页
		        pages: "5", //总页数
		        changePage:'1',//跳转页
		        haveValue:false,
			}
		},
		mounted(){
			this.jumpPage(this.current_page)
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
//  		
    		jumpPage(num){
    			
    			var that = this;
				var url = MyAjax.urlsy +"/dealbasicinfo/myWallet/"+ num;
				MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0&&data.msg.length!=0){
						Vue.set(that,"haveValue",true)
						Vue.set(that,"flowInfo",data.msg.records)
					}else{
						Vue.set(that,"haveValue",false)
					}
					that.pages = data.msg.pages;
					
					
				},function(err){
					console.log(err)
				})
				that.current_page = num;
    		},
    		pagePlus() {
    			this.current_page++;
//  			return this.current_page;
    		},
    		pageMinus() {
    			this.current_page--;
//  			return this.current_page;
    		},
    		goToConfirm(id,creAccountID){
    			if(creAccountID!=null){
    				router.push({name:"sendDealInfo",query:{id:id}})
    			}else{
    				router.push({name:"acceptDealInfo",query:{id:id}})
    			}
    			
    		}
    	},
	    watch:{
			current_page:function(){
				this.jumpPage(this.current_page);
			}
		}
		
	}
	
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$themeColor:#ff7403;
	.tradingRecord{
		padding: 30px;
		/*margin-top: 27px;*/
		.flow-title{
			height: 40px;
			line-height: 40px;
			border-bottom:1px solid #EBEBEB;
			
			span{
				height: 40px;
				line-height: 40px;
				display: inline-block;
				color: $activeColor;
				border-bottom: 2px $activeColor solid;
				font-size: 16px;
			}
			em{
				margin-left: 20px;
				font-size: 14px;
				color: #808080;
			}
		}
		.flow-wrap{
			/*width: 100%;*/
			border-collapse:collapse;
			margin-top: 30px;
			tr{
				
				padding: 22px 0;
				border-bottom: 1px dotted #cdcdcd;
				&:hover{
					color: #F27519;
					td:last-of-type{
						
						span{
							background: url(../../../assets/img/wallet/bg40.png);
						}
					}
				}
				td{
					width: 120px;
					height: 62px;
					line-height: 62px;
					text-align: center;
					margin: 0; padding: 0;
					&:nth-child(1){
						width: 180px;
						text-align: left;
						padding-left: 15px;
						span{
							margin-right: 10px;
						}
					}
					&:nth-of-type(4n){
						line-height: 24px;
					}
					&:last-of-type{
						width: 160px;
						text-align: center;
						
						span{
							width: 100px;
							height: 30px;
							line-height: 30px;
							color: #FFFFFF;
							display: inline-block;
							background: url(../../../assets/img/wallet/bg41.png);
							cursor: pointer;
							vertical-align: middle;/*样式修正*/
							cursor: pointer;
							float: right;
						}
					}
				}
			}
			.f-title{
				
				
				/*display: inline-block;*/
				background: #f8f8f8;
				
				border:1px solid #EBEBEB;
				th{
					color: #767676;
					font-weight: normal;
					width: 120px;height: 58px;
					text-align: center;
					&:nth-child(1){
						width: 180px;
						text-align: left;
						padding-left: 22px;
					}
					&:nth-child(4){
						width: 180px;
					}
					
				}
			}
		}
		.stateNone{
			line-height: 50px;
			height: 50px;
			text-align: center;
			font-size: 14px;
			color: #808080;
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
					background: url(../../../assets/img/header/2525.png) no-repeat;
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
						background: url(../../../assets/img/demand/icon001.png) no-repeat right center;
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
</style>