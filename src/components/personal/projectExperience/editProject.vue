<template>
<div class="editProject">
	<h3 class="c-title"><span>{{title}}</span></h3>
	<span class="editBtn" @click="overlayA" v-if="isMine">编辑项目信息</span>
	<!--模态框 修改自己添加的项目-->
	<div id="modal-overlay" class="modal-a"> 
		<div class="editCfr">
			<h5></h5>
			<span class="modalChaBtn" @click="closeModalA"></span>
			<div class="content-wrap">
				<p>您正在尝试编辑您已经添加过的项目信息</p>
				<p>如您修改其中内容，已添加过的该项目信息也会随之变化</p>
				<div class="btnBox">
					<span class="cancelBtn" @click="closeModalA">取消</span>
					<span class="confirmBtn" @click="closeModalA()">确认</span>
				</div>
			</div>
		</div>
	</div>
	<!--模态框 修改自己添加的项目-->
	<ul class="proInfo">
		<li class="proName">
			<p><span>项目名称</span><span class="">{{project.projectName}}</span></p>
		</li>
		<li class="proPlace">
			<p><span>项目地址</span><span class="">{{project.projectPlaceObj.province}}{{project.projectPlaceObj.city}}{{project.projectPlaceObj.county}}{{project.projectPlaceObj.street}}</span></p>
		</li>
		<li class="proState">
			<p><span>项目状态</span><span class="">{{project.projectState}}</span></p>
		</li>
		<li class="proTime">
			<p><span>建成时间</span><span class="">{{project.completeTime}}</span></p>
		</li>
		<li class="proFunc">
			<p><span>建筑功能</span><span v-for="item in project.architectFunctions">{{item}}&nbsp;&nbsp;</span></p>
		</li>
		<li class="proDesc">
			<p>
				<span>项目描述</span>
				<span class="">{{project.projectDescription}}
				</span>
			</p>
		</li>
		<li>
			<p>
				<span>项目图片</span>
				<span>
					<img src="../../../assets/img/company/img.png" />
					<img src="../../../assets/img/company/img.png" />
					<img src="../../../assets/img/company/img.png" />
					<img src="../../../assets/img/company/img.png" />
				</span>
			</p>
			
		</li>
	</ul>
	<div class="modifyTable">
		<p class="notice">带*选项为必填项</p>
		<ul class="modify-table-wrap">
			<li class="time-wrap">
				<span class="table-wrap-left">* 参与时间</span>
				<!-- <datepicker class="datePicker" v-model="project.partakeTimeUp"></datepicker> -->
				<year-month v-model="project.partakeTimeUp"></year-month> 
				<span class="heng"></span>
				<!-- <datepicker class="datePicker" v-model="project.partakeTimeDown"></datepicker> -->
				<year-month v-model="project.partakeTimeDown" :min="project.partakeTimeUp" :today="true"></year-month>
				<alertTip v-if="showAlert.partakeTime" :showHide="showAlert.partakeTime"  :alertText="alertText.partakeTime"></alertTip>
			
			</li>
			<li class="duty-wrap">
				<span class="table-wrap-left">* 项目职责</span>
				<input @input="dutyWrap" type="text" placeholder="请输入项目职责" maxlength="30"  v-model="project.takeOffice"/>
				<p class="limit-words">{{dutycont}}/30</p>
				<alertTip v-if="showAlert.takeOffice" :showHide="showAlert.takeOffice"  :alertText="alertText.takeOffice"></alertTip>
			
			</li>
			<li class="detail-wrap">
				<span class="table-wrap-left">详细描述</span>
				<textarea  maxlength="500" placeholder="请输入项目详细描述文案..." v-model="project.detailDes"></textarea>
				<p class="limit-words">{{detailcont}}/500</p>
				
			</li>
		
			<li class="img-wrap">
				<span class="table-wrap-left">图片展示</span>
				<div class="picListCont">
					<div class="picList" v-for="(item,$index) in picList">
						<img :src="item.pic" alt="">
						<button @click="deletePic(index,$index)"></button>
					</div>
				</div>
				
				<script type="text/template" id="qq-template-manual-trigger">
			        <div class="qq-uploader-selector qq-uploader" qq-drop-area-text="Drop files here">
			            <!--<div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
			                <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
			            </div>-->
			            <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
			                <span class="qq-upload-drop-area-text-selector"></span>
			            </div>
			            <ul class="qq-upload-list-selector qq-upload-list" aria-live="polite" aria-relevant="additions removals">
			                <li class="li">
			                    <div class="qq-progress-bar-container-selector">
			                        <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>
			                    </div>
			                    <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
			                    <img class="qq-thumbnail-selector" qq-max-size="180" qq-server-scale>
			                    <span class="qq-upload-file-selector qq-upload-file"></span>
			                    <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>
			                    <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
			                    <span class="qq-upload-size-selector qq-upload-size"></span>
			                    <button type="button" class="qq-btn qq-upload-cancel-selector qq-upload-cancel"></button>
			                    <button type="button" class="qq-btn qq-upload-retry-selector qq-upload-retry">Retry</button>
			                    <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">Delete</button>
			                    <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
			                </li>
			            </ul>
			            <div class="buttons">
			                <div class="qq-upload-button-selector qq-upload-button">
			                	
			                    <span>请上传图片</span>
			                </div>
			                <button type="button"  class="btn btn-primary" id="trigger-upload">
			                    	 提交
			                </button>
			            </div>
			            <span class="qq-drop-processing-selector qq-drop-processing">
			                <span>Processing dropped files...</span>
			                <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
			            </span>
			            
			
			            <dialog class="qq-alert-dialog-selector">
			                <div class="qq-dialog-message-selector"></div>
			                <div class="qq-dialog-buttons">
			                    <button type="button" class="qq-cancel-button-selector">关闭</button>
			                </div>
			            </dialog>
			
			            <dialog class="qq-confirm-dialog-selector">
			                <div class="qq-dialog-message-selector"></div>
			                <div class="qq-dialog-buttons">
			                    <button type="button" class="qq-cancel-button-selector">No</button>
			                    <button type="button" class="qq-ok-button-selector">Yes</button>
			                </div>
			            </dialog>
			
			            <dialog class="qq-prompt-dialog-selector">
			                <div class="qq-dialog-message-selector"></div>
			                <input type="text">
			                <div class="qq-dialog-buttons">
			                    <button type="button" class="qq-cancel-button-selector">Cancel</button>
			                    <button type="button" class="qq-ok-button-selector">Ok</button>
			                </div>
			            </dialog>
			        </div>
			    </script>
			     <div id="fine-uploader-manual-trigger"></div>
			</li>
		</ul>
		
	</div>
	<div class="btnBox">
		<!--<router-link to="/company/companyProject/index">-->
		<span :class="{saveBtn:buttonColor,disabled:!buttonColor}" @click="saveEdit" >保存</span>
		<!--</router-link>-->
		<span class="cancelBtn" @click="cancelEdit">取消</span>
	</div>

</div>

</template>
<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import 	Modal from "../../../assets/js/modal.js"
	import Datepicker from "../units/Datepicker.vue"
	import YearMonth from "../units/yearMonth.vue"
	import router from "../../../router"
	import qq from "fine-uploader"
    import MyAjax from "../../../assets/js/MyAjax.js"
	import {singleManualUploader} from "../../../assets/js/manualUploader.js"
	import alertTip from "../units/alertTip.vue"
	
	export default {
	    name:"editProject",
	    components:{
		  Datepicker,
		  YearMonth,
		  alertTip
	    },
	    data:function(){
	      return {
	        title:"编辑个人参加项目信息",
	        state:"",
	        editSeniorShow:false,
	        isMine:false,/*是否是我添加的项目*/
	        dutytext:"",
	        dutycont:'0',
	        detailtext:"",
	        detailcont:'0',
	        project:{},/*由项目主页点击进去的相应项目*/
	        projectPlaceObj:{},
	        index:"",
	        compalteTime:[],
			parTakeTime:[],
			picList:[],
			picNum:"",
			buttonColor:true,//控制编辑按钮的颜色
			showAlert:{partakeTime:false,takeOffice:false},//提示框显隐
	        alertText:{partakeTime:null,takeOffice:null},
	      }
	    },
	   	created(){
	   		var that = this;
			that.projectID = that.$route.query.proId;
			that.psnProExpeID = that.$route.query.psnId;
			
			if(that.psnProExpeID == undefined){
				that.psnProExpeID = '""';
			}
			if(that.projectID == undefined){
				that.projectID = '""';
			}
			var url = MyAjax.urlsy+"/psnProjExpe/selectProjAndExpe/" + that.projectID +"/" + that.psnProExpeID//暂时先写成这样
	    	MyAjax.ajax({
				type: "GET",
				url:url,
				dataType: "json",
				async:false,
			},function(data){
				data = data.msg;
				Vue.set(that,"project",data)
				that.project.picId=[];
				console.log(that.project)
			},function(err){
				console.log(err)
			})
			// 获取数据信息
			
		
			
			if(that.project.ifPublish==0){
				that.isMine = true;
			}else if(that.project.ifPublish==1){
				that.isMine = false;
			}//判断是否为本人创建的项目，”是isMine“就可以编辑
			
	    	function emptyText(text) {
			    if(text == null||text.length == 0){
			      return "（暂无信息）";
			    }else {
			      return text;
			    }
			}
	    	function emptyText2(text) {
			    if(text==null||text.length == 0){
			      return "";
			    }else {
			      return text;
			    }
			}
	    	that.projectPlaceObj = that.project.projectPlaceObj;
			//console.log(that.project.projectPlaceObj)
	    	that.project.completeTime = emptyText(that.project.completeTime);
	    	that.project.projectState = emptyText(that.project.projectState);
	    	that.project.projectDescription = emptyText(that.project.projectDescription);
	    	that.project.partakeTimeUp = emptyText2(that.project.partakeTimeUp);
	    	that.project.partakeTimeDown = emptyText2(that.project.partakeTimeDown);
	    	that.project.takeOffice = emptyText2(that.project.takeOffice);
	    	that.project.detailDes = emptyText2(that.project.detailDes);
	    	that.showAlert.partakeTime = false;
	    	that.showAlert.takeOffice = false;
	    	that.alertText.partakeTime = null;
	    	that.alertText.takeOffice = null;
	    	if(that.project.architectFunctions[0]==""){
	    		that.project.architectFunctions[0] = "（暂无信息）"
	    	}
	    	if(that.project.partakeTimeDown=="0002.12"){
			 	that.project.partakeTimeDown = "至今";
			}
	    	
	    	//空值的处理
	    	
	   	},
		async mounted(){
			
			$(document.body).css("overflow-y","scroll");
			var that = this;
			//上传图片
			const data = await that.getPic(that.psnProExpeID)
			if(data.code===0){
				Vue.set(that,"picList",data.msg)
			    Vue.set(that,"picNum",data.msg.length)
			}
			console.log(that.picList)
			console.log(that.picNum)
			console.log(Math.floor(3-that.picNum))
			if(Math.floor(3-that.picNum)>0){
				singleManualUploader({
					element:"fine-uploader-manual-trigger",
	        		template: "qq-template-manual-trigger",
					url:MyAjax.urlsy+'/psnProjExpe/batchUpload',
					picIdCont:that.project.picId,
					btnPrimary:".btn-primary",
					canUploadNum:Math.floor(3-that.picNum),
				})
			}
	    },
	    methods:{
	    	getPic(psnProExpeID){
				var that=this;
				var url=MyAjax.urlsy+"/psnProjExpe/findById/"+psnProExpeID;
				return new Promise((resolve, reject) => {
					MyAjax.ajax({
				        type: "GET",
						url:url,
						dataType: "json",
						async: true, 
				    },(data) => {
				    	resolve(data)
				    },(err) => {
				        reject(err);
					});
				})
			},
			
			async deletePic(index,$index){
				var that =this;
				var url = MyAjax.urlsy+"/psnProjExpe/delPic/"+this.picList[$index].id
				MyAjax.ajax({
					type: "POST",
					url:url,
					dataType: "json",
					async:false,
					},function(data){
						console.log(data)
					},function(err){
						console.log(err)
				})
				const data = await that.getPic(that.psnProExpeID) 
				if(data.code===0){
					Vue.set(that,"picList",data.msg)
				    Vue.set(that,"picNum",data.msg.length)
				}
				$("#fine-uploader-manual-trigger").html("")
				if(Math.floor(3-that.picNum)>0){
					singleManualUploader({
						element:"fine-uploader-manual-trigger",
		        		template: "qq-template-manual-trigger",
						url:MyAjax.urlsy+'/psnProjExpe/batchUpload',
						picIdCont:that.project.picId,
						btnPrimary:".btn-primary",
						canUploadNum:Math.floor(3-that.picNum),
					})
				}
			},
	    	overlayA(){
	    		var modal = $('.modal-a')
				Modal.makeText(modal)
			},
			closeModalA(id){
				var modal = $('.modal-a')
				Modal.closeModal(modal)
				router.push({name:"definedProject",query:{proId:this.projectID,psnId:this.psnProExpeID}})
			},
			dutyWrap(){
				let condition=this.project.takeOffice.length!=0
				&&this.project.partakeTimeUp.length!=0
				&&this.project.partakeTimeDown.length!=0;
				if(condition){
					this.buttonColor=true;
				}else{
					this.buttonColor=false;
				}
			},
			saveEdit(){
				let condition=this.project.takeOffice.trim().length!=0
				&&this.project.partakeTimeUp.trim().length!=0
				&&this.project.partakeTimeDown.trim().length!=0;
				function emptyText(text) {
				    if(text=="（暂无信息）"){
				      return " ";
				    }else {
				      return text;
				    }
				}
				this.project.completeTime = emptyText(this.project.completeTime);
		    	this.project.projectState = emptyText(this.project.projectState);
		    	this.project.projectDescription = emptyText(this.project.projectDescription);
		    	if(this.project.architectFunctions[0] = "（暂无信息）"){
		    		this.project.architectFunctions = [];
		    	}
				var that = this;
			    if(condition){
					if(that.project.partakeTimeDown=="至今"){
						that.project.partakeTimeDown = "0000.00";
					}
					var url = MyAjax.urlsy+"/psnProjExpe/insertOrUpdateProjExpe/";
					$.ajaxSetup({ contentType : 'application/json' });
					MyAjax.ajax({
						type: "POST",
						url:url,
						data:JSON.stringify(that.project),
						dataType: "json",
						async:false,
					},function(data){
						console.log(data)
						if(data.code == 0){
							router.push("/yhzx/personal/info/personalProject/index")
						}
						
					},function(err){
						console.log(err)
					})
				}else{
					if(that.project.takeOffice.trim().length===0){
						that.showAlert.takeOffice = true;
						that.alertText.takeOffice = "请输入项目职责"
					}else{
						that.showAlert.takeOffice = false;
						that.alertText.takeOffice = ""
					}
					if(that.project.partakeTimeUp.trim().length===0||that.project.partakeTimeDown.trim().length===0){
						that.showAlert.partakeTime = true;
						that.alertText.partakeTime = "请输入参与时间"
					}else{
						that.showAlert.partakeTime = false;
						that.alertText.partakeTime = ""
					}
				}
			},
			cancelEdit(){
				//console.log(55)
				router.push("/yhzx/personal/info/personalProject/index")
			}
	    },
	    
	    updated(){
	    	var num1 = this.project.takeOffice.length;
	    	this.dutycont = num1;
	    	var num2 = this.project.detailDes.length;
	    	this.detailcont = num2;
	    	
//	    	console.log(this.companyProInfo[0])
	    	
	    },
	    
   }
</script>

<style lang="scss" scoped="">
$bfColor:#f7f9fc;
$activeColor: rgb(242,117,25);
.qq-uploader {
    position: relative;
    width: 720px;
    float: right;
}
#fine-uploader-manual-trigger{
	width: 720px;
	float: right;
}
#fine-uploader-manual-trigger .qq-upload-button {
    margin-right: 15px;
}
#fine-uploader-manual-trigger .qq-uploader .qq-total-progress-bar-container {
    width: 60%;
}
.year-month{
	float: left;
	width: 140px;
	margin-right: 20px;
}
.editProject{
	width:940px; 
	padding: 40px;
	overflow: hidden;
	position: relative;
	background:#ffffff;
	border-radius: 5px;
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
	.editBtn{
		height: 18px;
		line-height: 18px;
		padding-left: 25px;
		color: $activeColor;
		background: url(../../../assets/img/personal/education/edit.png) no-repeat left center;
		position: absolute;
		right: 40px; top: 40px;
		cursor: pointer;
	}
	.editCfr{
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
	     	padding-top: 82px;
	     	padding-bottom: 100px;
	     	overflow: hidden;
	     	p{
	     		height: 30px;
	     		line-height: 30px;
	     		font-size: 18px;
	     		color: $activeColor;
	     		text-align: center;
	     		
	     	}
	     	.btnBox{
				height: 40px;
				width: 330px;
				float: left;
				display: flex;
				justify-content: space-between;
				overflow: hidden;
				margin-top: 60px;
				margin-left: 130px;
				span{
					float: left;
					/*margin-right: 50px;*/
					width: 140px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					vertical-align: middle;
					font-size: 16px;
					border-radius: 5px;
					cursor: pointer;
			
					&.cancelBtn{
						border: 1px solid #bfcbd9;
			
						&:hover{
							border: 1px solid $activeColor;
							color: $activeColor;
						}
					}
					&.confirmBtn{
						display: block;
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
	    }
	}
	.proInfo{
		padding: 30px 20px;
		width:100%;
		border-bottom: 1px solid $activeColor;
		li{
			width: 100%;
			margin-bottom: 20px;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
			
			&:last-child{
				margin-bottom: 0;
				
			}
			p{
				overflow: hidden;
				
				span{
					float: left;
					display: inline-block;
					&:first-child{
						margin-right: 30px;
						color: rgb(102,102,102);
						
					}
					
					
				}
			}
			
		}
		.proFunc{
			span{
				float:left;
			}
		}
		.proDesc{
			span:last-child{
				width: 720px;
				color: rgb(53,53,53);
				text-align: justify;
				img{
					width: 160px; height: 100px;
					display: block;
					margin-right: 15px;
					margin-bottom: 15px;
					float:left; 
					&:nth-child(4n){
						margin-right: 0;
					}
				}
			}
		}
		
	}
	.btnBox{
		
		height: 33px;
		overflow: hidden;
		float: left;
		margin-top: 30px;
		margin-left: 130px;
		span{
			width: 117px;
			height: 33px;
			line-height: 33px;
			float: left;
			margin-right: 30px;
			text-align: center;
			border-radius: 5px;
			cursor: pointer;
			&.cancelBtn{
			border: 1px solid #bfcbd9;

			&:hover{
				border: 1px solid $activeColor;
				color: $activeColor;
			}
		}
		&.saveBtn{
			background: url(../../../assets/img/personal/education/btn_save_normal.png.png) ;
			color: #FFFFFF;
			&:hover{
				filter:alpha(opacity=80);       /* IE */
			  -moz-opacity:0.8;              /* 老版Mozilla */
			  -khtml-opacity:0.8;              /* 老版Safari */
			   opacity: 0.8;           /* 支持opacity的浏览器*/
			}
		}
		&.disabled{
			border:0px;
			color: #fff;
			background: url("../../../assets/img/personal/education/btn_save_disabled.png.png") left center no-repeat;
			&:hover{
				filter:alpha(opacity=80);       /* IE */
			  -moz-opacity:0.8;              /* 老版Mozilla */
			  -khtml-opacity:0.8;              /* 老版Safari */
			   opacity: 0.8;           /* 支持opacity的浏览器*/
			}
		}
		}
	}
	.modifyTable{
		padding: 20px;
		.notice{
			color: rgb(171,171,171);
		}
		.modify-table-wrap{
			.table-wrap-left{
				color: $activeColor;
				margin-right: 30px;
				float: left;
			}
			li{
				margin-top: 20px;
				&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
				
				&.time-wrap{
					height: 35px;
					line-height: 35px;
					.heng{
						display: inline-block;
						vertical-align: middle;
						height: 2px;
						width: 20px;
						float: left;
						background: #333333;
						margin-right: 20px;
						margin-top: 16px;
					}
				}
				&.duty-wrap{
					color: rgb(167,167,167);
					position: relative;
					height: 35px;
					line-height: 35px;
					position: relative;
					.alet_container{
				      	right: 10px;
				      	top: 8px;
				      	bottom: 0;
				      }
					input{
						width: 480px;
						height: 35px;
						border: 1px solid #EBEBEB;
						border-radius: 5px;
						text-indent: 8px;
						color: #353535;
						float: left;
					}
					.limit-words{
						position: absolute;
						bottom: 0px;
						left:600px ;
					}
				}
				&.detail-wrap{
					color: rgb(167,167,167);
					position: relative;
					overflow: hidden;
					padding-left: 10px;
					.table-wrap-left{
						float: left;
					}
					textarea{
						float: left;
						width: 480px;
						height: 200px;
						line-height: 24px;
						border: 1px solid #EBEBEB;
						border-radius: 5px;
						text-indent: 12px;
						border-radius: 5px;
						color: #353535;
						text-align: justify;
						padding: 0 12px;
					}
					.limit-words{
						position: absolute;
						bottom:0px;
						left:600px ;
					}
				}
				&.img-wrap{
					/*height: 100px;
					line-height: 100px;*/
					padding-left: 10px;
					overflow: hidden;
					.table-wrap-left{
						float: left;
						margin-top: 40px;
					}
					.picListCont{
						width: 720px;
						float: left;
						.picList{
							float: left;
							width: 200px;
							height: 200px;
							padding: 8px;
							background: rgba(210,210,210,.3);
							border-radius: 10px;
							margin-left: 10px;
							margin-bottom: 10px;
							position: relative;
							img{
								width: 182px;
							}
							button{
								border-style: none;
								width: 21px;
								height: 21px;
								position: absolute;
								top: 10px;
								right: 10px;
								cursor: pointer;
								background: url("../../../assets/img/personal/common/picDelete.png") no-repeat center;
							}
						}
					}
					
					.img-show{
						float: left;
						width: 685px;
						.imgBox{
							width: 160px; height: 100px;
							float: left;
							margin-right: 15px;
							margin-bottom: 20px;
							margin-top: 0;
							background: rgb(230,230,230);
							position: relative;
							cursor:pointer; 
							&:nth-of-child(4n){
								margin-right: 0;
							}
							.closeImg{
								width: 21px; height: 21px;
								position: absolute;
								top: 10px; right: 10px;
								background: url(../../../assets/img/company/Close2.png) no-repeat center;
							}
						}
					}
					.uploadBtn{
						width: 100px;
						height: 100px;
						line-height: 100px;
						color: #a3a3a3;
						text-align: center;
						background: rgb(230,230,230);
						float: left;
						display: flex;
						flex-direction: column;
						justify-content:center;
						align-items: center;
						padding-top: 23px;
						padding-bottom: 22px;
						margin-left: 10px;
						cursor: pointer;
						position: relative;
						input{
							position: absolute;
							width: 100%;
							height: 100%;
							opacity: 0;
						}
						span{
							height: 14px;
							line-height: 14px;
							margin-top: 15px;
						}
					}
				}
			}
			
		}
	}
}

</style>