<template>
<form class="editProject">
	<h3 class="c-title"><span>{{title}}</span></h3>
	
	<div class="modifyTable">
		<p class="notice">带 * 选项为必填项</p>
		
		<ul class="modify-table-wrap">
			<li class="name-wrap">
				<span class="table-wrap-left">* 项目名称</span>
				<input type="text" placeholder="请输入项目名称" v-model="projectInfo.projectName"/>
				<alertTip v-if="showAlert.name" :showHide="showAlert.name" @closeTip="closeTip" :alertText="alertText.name"></alertTip>
			</li>
			<li class="place-wrap">
				<span class="table-wrap-left">* 项目地址</span>
				<provinces-city v-on:accpt-province-change="changeProjectAds"></provinces-city>
				
				
			</li>
			<li class="status-wrap">
				<span class="table-wrap-left">项目状态</span>
				<label v-for="(item,index) in addNewProject.projectState" @click="changeProjectStateColor(index)" v-bind:class="{projectStateColor:projectStateColor[index]}">
					<em></em>
					<p>{{item}}</p>
				</label>
				
			</li>
			<li class="time-wrap">
				<span class="table-wrap-left">* 建成时间</span>
				<datepicker class="datePicker" v-model="projectInfo.completeTime"></datepicker>
				<alertTip v-if="showAlert.completeTime" :showHide="showAlert.completeTime" @closeTip="closeTip" :alertText="alertText.completeTime"></alertTip>
				<div class="timeGray" v-if="complated">
					<span class="table-wrap-left">* 建成时间</span>
					<span class="picker"></span>
				</div>
			</li>
			<li class="func-wrap">
				<span class="table-wrap-left">建筑功能</span>
				<div class="func-box">
					<label v-for="(item,index) in addNewProject.projectType" v-on:click="changeProjectTypeColor(index)" v-bind:class="{projectTypeColor:projectTypeColor[index]}">
						<em></em>
						<p>{{item}}</p>
					</label>
					
					<label><em></em><input type="text" placeholder="可自行填写建筑功能" @blur="keepAddProjectTypeName" v-model="addProjectType.value"/></label>
				</div>
			</li>
			<li class="describe-wrap">
				<span class="table-wrap-left">项目描述</span>
				<textarea placeholder="请输入项目详细描述文案..." v-model="projectInfo.projectDescription" maxlength="500"></textarea>
				<p class="limit-words">{{procont}}/500</p>
			</li>
			<li class="time-wrap">
				<span class="table-wrap-left">* 参与时间</span>
				<datepicker class="datePicker" v-model="projectInfo.partakeTimeUp"></datepicker>
				<span class="heng"></span>
				<datepicker class="datePicker" v-model="projectInfo.partakeTimeDown"></datepicker>
				<alertTip v-if="showAlert.parTakeTime" :showHide="showAlert.parTakeTime" @closeTip="closeTip" :alertText="alertText.parTakeTime"></alertTip>
			</li>
			<li class="duty-wrap">
				<span class="table-wrap-left">* 公司职责</span>
				<input type="text" placeholder="请输入公司在项目中所属职位" maxlength="30"  v-model="projectInfo.takeOffice"/>
				<p class="limit-words">{{dutycont}}/30</p>
				<alertTip v-if="showAlert.takeOffice" :showHide="showAlert.takeOffice" @closeTip="closeTip" :alertText="alertText.takeOffice"></alertTip>
			</li>
			<li class="detail-wrap">
				<span class="table-wrap-left">详细描述</span>
				<textarea  maxlength="500" placeholder="请输入职责详细描述文案..." v-model="projectInfo.detailDes"></textarea>
				<p class="limit-words">{{detailcont}}/500</p>
				
			</li>
			<li class="img-wrap">
				<span class="table-wrap-left">图片展示</span>
				<script type="text/template" id="qq-template-manual-trigger">
			        <div class="qq-uploader-selector qq-uploader" qq-drop-area-text="Drop files here">
			            <!-- <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
			                <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
			            </div> -->
			            <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
			                <span class="qq-upload-drop-area-text-selector"></span>
			            </div>
			            <ul class="qq-upload-list-selector qq-upload-list" aria-live="polite" aria-relevant="additions removals">
			                <li>
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
			                <button type="button"  class="btn btn-primary"  id="trigger-upload">
			                    	提交上传
			                </button>
			            </div>
			            <span class="qq-drop-processing-selector qq-drop-processing">
			                <span>Processing dropped files...</span>
			                <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
			            </span>
			            <dialog class="qq-alert-dialog-selector">
			                <div class="qq-dialog-message-selector"></div>
			                <div class="qq-dialog-buttons">
			                    <button type="button" class="qq-cancel-button-selector">Close</button>
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
		<!--<router-link to="/yhzx/company/info/companyProject/index">-->
			<span class="saveBtn" @click="addProject">保存</span>
		<!--</router-link>-->
		<span class="cancelBtn" @click="cancelEdit">取消</span>
	</div>

</form>

</template>
 
<script>
//	import Modal from "../../../assets/js/modal.js"
//	import limitTextCount from "../../../assets/js/limitTextCount.js"
	
	import Vue from "vue"
	import {mapState} from "vuex"
	import router from "../../../router"
	import ProvincesCity from "../units/province-city-county.vue"
	import Datepicker from "../units/Datepicker.vue"
	import alertTip from "../units/alertTip.vue"
	import qq from "fine-uploader"
    import MyAjax from "../../../assets/js/MyAjax.js"
	
	export default {
	    name:"editProject",
	    components:{
	      ProvincesCity,
	      Datepicker,
	      alertTip
	    },
	    data:function(){
	      return {
	        title:"自定义添加项目并编辑项目经历",
	        state:"",
	        time:{value:"2018-7"},
	        editSeniorShow:false,
	        showAlert:{name:false,completeTime:false,parTakeTime:false,takeOffice:false},//提示框显隐
	        alertText:{name:null,completeTime:null,parTakeTime:null,takeOffice:null},
	        dutycont:0,//职责字数
	        detailcont:0,//职责详细描述字数
	        procont:0,//项目描述字数
       		addNewProject:{projectState:["建成","在建","未建"],projectType:["绿地","公园","住宅","写字楼","交通枢纽","文化场馆","体育场馆","展示中心"]},//项目状态和建筑功能
        	addProjectType:{value:"",type:false},//建筑功能的扩展
            projectStateColor:[],//项目状态的选中(单选)
            projectTypeColor:[],//建筑功能的选中(多选)
	        complated:false,//项目状态在建或者是建成的标志，控制建成时间的可操作性
	        projectInfo:{//新增的项目信息采集
	        	projectName:"",//同步到项目主页的信息 (必填*)
				projectPlaceObj:{},//项目地址
				projectState:"",//项目状态projectState
				completeTime:"",//同步到项目主页的信息 (必填*)
				architectFunctions:[],//建筑功能种类projectType
				projectDescription:"",////项目详细描述文案
				partakeTimeUp:"",// (必填*)
				partakeTimeDown:"",// (必填*)
				takeOffice:"",//公司职责(必填*)
				detailDes:"",//职责详细描述
				"ifVisable": 1,
				picId:[],//上传图片返回的ID
	        }
	      }
	    },
	    mounted(){
			//载入页面的时候就把项目地址的onchange事件调用一次  完成赋值
	    	this.projectInfo.projectPlaceObj = {
				city:"北京市",
				county:"东城区",
				province:"北京市",
				street:"",
	    	}
			var that=this;
	    	$(document.body).css("overflow","scroll");
	    	for(var i=0;i<this.addNewProject.projectState.length;i++){
	    		this.projectStateColor.push(false)
	    	};
	    	for(var i=0;i<this.addNewProject.projectType.length;i++){
	    		this.projectTypeColor.push(false)
	    	}
			
			//上传图片
			var manualUploader = new qq.FineUploader({
	            element: document.getElementById('fine-uploader-manual-trigger'),
	            template: 'qq-template-manual-trigger',
	            request: {
	                endpoint:MyAjax.urlsy+'/psnProjExpe/batchUpload'
				},
				multiple: true,
	            thumbnails: {
	                placeholders: {
//	                    waitingPath: '/source/placeholders/waiting-generic.png',
//	                    notAvailablePath: '/source/placeholders/not_available-generic.png'
	                }
	            },
	            validation: {
					allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
					sizeLimit: 1024* 1024* 1024 * 1024 * 1024 
	            },
				autoUpload: false,
				chunking: {
					enabled: true
				},
				resume: {
					enabled: true
				},
	            debug: true,
	            callbacks:{
		        	onSubmit:  function(id,  fileName)  {
		        		$('#trigger-upload').show()
					},
					onProgress:function(id,fileName,loaded,total){
						//console.log(loaded)
					},
		        	onComplete: function (id, fileName, responseJSON, maybeXhr) {
		                //alert('This is onComplete function.');
										//alert("complete name:"+responseJSON);//responseJSON就是controller传来的return Json
		                //$('#message').append(responseJSON.msg);
	//	                $('#progress').hide();//隐藏进度动画
		                //清除已上传队列
		                //$('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-fail').show();
		                //$('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-success').hide();
		                //$('#manual-fine-uploader').fineUploader('reset');//（这个倒是清除了，但是返回的信息$('#message')里只能保留一条。）   
	//	                $('.stateOne').hide();
	//	                $('.stateTwo').show()
		                
						$('#trigger-upload').hide()
						that.projectInfo.picId.push(responseJSON.msg)
						//console.log(that.projectInfo.picId)
		          	},
	        	}
	        });
			qq(document.getElementById("trigger-upload")).attach("click", function() {
				// fielduploader.setParams({             //fielduploader对象--携带---form表单的参数  
				// 	anotherParam: '123321',  
				// 	abcdef:$("#。。。").val()  
				// });  
				manualUploader.uploadStoredFiles();
	        });
		},
		methods: {
		    changeProjectAds(val){//通过事件同步子组件信息
		        this.projectInfo.projectPlaceObj=val;
		        console.log(this.projectInfo.projectPlaceObj)
		    },
		    changeProjectStateColor(index){//添加模式下，标记项目状态选中
			    for(var i=0 ; i<this.addNewProject.projectState.length ; i++){
			      if(i==index){
			        Vue.set(this.projectStateColor,[index],true);
			        this.projectInfo.projectState=this.addNewProject.projectState[index];//更改项目状态名
			      }else{
			        Vue.set(this.projectStateColor,[i],false);
			        
			      }
			    }
			  },
			changeProjectTypeColor(index){//添加模式下，标记建筑功能选中
			    for(var i=0 ; i<this.addNewProject.projectType.length ; i++){//遍历当前所有建筑功能，如果匹配进行设置
			      if(i==index){
			      	if(this.projectTypeColor[index]==false){
			      		Vue.set(this.projectTypeColor,[index],true);
			      		this.projectInfo.architectFunctions.push(this.addNewProject.projectType[index]);//更改项目功能名
			      		this.projectInfo.architectFunctions.push.apply(this.projectInfo.architectFunctions,[])//去重
	
			      	}else{
			      		console.log(333)
			      		Vue.set(this.projectTypeColor,[index],false);
			      		Array.prototype.remove = function(val) {
							var index = this.indexOf(val);
							if (index > -1) {
								this.splice(index, 1);
							}
						};
						this.projectInfo.architectFunctions.remove(this.addNewProject.projectType[index])
			      		
			      	}
			        
			      }else{
//			        Vue.set(this.projectTypeColor,[i],false);
			      }
			      
			    }
			},
			keepAddProjectTypeName(){//添加模式下，建筑功能的扩展的保存
		        Vue.set(this.addProjectType,"type",false);
		        if(this.addProjectType.value.trim()!=''){
		          this.addNewProject.projectType.push(this.addProjectType.value)//添加到建筑功能列表里
		          this.projectInfo.architectFunctions.push(this.addProjectType.value);//更改项目建筑功能名
			      this.projectInfo.architectFunctions.push.apply(this.projectInfo.architectFunctions,[])//去重
		          Vue.set(this.addProjectType,"value","");//清空input框的内容
		          this.projectTypeColor.push(true);//使得新添加的建筑功能被选中
		          
		        }
		
		      },
			addProject(){
				qq(document.getElementById("trigger-upload")).attach("click", function() {
		            manualUploader.uploadStoredFiles();
		        });
				//判断几个必填项是否为空
				
				if(this.projectInfo.projectName.trim().length==0){
					this.showAlert.name = true;
					this.alertText.name = "项目名称为必填项"
				}else{
					this.showAlert.name = false;
				};//判断项目名称不能为空
				
				if(this.projectInfo.completeTime.trim().length==0&&this.complated==false){
					this.showAlert.completeTime = true;
					this.alertText.completeTime = "项目建成时间为必填项"
				}else{
					this.showAlert.completeTime = false;
				};//判断建成时间不能为空
				
				if(this.projectInfo.partakeTimeUp.trim().length==0||this.projectInfo.partakeTimeDown.trim().length==0){
					this.showAlert.parTakeTime = true;
					this.alertText.parTakeTime = "项目参与时间为必填项"
				}else{
					this.showAlert.parTakeTime = false;
				};//判断完成时间不能为空
				
				if(this.projectInfo.takeOffice.trim().length==0){
					this.showAlert.takeOffice = true;
					this.alertText.takeOffice = "项目职责为必填项"
				}else{
					this.showAlert.takeOffice = false;
				};//判断项目职责不能为空
				if(this.complated=false){//判断是否为在建，在建的话建成时间为必填
					if(this.projectInfo.projectName.trim().length!=0&&this.projectInfo.completeTime.trim().length!=0&&this.projectInfo.partakeTimeUp.trim().length!=0
					&&this.projectInfo.partakeTimeDown.trim().length!=0&&this.projectInfo.takeOffice.trim().length!=0&&this.projectInfo.projectPlaceObj.street.trim().length!=0){
						var that = this;
					    console.log(JSON.stringify(that.projectInfo))
					    var url = MyAjax.urlsy+"/psnProjExpe/insertProjAndProjExpe";
					    $.ajaxSetup({ contentType : 'application/json' });
					    MyAjax.ajax({
							type: "POST",
							url:url,
							data:JSON.stringify(that.projectInfo),
							dataType: "json",
							
						},function(data){
							console.log(data)
							if(data.code == 0){
								router.push("/yhzx/personal/info/personalProject/index")
							}
							
						},function(err){
							console.log(err)
						})
						
					}
				}else{
					if(this.projectInfo.projectName.trim().length!=0&&this.projectInfo.partakeTimeUp.trim().length!=0
					&&this.projectInfo.partakeTimeDown.trim().length!=0&&this.projectInfo.takeOffice.trim().length!=0&&this.projectInfo.projectPlaceObj.street.trim().length!=0){
						var that = this;
					    console.log(JSON.stringify(that.projectInfo))
					    var url = MyAjax.urlsy+"/psnProjExpe/insertProjAndProjExpe";
					    $.ajaxSetup({ contentType : 'application/json' });
					    MyAjax.ajax({
							type: "POST",
							url:url,
							data:JSON.stringify(that.projectInfo),
							dataType: "json",
							
						},function(data){
							console.log(data)
							if(data.code == 0){
								router.push("/yhzx/personal/info/personalProject/index")
							}
							
						},function(err){
							console.log(err)
						})
						
					}
				}
				console.log(this.projectInfo.picId)
			},
			closeTip(){  /*关闭提示框*/
                this.showAlert.name= false;
                this.showAlert.compalteTime= false;
                this.showAlert.parTakeTime= false;
                this.showAlert.takeOffice= false;
            },
            cancelEdit(){
				router.push("/yhzx/personal/info/personalProject/index")
			}
	    },
	    updated(){
	    	
	    	var num1 = this.projectInfo.takeOffice.length;//公司职责
	    	this.dutycont = num1;//公司职责限制字数
	    	var num2 = this.projectInfo.detailDes.length;//职责详细描述
	    	this.detailcont = num2;
	    	var num3 = this.projectInfo.projectDescription.length;//项目描述
	    	this.procont = num3;
            if(this.projectInfo.projectState=="在建"||this.projectInfo.projectState=="未建"){
            	this.complated = true;//true表示在建状态  建成时间不可选
            }else{
            	this.complated = false;
            }
	    }
   }
</script>

<style lang="scss" scoped="">
$bfColor:#ffffff;
$activeColor: rgb(242,117,25);
#fine-uploader-manual-trigger{
	width: 710px;
	float: right;
}
.editProject{
	width:940px; 
	padding: 40px;
	overflow: hidden;
	background: #FFFFFF;
	border-radius: 5px;
	/*#time{
		width: 140px;
		float: left;
	}*/
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
			border: 1px solid #E0E0E0;

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
		}
	}
	
	
	.modifyTable{
		padding: 20px;
		.notice{
			color: rgb(171,171,171);
		}
		.modify-table-wrap{
			
			
			li{
				&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
				
				.table-wrap-left{
					color: $activeColor;
					margin-right: 30px;
					float: left;
					width: 80px;
					text-align: right;
				}
				&.name-wrap{	
					height: 35px;
					line-height: 35px;
					input{
						width: 480px;
						height: 35px;
						border: 1px solid #EBEBEB;
						border-radius: 5px;
						text-indent: 8px;
						float: left;
					}
				}
				&.place-wrap{
					width: 880px;
					color: $activeColor;
					.table-wrap-left{
						height: 35px;
						line-height: 35px;
					}
					.provincesCity{
						float: left;
						input{
							
						}
					}
					select{
						width: 120px;
						height: 35px;
						border: 1px solid #EBEBEB;
						border-radius: 5px;
						text-indent: 8px;
						margin-right: 12px;
						display: inline-block;
						color: rgb(53,53,53);
					}
					.provincesCity{
						position: relative;
						.alet_container{
							position: absolute !important;
							right: -20px;
						}
					}
					
					
				}
				&.status-wrap{
					label{
						height: 20px;
						line-height: 20px;
						margin-right: 30px;
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
						
					}
					.projectStateColor{
				        em{
				          background: $activeColor;
				        }
				    }
					
				}
				&.func-wrap{
					overflow: hidden;
					.table-wrap-left{
						float: left;
					}
					.func-box{
						width: 480px;
						float: left;
						
						label{
							height: 20px;
							line-height: 20px;
							float: left;
							margin-bottom: 20px;
							cursor: pointer;
							color: rgb(191,191,191);
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
					          padding:0 30px 0 15px;
					        }
					        
							&:last-child{
								width: 200px;
								input[type=text]{
									width: 150px;
									height:30px;
									padding-bottom:5px;
									background: none;
									border-bottom: 1px solid rgb(191,191,191);
									color: #353535;
									margin-left: 15px;
								}
							}
						}
						.projectTypeColor{
					        em{
					          background: $activeColor;
					        }
					    }	
					}
				}
				margin-top: 20px;
				&.time-wrap{
					height: 35px;
					line-height: 35px;
					position: relative;
					.datePicker{
						height: 35px;
						float: left;
						width: 140px;
						margin-right: 20px;
					}
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
					.timeGray{
						position: absolute;
						left: 0px;
						top: 0;
						background: #FFFFFF;
						color: #e0e0e0;
						.table-wrap-left{
							color:#BFBFBF;
						}
						.picker{
							float: left;
							width: 140px;
							height: 35px;
							border-radius: 5px;
							border: 1px solid #E0E0E0;
						}
					}
				}
				&.duty-wrap{
					color: rgb(167,167,167);
					position: relative;
					.table-wrap-left{
						height: 35px;
						line-height: 35px;
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
					.alet_container{
						margin-left: 70px !important;
					}
				}
				&.detail-wrap,&.describe-wrap{
					color: rgb(167,167,167);
					position: relative;
					overflow: hidden;
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
						text-indent: 8px;
						border-radius: 5px;
						color: #353535;
						padding: 5px 0;
						text-align: justify;
					}
					.limit-words{
						position: absolute;
						bottom: 0px;
						left:600px ;
					}
				}
				&.img-wrap{
					/*height: 100px;
					line-height: 100px;*/
					overflow: hidden;
					.table-wrap-left{
						float: left;
						margin-top: 40px;
					}
					.img-show{
						float: left;
						width: 685px;
						margin-left: 10px;
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