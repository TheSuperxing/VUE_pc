<template>
	<div class="editDemand">
		<p class="notice">带*为必填项</p>
		<ul class="edit_table">
			<li>
				<p class="wrap-left">*需求名称</p>
				<input type="text" placeholder="请输入需求名称..." v-model="newDemandInfo.demandbasicinfo.demandName"/>
				<alertTip v-if="showAlert.name" :showHide="showAlert.name" @closeTip="closeTip" :alertText="alertText.name"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*需求描述</p>
				<textarea maxlength="500" placeholder="请输入 需求详细描述文案..." v-model="newDemandInfo.demandbasicinfo.describe"></textarea>
				<span>{{describeCont}}/500</span>
				<alertTip v-if="showAlert.describe" :showHide="showAlert.describe" @closeTip="closeTip" :alertText="alertText.describe"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*完成时间</p>
				<!--<input type="text" placeholder="请输入完成时间..." />-->
				<datepicker class="datePicker" v-model="newDemandInfo.demandbasicinfo.complateTime"></datepicker>
				<alertTip v-if="showAlert.complateTime" :showHide="showAlert.complateTime" @closeTip="closeTip" :alertText="alertText.complateTime"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*需求对象</p>
				<label v-for="(item,index) in demandObj" @click="selectObj(index)" v-bind:class="{selected:selectedStyle[index]}">
					<em></em>
					<p>{{item}}</p>
				</label>
				<alertTip v-if="showAlert.demandObj" :showHide="showAlert.demandObj" @closeTip="closeTip" :alertText="alertText.demandObj"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*对象要求</p>
				<textarea  maxlength="500" placeholder="请输入对象要求..." v-model="newDemandInfo.demandbasicinfo.objRequire"></textarea>
				<span>{{requireCont}}/500</span>
				<alertTip v-if="showAlert.objRequire" :showHide="showAlert.objRequire" @closeTip="closeTip" :alertText="alertText.objRequire"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*需求酬劳</p>
				<input type="text" placeholder="请输入需求酬劳（保留两位小数点）..." v-model="newDemandInfo.demandbasicinfo.reword"/>
				<alertTip v-if="showAlert.reword" :showHide="showAlert.reword" @closeTip="closeTip" :alertText="alertText.reword"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">备注信息</p>
				<textarea  maxlength="500" placeholder="请输入备注信息..." v-model="newDemandInfo.demandbasicinfo.remark"></textarea>
				<span>{{remarkCont}}/500</span>
			</li>
			<div class="btnBox">
				<span @click="commitDemand">提交审核</span>
				<span @click="saveToDraft">保存至草稿箱</span>
			</div>
		</ul>
		<!--模态框-->
		<div id="modal-overlay" class="confirmCommit">
			<div class="detail-wrap">
				<h5></h5>
				<span class="modalChaBtn" @click="closeModal"></span>
				<p>提交后，该任务将由交易管理员进行审核。</p>
				<p>审核期间该任务不可修改。</p>
				<p>如未通过审核，该任务将退回至您的草稿箱。</p>
				<p>您可在“我的交易”中查看审核过程。</p>
				<div class="confirmBtn" @click="cfmCommit">
					确认提交
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import router from "../../../router"
	import Modal from "../../../assets/js/modal"
	import AlertTip from "../units/alertTip.vue"
	import Datepicker from "../units/Datepicker.vue"
    import MyAjax from "../../../assets/js/MyAjax.js"
	
	export default{
		name:"editDemand",
		data:function(){
			return{
				demandObj:[
				"个人","公司","团队"
				],
//				newDemandInfo:{
//					id:"7",
//					name:"",//需求名称
//					describe:"",//需求描述
//					complateTime:"",//完成时间
//					demandObj:["","",""],//对象
//					objRequire:"",//对象的要求
//					reword:"",//酬劳
//					remark:"",//备注
//					applicant:[
//					
//					],//申请方
//					relatedDeal:[
//						{
//							name:"华东设计",
//						},{
//							name:"万达有限公司",
//						}
//					],//关联协议
//					auditStatus:"0",
//					havePublished:false,//有没有被发布过
//					haveOffLine:false,//有没有在线
//				},
				newDemandInfo:{
					"demandbasicinfo": {
				    "appTimes": 0,
				    "complateTime": "",
				    "demandName": "",
				    "describe": "",
				    "objRequire": "",
				    "pkid": "",
				    "pubAccountID": "",
				    "pubName": "",
				    "publishTime": "",
				    "remark": "",
				    "reword": "",
				    "type": 0,
				    "watchTimes": 0
				  },
				  "demandobjs": [
				    
				  ],
				  
				},
				describeCont:"0",//描述文字字数
				requireCont:"0",//要求文字字数
				remarkCont:"0",
				selectedStyle:[],//需求对象的选中样式
				showAlert:{name:false,describe:false,complateTime:false,demandObj:false,objRequire:false,reword:false},//提示框显隐
	        	alertText:{name:null,describe:null,complateTime:null,demandObj:null,objRequire:null,reword:false},
			}
		},
		components:{
		 	Datepicker,
		 	AlertTip,
		},
	    computed:mapState({
  			demandInfo:state=>state.demand.demandInfo,/*获取vuex数据   有效需求*/
  			draftInfo:state=>state.demand.draftInfo/*获取vuex数据     需求草稿*/
		}),
		mounted(){
			for(var i=0;i<this.demandObj.length;i++){
				this.selectedStyle.push(false);
			}
//			this.newDemandInfo.id = Math.floor(Math.random()*1000);//随机设置需求的id
//		    console.log(Math.floor(Math.random()*1000))
			
		},
		methods:{
			selectObj(index){
				for(var i=0;i<this.demandObj.length;i++){
					if(i==index){
						console.log(index)
						if(this.selectedStyle[index]==false){
							Vue.set(this.selectedStyle,[index],true);
							switch (index){
								case 0:
									this.newDemandInfo.demandobjs.push("1001")
									break;
								case 1:
									this.newDemandInfo.demandobjs.push("1002")
									break;
								case 2:
									this.newDemandInfo.demandobjs.push("1003")
									break;
							}
							this.newDemandInfo.demandobjs.push.apply(this.newDemandInfo.demandobjs,[])
						}else{
							Vue.set(this.selectedStyle,[index],false);
							Array.prototype.remove = function(val) {
								var index = this.indexOf(val);
								if (index > -1) {
									this.splice(index, 1);
								}
							};
							switch (index){
								case 0:
									this.newDemandInfo.demandobjs.remove("1001")
									break;
								case 1:
									this.newDemandInfo.demandobjs.remove("1002")
									break;
								case 2:
									this.newDemandInfo.demandobjs.remove("1003")
									break;
							}
							
						}
						
						//赋值到本地信息里
						console.log(this.newDemandInfo.demandobjs)
					}else{
//						Vue.set(this.selectedStyle,[i],false);
//						this.newDemandInfo.demandObj[i].demandObj = "";
					}
				}
//				console.log(this.newDemandInfo.demandobjs)
			},
			mustConfirm(){
				if(this.newDemandInfo.demandbasicinfo.demandName.trim().length==0){
					this.showAlert.name = true;
					this.alertText.name = "需求名称为必填项"
				}else{
					this.showAlert.name = false;
				};//判断项目名称不能为空
				
				if(this.newDemandInfo.demandbasicinfo.describe.trim().length==0){
					this.showAlert.describe = true;
					this.alertText.describe = "需求描述为必填项"
				}else{
					this.showAlert.describe = false;
//					
				};//判断项目名称不能为空
				if(this.newDemandInfo.demandbasicinfo.complateTime.trim().length==0){
					this.showAlert.complateTime = true;
					this.alertText.complateTime = "需求时间为必填项"
				}else{
					this.showAlert.complateTime = false;
//					
				};//判断项目名称不能为空
				
				console.log(this.newDemandInfo.demandobjs)
				for(var i=0;i<this.newDemandInfo.demandobjs.length;i++){
					if(this.newDemandInfo.demandobjs.length==0){
						this.showAlert.demandObj = true;
						this.alertText.demandObj = "需求对象为必填项"
					}else{
						this.showAlert.demandObj = false;
	//					
					};//判断需求对象不能为空
				}
				if(this.newDemandInfo.demandbasicinfo.objRequire.trim().length==0){
					this.showAlert.objRequire = true;
					this.alertText.objRequire = "对象需求为必填项"
				}else{
					this.showAlert.objRequire = false;
//					
				};//判断对象需求不能为空
				if(this.newDemandInfo.demandbasicinfo.reword.trim().length==0||
				/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/gi.test(this.newDemandInfo.demandbasicinfo.reword)!=true){
					this.showAlert.reword = true;
					this.alertText.reword = "请输入金额（保留两位小数）";
				}else{
					this.showAlert.reword = false;
//					
				};//判断酬金不能为空
			},
			commitDemand(){
				
				console.log(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/gi.test(this.newDemandInfo.demandbasicinfo.reword))
				if(this.newDemandInfo.demandbasicinfo.demandName.trim().length!=0&&this.newDemandInfo.demandbasicinfo.describe.trim().length!=0&&this.newDemandInfo.demandbasicinfo.complateTime.trim().length!=0
				&&this.newDemandInfo.demandbasicinfo.objRequire.trim().length!=0&&this.newDemandInfo.demandobjs.length!=0
				&&this.newDemandInfo.demandbasicinfo.reword.trim().length!=0
				&&/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/gi.test(this.newDemandInfo.demandbasicinfo.reword)==true
				){
					Modal.makeText($('.confirmCommit'));
					this.showAlert.demandObj = false;
						
				}else{
					this.mustConfirm();
				}
//				
			},
			cfmCommit(){
				console.log(this.showAlert)
				var that = this;
				var url = MyAjax.urlhw+"/demandbasicinfo/insertOrUpdate/" + 'valid' 
		    	
		    	if(that.newDemandInfo.demandbasicinfo.complateTime=="至今"){
					that.newDemandInfo.demandbasicinfo.complateTime = "0000.00";
				}
			    console.log(JSON.stringify(that.newDemandInfo))
			    $.ajaxSetup({ contentType : 'application/json' });
			    MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(that.newDemandInfo),
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					
					if(data.code == 0){
						router.go(-1);
//						router.push("/yhzx/demand/publish/index")
						that.closeModal();
					}
					
				},function(err){
					console.log(err)
				})

				
			},
			saveToDraft(){
				console.log(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/gi.test(this.newDemandInfo.demandbasicinfo.reword))	
				if(this.newDemandInfo.demandbasicinfo.demandName.trim().length!=0&&this.newDemandInfo.demandbasicinfo.describe.trim().length!=0&&this.newDemandInfo.demandbasicinfo.complateTime.trim().length!=0
				&&this.newDemandInfo.demandbasicinfo.objRequire.trim().length!=0&&this.newDemandInfo.demandobjs.length!=0
				&&this.newDemandInfo.demandbasicinfo.reword.trim().length!=0
				&&/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/gi.test(this.newDemandInfo.demandbasicinfo.reword)==true){
					var that = this;
					var url = MyAjax.urlhw+"/demandbasicinfo/insertOrUpdate/" + 'draft' 
			    	
			    	if(that.newDemandInfo.demandbasicinfo.complateTime=="至今"){
						that.newDemandInfo.demandbasicinfo.complateTime = "0000.00";
					}
				    console.log(JSON.stringify(that.newDemandInfo))
				    $.ajaxSetup({ contentType : 'application/json' });
				    MyAjax.ajax({
						type: "POST",
						url:url,
						data:JSON.stringify(that.newDemandInfo),
						dataType: "json",   
						async:false,
					},function(data){
						console.log(data)
						
						if(data.code == 0){
							router.go(-1);
//							router.push("/yhzx/demand/publish/index")
							that.closeModal();
						}
					},function(err){
						console.log(err)
					})
////					
					
				}else{
					this.mustConfirm();
				}
				
			},
			closeTip(){  /*关闭提示框*/
                this.showAlert.name= false;
//              this.showAlert = false;
//              this.showAlert = false;
            },
			closeModal(){
				Modal.closeModal($('.confirmCommit'))
			}
		},
		updated(){
			this.describeCont = this.newDemandInfo.demandbasicinfo.describe.length;
			this.requireCont = this.newDemandInfo.demandbasicinfo.objRequire.length;
			this.remarkCont = this.newDemandInfo.demandbasicinfo.remark.length;
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
	.editDemand{
		width: 940px;
		padding: 30px 40px;
		float: left;
		.notice{
			color: #BEBEBE;
		}
		
		.edit_table{
			margin-top:30px ;
			li{
				margin-bottom: 30px;
				position: relative;
					
				>span{
					color: #BEBEBE;
					position: absolute;
					right:230px;
					bottom: 0;
				}
				input{
					float: left;
					width: 480px;
					height: 35px;
					line-height: 35px;
					text-indent: 15px;
					border: 1px solid #BEBEBE;
					border-radius: 5px;
					
				}
				.datePicker{
					float: left;
					width: 480px;
					height: 35px;
					line-height: 35px;
					border: 1px solid #BEBEBE;
					border-radius: 5px;
					
				}
				textarea{
					float: left;
					width: 480px;
					height: 200px;
					line-height: 35px;
					text-indent: 15px;
					border: 1px solid #BEBEBE;
					border-radius: 5px;
				}
				label{
					height: 20px;
					line-height: 20px;
					margin-right: 30px;
					margin-top: 8px;
					cursor: pointer;
					color: rgb(191,191,191);
					overflow: hidden;
					float: left;
					em{
						float: left;
			              width: 15px;
			              height: 15px;
			              margin-top:3px;
			              background: rgb(191,191,191);
			              border-radius: 50%;
					}
					p{
			          float: left;
			          padding-left: 15px;
			        }
					&.selected{
						em{
							background: #546686 !important;
						}
					}
				}
				
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				.wrap-left{
					height: 35px;
					line-height: 35px;
					text-align: right;
					float: left;
					margin-right: 30px;
					
				}
			}
			.btnBox{
				margin-top: 10px;
				margin-left: 115px;
				margin-bottom: 40px;
				overflow: hidden;
				span{
					width: 160px;
					height: 42px;
					line-height: 42px;
					text-align: center;
					border-radius: 5px;
					float: left;
					cursor: pointer;
					&:first-child{
						background: url(../../../assets/img/demand/bg21.png) no-repeat;
						color: #FFFFFF;
						margin-right: 30px;
						&:hover{
							opacity: 0.9;
						}
					}
					&:last-child{
						border: 1px solid #BEBEBE;
						&:hover{
							border: 1px solid $activeColor;
							color: $activeColor;
						}
					}
				}
			}
		}
		.confirmCommit{
			.detail-wrap{
				width: 480px;
				padding: 50px 0px;
				background: #FFFFFF;
				border-radius: 10px;
				position:absolute;top:50%;left:50%; 
				transform:translate(-50%,-50%);
				-webkit-transform:translate(-50%,-50%);
				-moz-transform:translate(-50%,-50%);
				-ms-transform:translate(-50%,-50%);
				-o-transform:translate(-50%,-50%);
				p{
					height: 30px;
					line-height: 30px;
					text-align: center;
				}
				.modalChaBtn{
					width: 20px;
				     height: 20px;
				     background: url(../../../assets/img/demand/icon004.png) no-repeat center;
				     position: absolute;
				     top: 20px;
				     right: 30px;
				     cursor: pointer;
				}
				.confirmBtn{
					
					width: 160px;
					height: 42px;
					line-height: 42px;
					text-align: center;
					background: url(../../../assets/img/demand/bg21.png) no-repeat;
					margin: 30px auto 10px;
					color: $bfColor;
					cursor:pointer;
				}
			}
			
		}
	}
</style>