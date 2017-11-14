<template>
  <div class="certificate">

    <div class="title">
      <h2 v-cloak>{{title.text}}</h2>
      <p v-on:click="addInfo">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="certificateContainer" v-show="reveal.addCertificate">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加执业资格信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="certificateInfo" v-for="(item,index) in this.certificate">
        <!--显示信息列表开始-->
        <div class="certificateInfoList" v-show="!reveal.editInfo[index]">
          <div class="certificateInfoTitle">
            <h4 v-cloak>{{localCertificate.certificateName[index]}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">
                <p>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="certificateInfoEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="certificateInfoDel(index)">
                <p>删除</p>
              </li>
            </ul>
          </div>
          <div class="certificateInfoBody">
            <p v-cloak>{{localCertificate.info.profession[index]}}</p>
            <p v-cloak>证书编号：{{localCertificate.info.introduce[index]}}</p>
          </div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="certificateInfoEdit" v-show="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li>
              <label>
                <h5>*&nbsp;资格名称</h5>
                <input v-model="localCertificate.certificateName[index]" type="text" placeholder="请输入资格名称">
              </label>
            </li>
            <li>
              <label>
                <h5>注册单位</h5>
                <input v-model="localCertificate.info.profession[index]" type="text" placeholder="请输入注册单位">
              </label>
            </li>
            <li>
              <label>
                <h5>证件编号</h5>
                <input v-model="localCertificate.info.introduce[index]" type="text" placeholder="请输入证件编号">
              </label>
            </li>
            <li class="img-wrap" >
							<span class="wrap-left">图片展示</span>

							<script type="text/template" id="qq-template-manual-trigger">
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
						     <div :id="fineUploaderId[index]"></div>
						</li>
						<li class="tip-wrap">
              <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
            </li>
            <li>
              <button v-on:click="keepCertificateInfoEdit(index)">保存</button>
              <button v-on:click="cancelCertificateInfoEdit(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->
    <div class="addCertificateContainer" v-show="!reveal.addCertificate">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li>
          <label>
            <h5>*&nbsp;资格名称</h5>
            <input v-model="newCertificate.certificateName" type="text" placeholder="请输入资格名称">
          </label>
        </li>
        <li>
          <label>
            <h5>注册单位</h5>
            <input v-model="newCertificate.info.profession" type="text" placeholder="请输入注册单位">
          </label>
        </li>
        <li>
          <label>
            <h5>证件编号</h5>
            <input v-model="newCertificate.info.introduce" type="text" placeholder="请输入证件编号">
          </label>
        </li>
        <li class="img-wrap">
					<span class="wrap-left">图片展示</span>
					<script type="text/template" id="qq-template-manual-trigger">
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
				<li class="tip-wrap">
          <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
        </li>
        <li>
          <button v-bind:class="{keepAdd:reveal.keepAdd}" v-on:click="keepCertificateInfoAdd">保存</button>
          <button v-on:click="cancelCertificateInfoAdd">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import qq from "fine-uploader"
  
  export default {
    name:"certificateIndex",
    data(){
      return {
        title:{text:"执业资格"},
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[false,true,false,true,],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示文本信息,通过服务器获取的数据
          editInfo:[],//是否编辑信息
          addCertificate:true,//是否添加信息
          keepAdd:true,//添加模式下，保存按钮是否可用
        },
        localCertificate:{
          certificateName:[],
          info:{
            profession:[],
            introduce:[]
          }
        },
        newCertificate:{
          certificateName:[],
          info:{
            profession:[],
            introduce:[]
          }
        },
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
        
      }
    },
    created(){
    	for(var i=0;i<this.certificate.length;i++){
    		this.fineUploaderId.push("fine-uploader-manual-trigger"+this.certificate[i].id);
    		this.qqTemplate.push("qq-template-manual-trigger"+this.certificate[i].id);
    	}
    		//console.log(this.fineUploaderClass)
    },
    mounted(){
    	//上传图片
			var manualUploader = new qq.FineUploader({
	        element: document.getElementById('fine-uploader-manual-trigger'),
	        template: 'qq-template-manual-trigger',
	        request: {
	            endpoint: '/server/uploads'
	        },
	        thumbnails: {
	//	                placeholders: {
	//	                    waitingPath: '../../../assets/js/units/fine-uploader/placeholders/waiting-generic.png',
	//	                    notAvailablePath: '../../../assets/js/units/fine-uploader/placeholders/not_available-generic.png'
	//	                }
	        },
	        validation: {
	            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
	            itemLimit: 5,
	            sizeLimit: 1500000
	        },
	        autoUpload: false,
	        debug: true,
	        callbacks:{
	        	onSubmit:  function(id,  fileName)  {
	        		$('#trigger-upload').show()
	        	},
	        	onComplete: function (id, fileName, responseJSON, maybeXhr) {
	                //alert('This is onComplete function.');
									//alert("complete name:"+responseJSON);//responseJSON就是controller传来的return Json
	                console.log(responseJSON)
	                $('#message').append(responseJSON.msg);
	//	                $('#progress').hide();//隐藏进度动画
	                //清除已上传队列
//	                $('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-fail').show();
	                //$('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-success').hide();
	                //$('#manual-fine-uploader').fineUploader('reset');//（这个倒是清除了，但是返回的信息$('#message')里只能保留一条。）   
	//	                $('.stateOne').hide();
	//	                $('.stateTwo').show()
	                
	                $('#trigger-upload').hide()
	                console.log(maybeXhr)
	          	},
	    	}
	    });
			qq(document.getElementById("trigger-upload")).attach("click", function() {
	        manualUploader.uploadStoredFiles();
	    });
	    
      if(this.certificate.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
        for(let i=0;i<this.certificate.length;i++){
          /*数据同步本地一份开始*/
          this.localCertificate.certificateName[i]=this.certificate[i].certificateName;
          this.localCertificate.info.profession[i]=this.certificate[i].info.profession;
          this.localCertificate.info.introduce[i]=this.certificate[i].info.introduce;
          /*数据同步本地一份结束*/
          this.reveal.editInfo.push(false);//信息是否可以编辑赋初始值
        }
      }
      /*以上是初始化*/
      if(this.reveal.openOrPrivacy.length!=0){
        for(let i=0;i<this.reveal.openOrPrivacy.length;i++){
          if(!this.reveal.openOrPrivacy[i]){
            Vue.set(this.reveal.openOrPrivacyText,[i],"显示")
            //this.reveal.openOrPrivacyText.push("显示")
          }else{
            Vue.set(this.reveal.openOrPrivacyText,[i],"隐藏")
            //this.reveal.openOrPrivacyText.push("隐藏")
          }
        }
      }
      /*以上是是否对外显示文本信息初始化*/
    },
    updated(){
      if(this.certificate.length==0){
        Vue.set(this.reveal,"empty",true)
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newCertificate.certificateName.length!=0){
        if(this.newCertificate.certificateName.trim().length!=0){
          Vue.set(this.reveal,"keepAdd",false);
          Vue.set(this.newCertificate,"certificateName",this.newCertificate.certificateName.trim())//进行空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAdd",true);
      }
      /*控制保存按钮的背景颜色*/
    },
    computed:mapState({
      certificate:state=>state.personal.personalMessage.certificate,
    }),
    methods:{
      openOrPrivacy(index){//信息是否对外公开控制按钮
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);
        if(!this.reveal.openOrPrivacy[index]){//显示文本的控制
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }else{
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }
      },
      certificateInfoEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
        var that = this;

        //上传图片
        
          if(that.qqFineloader.length==0){
            for(var i=0;i<that.certificate.length;i++){
//							if(index==i){
								var manualUploader= new qq.FineUploader({
			            element: document.getElementById(that.fineUploaderId[i]),
			            template: "qq-template-manual-trigger",
			            request: {
			              endpoint: '/server/uploads'
			            },
			            thumbnails: {
			              //	                placeholders: {
			              //	                    waitingPath: '../../../assets/js/units/fine-uploader/placeholders/waiting-generic.png',
			              //	                    notAvailablePath: '../../../assets/js/units/fine-uploader/placeholders/not_available-generic.png'
			              //	                }
			            },
			            validation: {
			              allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
			              itemLimit: 5,
			              sizeLimit: 2000000
			            },
			            autoUpload: false,
			            debug: true,
			            callbacks:{
			              onSubmit:  function(id,fileName){
//			              	if(index == i){
			              		console.log(index)
			              		$('.btn-primary').show()
//			              	}
			                
			              },
			              onComplete: function (id, fileName, responseJSON, maybeXhr) {
			                //alert('This is onComplete function.');
			                //alert("complete name:"+responseJSON);//responseJSON就是controller传来的return Json
			//                  $('#message').append(responseJSON.msg);
			//                    	                $('#progress').hide();//隐藏进度动画
			                //清除已上传队列
			//		                $('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-fail').show();
			                //$('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-success').hide();
			                //$('#manual-fine-uploader').fineUploader('reset');//（这个倒是清除了，但是返回的信息$('#message')里只能保留一条。）
			                //	                $('.stateOne').hide();
			                //	                $('.stateTwo').show()
			
			                ///console.log($('.btn-primary'))
			                if(index == i){
			              		$('.btn-primary').eq(index).hide()
			              	}
			                
			              },
			            }
			          });
			          that.qqFineloader.push(manualUploader)
//							}
               
            }
          }
          var btnPrimary=document.getElementsByClassName("btn-primary");
          console.log("aa"+index)
          qq(btnPrimary[index]).attach("click", function() {
            that.qqFineloader[index].uploadStoredFiles();
            $('.btn-primary').eq(index).hide()
          });
          console.log(that.qqFineloader)
      },
      keepCertificateInfoEdit(index){//编辑状态，保存按钮
        if(this.localCertificate.certificateName[index].trim().length!=0){
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        }
      },
      cancelCertificateInfoEdit(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
      },
      certificateInfoDel(index){//编辑状态，删除按钮
        this.certificate.splice(index,1);
        this.localCertificate.certificateName.splice(index,1);
        this.localCertificate.info.introduce.splice(index,1);
        this.localCertificate.info.profession.splice(index,1);
        
      },
      addInfo(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addCertificate",false);
        Vue.set(this.reveal,"empty",false)
      },
      keepCertificateInfoAdd(){
        if(this.newCertificate.certificateName.length!=0){
          if(this.newCertificate.certificateName.trim().length!=0){
            this.localCertificate.certificateName.push(this.newCertificate.certificateName);
            this.localCertificate.info.profession.push(this.newCertificate.info.profession);
            this.localCertificate.info.introduce.push(this.newCertificate.info.introduce);
            /*同步信息到执业资格首页*/
            this.certificate.push({certificateName:this.newCertificate.certificateName,info:{profession:this.newCertificate.info.profession,introduce:this.newCertificate.info.introduce}})
            /*同步信息到个人信息首页*/
            Vue.set(this.reveal,"addCertificate",true);
            //视图切换到执业资格的首页
            Vue.set(this.newCertificate,"certificateName","");
            Vue.set(this.newCertificate.info,"profession","");
            Vue.set(this.newCertificate.info,"introduce","");
            /*清除数据，保证下次输入时输入框为空*/
            this.reveal.openOrPrivacy.push(false)//设置是否对外显示
            this.reveal.openOrPrivacyText.push("显示")//设置是否对外显示文本
          }
        }
      },
      cancelCertificateInfoAdd(){
        Vue.set(this.reveal,"addCertificate",true);
        //视图切换到执业资格的首页
        Vue.set(this.newCertificate,"certificateName","");
        Vue.set(this.newCertificate.info,"profession","");
        Vue.set(this.newCertificate.info,"introduce","");
        /*清除数据，保证下次输入时输入框为空*/
      }
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  .certificate {
    width: 940px;
    float: left;
    padding: 0 40px;
    background: $bfColor;
    min-height: 671px;

    .title{
      padding:35px 0 0 0;
      font-size: 18px;
      color: $activeColor;
      border-bottom: 1px solid $borderColor;
      h2{
        float: left;
        padding-bottom: 8px;
        border-bottom:2px solid $activeColor;
        margin-bottom:-1px;
      }
      P{
        cursor: pointer;
        float: right;
        font-size: 14px;
        padding-right:20px;
        padding-left:20px;
        background: url("../../../assets/img/personal/education/add.png") left center no-repeat;
      }
    }
    /*头部*/
    .personal-empty{
      width: 820px;
      padding: 35px 0 10px 0;
      font-size:16px;
      color: $emptyColor;
      text-align: center;
    }
    /*信息为空提示*/
    .certificateContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .certificateInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .certificateInfoList{
          .certificateInfoTitle{
            color: $themeColor;
            margin-top: 30px;
            margin-bottom:19px;
            h4{
              float: left;
            }
            ul{
              float: right;
              margin-top:2px;
              li{
                float: left;
                cursor: pointer;
                p{
                  padding:0 17px 0 12px;
                }
              }
              li:nth-child(1){
                p{
                  padding-left:32px;
                  background: url("../../../assets/img/personal/education/eye.png") left center no-repeat;
                }
              }
              li:nth-child(2){
                p{
                  padding-left:27px;
                  background: url("../../../assets/img/personal/education/edit.png") left center no-repeat;
                }
              }
              
              li:last-child{
                p{
                  padding-right:0;
                  padding-left:21px;
                  background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
                }
              }
              .openOrPrivacy{
                p{
                  background: url("../../../assets/img/personal/education/hidden.png") left center no-repeat!important;
                  color: #353535;
                }

              }
            }

          }
          .certificateInfoBody{
            p:nth-child(1){
              color: rgb(186,186,186);
              margin-bottom: 11px;
            }
            p:last-child{
              margin-bottom:17px;
            }
          }
        }
        /*信息列表结束*/
        /*编辑信息列表开始*/
        .certificateInfoEdit{
          ul{
            li{
              margin:20px 0;
              .wrap-left{
				      	/*width: 80px;*/
				      	line-height: 35px;
				      	text-align: right;
				      	float: left;
				      	color:$themeColor;
				      	margin-right: 35px;
				      }
              h5{
                float: left;
                line-height: 35px;
                color: $themeColor;
                cursor: pointer;
              }
              input{
                float: left;
                height:35px;
                margin-left:22px;
                width:480px;
                padding-left:15px;
                border-radius: 5px;
                border:1px solid $borderColor;
                cursor: pointer;
              }
              button{
                cursor: pointer;
              }
            }
            li:nth-child(1){
              color: #909090;
              margin-top:30px;
              margin-bottom:20px;
            }
            li:nth-child(2){
              h5{
                margin-left:-12px;
              }
            }
            li.tip-wrap{
		        	padding-left: 90px;
		        	color: #999999;
		        }
            li.img-wrap{
				    	/*padding-left: 30px;*/
				    	
				    	>div{
				    		width: 680px;
				    		float: left;
				    	}
				    }
            li:last-child{
              padding-left:52px;
              button{
            height: 33px;
            width:117px;
            border-radius: 5px;
            color: #ffffff;
            border:0px;
            cursor: pointer;
            background: url("../../../assets/img/personal/education/btn_save_normal.png.png") left center no-repeat;
          }
          button:nth-child(1){
          	&:hover{
          		opacity: 0.8;
          	}
          }
          button:nth-child(2){
            background: #fff;
            color:#353535;
            margin-left:30px;
            border:1px solid #e0e0e0;
            &:hover{
            	color: $themeColor;
            	border:1px solid $themeColor;
            }
          }
            }
          }
        }
        /*编辑信息列表结束*/
      }
      /*显示编辑信息列表结束*/
    }
    /*添加信息开始*/
    .addCertificateContainer{
      ul{
        li{
          margin:20px 0;
          .wrap-left{
		      	/*width: 80px;*/
		      	line-height: 35px;
		      	text-align: right;
		      	float: left;
		      	color:$themeColor;
		      	margin-right: 35px;
		      }
          h5{
            float: left;
            line-height: 35px;
            color: $themeColor;
            cursor: pointer;
          }
          input{
            float: left;
            height:35px;
            margin-left:22px;
            width:480px;
            padding-left:15px;
            border-radius: 5px;
            border:1px solid $borderColor;
            cursor: pointer;
          }
          button{
            cursor: pointer;
          }
        }
        li:nth-child(1){
          color: #909090;
          margin-top:30px;
          margin-bottom:20px;
        }
        li:nth-child(2){
          h5{
            margin-left:-12px;
          }
        }
        li.tip-wrap{
        	padding-left: 90px;
        	color: #999999;
        }
        li:last-child{
          padding-left:52px;
          button{
            margin-left:30px;
            width: 117px;
            height:33px;
            border-radius: 5px;
            border:1px solid $themeColor;
            background: #ffffff;
            color: $themeColor;
            line-height: 35px;
          }
          button:nth-child(1){
            border:0;
            color: #ffffff;
            background: url("../../../assets/img/personal/education/btn_save_normal.png.png") left center no-repeat;
          }
          .keepAdd{
            background: url("../../../assets/img/personal/education/btn_save_disabled.png.png") left center no-repeat !important;
          }
        }
      }
    }
    /*添加信息结束*/
  }
</style>
