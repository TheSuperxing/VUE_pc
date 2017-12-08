<template>

  <div class="personalBasicInfo">

 
    <div class="basicInfoContainer">
      <div class="bic-title clear">
        <h2>基础信息</h2>
        <p v-on:click="editBasicInfo" v-if="reveal.edit">编辑</p>
      </div>
      <ul v-if="reveal.edit" class="bicInfo">
        <li class="clear">
          <h5>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</h5>
          <p>{{baseInfo.nickName}}</p>
          <p v-if="noBaseInfo">（暂无信息）</p>

        </li>
        <li class="clear">
          <h5>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h5>
          <p>{{baseInfo.psnName}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[0]}" v-on:click="openOrPrivacy(0)"></strong>
          <p v-if="noBaseInfo">（暂无信息）</p>
        </li>
        <li class="clear">
          <h5>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</h5>
          <p>{{baseInfo.sex}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[1]}" v-on:click="openOrPrivacy(1)"></strong>
          <p v-if="noBaseInfo">（暂无信息）</p>
          
        </li>
        <li class="clear">
          <h5>出生日期：</h5>
          <p>{{baseInfo.dateOfBirth}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[2]}" v-on:click="openOrPrivacy(2)"></strong>
          <p v-if="noBaseInfo">（暂无信息）</p>
        </li>
        <li class="clear">
          <h5>手机号码：</h5>
          <p>{{baseInfo.phoneNumber}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[3]}" v-on:click="openOrPrivacy(3)"></strong>
          <p v-if="noBaseInfo">（暂无信息）</p>
        </li>
        <li class="clear">
          <h5>联系邮箱：</h5>
          <p>{{baseInfo.psnMail}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[4]}" v-on:click="openOrPrivacy(4)"></strong>
          <p v-if="noBaseInfo">（暂无信息）</p>
        </li>
      </ul>


      <ul v-if="!reveal.edit" class="bicInfo">
        <li class="clear">
          <h5><span>*</span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</h5>
          <p><input type="text" v-model="localBaseInfo.nickName"  v-on:input="changeNickName"></p>
          <i>{{textLeng.nickName}}/30</i>
				  <alertTip v-if="showAlert.nickName" :showHide="showAlert.nickName" @closeTip="closeTip" :alertText="alertText.nickName"></alertTip>
          
        </li>
        <li v-if="baseInfo.ifRNA" class="clear">
          <h5><span>*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h5>
          <p>{{baseInfo.psnName}}</p>
          <i>{{textLeng.psnName}}/30</i>
          <span>（进入实名认证流程后，姓名将不可以自行修改，需联系管理员）</span>
				  <alertTip v-if="showAlert.psnName" :showHide="showAlert.psnName" @closeTip="closeTip" :alertText="alertText.psnName"></alertTip>
					
        </li>
        <li v-if="!baseInfo.ifRNA" class="clear">
          <h5><span>*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h5>
          <p><input type="text" v-model="localBaseInfo.psnName"  v-on:input="changeName"></p>
          <i>{{textLeng.psnName}}/30</i>
        </li>
        <li class="clear">
          <h5>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</h5>
          <p>
            <button v-bind:class="{selectSex:reveal.selectSex}" v-on:click="selectSexNan">男</button>
            <button v-bind:class="{selectSex:!reveal.selectSex}" v-on:click="selectSexNv">女</button>
          </p>
        </li>
        <li class="clear">
          <h5>出生日期：</h5>
          <datepicker class="datePicker" v-model="localBaseInfo.dateOfBirth"></datepicker>
        </li>
        <li class="clear">
          <h5>手机号码：</h5>
          <!--<p>{{baseInfo.phoneNumber}}</p>-->
          <input type="text" v-model="localBaseInfo.phoneNumber" />
          <!--<span>(手机号为当前登录账户，不可自行修改，如需修改登录手机号，请联系管理员)</span>-->
        </li>
        <li class="clear">
          <h5>联系邮箱：</h5>
          <p><input type="text" v-model="localBaseInfo.psnMail" ></p>
        </li>
        <li class="cancelSubmit clear">
          <button v-on:click="submitEdit" v-bind:class="{submitBgColor:reveal.submitBgColor}">提交</button>
          <button v-on:click="cancelEdit">取消</button>
        </li>
      </ul>
      <div class="realName">
        <div class="realNameTop clear">
          <h5>实名认证：</h5>
          <p v-if="!localBaseInfo.haveUploaded" v-bind:class="{throughRealName:reveal.throughRealName}">（暂未上传认证文件）</p>
        </div>
        <p v-show="haveUploaded" style="line-height: 40px;color: rgb(242,117,25);">上传认证证件成功，已进入审核阶段。可继续上传。</p>
        <div class="realNameMain">
        	<ul>
        		<li class="clear">
        			<script type="text/template" id="qq-template-manual-trigger">
				        <div class="qq-uploader-selector qq-uploader" qq-drop-area-text="Drop files here">
				            <!--<div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
				                <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
				            </div>-->
				            <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
				                <span class="qq-upload-drop-area-text-selector"></span>
				            </div>
				            <ul class="qq-upload-list-selector qq-upload-list" aria-live="polite" aria-relevant="additions removals">
				                <li class="list">
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
				                	
				                    <span>请上传文件证件</span>
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
        		
        		
        		<p  v-if="localBaseInfo.ifRNA">您已通过实名认证</p>
            <p  v-if="localBaseInfo.ifRNA">您可点击“添加”继续上传，不会影响您已上传的实名认证文件</p>
        	</ul>
          <ul class="addFile" >
           
            <li>
              <p>请上传本人手持身份证照片一面的免冠近照，支持JPG、JEPG、PNG，不超过5M</p>
              <p>请确认身份证姓名与您填写的姓名一致，以免影响审核结果。</p>
            </li>
          </ul>

        </div>
        

      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import qq from "fine-uploader" 
  import Datepicker from "../units/Datepicker.vue"
  import MyAjax from "../../../assets/js/MyAjax.js"
	import alertTip from "../units/alertTip.vue"
	  
  
  export default {
    name: "personalBasicInfo",
    data: function () {
      return {
        header:{titleName:"个人头像",imgsrc:require("../../../assets/img/personal/basicInfo/basicInfoImg.png")},
        reveal:{
          edit:true,
          selectSex:true,
          throughRealName:"",
          submitBgColor:false,
          ifRNA:"",
          openOrPrivacy:[]
        },
        showAlert:{nickName:false,psnName:false,},//提示框显隐
	      alertText:{nickName:null,psnName:null,},
        textLeng:{
          nickName:0,
          psnName:0
        },
        noBaseInfo:false,
        haveUploaded:false,//实名认证图片已经上传，false代表还没上传
        baseInfo:[],
        localBaseInfo:{
          nickName:"",
          psnName:"",
          psnNameVisable:1,
          sex:"",
          sexVisable:1,
          phoneNumber:"",
          phoneNumberVisable:1,
          dateOfBirth:"",
          ageVisable:1,
          psnMail:"",
          psnMailVisable:1,
          ifRNA:0,
          psnID:"",
        },
      }

    },
    components:{
	    Datepicker,
	    alertTip,
	  },
    created(){
      this.updateData();
    },
    mounted(){
    	var that = this;
      //上传图片
			var manualUploader = new qq.FineUploader({
	        element: document.getElementById('fine-uploader-manual-trigger'),
	        template: 'qq-template-manual-trigger',
	        request: {
	            endpoint: MyAjax.urlsy+'/personalbasicinfo/batchUpload'
	        },
	        thumbnails: {
	//	                placeholders: {
	//	                    waitingPath: '../../../assets/js/units/fine-uploader/placeholders/waiting-generic.png',
	//	                    notAvailablePath: '../../../assets/js/units/fine-uploader/placeholders/not_available-generic.png'
	//	                }
	        },
	        validation: {
	            allowedExtensions: ['jpeg', 'jpg', 'png'],
	            itemLimit: 5,
	            sizeLimit: 2400*2400*2400*2400*2400
	        },
	        autoUpload: false,
	        debug: true,
	        callbacks:{
	        	onSubmit:  function(id,  fileName)  {
              $('#trigger-upload').show()
            },
            onCancel: function(){
              
							var imgList=$("#fine-uploader-manual-trigger .qq-uploader-selector .qq-upload-list-selector .list")
              if(imgList.length<=1){
								$("#fine-uploader-manual-trigger .qq-uploader-selector .buttons .btn-primary").hide()
							}
						},
	        	onComplete: function (id, fileName, responseJSON, maybeXhr) {
	          
	            console.log(responseJSON)
	            if(responseJSON.success==true){
	            	$(".qq-upload-list").hide()
	            	that.haveUploaded = true;
	            }
	            

	            $('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-fail').show();
	            
	            $('#trigger-upload').hide()
	      	},
	    	}
	    });
	    
			qq(document.getElementById("trigger-upload")).attach("click", function() {
        console.log("ok");
	        manualUploader.uploadStoredFiles();
	    });
	    

    },
    methods:{
    	updateData(){
        var that = this;
	    	var url = MyAjax.urlsy+"/personalbasicinfo/findByMySelf";
	    	MyAjax.ajax({
					type: "GET",
					url:url,
	//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
					dataType: "json",
	//				contentType:"application/json;charset=utf-8",
					async:false,
				},function(data){
					if(data.code==0){
            that.baseInfo = data.msg;
						//判断用户的全部信息为空值
			    	if(that.baseInfo.sex=="0"){
			    		that.baseInfo.sex = "男"
			    	}else if(that.baseInfo.sex=="1"){
			    		that.baseInfo.sex = "女"
			    	}/*设置性别的初始勾选状态*/
			    	
			    	if(that.localBaseInfo.sex==null){
					    Vue.set(that.reveal,'selectSex',true);
					  }else if(that.localBaseInfo.sex.trim()=="女"){
					    Vue.set(that.reveal,'selectSex',false);
					  }else if(that.localBaseInfo.sex.trim()=="男"){
					    Vue.set(that.reveal,'selectSex',true);
					  }
					  
					  if(that.baseInfo.ifRNA){
					    that.reveal.throughRealName=true;
            }
					  that.baseInfo.nickName=emptyText(that.baseInfo.nickName);
			      that.baseInfo.psnName=emptyText(that.baseInfo.psnName);
			      that.baseInfo.sex=emptyText(that.baseInfo.sex);
			      that.baseInfo.dateOfBirth=emptyText(that.baseInfo.dateOfBirth);
			      that.baseInfo.psnMail=emptyText(that.baseInfo.psnMail);
			      that.baseInfo.phoneNumber=emptyText(that.baseInfo.phoneNumber);
			      //如果得到的数据为空，进行暂没有消息处理
						that.reveal.openOrPrivacy = [];
			      that.localBaseInfo=JSON.parse(JSON.stringify(that.baseInfo));
			      that.reveal.openOrPrivacy.push(that.baseInfo.psnNameVisable)
			      that.reveal.openOrPrivacy.push(that.baseInfo.sexVisable)
			      that.reveal.openOrPrivacy.push(that.baseInfo.ageVisable)
			      that.reveal.openOrPrivacy.push(that.baseInfo.phoneNumberVisable)
			      that.reveal.openOrPrivacy.push(that.baseInfo.psnMailVisable)
			      /*初始化openOrPrivacy*/
						
						for(var i=0;i<that.reveal.openOrPrivacy.length;i++){
							if(that.reveal.openOrPrivacy[i] == 0){
								that.reveal.openOrPrivacy[i] = false;
							}else{
								that.reveal.openOrPrivacy[i] = true;
							}
						}
					}else if(data.code == -1){
						if(data.msg == "null"){
			    		that.noBaseInfo = true;
			    	}else{
			    		that.noBaseInfo = false;
			    	}
			    	
					}
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
	    	
				console.log(that.reveal.openOrPrivacy)
    	},
      editBasicInfo(){//编辑进入编辑状态
//    	console.log(this.localBaseInfo)
				function emptyText(text) {
			    if(text== "（暂无信息）"){
			      return "";
			    }else {
			      return text;
			    }
			  }
				this.localBaseInfo.nickName=emptyText(this.localBaseInfo.nickName);
	      this.localBaseInfo.psnName=emptyText(this.localBaseInfo.psnName);
	      this.localBaseInfo.sex=emptyText(this.localBaseInfo.sex);
	      this.localBaseInfo.psnMail=emptyText(this.localBaseInfo.psnMail);
	      this.localBaseInfo.phoneNumber=emptyText(this.localBaseInfo.phoneNumber);
				var d = new Date();
				console.log(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())
				if(this.localBaseInfo.dateOfBirth == "（暂无信息）"){
					
					this.localBaseInfo.dateOfBirth =d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
					console.log(this.localBaseInfo)
				}
				
        Vue.set(this.reveal,"edit",false);
        
        /*进入编辑状态之前的数据处理*/
        if(this.localBaseInfo.nickName.trim().length!=0&&this.localBaseInfo.psnName.trim().length!=0){
          Vue.set(this.reveal,"submitBgColor",true)
        }else {
          Vue.set(this.reveal,"submitBgColor",false)
        }
        /*只有昵称和名字同时有值时保存按钮才是点亮状态*/
        Vue.set(this.textLeng,"nickName",this.localBaseInfo.nickName.length);
        Vue.set(this.textLeng,"psnName",this.localBaseInfo.psnName.length);
        /*对计算input框中的字符长度进行初始化*/
      },
      /*处于编辑状态时如果没有信息为空*/
      changeNickName(){//编辑状态，修改昵称
        Vue.set(this.textLeng,"nickName",this.localBaseInfo.nickName.trim().length)
        if(this.localBaseInfo.nickName.trim().length>=30){
          this.localBaseInfo.nickName=this.localBaseInfo.nickName.trim().slice(0,30)
          Vue.set(this.textLeng,"nickName",30)
        }
        //设置字符串计数
        if(this.localBaseInfo.nickName.trim().length!=0&&this.localBaseInfo.psnName.trim().length!=0){
          Vue.set(this.reveal,"submitBgColor",true)
        }else {
          Vue.set(this.reveal,"submitBgColor",false)
        }
        /*只有昵称和名字同时有值时保存按钮才是点亮状态*/
      },
      /*input字符长度显示*/
      changeName(){//编辑状态修改名字
        Vue.set(this.textLeng,"psnName",this.localBaseInfo.psnName.trim().length)
        if(this.localBaseInfo.psnName.trim().length>=30){
          this.localBaseInfo.psnName=this.localBaseInfo.psnName.trim().slice(0,30)
          Vue.set(this.textLeng,"psnName",30)
        }
        //设置字符串计数
        if(this.localBaseInfo.nickName.trim().length!=0&&this.localBaseInfo.psnName.trim().length!=0){
          Vue.set(this.reveal,"submitBgColor",true)
        }else {
          Vue.set(this.reveal,"submitBgColor",false)
        }
        /*只有昵称和名字同时有值时保存按钮才是点亮状态*/
      },
      /*改变名字和昵称 控制30字符*/
      selectSexNan(){//编辑状态修改性别为男
        Vue.set(this.localBaseInfo,"sex","男");
        Vue.set(this.reveal,'selectSex',true);
      },
      selectSexNv(){//编辑状态修改性别为女
        Vue.set(this.localBaseInfo,"sex","女");
        Vue.set(this.reveal,'selectSex',false);
      },
      /*性别选择*/
      cancelEdit(){//从编辑状态退出
        Vue.set(this.reveal,"edit",true)
      },
      addFile(){
        console.log("ok")
      },
      submitEdit(){//保存编辑
      	
        /*没有数据输入的处理函数*/
        if(this.localBaseInfo.nickName.trim().length!=0&&this.localBaseInfo.psnName.trim().length!=0){
          Vue.set(this.reveal,"edit",true)
          /*只有当昵称，和名字不为空的时候，保存按钮才可用*/
        }else {
          Vue.set(this.reveal,"edit",false)
          /*只有当昵称，和名字不为空的时候，保存按钮才可用*/
        }
        //上传之前处理一下Boolean值
	    	for(var i=0;i<this.reveal.openOrPrivacy.length;i++){
					if(this.reveal.openOrPrivacy[i] == false){
						this.reveal.openOrPrivacy[i] = 0;
					}else{
						this.reveal.openOrPrivacy[i] = 1;
					}
				}
	    	this.localBaseInfo.psnNameVisable = this.reveal.openOrPrivacy[0];
	    	this.localBaseInfo.sexVisable = this.reveal.openOrPrivacy[1];
	    	this.localBaseInfo.ageVisable = this.reveal.openOrPrivacy[2];
	    	this.localBaseInfo.phoneNumberVisable = this.reveal.openOrPrivacy[3];
	    	this.localBaseInfo.psnMailVisable = this.reveal.openOrPrivacy[4];
	    	if(this.localBaseInfo.sex=='男'){
	    		this.localBaseInfo.sex = "0";
	    	}else if(this.localBaseInfo.sex=='女'){
	    		this.localBaseInfo.sex = "1";
	    	}
	    	var that = this;
	    	var url = MyAjax.urlsy+"/personalbasicinfo/update";
	    	$.ajaxSetup({ contentType : 'application/json' });
	    	MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.localBaseInfo),
					dataType: "json",
					contentType:"application/json;charset=utf-8",//
					async:false,
				}, function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})
	    	that.updateData();
      },
      /*提交和取消按钮*/
     
     	
      addRealName(){//实名认证
        //console.log(this.localBaseInfo.realName)
        //if(this.baseInfo.realName=="false"){
          Vue.set(this.localBaseInfo,"this.localBaseInfo",!this.localBaseInfo.ifRNA);
          //console.log(Boolean(this.localBaseInfo.realName))
        //}
        //this.localBaseInfo.realName=true;
				
      },
      /*0-name 1-sex 2-age 3-phone 4-mail*/
     	openOrPrivacy(index){
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);//通过类名控制图片和文字颜色
        console.log(this.reveal.openOrPrivacy[index])
     		for(let i=0;i<this.reveal.openOrPrivacy.length;i++){
        	if(this.reveal.openOrPrivacy[i]===false){
        		this.reveal.openOrPrivacy[i] = 0;
        	}else{
        		this.reveal.openOrPrivacy[i] = 1;
        	}
        }
     		
     		this.baseInfo.psnNameVisable = this.reveal.openOrPrivacy[0];
	    	this.baseInfo.sexVisable = this.reveal.openOrPrivacy[1];
	    	this.baseInfo.ageVisable = this.reveal.openOrPrivacy[2];
	    	this.baseInfo.phoneNumberVisable = this.reveal.openOrPrivacy[3];
	    	this.baseInfo.psnMailVisable = this.reveal.openOrPrivacy[4];
	    	console.log(this.baseInfo)
	    	var that = this;
	    	var url = MyAjax.urlsy+"/personalbasicinfo/update";
	    	$.ajaxSetup({ contentType : 'application/json' });
	    	MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.baseInfo),
					dataType: "json",
					contentType:"application/json;charset=utf-8",//
					async:false,
				}, function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})
	    	that.updateData();
     	},

    },
		


  }
</script>
<style lang="scss" scoped>
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  $textColor:rgb(72,72,72);
  $hColor:rgb(35,35,35);
  #fine-uploader-manual-trigger{
  	margin-top: 20px;
  }
  .personalBasicInfo{
    float: left;
    width:940px;
    float: left;
    padding:0 40px;
    background: $bfColor;
    min-height: 671px;
    padding-bottom: 40px;
    color: $textColor;
    .basicInfoTitle{
      padding:42px 0;
      border-bottom:1px solid $borderColor;
      
      .basicInfoImg{
        width:113px;
        height:113px;
        border-radius: 50%;
        background: #cccccc;
        float:left;
      }
      p{
        margin-left:21px;
        font-size:16px;
        padding:4px 0 2px 0;
        float: left;
      }
    }
    .basicInfoContainer{
      .bic-title{
        padding:28px 0 0 0;
        font-size: 18px;
        color: $activeColor;
        border-bottom: 1px solid $borderColor;
        h2{
          float: left;
          border-bottom:2px solid $themeColor;
          height:36px;
          margin-bottom: -1px;
        }
        P{
          color: $textColor;
          cursor: pointer;
          float: right;
          font-size: 14px;
          padding-right:32px;
          padding-left:32px;
          position: relative;
          bottom: -5px;
          background: url("../../../assets/img/personal/basicInfo/edit.png") left center no-repeat;
        }
      }
      .bicInfo{
        padding-left:20px;
        padding-top:31px;
        padding-bottom:15px;
        border-bottom:1px solid $borderColor;
        color: $hColor;
        li{
          margin-bottom:12px;
          h5{
          	height: 38px;
          	line-height: 38px;
            float: left;
            padding-left:25px;
            min-width:95px;
            text-align: right;
            span{
              color: $themeColor;
              float: left;
            }
          }
          p{
          	height: 38px;
          	line-height: 38px;
            float: left;
            margin-left:19px;
            color: $textColor;
            font-size:12px;
          }
          input{
            float: left;
            border:1px solid $borderColor;
            padding-left:10px;
            font-size: 14px;
            line-height: 19px;
            border-radius: 5px;
          }
          i{
            margin-left:30px;
            float: left;
          }
          strong{
            float: right;
            margin-right:50px;
            width: 25px;
            height: 14px;
            background: url("../../../assets/img/personal/basicInfo/icon_available.png") left center no-repeat;
            margin-top: 10px;
          }
          .openOrPrivacy{
            background: url("../../../assets/img/personal/basicInfo/hidden.png") left center no-repeat;
          }

        }
        li:nth-child(1){
          h5{
          	
            background: url("../../../assets/img/personal/basicInfo/pet_name.png") left center no-repeat;
            span{
              float: left;
              height: 38px;
          		line-height: 38px;
              overflow: hidden;
              line-height: 26px;
              margin-left:-8px;
            }
          }
          input{
            width:384px;
          }
          i{
            float: left;
            margin-left:10px;
            margin-top: 5px;
          }

        }
        li:nth-child(2){
          h5{
            background: url("../../../assets/img/personal/basicInfo/name.png") left center no-repeat;
            span{
              float: left;
              height:21px;
              overflow: hidden;
              line-height: 26px;
              margin-left:-8px;
            }
          }
          span{
            float: right;
            color: $themeColor;
          }
           i{
            float: left;
            margin-left:10px;
            margin-top: 5px;
          }
          input{
            width:384px;
          }
        }
        li:nth-child(3){
          h5{
            background: url("../../../assets/img/personal/basicInfo/sex.png") left center no-repeat;
          }
          button{
            border: 0;
            padding:0 12px;
            color: #ffffff;
            background: #a4a4a4;
            cursor: pointer;
            height: 21px;
            line-height: 21px;
          }
          .selectSex{
            background: $themeColor;
          }
        }
        li:nth-child(4){
          h5{
            background: url("../../../assets/img/personal/basicInfo/icon_ages.png") left center no-repeat;
          }
          input{
          	width: 384px;
          }
          .date-picker{
          	width: 384px;
          	float: left;
          	margin-left: 20px;
          	font-size: 14px;
          }
        }
        li:nth-child(5){
          h5{
            background: url("../../../assets/img/personal/basicInfo/phone.png") 3px center no-repeat;
          }
          span{
            float: left;
            margin-left: 10px;
            color: $themeColor;
            line-height: 38px;
            
          }
          input{
          	float: left;
          	width:384px;
          	margin-left: 20px;
          }
         
        }
        li:nth-child(6){
          h5{
            background: url("../../../assets/img/personal/basicInfo/icon_mail.png") left center no-repeat;
          }
           input{
          	width: 384px;
          }
        }
        .cancelSubmit{
          margin:30px 0 15px 277px;
          button{
            cursor: pointer;
            height: 33px;
            width: 117px;
            background: #FFF;
            border:1px solid #f27519;
            border-radius: 5px;
            float: left;
            color: #f27519;
            margin-right:30px;
            background: url("../../../assets/img/personal/education/btn_save_disabled.png.png");
          }
          button:nth-child(1){
            background: #ffffff;
          }
          button:nth-child(2){
            border:0;
            color: #FFF;
          }
          .submitBgColor{
            background: url("../../../assets/img/personal/education/btn_save_normal.png.png");
          }
        }
      }
      .realName{
        padding-left:20px;
        padding-top:30px;
        .realNameTop{
          h5{
            color: #4a4a4a;
            float: left;
            padding-left:25px;
            background: url("../../../assets/img/personal/basicInfo/icon_confirm.png") left center no-repeat;
            color: $hColor;
          }
          p{
            color: #727272;
            float: left;
            margin-left:19px;
          }
          .throughRealName{
            display: none;
          }
          span{
            cursor: pointer;
            float:right;
            padding:0 32px;
            background: url("../../../assets/img/personal/basicInfo/edit.png") left center no-repeat;
            margin-top:-4px;
          }
        }
        .realNameMain{
          padding-left:26px;
          .pass{
            padding-top:12px;
            color: #727272;
            p{
              margin-bottom:3px;
            }
          }
          .addFile{
            padding:0;
            border: 0;
            margin-top: 20px;
            li{
              .addBtn{
                float: left;
                position: relative;
                overflow: hidden;
                border: 0;
                margin-top:25px;
                padding-left: 24px;
                color: $themeColor;
                background: url(../../../assets/img/personal/basicInfo/icon_add.png) no-repeat left center;
                margin-right: 30px;
                margin-bottom: 10px;
            
                input{
                	width: 100%;
                	height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                  cursor: pointer;
                }
              }
              p{
                float: left;
                margin-top:25px;
                /*padding-left:42px;*/
              }
              div{
                margin-left:20px;
                float: left;
                width:76px;
                height:42px;
                background: $themeColor;
              }
            }
            li:nth-child(1){
              p{
                color: $themeColor;
                font-size:12px;
                float: none;
                margin:0;
              }
            }

          }
        }
      }
    }
  }

</style>
