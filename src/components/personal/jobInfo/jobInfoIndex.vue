<template>
  <div class="titleInfo">

    <div class="title">
      <h2 v-cloak>{{title.text}}</h2>
      <p v-on:click="addInfo">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="jobInfoContainer" v-show="reveal.addJobInfo">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加执业资格信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="jobInfoInfo" v-for="(item,index) in titleInfo">
        <!--显示信息列表开始-->
        <div class="jobInfoInfoList" v-show="!reveal.editInfo[index]">
          <div class="jobInfoInfoTitle">
            <h4 v-cloak>{{item.titleName}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">
                <p>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="jobInfoEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="jobInfoDel(index)">
                <p>删除</p>
              </li>
            </ul>
          </div>
          <div class="jobInfoInfoBody">
            <p v-cloak>职称专业：<span>{{item.professionalTitle}}</span></p>
            <p v-cloak>证书级别：<span>{{item.titleLevel}}</span></p>
            <p v-cloak>证书编号：<span>{{item.certificateNumber}}</span></p>
            <p v-cloak>评定日期：<span>{{item.assessmentTime}}</span></p>
            <p v-cloak>发证机构：<span>{{item.certificateBody}}</span></p>
          </div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="jobInfoInfoEdit" v-show="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li>
              <label>
                <h5>*&nbsp;资格名称</h5>
                <input v-model="localTitleInfo[index].titleName" type="text" placeholder="请输入资格名称">
              </label>
            </li>
            <li>
              <label>
                <h5>职称专业</h5>
                <input v-model="localTitleInfo[index].professionalTitle" type="text" placeholder="请输入注册单位">
              </label>
            </li>
            <li>
              <label>
                <h5>职称级别</h5>
                <input v-model="localTitleInfo[index].titleLevel" type="text" placeholder="请输入职称级别">
              </label>
            </li>
            <li>
              <label>
                <h5>证书编号</h5>
                <input v-model="localTitleInfo[index].certificateNumber" type="text" placeholder="请输入证件编号">
              </label>
            </li>
            <li>
              <label>
                <h5>评定日期</h5>
           			<datepicker class="datePicker" v-model="localTitleInfo[index].assessmentTime"></datepicker>
                	
              </label>
            </li>
            <li>
              <label>
                <h5>发证机构</h5>
                <input v-model="localTitleInfo[index].certificateBody" type="text" placeholder="请输入发证机构">
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
						     <!--<div id="fine-uploader-manual-trigger1"></div>-->
						     <div :id="fineUploaderId[index]"></div>
						</li>
            <li>
              <button v-on:click="keepJobInfoEdit(index)">保存</button>
              <button v-on:click="cancelJobInfoEdit(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->
    <div class="addJobInfoContainer" v-show="!reveal.addJobInfo">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li>
          <label>
            <h5>*&nbsp;职称名称</h5>
            <input v-model="newTitleInfo.titleName" type="text" placeholder="请输入资格名称">
          </label>
        </li>
        <li>
          <label>
            <h5>职称专业</h5>
            <input v-model="newTitleInfo.professionalTitle" type="text" placeholder="请输入资格名称">
          </label>
        </li>
        <li>
          <label>
            <h5>职称级别</h5>
            <input v-model="newTitleInfo.titleLevel" type="text" placeholder="请输入资格名称">
          </label>
        </li>
        <li>
          <label>
            <h5>证书编号</h5>
            <input v-model="newTitleInfo.certificateNumber" type="text" placeholder="请输入证件编号">
          </label>
        </li>
        <li>
          <label>
            <h5>评定时间</h5>
           <!-- <input v-model="newTitleInfo.info.time" type="month" placeholder="请输入注册单位">-->
           	<datepicker class="datePicker" v-model="newTitleInfo.assessmentTime"></datepicker>
            <!--<datepicker v-model="newTitleInfo.assessmentTime"></datepicker>-->
          </label>
        </li>
        <li>
          <label>
            <h5>注册单位</h5>
            <input v-model="newTitleInfo.certificateBody" type="text" placeholder="请输入注册单位">
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
          <button v-bind:class="{keepAdd:reveal.keepAdd}" v-on:click="keepJobInfoAdd">保存</button>
          <button v-on:click="cancelJobInfoAdd">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import Datepicker from "../units/Datepicker.vue"
  import qq from "fine-uploader"
  import MyAjax from "../../../assets/js/MyAjax.js"
  
  
  export default {
    name:"titleInfo",
    components:{
      Datepicker
    },
    data(){
      return {
        title:{text:"职称信息"},
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示文本信息,通过服务器获取的数据
          editInfo:[],//是否编辑信息
          addJobInfo:true,//是否添加信息
          keepAdd:true,//添加模式下，保存按钮是否可用
        },
        titleInfo:[],
        localTitleInfo:[],
        newTitleInfo:{
          "accountID": "",
				  "assessmentTime": "",
				  "certificateBody": "",
				  "certificateNumber": "",
				  "creAccountID": "",
				  "creTime": "",
				  "ifVisable": 1,
				  "pkid": "",
				  "professionalTitle": "",
				  "titleLevel": "",
				  "titleName": ""
        },
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
      }
    },
    
    mounted(){
    	this.updateData();
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
	    
      if(this.titleInfo.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
        for(let i=0;i<this.titleInfo.length;i++){
          
          this.reveal.editInfo.push(false);//信息是否可以编辑赋初始值
        }
      }
      /*以上是信息初始化*/
      if(this.reveal.openOrPrivacy.length!=0){
        for(let i=0;i<this.reveal.openOrPrivacy.length;i++){
          if(!this.reveal.openOrPrivacy[i]){
            Vue.set(this.reveal.openOrPrivacyText,[i],"隐藏")
            //this.reveal.openOrPrivacyText.push("显示")
          }else{
            Vue.set(this.reveal.openOrPrivacyText,[i],"显示")
            //this.reveal.openOrPrivacyText.push("隐藏")
          }
        }
      }
      /*以上是是否对外显示文本信息初始化*/
    },
    updated(){
      if(this.titleInfo.length==0){
        Vue.set(this.reveal,"empty",true)
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newTitleInfo.titleName.length!=0){
        if(this.newTitleInfo.titleName.trim().length!=0){
          Vue.set(this.reveal,"keepAdd",false);
          Vue.set(this.newTitleInfo,"titleName",this.newTitleInfo.titleName.trim())//进行空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAdd",true);
      }
      /*控制保存按钮的背景颜色*/
    },
   
    methods:{
    	updateData(){
    		var that = this;
	    	var url = "http://10.1.31.16:8080/psnTitleMessage/findByMySelf/"+"string";
	    	MyAjax.ajax({
					type: "GET",
					url:url,
	//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
					dataType: "json",
	//				content-type: "text/plain;charset=UTF-8",
					
				},function(data){
					console.log(data)
					data = data.msg;
					that.titleInfo = data;
				},function(err){
					console.log(err)
				})
	    	function emptyText(text) {
			    if(text==null||text.length == 0){
			      return "（暂无信息）";
			    }else {
			      return text;
			    }
			  }
	    	
	    	/*数据同步本地一份开始*/
        that.localTitleInfo=JSON.parse(JSON.stringify(that.titleInfo));
        that.fineUploaderId = [];
	    	that.qqTemplate = [];
	    	that.reveal.openOrPrivacyText = [];
	    	that.reveal.openOrPrivacy = [];
	    	for(var i=0;i<that.titleInfo.length;i++){
	    		that.titleInfo[i].titleLevel = emptyText(that.titleInfo[i].titleLevel);
	    		that.titleInfo[i].assessmentTime = emptyText(that.titleInfo[i].assessmentTime);
	    		that.titleInfo[i].certificateBody = emptyText(that.titleInfo[i].certificateBody);
	    		that.titleInfo[i].certificateNumber = emptyText(that.titleInfo[i].certificateNumber);
	    		that.titleInfo[i].professionalTitle = emptyText(that.titleInfo[i].professionalTitle);
	    		that.fineUploaderId.push("fine-uploader-manual-trigger"+that.titleInfo[i].pkid);
	    		that.qqTemplate.push("qq-template-manual-trigger"+that.titleInfo[i].pkid);
	    		if(that.titleInfo[i].ifVisable==0){
	    			that.reveal.openOrPrivacy.push(false);//信息是否对外显示赋初始值
	        	that.reveal.openOrPrivacyText.push("隐藏");//信息是否对外显示文字切换赋初始值	
	    		}else{
	    			that.reveal.openOrPrivacy.push(true);//信息是否对外显示赋初始值
	        	that.reveal.openOrPrivacyText.push("显示");//信息是否对外显示文字切换赋初始值		
	    		}
	    	}
    	},
      openOrPrivacy(index){//信息是否对外公开控制按钮
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);
//      if(this.reveal.openOrPrivacyText[index]=="显示"){//显示隐藏文字切换
//        Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
//      }else{
//        Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
//      }
        
        for(let i=0;i<this.reveal.openOrPrivacy.length;i++){
        	if(this.reveal.openOrPrivacy[i]==false){
        		this.localTitleInfo[i].ifVisable = 0;
        	}else{
        		this.localTitleInfo[i].ifVisable = 1;
        	}
        }//更新一下可见的值以便传给后端
        
        var that = this;
        var url = "http://10.1.31.16:8080/psnTitleMessage/update"
        $.ajaxSetup({ contentType : 'application/json' });
        MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.localTitleInfo[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})//更新到服务器
				//保存之后再重新拉取数据
				that.updateData();
      },
      jobInfoEdit(index){//编辑状态进入按钮
      	
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
        var that = this;

        //上传图片
          if(that.qqFineloader.length==0){
            for(var i=0;i<that.titleInfo.length;i++){
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
      keepJobInfoEdit(index){//编辑状态，保存按钮
        if(this.titleInfo[index].titleName.trim().length!=0){
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
          
          /*如果是保存，把数据保存到Vuex中*/
        }
        var that = this;
        var url = "http://10.1.31.16:8080/psnTitleMessage/update"
        $.ajaxSetup({ contentType : 'application/json' });
        MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.localTitleInfo[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})//更新到服务器
				//保存之后再重新拉取数据
				that.updateData();
        
        
      },
      cancelJobInfoEdit(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
         this.localTitleInfo[index]=JSON.parse(JSON.stringify(this.titleInfo[index]));
        /*如果是取消编辑，从新从Vuex中得到数据*/
      },
      jobInfoDel(index){//编辑状态，删除按钮
        var that = this;
        var url = "http://10.1.31.16:8080/psnTitleMessage/del/"+that.titleInfo[index].pkid;
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
        that.updateData();
      },
      addInfo(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addJobInfo",false);
        Vue.set(this.reveal,"empty",false)
        Vue.set(this.newTitleInfo,"titleName","");
        Vue.set(this.newTitleInfo,"professionalTitle","");
        Vue.set(this.newTitleInfo,"certificateNumber","");
        Vue.set(this.newTitleInfo,"assessmentTime","");
        Vue.set(this.newTitleInfo,"titleLevel","");
        Vue.set(this.newTitleInfo,"certificateBody","");
      },
      keepJobInfoAdd(){//添加模式下的保存
        if(this.newTitleInfo.titleName.length!=0){
          if(this.newTitleInfo.titleName.trim().length!=0){
            this.reveal.openOrPrivacy.push(true)//设置是否对外显示
            this.reveal.openOrPrivacyText.push("显示")//设置是否对外显示文本
            Vue.set(this.reveal,"addJobInfo",true);
          }
        }
        var that = this;
//      console.log(that.software[index])
        var url = "http://10.1.31.16:8080/psnTitleMessage/insert";
        $.ajaxSetup({ contentType : 'application/json' });
        MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(that.newTitleInfo),
					dataType: "json",
					
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})
        that.updateData();
      },
      cancelJobInfoAdd(){
        Vue.set(this.reveal,"addJobInfo",true);
        //视图切换到执业资格的首页
        Vue.set(this.newTitleInfo,"titleName","");
        Vue.set(this.newTitleInfo,"professionalTitle","");
        Vue.set(this.newTitleInfo,"certificateNumber","");
        Vue.set(this.newTitleInfo,"assessmentTime","");
        Vue.set(this.newTitleInfo,"titleLevel","");
        Vue.set(this.newTitleInfo,"certificateBody","");
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
  .titleInfo {
    width: 940px;
    float: left;
    padding: 0 40px;
    background: $bfColor;
    min-height: 671px;
    .date-picker{
      width:140px;
      float: left;
      margin-left:22px;
    }
    /*时间插件样式*/
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
    .jobInfoContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .jobInfoInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .jobInfoInfoList{
          .jobInfoInfoTitle{
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
          .jobInfoInfoBody{
            p{
              height:20px;
              margin:15px 0 ;
              color: #353535;
              span{
                color: #757575;
                margin-left:8px;
              }
            }
            p:last-child{
              margin-bottom:17px;
            }
          }
        }
        /*信息列表结束*/
        /*编辑信息列表开始*/
        .jobInfoInfoEdit{
          ul{
            li{
              margin:20px 0;
              .wrap-left{
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
                padding-left:15px;
                border-radius: 5px;
                border:1px solid $borderColor;
                cursor: pointer;
              }
              input[type=text]{
                width:480px;
              }
              input[type=month]{
                width:120px;
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
    .addJobInfoContainer{
      ul{
        li{
          margin:20px 0;
          .wrap-left{
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
            padding-left:15px;
            border-radius: 5px;
            border:1px solid $borderColor;
            cursor: pointer;
          }
          input[type=text]{
            width:480px;
          }
          input[type=month]{
            width:120px;
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
        li.img-wrap{
		    	/*padding-left: 30px;*/
		    	>div{
		    		width: 680px;
		    		float: left;
		    	}
		    }
		    li.tip-wrap{
        	padding-left: 90px;
        	color: #999999;
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
          .keepAdd{
            background: url("../../../assets/img/personal/education/btn_save_disabled.png.png") left center no-repeat !important;
          }
        }
      }
    }
    /*添加信息结束*/
  }
</style>
