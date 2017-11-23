<template>
  <div class="personalProjectIndex">
  	<span class="addPro" @click="overlay">添加</span>
  	<!--搜索项目模态框-->
  	<div id="modal-overlay" class="search-modal">
  		<div class="searchPro">
				<h5>搜索项目</h5>
				<span class="modalChaBtn" @click="closeModal()"></span>
				<div class="content-wrap">
						<div class="search-wrap">
							<span class="wrap-left">项目名称</span>
							<p class="wrap-right">
								<input type="text" placeholder="请输入项目名称" v-model="searchText" class="searchInput"/>
								<span class="sBtn" @click="getData"><img src="../../../assets/img/company/seacer.png" />搜索</span>
							</p>
						</div>
						<div class="result-wrap">
							<span class="wrap-left">搜索结果</span>
							
							<ul class="resultList">
								<li class="noResult" v-if="noresult">抱歉，未找到该项目，请重新搜索</li>
								<li v-for="(item,$index) in searchResult" v-if="!noresult">
									<router-link :to="{name:'ProjectDetail',query:{id:item.psnProExpeID}}">{{item.projectName}}</router-link>
									<span class="choseBtn" @click="choseThis($event,$index)">
										
									</span>
								</li>
								<li v-for="">
									<router-link :to="{name:'ProjectDetail',query:{id:'2'}}">王大麻子</router-link>
									<span class="choseBtn" @click="choseThis($event)">
										
									</span>
								</li>
								<li v-for="">
									<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">王大麻子</router-link>
									<span class="choseBtn" @click="choseThis($event)">
										
									</span>
								</li>
								
							</ul>
							<router-link to="/yhzx/personal/info/personalProject/definedProject" @click="closeModal">
								<div class="goToDefinedPro">自定义添加项目</div>
							</router-link>
							<span class="confirmBtn" @click="confirmAddpro">确认</span>
						</div>
				</div>
  		</div>
  	</div>
  	<!--搜索项目模态框-->
    <h3 class="c-title"><span>{{title}}</span></h3>
    <div class="projectTable" v-for="(item,$index) in proInfo">
    	<router-link :to="{name:'ProjectDetail',query:{id:item.id}}" class="tableTitle" >{{item.projectName}}</router-link>
    	<div class="toolsBox">
    		<!--点击跳转到编辑该项目的页面  路由传值index-->
    		<span v-bind:class="{openOrPrivacy:!openOrPrivacy[$index]}" v-on:click="OpenOrPrivacy($index)">{{openOrPrivacyText[$index]}}</span>
    		<span class="editBtn" @click="goToEditPro($index,item)">编辑</span>
    		<span class="deleBtn" @click="deletePro($index)">删除</span>
    		<!--确认删除该项目模态框-->
    			<div id="modal-overlay" v-bind:class="deleteModalClass[$index]">
						<div class="deletePro">
							<h5>删除项目</h5>
							<span class="modalChaBtn" @click="closeModal($index)"></span>
							<div class="content-wrap">
							<p class="deleteOrNo">确定删除该项目吗？</p>
							<div class="btnBox">
								<span class="cancelBtn" @click="cancleDele($index)">取消</span>
								<span class="confirmBtn" @click="saveDele($index)">确认</span>
							</div>
							</div>
						</div>
					</div>
    		<!--确认删除该项目模态框-->
    	</div>
    	<div class="pr-wrap-a">
    		<span class="completeTime">Time : {{item.partakeTimeUp}} 至 {{item.partakeTimeDown}}</span>
  			<span class="takeOfficeBar">项目责任：<em class="takeOffice">{{item.takeOffice}}</em></span>
    	</div>
    	<div class="pr-wrap-b">责任描述：{{item.detailDes}}
    	</div>
    	
    	<div class="morePics" v-if="!show.tag[$index]">
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		
    	</div>
    	<div class="viewMore">
    		<p v-bind:class="{viewDown:show.tag[$index],viewUp:!show.tag[$index]}" @click="upDown($index)">
    			<!--<img src="../../../assets/img/company/double-bottom-down.png" />
					<img src="../../../assets/img/company/double-bottom-up.png" />-->
					<span>{{updowntxt[$index]}}</span>
    		</p>
    	</div>
    </div>
  </div>
</template>

<script>
	import Modal from "../../../assets/js/modal.js"
	import router from "../../../router"
	import Vue from "vue"
	import {mapState} from "vuex"
  import MyAjax from "../../../assets/js/MyAjax.js"
	
  export default {
    name:"companyProjectIndex",
    data:function(){
      return {
        title:"个人项目信息",
//      updown:"view-down",
        updowntxt:[],
        show:{
        	tag:[],
        },
        proInfo:[],
        localProInfo:[],
        searchText:"", /*搜索框input值*/
        searchResult:[], /*搜索结果*/
       	chosedOne:{},/*被选中的搜索结果*/
       	noresult:true,/*默认没有结果*/
        deleteModalClass:[],//确认删除项目的模态框
        openOrPrivacy: [],//控制信息对外是否显示状态
        openOrPrivacyText: [],//控制信息是否对外显示文本
      }
    },
//  computed:mapState({
//    companyProInfo:state=>state.company.companyMessage.companyProInfo/*获取vuex数据*/
//  }),
    mounted(){
    	this.updateData();
    },
    methods:{
    	updateData(){
    		var that = this;
	    	var url = "http://10.1.31.16:8080/psnProjExpe/findProjExpe";//暂时先写成这样
	    	MyAjax.ajax({
					type: "GET",
					url:url,
	//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
					dataType: "json",
	//				content-type: "text/plain;charset=UTF-8",
				},function(data){
					console.log(data)
					data = data.msg;
					that.proInfo = data;
				},function(err){
					console.log(err)
				})
	    	/*数据同步本地一份开始*/
	    	function emptyText(text) {
			    if(text==null||text.length == 0){
			      return "（暂无信息）";
			    }else {
			      return text;
			    }
			  }
        that.localProInfo=JSON.parse(JSON.stringify(that.proInfo));
        that.show.tag = [];
        that.updowntxt = [];
        that.deleteModalClass = [];
        that.openOrPrivacy = [];
        that.openOrPrivacyText = [];
        that.show.tag.length = that.proInfo.length;
	//  	console.log(this.show.tag.length)
	    	for(var i=0;i<this.proInfo.length;i++){
	    		that.proInfo[i].takeOffice = emptyText(that.proInfo[i].takeOffice);
	    	  that.proInfo[i].detailDes = emptyText(that.proInfo[i].detailDes);
	    		that.show.tag[i]=true;
	    		that.updowntxt.push("展开查看更多");
	    		that.deleteModalClass.push("deleteModalClass"+i);//添加模态框类名
	    		that.openOrPrivacy.push(true);
		      that.openOrPrivacyText.push("显示");
		      /*对每一个循环列表的对外显示赋初始值*/
	    	}
    	},
    	goToEditPro(index,item){
    		console.log(item.projectID,item.psnProExpeID)
    		router.push({name:'editPerProject',query:{proId:item.projectID,psnId:item.psnProExpeID}})
    		/*通过路由传值*/
    	},
    	
    	upDown(index){
//  		Vue.set(this.show,"tag[index]",false)
				console.log(this.show.tag[index])
				if(this.show.tag[index]==true){
					Vue.set(this.show.tag,[index],false)
					this.updowntxt[index] = "收起图片"
				}else{
					Vue.set(this.show.tag,[index],true)
					this.updowntxt[index] = "展开查看更多" 
				}
    		this.show.tag[index] == true? false:true;
    		this.updowntxt[index]=="展开查看更多"?"收起图片":"展开查看更多";
    	},
    	OpenOrPrivacy(index){//显示隐藏按钮，通过这个按钮可以控制显示到别人查看信息页的信息
    		
        Vue.set(this.openOrPrivacy,[index],!this.openOrPrivacy[index])
        if(this.openOrPrivacyText[index]=="显示"){
          Vue.set(this.openOrPrivacyText,[index],"隐藏")
        }else {
          Vue.set(this.openOrPrivacyText,[index],"显示")
        }
      },
    	deletePro(index){
    		//删除模态框的弹出按钮事件
    		var aa = "deleteModalClass"+index;
    		Modal.makeText($('.'+aa))
    		
    	},
    	cancleDele(index){
    		//取消删除该项目
    		this.closeModal(index);
    	},
    	saveDele(index){
    		//确认删除该项目
    		var that = this;
        console.log(that.proInfo[index].psnProExpeID)
        var url = "http://10.1.31.16:8080/psnProjExpe/del/"+that.proInfo[index].psnProExpeID;
        MyAjax.ajax({
					type: "DELETE",
					url:url,
					dataType: "json",
					contentType: "application/json;charset=UTF-8",
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})
        that.updateData();//更新一下数据
    		this.closeModal(index);
    		
    	},
    	//模态框
			overlay(){
				Modal.makeText($('.search-modal'))
				this.searchResult = [];
				this.searchText = '';
			},
			closeModal(index){
				Modal.closeModal($('.search-modal'))
				var aa = "deleteModalClass"+index;
    		Modal.closeModal($('.'+aa))
				$('.search-wrap').css({marginTop:"120px",marginBottom:"170px"})
				$('.result-wrap').css({display:"none"})
			},
			getData(){
				var that = this;
	    	var url = "http://10.1.31.16:8080/psnProjExpe/findProjByName/"+that.searchText;
	    	MyAjax.ajax({
					type: "GET",
					url:url,
	//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
					dataType: "json",
	//				content-type: "text/plain;charset=UTF-8",
					
				},function(data){
					console.log(data)
					data = data.msg;
					that.searchResult = data;
					if(that.searchResult.length!=0){
						that.noresult=false;
						
					}else{
						that.noresult=true;
					}
					$('.search-wrap').animate({marginTop:"30px",marginBottom:"40px"},100);
					$('.result-wrap').fadeIn(200);
				},function(err){
					console.log(err)
				})
					
					
			},
			choseThis(e,index){
				
				$(".resultList li span").removeClass('selected');
				$(e.target).addClass("selected");
				this.chosedOne = this.searchResult[index]
//				console.log($(".resultList li span"))
        console.log(this.chosedOne)
				
			},
			confirmAddpro(){
				var that = this;
				console.log(that.chosedOne.projectID,that.chosedOne.psnProExpeID)
				router.push({name:'editPerProject',query:{proId:that.chosedOne.projectID,psnId:that.chosedOne.psnProExpeID}})
        
			}
	
    
    }
  }
</script>

<style lang="scss" scoped="scoped">
$bfColor:#f7f9fc;
$activeColor: rgb(242,117,25);
	.personalProjectIndex{
		.c-title{
      height:34px;
      border-bottom:1px solid #ebebeb;
      text-align: left;
      span{
        font-family:'Microsoft Yahei';
        color:$activeColor;
        padding-bottom:14px;
        font-size:18px;
        line-height:18px;
        border-bottom:2px solid $activeColor;
        display:inline-block;
      }
 		}
		width: 940px; padding: 40px;
		position: relative;
		 min-height: 671px;
		float: left;
		background: #ffffff;
		border-radius: 5px;
		.addPro{
			width: 80px;
			height: 15px;
			line-height: 15px;
			padding-left: 25px;
			background: url(../../../assets/img/personal/education/add.png) no-repeat left center;
			position: absolute;
			top: 40px; right:40px;
			display: block;
			color: $activeColor;
			cursor: pointer;
		}
		.searchPro,.deletePro{
			
			width: 549px;
			overflow: hidden;
	    position:absolute;top:50%;left:50%; 
			transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
			-moz-transform:translate(-50%,-50%);
			-ms-transform:translate(-50%,-50%);
			-o-transform:translate(-50%,-50%);
	    background: #FFFFFF;
	    border-radius: 10px;
	    text-align: center;
	    h5{
		    color:$activeColor;
		    font-size: 18px;
		    height: 50px;
		    line-height: 50px;
		    text-align: left;
		    background: $bfColor;
		    padding: 0 40px;
		     
			}
			.modalChaBtn{
		     width: 20px;
		     height: 20px;
		     background: url(../../../assets/img/personal/teamexperience/icon_cannel_large.png) no-repeat center;
		     position: absolute;
		     top: 16px;
		     right: 40px;
		     cursor: pointer;
	     }
	    .content-wrap{
	    	width: 100%;
	    	overflow: hidden;
	    		.deleteOrNo{
	    			margin: 30px auto;
	    			color: $activeColor;
	    			font-size: 20px;
	    		}
	    		.btnBox{
			    	height: 40px;
			    	width: 330px;
			    	margin:40px auto;
			    	display: flex;
			    	justify-content: space-between;
			    	overflow: hidden;
			    	span{
			    		float: left;
			    		/*margin-right: 50px;*/
			    		width: 140px;
			    		height: 40px;
			    		line-height: 40px;
			    		text-align: center;
			    		vertical-align: middle;
			    		font-size: 18px;
			    		border-radius: 5px;
			    		cursor: pointer;
							padding-left: 0 !important;
			    		&.cancelBtn{
			    			border: 1px solid #bfcbd9;
		
			    			&:hover{
			    				border: 1px solid $activeColor;
			    				color: $activeColor;
			    			}
			    		}
			    		&.confirmBtn{
			    			background: url(../../../assets/img/personal/education/btn_save_normal.png.png) no-repeat center;
			    			background-size: 100%;
			    			color: #FFFFFF;
			    			&:hover{
			    				filter:alpha(opacity=80);       /* IE */
							  -moz-opacity:0.8;              /* 老版Mozilla */
							  -khtml-opacity:0.8;              /* 老版Safari */
							   opacity: 0.8;           /* 支持opacity的浏览器*/
			    			}
			    		}
	    		}
	    }		
	    		.result-wrap{
	    			display: none;
	    			margin-bottom: 80px;
	    		}
	    		.search-wrap{
	    			margin-top:120px;
						margin-bottom:170px;
	    		}
	    		.search-wrap,.result-wrap{
	    			
						text-align: center;
						padding-left:67px;
						
						overflow: hidden;
						
						.wrap-left{
							margin-right: 20px;
							font-size: 18px;
							float: left;
							height: 40px;
						  line-height: 40px;
						}
						.wrap-right{
							width: 325px;
							height: 40px;
							line-height: 40px;
							float: left;
							border: 1px solid #ebebeb;
							border-radius: 5px;
							overflow: hidden;
							input{
								width: 222px;
								float: left;
								text-indent: 8px;
							}
							.sBtn{
								display: inline-block;
								float: right;
								height: 40px;
								line-height: 40px;
								text-align: center;
								vertical-align: middle;
								width: 100px;
								color: #FFFFFF;
								cursor: pointer;
								background: url(../../../assets/img/personal/workexperience/btn_search.png) no-repeat center;
								
								img{
									display: inline;
									vertical-align: middle;
									margin-right: 10px;
									margin-bottom: 5px;
									width: 21px; height: 20px;
								}
							}
						}
						.resultList{
							width: 325px;
							overflow: hidden;
							.noResult{
								color:rgb(140,140,140);
								margin-bottom: 9px;
								height: 40px;
								line-height: 40px;
								background: none;
							}
							li{
								width: 325px;
								height: 36px;
								line-height: 36px;
								padding: 0 13px;
								text-align: left;
								float: left;
								background: #f8f8f8;
								overflow: hidden;
								cursor: pointer;
								a{
									color: $activeColor;
									float: left;
								}
								&:nth-child(2n){
									background: #f2f2f2;
								}
								.choseBtn{
									width: 15px;
									height: 15px;
									border-radius: 50%;
									display: inline-block;
									float: right;
									margin-top: 10px;
									background: url(../../../assets/img/company/circular.png) no-repeat center;
								
									&:hover,&.selected{
										background: $activeColor;
										
									}
									
								}
									
							}
						}
						.confirmBtn{
							width: 117px;
							height: 33px;
							line-height: 33px;
							text-align: center;
							color: #FFFFFF;
							/*margin: 30px auto;*/
							margin-left: 149px;
							margin-top: 30px;
							display: block;
							background: url(../../../assets/img/personal/education/btn_save_normal.png.png) no-repeat center;
							
							&:hover{
	                filter:alpha(opacity=80);       /* IE */
	                -moz-opacity:0.8;              /* 老版Mozilla */
	                -khtml-opacity:0.8;              /* 老版Safari */
	                opacity: 0.8;           /* 支持opacity的浏览器*/
	               cursor: pointer;
	            }
						}
	    		}
	    }
	    .goToDefinedPro{
	    	height: 15px;
	    	line-height: 15px;
	    	text-align: left;
	    	color: $activeColor;
	    	padding-left: 25px;
	    	margin-top: 30px;
	    	margin-left: 97px;
	    	background: url(../../../assets/img/personal/education/add.png) no-repeat left center;
	    	
	    }
		}
		.projectTable{
			padding: 30px 20px;
			position: relative;
			border-bottom: 1px solid #ebebeb;
			.tableTitle{
				height: 18px;
				line-height: 18px;
				text-align: left;
				color: $activeColor;
				font-size: 18px;
			}
			.toolsBox{
				/*width: 250px;*/
				position: absolute;
				top: 30px; right: 10px;
				cursor: pointer;
				>span{
					display: inline-block;
					height: 18px;
					line-height: 18px;
					padding-left: 25px;
					color: $activeColor;
					&:first-child{
						padding-left: 35px;
						background: url("../../../assets/img/personal/education/eye.png") left center no-repeat;
						margin-right: 17px;
					}
					&.editBtn{
						background: url(../../../assets/img/personal/education/edit.png) no-repeat left center;
						margin-right: 17px;
					}
					&.deleBtn{
						background: url(../../../assets/img/personal/education/delete.png) no-repeat left center;
					}
				}
				.openOrPrivacy{
	        background: url("../../../assets/img/personal/education/hidden.png") left center no-repeat!important;
	        color: #353535;
	        margin-right: 17px;
	      }
			}
			.pr-wrap-a{
        height: 18px;
        line-height: 18px;
        font-size: 14px;
        color: rgb(61,61,61);
        font-family: "microsoft yahei";
        line-height: 18px;
        margin: 20px 0;
        &:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
        .completeTime{
	        font-size: 14px;
	        font-family: "microsoft yahei";
	        float: left;
        }
        .takeOfficeBar{
	        font-size: 14px;
	        font-family: "microsoft yahei";
	        float: right;
	        color: rgb(61,61,61);
        }
    	}
    	.pr-wrap-b{
    		color: #666666;
    		text-align: justify;
    	}
    	.morePics{
    		overflow: hidden;
    		margin-top: 15px;
    		img{
    			float: left;
    			width: 160px;
    			height: 100px;
    			margin-right: 15px;
    			margin-bottom: 15px;
    			
    		}
    	}
    	.viewMore{
    		width: 100%;
    		height: 14px;
    		line-height: 14px;
    		color: $activeColor;
    		margin-top: 15px;
    		cursor: pointer;
    		.viewDown{
    			width: 120px;
    			height: 100%;
    			padding-left: 20px;
    			margin: 0 auto;
    			background: url(../../../assets/img/personal/projectexperience/icon_lookmore.png) no-repeat left center;
    		}
    		.viewUp{
    			width: 120px;
    			height: 100%;
    			padding-left: 20px;
    			margin: 0 auto;
    			background: url(../../../assets/img/personal/projectexperience/icon_revoke_075.3.png) no-repeat left center;
    		}
    		img{
    			vertical-align: middle;
    			margin-bottom: 3px;
    			margin-right: 5px;
    		}
    	}
		}
	}

</style>
