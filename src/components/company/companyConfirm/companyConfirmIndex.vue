<template>
  <div class="companyConfirmIndex">
    <h3 class="c-title"><span>{{title}}</span></h3>
    <div class="notice">上传真实有效的公司证照文件或资质文件，并获得管理员审核通过，即可成为认证公司；文件加盖公章的，可升级为高级认证公司，请确保公司名称与上传文件内容相符，以免影响审核结果。</div>
    <ul class="ci-list">
    	<li class="cfrmTable">
    		<h3 class="c-title"><span>证照文件</span></h3>
    		<ul class="z-state">
    			<li class="stateOne" v-if="info.paperCounts==0">（暂无审核通过的证照文件）</li> <!--没有图片的时候-->
    			<li class="stateTwo">
    				<p v-if="info.paperAuditState==0">您的证照文件已上传至后台，请等待管理员审核！</p> <!--已经有审核通过 还有正在等待审核的-->
    				<p v-if="info.paperCounts!=0">您可点击“添加”继续上传，不会影响您已经上传的证照文件</p><!--已经有审核通过 还有正在等待审核的-->
    			</li>
    			<li class="stateThree" v-if="info.paperPics.length!==0">
    				<span v-for="(item,index) in info.paperPics">
    					<img :src="item.pic"/>
    					<em @click="deletePaper(item.id)"></em>
    				</span>
    			</li>
    			
    		</ul>
    		<script type="text/template" id="qq-template-manual-trigger-license">
				    <div class="qq-uploader-selector qq-uploader" qq-drop-area-text="Drop files here">
				        <!--<div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
				            <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
				        </div>-->
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
				                <button type="button" class="qq-btn qq-upload-retry-selector qq-upload-retry">重试</button>
				                <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">Delete</button>
				                <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
				            </li>
				        </ul>
				        <div class="buttons" id="confirm-com">
				            <div class="qq-upload-button-selector" >
				                <div style="float: left;" class="addBtn">添加文件</div>
				            </div>
				             <span class="limitTxt" style="float: left;">支持JPG、PNG、大小不能超过2M</span>
				            <button type="button" id="trigger-upload" class="btn btn-primary btn-primary-license">
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
				<div id="fine-uploader-manual-trigger-license"></div>
				 <div id="message"></div>
    		
    	</li>
    	<li class="cfrmTable">
    		<h3 class="c-title"><span>资质文件</span></h3>
    		<ul class="z-state">
    			<li class="stateOne" v-if="info.quaCounts==0">（暂无审核通过的证照文件）</li>
    			<li class="stateTwo">
    				<p v-if="info.quaAuditState==0">您的证照文件已上传至后台，请等待管理员审核！</p>
    				<p v-if="info.quaCounts!=0">您可点击“添加”继续上传，不会影响您已经上传的证照文件</p>
    			</li>
    			<li class="stateThree"  v-if="info.quaPics.length!==0">
    				<span v-for="(item,index) in info.quaPics">
    					<img :src="item.pic"/>
    					<em @click="deletePaper(item.id)"></em>
    				</span>
    			</li>
    		</ul>
    		<script type="text/template" id="qq-template-manual-trigger-aptitude">
				    <div class="qq-uploader-selector qq-uploader" qq-drop-area-text="Drop files here">
				        <!--<div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
				            <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
				        </div>-->
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
				                <button type="button" class="qq-btn qq-upload-retry-selector qq-upload-retry">重试</button>
				                <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">Delete</button>
				                <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
				            </li>
				        </ul>
				        <div class="buttons" id="confirm-com">
				            <div class="qq-upload-button-selector" >
				                <div style="float: left;" class="addBtn">添加文件</div>
				            </div>
				             <span class="limitTxt" style="float: left;">支持JPG、PNG、大小不能超过2M</span>
				            <button type="button" id="trigger-upload2" class="btn btn-primary btn-primary-aptitude">
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
				<div id="fine-uploader-manual-trigger-aptitude"></div>
				
    		<!--<div class="addProfile">
    			<span class="addBtn" @click="overlay">添加文件</span>
    			<span>支持JPG、PNG、大小不能超过2M</span>
    		</div>-->
    	</li>
    </ul>
    <!--模态框模态框模态框模态框模态框模态框模态框-->
		<div id="modal-overlay" class="modal-a"> 
			<div class="previewZz">
				<h5>预览资质文件</h5>
				<ul class="picBox">
					<li class="">
						<img src="../../../assets/img/company/certificate02.png"/>
						<span class="delImg"></span>
					</li>
					 
				</ul>
				<div class="modalBtn">
					<span class="submitBtn">提交</span>
					<span class="resubmitBtn">重新选择</span>
				</div>
				<span class="modalChaBtn" @click="closeModal"></span>
			</div>
		</div>
    <!--模态框模态框模态框模态框模态框模态框模态框-->
		
  </div>
</template>

<script>
  import Modal from "../../../assets/js/modal.js"
  import {singleManualUploader,moreManualUploader} from "../../../assets/js/manualUploader.js"
  import MyAjax from "../../../assets/js/MyAjax.js"
	import qq from "fine-uploader"
	import Vue from "vue"
  export default {
    name:"companyConfirmIndex",
    data:function(){
      return {
        title:"公司认证信息",
        info:{},
	    	stateOne:{
	    		zh:true,
	    		zz:true,
	    	},
	    	stateTwo:{
	    		zh:false,
	    		zz:false,
	    	},
	    	stateThree:{
	    		zh:false,
	    		zz:false,
	    	},
        license:{
        	 picId:[],
        },
        aptitude:{
        	 picId:[],
        }
      }
    },
    created(){
    	this.getData()
    },
    mounted(){
    	var that = this;
	    singleManualUploader({
	      element:"fine-uploader-manual-trigger-license",
	      template: "qq-template-manual-trigger-license",
	      url:MyAjax.urlsy+'/companyInfo/uploadPaperPic',
	      picIdCont:that.license.picId,
	      btnPrimary:".btn-primary-license",
	      canUploadNum:100,
	      anotherParam: sessionStorage.getItem("email"),
	      functionName:that.getData
	    })
	    
	    singleManualUploader({
	      element:"fine-uploader-manual-trigger-aptitude",
	      template: "qq-template-manual-trigger-aptitude",
	      url:MyAjax.urlsy+'/companyInfo/uploadQuaPic',
	      picIdCont:that.aptitude.picId,
	      btnPrimary:".btn-primary-aptitude",
	      canUploadNum:100,
	      anotherParam: sessionStorage.getItem("email"),
	      functionName:that.getData
	    })
	    
//	    console.log(that.getData)
//  	
//			if(that.stateTwo.zz == false){
//				$(".qq-upload-success").css("display","none")
//			}
    },
    updated(){
//  	console.log(this.stateTwo)
    },
    methods:{
    	getData(){
    		var that=this;
        var url = MyAjax.urlsy+"/companyInfo/findCerInfos";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
        	Vue.set(that,"info",data.msg)
        },function(err){
          if(err.status!=200){
            //router.push("/index")
            status=err.status;
          }
        })
    	},
    	deletePaper(id){
    		var that=this;
        var url = MyAjax.urlsy +"/companyInfo/delCerPic/"+ id;
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
        	if(data.code==0){
        		that.getData()
        	}
        },function(err){
          if(err.status!=200){
            status=err.status;
          }
        })
    	},
    	
    	overlay(){
    		var modal = $('.modal-a')
				Modal.makeText(modal)
			},
			closeModal(){
				var modal = $('.modal-a')
				Modal.closeModal(modal)
			}
    }
    
  }
</script>

<style lang="scss" scoped="">
$bfColor:#f7f9fc;
$activeColor: #2eb3cf;
 #trigger-upload {
    color: white;
    background-color: #00ABC7;
    font-size: 14px;
    padding: 7px 20px;
    background-image: none;
}

#fine-uploader-manual-trigger .qq-upload-button {
    margin-right: 15px;
}

#fine-uploader-manual-trigger .buttons {
    width: 36%;
}

#fine-uploader-manual-trigger .qq-uploader .qq-total-progress-bar-container {
    width: 60%;
}
.companyConfirmIndex{
	width: 940px; padding: 40px;
	 .notice{
		 	height: 40px;
		 	margin-top: 15px;
		 	margin-bottom: 40px;
	 	  
	 }
	 .ci-list{
		 	.cfrmTable{
		 		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
		 		margin-bottom: 50px;
			 	.z-state{
			 		padding-top: 30px;
			 		padding-bottom: 30px;
			 		overflow: hidden;
			 		.stateOne{
			 			color: #999999;
			 		}
			 		.stateThree{
			 			margin: 20px;
			 			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			 			span{
			 				float: left;
				 			margin-right: 20px;
				 			margin-bottom: 20px;
				 			position: relative;
				 			&:hover{
				 				em{
				 					display: block;
				 				}
				 			}
			 				img{
				 				width: 160px;
				 				height: 160px;
				 				
				 			}
				 			em{
				 				position: absolute;
				 				right: 10px; top: 10px;
				 				display: none; cursor: pointer;
				 				width: 15px; height: 15px;
				 				background: url(../../../assets/img/company/Close.png) no-repeat;
				 			}
			 			}
			 			
			 		}
			 	}
		 	.addProfile{
		 		height: 15px;
		 		line-height: 15px;
		 		color: #9d9d9d;
		 		.addBtn{
		 			background: url(../../../assets/img/company/edit.png) no-repeat left center;
		 			height: 15x; line-height: 15px;
		 			float: left;
		 			text-align: left;
		 			padding-left: 27px;
		 			color: $activeColor;
		 			margin-right: 14px;
		 			cursor: pointer;

		 		}
		 	}
		}
	 }
	.previewZz{
     padding: 30px 40px;
     width: 780px;
     /*height: 541px;*/
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
	     height: 18px;
	     line-height: 18px;
	     text-align: left;
		 }
		 .picBox{
		 		margin-top: 40px;
		 		margin-bottom: 70px;
		 		width: 700px;
		 		overflow: hidden;
		 		li{
		 			width: 160px;
		 			height: 160px;
		 			float: left;
		 			margin-right: 20px;
		 			margin-bottom: 20px;
		 			position: relative;
		 			.delImg{
		 				width: 15px;
		 				height: 15px;
		 				background: url(../../../assets/img/company/Close.png) no-repeat center;
		 				position: absolute;
		 				top: 10px;
		 				right: 10px;
		 				
		 			}
		 			&:nth-of-child(4n){
		 				margin-right: 0;
		 			}
		 		}
		 }
		 .modalBtn{
	     width: 264px;
	     height: 33px;
	     /*margin-bottom: 10px;*/
	     
	    position: absolute;
	    bottom: 40px;
	    left: 258px;
	     span{
	         width: 117px;
	         height: 33px;
	         line-height: 33px;
	         display: block;
	         float: left;
	         border-radius: 5px;
	         text-align: center;
	         cursor: pointer;
	         &.submitBtn{
	             background: url(../../../assets/img/company/rectangle05.png) no-repeat center;
	             margin-right: 30px;
	             color: #FFFFFF;
	             &:hover{
	                filter:alpha(opacity=80);       /* IE */
	                -moz-opacity:0.8;              /* 老版Mozilla */
	                -khtml-opacity:0.8;              /* 老版Safari */
	                opacity: 0.8;           /* 支持opacity的浏览器*/
	            }
	         }
	         &.resubmitBtn{
	             border: 1px solid #bfcbd9;
	
	            &:hover{
	                border: 1px solid $activeColor;
	                color: $activeColor;
	            }
	         }
	     }
	 		}
		 .modalChaBtn{
	     width: 20px;
	     height: 20px;
	     background: url(../../../assets/img/company/Close3.png) no-repeat center;
	     position: absolute;
	     top: 30px;
	     right: 40px;
	     cursor: pointer;
     }
             
	} 
}
</style>
