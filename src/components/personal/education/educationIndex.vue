<template>
  <div class="educationIndex">
    <div  class="title">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addEdu">添加</p>
    </div>
    <div class="educationContainer">
      <div class="personal-empty" v-if="empty.promote">（您尚未添加教育背景信息）</div>

      <div class="eduInfo" v-for="(item,index) in education" v-show="!editEdu.add">

        <div class="eduInfoContainer" v-show="editEdu.delete[0][index]">
          <div v-show="!editEdu.edit[0][index]">
            <h4 v-cloak>{{item.schoolName}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:openOrPrivacy[index]}" v-on:click="openOrPrivacyInfo(index)">{{openOrPrivacyText[index]}}</li>
              <li v-on:click="editEduExist(index)">编辑</li>
              <li v-on:click="deleteEduExist(index)">删除</li>
            </ul>
          </div>
          <div v-show="!editEdu.edit[0][index]">
            <p v-cloak >{{item.info.schoolTimeStart}}——{{item.info.schoolTimeEnd}}</p>
            <p v-cloak >{{item.info.profession}}</p>
            <p v-cloak >{{item.info.introduce}}</p>
          </div>

          <ul class="editEduInfo" v-show="editEdu.edit[0][index]">
            <li>
              <span class="wrap-left">*学校名称</span><input v-model="inputValue.schoolText[index]"  type="text" placeholder="请输入学校名称" v-on:input="changeShoolName(index)"><span>{{textLeng.schoolName[index]}}/30</span>
            </li>
            <li>
              <span class="wrap-left">在校时间</span>
              <datepicker v-model="inputValue.schoolTimeStart[index]"></datepicker>
              <span>——</span>
              <datepicker v-model="inputValue.schoolTimeEnd[index]"></datepicker>
            </li>
            <li>
              <label>
                <span class="wrap-left">专业名称</span><input v-model="inputValue.professionText[index]" v-on:input="changeProfession(index)" type="text" placeholder="请输入专业名称"><span>{{textLeng.profession[index]}}/30</span>
              </label>
            </li>
            <li>
              <label>
                <span class="wrap-left">所获学历 </span><input v-model="inputValue.introduce[index]" type="text" placeholder="请选择学校">
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
						<li class="tip-wrap">
              <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
            </li>
            <li class="btnBox">
              <button v-bind:class="{eduDisabled: buttonColor.exist[index]}" v-on:click="keepEditEduExist(index)">保存</button>
              <button v-on:click="cancellEditEduExist(index)">取消</button>
            </li>

          </ul>
        </div>

      </div>

      <ul class="editEduInfo" v-show="editEdu.add">
        <li>
          <label>
           <span class="wrap-left">*学校名称 </span><input v-model="newInputValue.schoolText" v-on:input="addShoolName" type="text" placeholder="请输入学校名称"><span>{{newTextLeng.schoolName[0]}}/30</span>
          </label>
        </li>
        <li>
          <span class="wrap-left">在校时间</span>
          <datepicker v-model="newInputValue.schoolTimeStart"></datepicker>
          <span>——</span>
          <datepicker v-model="newInputValue.schoolTimeEnd"></datepicker>
        </li>
        <li>
          <label>
            <span class="wrap-left">专业名称</span> <input v-model="newInputValue.professionText" v-on:input="addProfession" type="text" placeholder="请输入专业名称"><span>{{newTextLeng.profession[0]}}/30</span>
          </label>
        </li>
        <li>
          <label>
            <span class="wrap-left">所获学历</span><input v-model="newInputValue.introduce" type="text" placeholder="请选择学校">
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
        <li class="btnBox">
          <button v-bind:class="{eduDisabled: buttonColor.add}" v-on:click="keepEditEduNew">保存</button>
          <button v-if="editEdu.add" v-on:click="cancellEditEdu">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import Vue  from "vue"
  import datepicker from "../../units/Datepicker.vue"
  import qq from "fine-uploader"

  export default {
    name: 'educationIndex',
    components:{
      datepicker
    },
    data:function() {
      return {
        title:"教育背景",
        empty:{promote:true},
        editEdu:{add:false,edit:[[]],delete:[[]]},
        //状态部分
        textLeng:{schoolName:[],profession:[]},
        newTextLeng:{schoolName:[0],profession:[0]},
        //字符段长度
        openOrPrivacy:[false,true,false,true],//信息是否公开显示,通过服务器获取的数据
        openOrPrivacyText:[],//信息是否公开显示,文本信息
        inputValue:{schoolText:[],professionText:[],schoolTimeStart:[],schoolTimeEnd:[],introduce:[]},
        newInputValue:{schoolText:"",professionText:"",schoolTimeStart:"",schoolTimeEnd:"",introduce:""},
        buttonColor:{exist:[],add:true},
        //按钮颜色
        //实例化上传图像的element根据信息条数添加className
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
      }
    },
    created(){
    	for(var i=0;i<this.education.length;i++){
    		this.fineUploaderId.push("fine-uploader-manual-trigger"+this.education[i].id);
    		this.qqTemplate.push("qq-template-manual-trigger"+this.education[i].id);
    		
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

      if(this.education.length!==0){
        Vue.set(this.empty,"promote",false)
        //if 有信息 信息为空的提升隐藏
        for(let i = 0 ; i < this.education.length ; i++){
          this.editEdu.edit[0].push(false);
          this.editEdu.delete[0].push(true);
          this.textLeng.schoolName.push(0);
          this.textLeng.profession.push(0);
          this.buttonColor.exist.push(true);
          /*初始化本地数据开始*/
          this.inputValue.schoolText.push(this.education[i].schoolName);
          this.inputValue.professionText.push(this.education[i].info.profession);
          this.inputValue.schoolTimeStart.push(this.education[i].info.schoolTimeStart);
          this.inputValue.schoolTimeEnd.push(this.education[i].info.schoolTimeEnd);
          this.inputValue.introduce.push(this.education[i].info.introduce);
          /*初始化本地数据结束*/
          Vue.set(this.textLeng.schoolName,[i],this.inputValue.schoolText[i].length)
          Vue.set(this.textLeng.profession,[i],this.inputValue.professionText[i].length)
          /*初始化记录输入字符长度的值*/
          if(this.openOrPrivacy[i]){
            Vue.set(this.openOrPrivacyText,[i],"隐藏")
          }else{
            Vue.set(this.openOrPrivacyText,[i],"显示")
          }
          /*是否显示隐藏文本的初始化*/
        }
        //为每一个对象添加一个独有的状态
      }

    },
    computed:mapState({
      education:state=>state.personal.personalMessage.education
    }),

    methods:{
      addEdu(){//添加按钮事件
        Vue.set(this.editEdu,"add",true);//添加界面显示
        Vue.set(this.empty,"promote",false);//取消无数据提示信息
      },
      openOrPrivacyInfo(index){//是否显示隐藏按钮的事件
        Vue.set(this.openOrPrivacy,[index],!this.openOrPrivacy[index]);//通过类名控制图片和文字颜色
        if(this.openOrPrivacy[index]){
          Vue.set(this.openOrPrivacyText,[index],"隐藏")
        }else{
          Vue.set(this.openOrPrivacyText,[index],"显示")
        }
        /*显示隐藏文字切换*/
      },
      editEduExist(index){//编辑按钮事件，进入编辑模式
        Vue.set(this.editEdu.edit[0],[index],true);
        //编辑和显示的切换
        //console.log(this.buttonColor.exist)
        if(this.inputValue.schoolText[index].length!=0){
          Vue.set(this.buttonColor.exist,[index],false)
        }
        /***************************/
        //var arr=[];
        var that = this;

        //上传图片
          if(that.qqFineloader.length==0){
            for(var i=0;i<that.education.length;i++){
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
      cancellEditEduExist(index){//编辑模式取消编辑事件
        Vue.set(this.editEdu.edit[0],[index],false);
        //console.log("ok")
      },
      deleteEduExist(index){//删除按钮事件
        Vue.set(this.editEdu.delete[0],[index],false);
        this.education.splice(index,1)
        Vue.set(this.editEdu.delete[0],[index],true)//为了解决删除一项后一项不会显示问题
        if(this.education.length==0){//数据完全删除后显示无数据提示
          Vue.set(this.empty,"promote",true);
        }
      },
      //以上是状态的改变
      changeShoolName(index){//编辑状态，改变学校名称
        //console.log(this.inputValue.text[index].length)
        Vue.set(this.textLeng.schoolName,[index],this.inputValue.schoolText[index].length)
        //当input的值改变时后面会相应改变的数字

        if(this.inputValue.schoolText[index].length>=30){
          this.inputValue.schoolText[index]=this.inputValue.schoolText[index].slice(0,29);
        }
        if(this.inputValue.schoolText[index].length!=0){
          Vue.set(this.buttonColor.exist,[index],false)
        }else {
          Vue.set(this.buttonColor.exist,[index],true)
        }
        //通过学校名字的长度，设置提交按钮的不同样式
      },
      changeProfession(index){//编辑状态，改变专业名称
        //console.log(this.inputValue.text[index].length)
        Vue.set(this.textLeng.profession,[index],this.inputValue.professionText[index].length)
        //当input的值改变时改变相应的数字
        if(this.inputValue.professionText[index].length>=30){

          this.inputValue.professionText[index]=this.inputValue.professionText[index].slice(0,29);

        }
      },
      //以上是改变数据
      keepEditEduExist(index){//编辑状态，提交保存

        var judgUpDate=this.education[index].schoolName==this.inputValue.schoolText[index]&&this.education[index].info.profession==this.inputValue.professionText[index]&&this.education[index].info.schoolTimeStart==this.inputValue.schoolTimeStart[index]&&this.education[index].info.schoolTimeEnd==this.inputValue.schoolTimeEnd[index]&&this.education[index].info.introduce == this.inputValue.introduce[index];/*数据是否更改的判断条件*/

        if(this.inputValue.schoolText[index].length!=0){

          if(judgUpDate){
            Vue.set(this.editEdu.edit[0],[index],true);//如果数据没有进行修改不会进行视图切换，单击取消视图会切换
            //以后提交数据的条件
          }else{
            this.education[index].schoolName=this.inputValue.schoolText[index];
            this.education[index].info.profession=this.inputValue.professionText[index];
            this.education[index].info.schoolTimeStart=this.inputValue.schoolTimeStart[index];
            this.education[index].info.schoolTimeEnd=this.inputValue.schoolTimeEnd[index];
            this.education[index].info.introduce = this.inputValue.introduce[index];
            Vue.set(this.editEdu.edit[0],[index],false);//如果学校名称没有填写视图在单击保存时，视图不会切换 单击取消时视图会切换
          }

        }

      },
      //提交数据
      cancellEditEdu(){//添加模式下，取消编辑
        Vue.set(this.editEdu,"add",false);//取消添加的视图
        if(this.education.length==0){//在没有数据并且取消添加数据后，依然显示无数据视图
          Vue.set(this.empty,"promote",true);
        }
        Vue.set(this.newInputValue,"schoolText","")
        Vue.set(this.newInputValue,"TimeStart","")
        Vue.set(this.newInputValue,"schoolTimeEnd","")
        Vue.set(this.newInputValue,"professionText","")
        Vue.set(this.newInputValue,"introduce","")
        /*取消添加后，清除之前添加的数据*/
      },
      addShoolName(){//添加模式下，添加校名
        Vue.set(this.newTextLeng.schoolName,[0],this.newInputValue.schoolText.length)
        //当input的值改变时改变相应的数字
        if(this.newInputValue.schoolText.length>=30){
          this.newInputValue.schoolText=this.newInputValue.schoolText.slice(0,29);
        }
        if(this.newInputValue.schoolText.length!=0){
          Vue.set(this.buttonColor,"add",false)
        }else {
          Vue.set(this.buttonColor,"add",true)
        }
        //通过学校名字的长度，设置提交按钮的不同样式
      },
      addProfession(){//添加模式下，添加专业名
        Vue.set(this.newTextLeng.profession,[0],this.newInputValue.professionText.length)
        //当input的值改变时改变相应的数字

        if(this.newInputValue.professionText.length>=30){
          this.newInputValue.professionText=this.newInputValue.professionText.slice(0,31);
        }
      },
      keepEditEduNew(){//添加模式下保存

        if(this.newInputValue.schoolText.length!=0){
          this.inputValue.schoolText.push(this.newInputValue.schoolText);
          this.inputValue.professionText.push(this.newInputValue.professionText);
          this.inputValue.schoolTimeStart.push(this.newInputValue.schoolTimeStart);
          this.inputValue.schoolTimeEnd.push(this.newInputValue.schoolTimeEnd);
          this.inputValue.introduce.push(this.newInputValue.introduce);
          /*添加的数据，追加到本地数据里一份*/
          this.education.push({schoolName:this.newInputValue.schoolText,info:{schoolTimeStart:this.newInputValue.schoolTimeStart,schoolTimeEnd:this.newInputValue.schoolTimeEnd,profession:this.newInputValue.professionText,introduce:this.newInputValue.introduce}})//向store中追加添加的数据
          /*添加的数据追加到vuex中*/
          Vue.set(this.newInputValue,"schoolText","")
          Vue.set(this.newInputValue,"TimeStart","")
          Vue.set(this.newInputValue,"schoolTimeEnd","")
          Vue.set(this.newInputValue,"professionText","")
          Vue.set(this.newInputValue,"introduce","")
          /*保存添加后，清除之前添加的数据*/
          this.editEdu.delete[0].push(true)//解决添加数据后视图部更新
          Vue.set(this.editEdu,"add",false);//如果学校名称为空不能提交，视图不会切换
          this.openOrPrivacy.push(false);//是否显示样式
          this.openOrPrivacyText.push("显示");//是否显示文本信息
        }
      }
      //新建部分
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  #fine-uploader-manual-trigger{
  	float: left;
  	width: 680px;
  }
  .educationIndex{
    width:940px;
    float: left;
    padding:0 40px;
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
        border-bottom: 2px solid $themeColor;
        margin-bottom: -1px;
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
    .educationContainer{
      padding:0 20px;
      .eduInfo{
        padding-top:25px;

        .eduInfoContainer{
          border-bottom: 1px solid $borderColor;
          div:nth-child(1){
            color: $themeColor;
            padding-bottom:12px;
            h4{
              font-size: 18px;
              float: left;
            }
            ul{
              float: right;
              li{
                float: left;
                cursor: pointer;
              }
              li:nth-child(1){
                padding-left:37px;
                padding-right:20px;

                background: url("../../../assets/img/personal/education/eye.png") left center no-repeat;
              }
              li:nth-child(2){
                padding:0 20px 0 22px;
                background: url("../../../assets/img/personal/education/edit.png") left center no-repeat;
              }
              li:nth-child(3){
                padding:0 20px 0 26px;
                background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
              }
              
              .openOrPrivacy{
                  background: url("../../../assets/img/personal/education/hidden.png") left center no-repeat!important;
                  color: #353535;
              }
            }
          }
          div:nth-child(2){
            width:820px;
            float: left;
            padding-bottom:25px;
            p{
              float: left;
              font-size:14px;
            }
            p:nth-child(1){
              width:292px;
              height: 21px;
            }
            p:nth-child(2){
              width:214px;
              height: 21px;
            }
          }
        }
      }

      .editEduInfo{
        padding:20px 0;
        color: $themeColor;
        border-bottom:1px solid $borderColor;
        li{
          padding:10px 0;
          .wrap-left{
          	width: 80px;
          	line-height: 35px;
          	text-align: right;
          	float: left;
          	color:$themeColor;
          	margin-right: 35px;
          }
          input{
            /*margin-left:32px;*/
            height: 35px;
            border:1px solid $borderColor;
            border-radius: 5px ;
            padding-left:12px;
            margin-right:10px;
            color: rgb(54,54,54);
          }
          span{
          	line-height: 35px;
          	display: inline-block;
            color: $emptyColor;
          }
          input[type=month]::-webkit-inner-spin-button{
            visibility: hidden;
          }
          /*input[type=month]::-webkit-datetime-edit-fields-wrapper{
            visibility: hidden;
          }*/

        }
        li:nth-child(1){
        	 height: 55px;
          input{
            width:480px;
            /*margin-left:26px;*/
          }
        }
        li:nth-child(2){
          color: #000;
          span{
            float: left;
            line-height: 35px;
          }
          .date-picker{
            width:140px;
            float: left;
          }
          span:nth-child(1){
            color: $themeColor;
            /*margin-right: 35px;*/
          }
          span:nth-child(3){
            margin:0 20px;
          }
        }
        li:nth-child(3){
          input{
            width:480px;
          }
        }
        li:nth-child(4){
          input{
            width:480px;
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
        	padding-left: 110px;
        	color: #999999;
        }
        li.btnBox{
          padding-left:93px;
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
          .eduDisabled{
            border:0px;
            color: #fff;
            background: url("../../../assets/img/personal/education/btn_save_disabled.png.png") left center no-repeat;
          }
        }
      }
    }
  }
</style>
