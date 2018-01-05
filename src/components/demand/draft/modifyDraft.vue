<template>
	<div class="modifyDraft">
		<p class="notice">带*为必填项</p>
		<ul class="edit_table">
			<li>
				<p class="wrap-left">*需求名称</p>
				<input type="text" placeholder="请输入需求名称..." v-model="DemandInfo.demandbasicinfo.demandName"/>
				<alertTip v-if="showAlert.name" :showHide="showAlert.name" @closeTip="closeTip" :alertText="alertText.name"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*需求描述</p>
				<textarea maxlength="500" placeholder="请输入 需求详细描述文案..." v-model="DemandInfo.demandbasicinfo.describe"></textarea>
				<span>{{describeCont}}/500</span>
				<alertTip v-if="showAlert.describe" :showHide="showAlert.describe" @closeTip="closeTip" :alertText="alertText.describe"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*完成时间</p>
				<!--<input type="text" placeholder="请输入完成时间..." />-->
				<datepicker class="datePicker" v-model="DemandInfo.demandbasicinfo.complateTime"></datepicker>
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
				<textarea  maxlength="500" placeholder="请输入对象要求..." v-model="DemandInfo.demandbasicinfo.objRequire"></textarea>
				<span>{{requireCont}}/500</span>
				<alertTip v-if="showAlert.objRequire" :showHide="showAlert.objRequire" @closeTip="closeTip" :alertText="alertText.objRequire"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*需求酬劳</p>
				<div class="select">
					<span>请确定结算币种</span>
					<select v-model="DemandInfo.demandbasicinfo.currency">
						<option value="人民币-CNY">人民币-CNY</option>
						<option value="美元-USD">美元-USD</option>
						<option value="日元-JPY">日元-JPY</option>
						<option value="欧元-EUR">欧元-EUR</option>
						<option value="英镑-GBP">英镑-GBP</option>
						<option value="韩元-KRW">韩元-KRW</option>
						<option value="港元-HKD">港元-HKD</option>
						<option value="澳元-AUD">澳元-AUD</option>
						<option value="加元-CAD">加元-CAD</option>
					</select>
				</div>
				<div class="currency">
					<input type="text" placeholder="请输入需求酬劳..." v-model="DemandInfo.demandbasicinfo.reword"/>
					<span>{{currencyUnit}}</span>
				</div>
				<alertTip v-if="showAlert.reword" :showHide="showAlert.reword" @closeTip="closeTip" :alertText="alertText.reword"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*备注信息</p>
				<textarea  maxlength="500" placeholder="请输入备注信息..." v-model="DemandInfo.demandbasicinfo.remark"></textarea>
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
		<div class="applicant-wrap" v-if="havePublished">
			<h5 class="A-title">申请方</h5>
			<div class="content-applicant">
				<p class="stateNone" v-if="!haveCooper">( 暂无申请方 )</p>
				<dl v-for="(item,index) in DemandInfo.demandappinfos">
					<dd><img :src="item.psnAvatar"/></dd>
					<dt>
						<p class="comName">{{item.nickName}}</p>
						<span class="alreadySent">
							{{intentionTxt[index]}}
						</span>
						<span v-if="item.status=='1'" class="disabled">同意合作申请</span>
					</dt>
				</dl>
				
			</div>
			
		</div>
		
		<div class="relatedDeal-wrap" v-if="havePublished">
			<h5 class="A-title">关联协议</h5>
			
			<ul class="content-relatedDeal">
				<li class="noDeal" v-if="!haveDeal">暂无关联协议</p>
				<li v-for="(item,index) in DemandInfo.deals">
					与{{item.dealName}}签订的协议
					<span class="cancleDeal" @click="cancelDeal(item.dealID)" >取消协议</span>
					<span class="dealState valid" v-if="item.valid">已生效</span>
					<span class="dealState unvalid" v-if="!item.valid">未生效</span>
				</li>
				<p class="stateNone"  @click="addDeal">添加关联协议</p>
				<div id="modal-overlay" class="addDealModal">
					<div class="modal-wrap">
						<h5>添加关联协议</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="selectBox">
							<p>请选择关联协议</p>
							<select v-on:change="selectThisDeal($event)" v-model="seletedDealName">
								<option value="0">请选择</option>
								<option v-for="item in relatedDeals" v-bind:value="item.dealID" @click="">{{item.dealName}}</option>
							</select>
						</div>
						<div class="confirmBtn" @click="comfirmInsertDeal">
							确定
						</div>
					</div>
				</div>
			</ul>
		</div>
	</div>
	
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import router from "../../../router"
	import Modal from "../../../assets/js/modal"
	import Datepicker from "../units/Datepicker.vue"
	import AlertTip from "../units/alertTip.vue"
    import MyAjax from "../../../assets/js/MyAjax.js"
	
	export default{
		name:"modifyDraft",
		data:function(){
			return{
				demandObj:[
				"个人","公司","团队"
				],
				id:"",
				DemandInfo:{
//					name:"",//需求名称
//					describe:"",//需求描述
//					complateTime:"",//完成时间
//					demandObj:"",//对象
//					objRequire:"",//对象的要求
//					reword:"",//酬劳
//					remark:"",//备注
				},
				describeCont:"0",//描述文字字数
				requireCont:"0",//要求文字字数
				remarkCont:"0",
				selectedStyle:[false,false,false],//需求对象的选中样式
				havePublished:false,//有没有被发布过
				haveCooper:true,//有无申请方
				haveDeal:true,//有无关联协议
				canOffline:false,//可以进行下线操作（已经通过3）
				intentionTxt:[],//有无合作意向之后的文字信息
				auditStatusShow:false,//需求审核状态的提示显隐 为auditStatus='0'表示在审核中，'1'表示审核完成可以编辑
				auditStatusTxt:"",//需求审核状态的文字
				showAlert:{name:false,describe:false,complateTime:false,demandObj:false,objRequire:false,reword:false},//提示框显隐
	        	alertText:{name:null,describe:null,complateTime:null,demandObj:null,objRequire:null,reword:false},
				dealValid:[],//关联协议的状态内容
				relatedDeals:[],
				seletedDealName:"",
				selectedDeal:{
					demandID:"",
					dealID:"",
				}
			}
		},
		components:{
		 	Datepicker,
		 	AlertTip,
		},
	    computed:mapState({
//			demandInfo:state=>state.demand.demandInfo,/*获取vuex数据*/
//			unvalidInfo:state=>state.demand.unvalidInfo,
//			draftInfo:state=>state.demand.draftInfo,/*获取vuex数据   需求草稿的数据*/
			currencyUnit:function(){
				return this.DemandInfo.demandbasicinfo.currency.split("-")[0]
			},
		}),
		created(){
			
			this.getData();
			
		},
		methods:{
			getData(){
				this.id = this.$route.query.id;
				console.log(this.id);
				var that = this;
				var url = MyAjax.urlhw+"/demandbasicinfo/findByID/" + that.id
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						console.log(data.msg)
						Vue.set(that,"DemandInfo",data.msg)
					}
					
					console.log(that.DemandInfo)
				},function(err){
					console.log(err)
				})
				that.DemandInfo.demandobjs = that.DemandInfo.demandobjs[0].split(",")
				console.log(that.DemandInfo.demandobjs)
				for(var i=0;i<that.DemandInfo.demandobjs.length;i++){//需求对象的单选按钮
					switch (that.DemandInfo.demandobjs[i]){
						case '1001':
							Vue.set(that.selectedStyle,[0],true)
							break;
						case '1002':
							Vue.set(that.selectedStyle,[1],true)
							break;
						case '1003':
							Vue.set(that.selectedStyle,[2],true)
							break;
					}
				}
				console.log(this.selectedStyle)
				
				
				
				//判断有无关联协议
				if(that.DemandInfo.deals.length!=0){
					Vue.set(that,"haveDeal",true)
				}else{
					Vue.set(that,"haveDeal",false)
				}
				
				
				//判断有没有合作方
				for(let i=0;i<that.DemandInfo.demandappinfos.length;i++){
					if(that.DemandInfo.demandappinfos[0].pkid==null){
						that.haveCooper = false ;
						that.DemandInfo.demandappinfos = []
					}else{
						that.haveCooper = true ;
					}
				}
				//申请方各自的状态
				that.intentionTxt = [];
				for(let i=0;i<that.DemandInfo.demandappinfos.length;i++){
					if(that.DemandInfo.demandappinfos[i].status=="1"){
						that.intentionTxt.push("未达成合作意向")
					}else if(that.DemandInfo.demandappinfos[i].status=="3"){
						that.intentionTxt.push("已达成合作意向")
					}
				}
				//需求有没有上线过
				if(Math.floor(that.DemandInfo.demandreviewinfo.applyStatus)>=3){
					Vue.set(that,"havePublished",true)
				}else{
					Vue.set(that,"havePublished",false)
				}
			},
			selectObj(index){
				for(var i=0;i<this.demandObj.length;i++){
					
					if(i==index){
						                                                                                                                                  
						if(this.selectedStyle[index]==false){
				      		Vue.set(this.selectedStyle,[index],true);
				      		switch (index){
								case 0:
									this.DemandInfo.demandobjs.push("1001")
									break;
								case 1:
									this.DemandInfo.demandobjs.push("1002")
									break;
								case 2:
									this.DemandInfo.demandobjs.push("1003")
									break;
							}
				      		this.DemandInfo.demandobjs.push.apply(this.DemandInfo.demandobjs,[])
//				      		Vue.set(this.DemandInfo.demandobjs[index],"demandObj",this.demandObj[index]);
//				      		this.DemandInfo.demandobjs[index].demandObj=this.demandObj[index];//更改项目功能名
				      		
				      	}else{
				      		console.log(333)
				      		Vue.set(this.selectedStyle,[index],false);
				      		Array.prototype.remove = function(val) {
								var index = this.indexOf(val);
								if (index > -1) {
									this.splice(index, 1);
								}
							};
							switch (index){
								case 0:
									this.DemandInfo.demandobjs.remove("1001")
									break;
								case 1:
									this.DemandInfo.demandobjs.remove("1002")
									break;
								case 2:
									this.DemandInfo.demandobjs.remove("1003")
									break;
							}
							console.log(this.DemandInfo.demandobjs)
//				      		Vue.set(this.DemandInfo.demandobjs[index],"demandObj","");
//				      		this.DemandInfo.demandobjs[index].demandObj="";
				      		
				      	}
						//赋值到本地信息里
						
						
					}else{
//						Vue.set(this.selectedStyle,[i],false)
//						this.selectedStyle[i] = false;
					}
				}
				console.log(this.DemandInfo.demandobjs)
			},
			mustConfirm(){
				if(this.DemandInfo.demandbasicinfo.demandName.trim().length==0){
					this.showAlert.name = true;
					this.alertText.name = "需求名称为必填项"
				}else{
					this.showAlert.name = false;
				};//判断项目名称不能为空
				
				if(this.DemandInfo.demandbasicinfo.describe.trim().length==0){
					this.showAlert.describe = true;
					this.alertText.describe = "需求描述为必填项"
				}else{
					this.showAlert.describe = false;
//					
				};//判断项目名称不能为空
				if(this.DemandInfo.demandbasicinfo.complateTime.trim().length==0){
					this.showAlert.complateTime = true;
					this.alertText.complateTime = "需求时间为必填项"
				}else{
					this.showAlert.complateTime = false;
//					
				};//判断项目名称不能为空
				for(var i=0;i<this.DemandInfo.demandobjs.length;i++){
					if(this.DemandInfo.demandobjs.length==0){
						this.showAlert.demandObj = true;
						this.alertText.demandObj = "需求对象为必填项"
					}else{
						this.showAlert.demandObj = false;
	//					
					};//判断需求对象不能为空
				}
				if(this.DemandInfo.demandbasicinfo.objRequire.trim().length==0){
					this.showAlert.objRequire = true;
					this.alertText.objRequire = "对象需求为必填项"
				}else{
					this.showAlert.objRequire = false;
//					
				};//判断对象需求不能为空
				if(this.DemandInfo.demandbasicinfo.reword.trim().length==0||
				/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/gi.test(this.DemandInfo.demandbasicinfo.reword)!=true){
					this.showAlert.reword = true;
					this.alertText.reword = "请输入金额（保留两位小数）";
				}else{
					this.showAlert.reword = false;
//					
				};//判断酬金不能为空
			},
			commitDemand(){
				
				if(this.DemandInfo.demandbasicinfo.demandName.trim().length!=0&&this.DemandInfo.demandbasicinfo.describe.trim().length!=0
				&&this.DemandInfo.demandbasicinfo.complateTime.trim().length!=0&&this.DemandInfo.demandobjs.length!=0
				&&this.DemandInfo.demandbasicinfo.objRequire.trim().length!=0&&this.DemandInfo.demandbasicinfo.reword.toString().trim().length!=0
				&&/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/gi.test(this.DemandInfo.demandbasicinfo.reword)!=false){
					Modal.makeText($('.confirmCommit'));
					this.showAlert.demandObj = false;
				}else{
					this.mustConfirm();
				}
				
//				
			},
			cfmCommit(){
				
//				this.DemandInfo.auditStatus = "0";//需求进入审核状态。
				var that = this;
				var url = MyAjax.urlhw+"/demandbasicinfo/insertOrUpdate/" + 'valid' 
		    	
		    	if(that.DemandInfo.demandbasicinfo.complateTime=="至今"){
					that.DemandInfo.demandbasicinfo.complateTime = "0000.00";
				}
			    console.log(JSON.stringify(that.DemandInfo))
			    $.ajaxSetup({ contentType : 'application/json' });
			    MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(that.DemandInfo),
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
				
				console.log(this.DemandInfo)	
				if(this.DemandInfo.demandbasicinfo.demandName.trim().length!=0&&this.DemandInfo.demandbasicinfo.describe.trim().length!=0
				&&this.DemandInfo.demandbasicinfo.complateTime.trim().length!=0&&this.DemandInfo.demandobjs.length!=0
				&&this.DemandInfo.demandbasicinfo.objRequire.trim().length!=0&&this.DemandInfo.demandbasicinfo.reword.toString().trim().length!=0
				&&/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/gi.test(this.DemandInfo.demandbasicinfo.reword)!=false){
					var that = this;
					var url = MyAjax.urlhw+"/demandbasicinfo/insertOrUpdate/" + 'draft' 
			    	
			    	if(that.DemandInfo.demandbasicinfo.complateTime=="至今"){
						that.DemandInfo.demandbasicinfo.complateTime = "0000.00";
					}
				    console.log(JSON.stringify(that.DemandInfo))
				    $.ajaxSetup({ contentType : 'application/json' });
				    MyAjax.ajax({
						type: "POST",
						url:url,
						data:JSON.stringify(that.DemandInfo),
						dataType: "json",   
						async:false,
					},function(data){
						console.log(data)
						if(data.code == 0){
							router.go(-1);
//							router.push("/yhzx/demand/draft/index");
							that.closeModal();
						}
					},function(err){
						console.log(err)
					})
				}else{
					this.mustConfirm();
				}
				
			},
			closeModal(){
				Modal.closeModal($('.confirmCommit'))
				Modal.closeModal($(".addDealModal"))
			},
			cancelDeal(id){
				var that = this;
				var url = MyAjax.urlhw +"/demanddealrela/cancelDeal";
				var data = {
					pkid:id
				};
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(data),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.getData();
						that.closeModal()
					}
				},function(err){
					console.log(err)
				})//更新到服务器
			},
			addDeal(){
				Modal.makeText($(".addDealModal"))
				var that = this;
				var url = MyAjax.urlhw+"/demanddealrela/findByMySelf";
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"relatedDeals",data.msg)
					}
					
				},function(err){
					console.log(err)
				})
			},	
			selectThisDeal(e){
				console.log(e.target.value)
				this.selectedDeal = {
					demandID : this.$route.query.id,
					dealID : e.target.value
				}
				
			},
			comfirmInsertDeal(){
				var that = this;
				var url = MyAjax.urlhw +"/demanddealrela/insert";
				var data = that.selectedDeal;
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(data),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.getData();
						that.closeModal()
					}
				},function(err){
					console.log(err)
				})//更新到服务器
			},
			
		},
		updated(){
			this.describeCont = this.DemandInfo.demandbasicinfo.describe.length;
			this.requireCont = this.DemandInfo.demandbasicinfo.objRequire.length;
			this.remarkCont = this.DemandInfo.demandbasicinfo.remark.length;
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.modifyDraft{
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
					left:580px;
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
					line-height: 24px;
					text-indent: 15px;
					border: 1px solid #BEBEBE;
					border-radius: 5px;
					text-align: justify;
					padding: 0 5px;
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
			.select{
				line-height: 34px;
			}
			.currency{
              input{
                width:400px;
                float: left;
              }
              span{
                float: left;
                margin: 0;
                margin-left: 10px;
				line-height: 35px;
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
		.applicant-wrap{
			padding-top: 40px;
			border-top: 1px solid #E0E0E0;
			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			.A-title{
				height: 42px;
				line-height: 42px;
				font-size: 18px;
			}
			.content-applicant{
				padding-left: 40px;
				border: none;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				.stateNone{
					height: 40px;
					line-height: 40px;
					color: #8C8C8C;
				}
				dl{
					height: 200px;
					float: left;
					margin-right: 30px;
					margin-top: 10px;
					dd{
						margin-bottom: 10px;
						text-align: center;
						width: 80px;
						height: 80px;
						border-radius: 50%;
						margin: 0 auto;
						overflow: hidden;
						img{
							width: 100%;
						}
					}
					dt{
						/*height: 40px;*/
						/*line-height: 40px;*/
						text-align: center;
						margin-top: 5px;
						
						width: 112px;
						/*overflow: hidden;*/
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						position: relative;
						>p{
							float: left;
							min-width: 112px;
							/*height: 30px;*/
							color: $activeColor;
						}
						span{
							float: left;
							/*width: 100%;*/
							min-width: 112px;
							height: 30px;
							line-height: 30px;
							
							
							
						}
						.disabled{
							color: #FFFFFF !important;
							background: #828282 !important;
						}
						.alreadySent{
							background: none;
							color: #f76c0f;
						}
						.notyetSent{
							margin-top: 10px;
							background: #353535;
							color: #FFFFFF;
							border-radius: 3px;
							cursor: pointer;
							&:hover{
								background: $activeColor;
							}
						}
					}
				}
			}
			
		}
		.relatedDeal-wrap{
			
			margin-top: 20px;
			.A-title{
				height: 42px;
				line-height: 42px;
				font-size: 18px;
			}
			.content-relatedDeal{
				.noDeal{
					height: 40px;
					line-height: 40px;
					color: #8C8C8C;
					border: none;
				}
				li{
					margin:0 40px;
					height: 35px;
					line-height: 35px;
					border-bottom: 1px dotted #E0E0E0;
					.dealState{
						float:right;
						margin-right:300px;
						&.valid{
							color: #f76c0f;
						}
						&.unvalid{
							color: #858585;
						}
					}
					.cancleDeal{
						float: right;
						margin-right: 0;
						padding-left: 24px;
						cursor: pointer;
						background: url(../../../assets/img/demand/icon005.png) no-repeat left center;
					}
				}
			}
			
			.stateNone{
				border: none;
				color: $activeColor;
				padding-left: 28px;
				background: url(../../../assets/img/demand/icon53.png) no-repeat left center;
				cursor: pointer;
				margin-top: 10px;
				float: left;
			}
			.disabled{
				padding-left: 28px;
				margin-top: 20px;
				background: url(../../../assets/img/demand/icon53.png) no-repeat left center;
				cursor: pointer;
				border: none;
				color: #828282;
			}
			.addDealModal{
				position: relative;
				.modal-wrap{
					min-width: 480px;
					padding: 0px 20px 80px;
					background: #FFFFFF;
					border-radius: 10px;
					position:absolute;top:50%;left:50%; 
					transform:translate(-50%,-50%);
					-webkit-transform:translate(-50%,-50%);
					-moz-transform:translate(-50%,-50%);
					-ms-transform:translate(-50%,-50%);
					-o-transform:translate(-50%,-50%);
					h5{
						height: 50px;
						line-height: 50px;
						text-align: left;
						font-size: 18px;
						/*padding-left: 20px;*/
						color: $activeColor;
					}
					.selectBox{
						margin-top: 30px;
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						p{
							font-size: 16px;
							height: 30px;
							line-height: 30px;
							text-align: center;
							float: left;
							margin-left: 50px;
						}
						select{
							height: 30px;
							line-height: 30px;
							border-radius: 3px;
							float: left;
							margin-left: 20px;
							width: 180px;
						}
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
	
}
</style>