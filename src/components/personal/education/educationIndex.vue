<template>
  <div class="educationIndex">
    <div  class="title clear">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addEdu" v-if="!editEdu.add">添加</p>
    </div>
    <div class="educationContainer">
      <div class="personal-empty" v-if="empty.promote">（您尚未添加教育背景信息）</div>

      <div class="eduInfo" v-for="(item,index) in education" v-show="!editEdu.add">

        <div class="eduInfoContainer clear" v-show="editEdu.delete[index]">
          <div v-show="!editEdu.edit[index]" class="clear">
            <h4 v-cloak>{{item.schoolName}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:!openOrPrivacy[index]}" v-on:click="openOrPrivacyInfo(index)">{{openOrPrivacyText[index]}}</li>
              <li v-on:click="editEduExist(index)">编辑</li>
              <li v-on:click="deleteEduExist(index)">删除</li>
              <!--确认删除该项目模态框-->
			    			<div id="modal-overlay" v-bind:class="deleteModalClass[index]">
									<div class="deleteEdu">
										<h5>删除</h5>
										<span class="modalChaBtn" @click="closeModal(index)"></span>
										<div class="content-wrap">
										<p class="deleteOrNo">确定删除此条信息吗？</p>
										<div class="btnBox">
											<span class="cancelBtn" @click="cancleDele(index)">取消</span>
											<span class="confirmBtn" @click="confirmDelete(index)">确认</span>
										</div>
										</div>
									</div>
								</div>
			    		<!--确认删除该项目模态框-->
            </ul>
          </div>
          <div v-show="!editEdu.edit[index]">
            <p v-cloak >{{item.schoolTimeUp}} — {{item.schoolTimeDown}}</p>
            <p v-cloak >专业：{{item.professionName}}</p>
            <p v-cloak >学历：{{item.education}}</p>
          </div>
          <ul class="morePics" v-if="!show.tag[index]" v-show="!editEdu.edit[index]">
						<li v-for="item in picArr[index]">
							<img :src="item.pic"/>
						</li>

		    	</ul>
					<div class="viewMore" v-show="!editEdu.edit[index]">
						<p v-bind:class="{viewDown:show.tag[index],viewUp:!show.tag[index]}" @click="upDown(index)">
								<span>{{updowntxt[index]}}</span>
						</p>
					</div>

          <ul class="editEduInfo" v-show="editEdu.edit[index]">
            <li class="clear">
              <span class="wrap-left">*学校名称</span>
							<input maxlength="30" v-model="localEdu[index].schoolName"  type="text" placeholder="请输入学校名称" v-on:input="changeShoolName(index)"><span>{{textLeng.schoolName[index]}}/30</span>
						  <alertTip v-if="showAlert.schoolName" :showHide="showAlert.schoolName"  :alertText="alertText.schoolName"></alertTip>
            	
            </li>
            <li class="clear">
              <span class="wrap-left">*在校时间</span>
              <!-- <datepicker v-model="localEdu[index].schoolTimeUp"></datepicker> -->
							<year-month v-model="localEdu[index].schoolTimeUp"></year-month>
              <span>——</span>
              <!-- <datepicker v-model="localEdu[index].schoolTimeDown"></datepicker> -->
							<year-month v-model="localEdu[index].schoolTimeDown" :min="localEdu[index].schoolTimeUp" :today="true"></year-month>
						  <alertTip v-if="showAlert.schoolTime" :showHide="showAlert.schoolTime"  :alertText="alertText.schoolTime"></alertTip>
            	
            </li>
            <li class="clear">
              <label>
                <span class="wrap-left">专业名称</span>
								<input maxlength="30" v-model="localEdu[index].professionName" v-on:input="changeProfession(index)" type="text" placeholder="请输入专业名称"><span>{{textLeng.profession[index]}}/30</span>
              </label>
            </li>
            <li class="clear">
              <label>
                <span class="wrap-left">所获学历 </span>
								<select v-model="localEdu[index].education">
									<option value="大专">大专</option>
									<option value="本科">本科</option>
									<option value="硕士">硕士</option>
									<option value="博士">博士</option>
									<option value="其他">其他</option>
								</select>
              </label>
            </li>
            <li class="img-wrap clear" >
							<span class="wrap-left">学历证书</span>
							<ul class="imgShow">
								<li v-for="(item,$ind) in picArr[index]">
									<img :src="item.pic"/>
									<span class="delePic" @click="deleThisPic(item.id,index,$ind)"></span>
								</li>

							</ul>

							<script type="text/template" :id="qqTemplate[index]">
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
            <li class="btnBox">
              <button v-bind:class="{eduDisabled: buttonColor.exist[index]}" v-on:click="keepEditEduExist(index)">保存</button>
              <button v-on:click="cancellEditEduExist(index)">取消</button>
            </li>
          </ul>
        </div>

      </div>

      <ul class="editEduInfo" v-show="editEdu.add">
        <li class="clear">
          <label>
           <span class="wrap-left">*学校名称 </span>
					 <input maxlength="30" v-model="newInputValue.schoolName" v-on:input="addShoolName" type="text" placeholder="请输入学校名称"><span>{{newTextLeng.schoolName[0]}}/30</span>
          </label>
					<alertTip v-if="showAlert.schoolName" :showHide="showAlert.schoolName"  :alertText="alertText.schoolName"></alertTip>
          
        </li>
        <li class="clear">
          <span class="wrap-left">*在校时间</span>
          <!-- <datepicker v-model="newInputValue.schoolTimeUp"></datepicker> -->
					<year-month v-on:input="addShoolTime" v-model="newInputValue.schoolTimeUp"></year-month> 
          <span>——</span>
          <!-- <datepicker v-model="newInputValue.schoolTimeDown" v-bind:value="{type:['month']}"></datepicker> -->
					<year-month v-on:input="addShoolTime" v-model="newInputValue.schoolTimeDown" :min="newInputValue.schoolTimeUp" :today="true"></year-month>
					<alertTip v-if="showAlert.schoolTime" :showHide="showAlert.schoolTime"  :alertText="alertText.schoolTime"></alertTip>
				
        </li>
        <li class="clear">
          <label>
            <span class="wrap-left">专业名称</span> 
						<input maxlength="30" v-model="newInputValue.professionName" v-on:input="addProfession" type="text" placeholder="请输入专业名称"><span>{{newTextLeng.profession[0]}}/30</span>
          </label>
        </li>
        <li class="clear">
          <label>
            <span class="wrap-left">所获学历</span>
						<select v-model="newInputValue.education">
							<option value="大专">大专</option>
							<option value="本科">本科</option>
							<option value="硕士">硕士</option>
							<option value="博士">博士</option>
							<option value="其他">其他</option>
						</select>
          </label>
        </li>
        <li class="img-wrap clear">
					<span class="wrap-left">学历证书</span>

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
			                    <button type="button" class="qq-btn qq-upload-retry-selector qq-upload-retry">重试</button>
			                    <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">删除</button>
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
			                <span>正在上传...</span>
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
				<!--<li class="tip-wrap clear">
          <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
        </li>-->
				<li class="tip-wrap">
          <p>( 可上传相关图片，支持JPG、PNG,不得超过8张 )</p>
        </li>
        <li class="btnBox clear">
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
  import datepicker from "../units/Datepicker.vue"
  import qq from "fine-uploader"
  import MyAjax from "../../../assets/js/MyAjax.js"
  import {singleManualUploader,moreManualUploader} from "../../../assets/js/manualUploader.js"
	import YearMonth from "../units/yearMonth.vue"
	import Modal from "../../../assets/js/modal.js"
	import alertTip from "../units/alertTip.vue"
	
  export default {
    name: 'educationIndex',
    components:{
			datepicker,
			YearMonth,
			alertTip
    },
    data:function() {
      return {
        title:"教育背景",
        empty:{promote:true},
        updowntxt:[],
        show:{
        	tag:[],
        },
        deleteModalClass:[],
        editEdu:{add:false,edit:[],delete:[]},
        //状态部分
        textLeng:{schoolName:[],profession:[]},
        newTextLeng:{schoolName:[0],profession:[0]},
        showAlert:{schoolName:false,schoolName:false},//提示框显隐
	      alertText:{schoolName:null,schoolName:null},
        //字符段长度
        openOrPrivacy:[],//信息是否公开显示,通过服务器获取的数据
        openOrPrivacyText:[],//信息是否公开显示,文本信息
        education:[],//用于存放请求的数据；
        localEdu:[],//本地用于编辑的数据
        newInputValue:{
        	"professionName": "",
		      "schoolTimeDown": "",
		      "creAccountID": "",
		      "creTime": "",
		      "pkid": "",
		      "schoolName": "",
		      "schoolTimeUp": "",
		      "educationCode": "",
		      "education": "",
		      "ifVisable": 1,
		      "accountID": "",
		      picId:[],
        },
        picArr:[],//图片展示的数组
        picNum:[],//各条信息已经上传的图片数
        buttonColor:{exist:[],add:true},//按钮颜色
        //实例化上传图像的element根据信息条数添加className
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化

      }
    },

    mounted(){

		this.updateData();
		if(this.education.length==0){
			Vue.set(this.empty,"promote",true)//是否显示教育背景信息尚未添加
		}else {
			Vue.set(this.empty,"promote",false)//是否显示教育背景信息尚未添加
		}
		//上传图片
    },
    methods:{
    	updateData(){//更新本地数据
    		var that = this;
	    	var url = MyAjax.urlsy +"/psnEduBackGround/findByMySelf/"+"string";
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					console.log(data.msg)
					if(data.code==0){
						that.education = data.msg;
					}else{
						console.log("错误返回");
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

	        that.localEdu=JSON.parse(JSON.stringify(that.education));
	    		that.openOrPrivacy = [];
	        that.openOrPrivacyText = [];
	        that.fineUploaderId = [];
	        that.qqTemplate = [];
	        that.editEdu.edit=[];
	        that.editEdu.delete = [];
	        that.textLeng.schoolName = [];
	        that.textLeng.profession = [];
	        that.showAlert.schoolName = false;
	        that.showAlert.schoolTime = false;
	        that.alertText.schoolName = null;
	        that.alertText.schoolTime = null;
	        that.buttonColor.exist = [];
	        that.show.tag=[];
	    		that.updowntxt=[];
	    		that.deleteModalClass = [];
					if(that.education.length!=0){
						Vue.set(that.empty,"promote",false)
						//if 有信息 信息为空的提升隐藏
						for(let i=0;i<that.education.length;i++){
							if(that.education[i].schoolTimeDown=="0002.12"){
							 	that.education[i].schoolTimeDown = "至今";
							}
							if(that.localEdu[i].schoolTimeDown=="0002.12"){
							 	that.localEdu[i].schoolTimeDown = "至今";
							}
							that.education[i].professionName = emptyText(that.education[i].professionName);//空值判断
							that.education[i].education = emptyText(that.education[i].education);
							that.fineUploaderId.push("fine-uploader-manual-trigger"+that.education[i].pkid);
							that.qqTemplate.push("qq-template-manual-trigger"+that.education[i].pkid);
							that.editEdu.edit.push(false);
							that.editEdu.delete.push(true);
							that.textLeng.schoolName.push(0);
							that.textLeng.profession.push(0);
							that.buttonColor.exist.push(true);//控制每一个保存按钮颜色
							Vue.set(that.textLeng.schoolName,[i],that.localEdu[i].schoolName.length)
							Vue.set(that.textLeng.profession,[i],that.localEdu[i].professionName.length)
							that.show.tag[i]=true;
							that.updowntxt.push("展开查看更多");
							that.deleteModalClass.push("deleteModalClass"+i);//添加模态框类名
							if(that.education[i].ifVisable==1){
								that.openOrPrivacy.push(true);
								that.openOrPrivacyText.push("显示")
							}else{
									that.openOrPrivacy.push(false);
									that.openOrPrivacyText.push("隐藏")
							}

						}
					}else{
						Vue.set(this.empty,"promote",true)
					}


    	},
    	getPicture(index){
    		var that = this;
    		var url = MyAjax.urlsy+"/psnEduBackGround/findPicsById/"+that.education[index].pkid;
    		//promise解决异步加载数据延迟
    		return new Promise((resolve, reject) => {
			    MyAjax.ajax({
			      type: "GET",
						url:url,
						dataType: "json",
						async: true, 
						},(data) => {
								resolve(data);
						},(err) => {
								reject(err);
						});
					});
    	},
    	upDown(index){
    		var that = this;
				if(that.show.tag[index]==true){
					Vue.set(that.show.tag,[index],false)
					that.updowntxt[index] = "收起"
					that.getPicture(index).then(function(data){
		    			Vue.set(that.picArr,[index],data.msg)
						Vue.set(that.picNum,[index],that.picArr[index].length)
		    		});
				}else{
					Vue.set(that.show.tag,[index],true)
					that.updowntxt[index] = "展开查看更多"
				}
    		that.show.tag[index] == true? false:true;
    		that.updowntxt[index]=="展开查看更多"?"收起":"展开查看更多";

    	},
      addEdu(){//添加按钮事件
        Vue.set(this.editEdu,"add",true);//添加界面显示
        Vue.set(this.empty,"promote",false);//取消无数据提示信息
        Vue.set(this.newInputValue,"schoolName","")
        Vue.set(this.newInputValue,"schoolTimeUp","")
        Vue.set(this.newInputValue,"schoolTimeDown","")
        Vue.set(this.newInputValue,"professionName","")
        Vue.set(this.newInputValue,"education","")
        var that=this;
        singleManualUploader({
	        element:"fine-uploader-manual-trigger",
					template: "qq-template-manual-trigger",
	        url:MyAjax.urlsy+'/psnEduBackGround/batchUpload',
	        picIdCont:that.newInputValue.picId,
	        btnPrimary:".btn-primary",
					canUploadNum:3,
	    })

      },
      openOrPrivacyInfo(index){//是否显示隐藏按钮的事件
        Vue.set(this.openOrPrivacy,[index],!this.openOrPrivacy[index]);//通过类名控制图片和文字颜色
        // if(!this.openOrPrivacy[index]){
          
        // }else{
          
        // }
        // for(let i=0;i<this.openOrPrivacy.length;i++){
        // 	if(this.openOrPrivacy[i]==false){
        // 		this.education[i].ifVisable = 0;
        // 	}else{
        // 		this.education[i].ifVisable = 1;
        // 	}
        // }

				if(this.openOrPrivacy[index]){
					this.education[index].ifVisable=1
					Vue.set(this.openOrPrivacyText,[index],"隐藏")
				}else{
					this.education[index].ifVisable = 0;
					Vue.set(this.openOrPrivacyText,[index],"显示")
				}
        var that = this;
				if(that.education[index].schoolTimeDown=="至今"){
				 	that.education[index].schoolTimeDown = "0000.00.00";
				 }
        var url = MyAjax.urlsy +"/psnEduBackGround/update"
        $.ajaxSetup({ contentType : 'application/json' });
        MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.education[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})//更新到服务器
				//保存之后再重新拉取数据
				that.updateData();
        /*显示隐藏文字切换*/
      },
      async editEduExist(index){//编辑按钮事件，进入编辑模式
				let professionName=this.localEdu[index].professionName;
				let education=this.localEdu[index].education; 
        professionName=="（暂无信息）" ? this.localEdu[index].professionName="":professionName=professionName;
				education=="（暂无信息）"?this.localEdu[index].education="":education=education;
				//如果将要编辑的数据为（暂无信息），则重置位空
      	var that = this;
      	//promise 的then方法里面去读取已经上传的图片张数，然后实例化上传组件，以便控制可上传的图片张数
      	const getPic = await that.getPicture(index);
      	if(getPic.code === 0){
      		const data = await Promise.resolve(true).then(
  				function(){
  					Vue.set(that.picArr,[index],getPic.msg)
		    	  	Vue.set(that.picNum,[index],that.picArr[index].length)
		    	  	return that.picNum;
  				}
  			)
      	}
      	//实例化上传控件
      	if(Math.floor(3-that.picNum[index])>0){
      		that.localEdu[index].picId = [];
      		$("#"+this.fineUploaderId[index]).html("")
		    moreManualUploader({
		      	nameList:'manualUploader'+index,
			    element:that.fineUploaderId[index],
			    template: that.qqTemplate[index],
			    url:MyAjax.urlsy+'/psnEduBackGround/batchUpload',
			    anotherParam:that.localEdu[index].pkid,
			    picIdCont:that.localEdu[index].picId,
			    btnPrimary:".btn-primary",
			    canUploadNum : Math.floor(3-that.picNum[index]),
		    })
      	}
        Vue.set(that.editEdu.edit,[index],true);
        //编辑和显示的切换
        if(that.localEdu[index].schoolName.length!=0){
          Vue.set(that.buttonColor.exist,[index],false)
        }
      },
      deleThisPicPromise(id){//封装删除图片的promise，异步操作动态改变可上传数量
      	var that = this;
      	var url = MyAjax.urlsy + "/psnEduBackGround/delPic/"+ id
      	var p = new Promise((resolve, reject) => {
			    MyAjax.ajax({
			      type: "POST",
					url:url,
					dataType: "json",
					async: true, 
			    },(data) => {
			        resolve(data);
			     },(err) => {
			        reject(err);
			     });
			  });
			  return p;
      },
      async deleThisPic(id,index,$ind){//删除图片
      	var that = this;
				const dele = await that.deleThisPicPromise(id);
				
				if(dele.code===0){
					const getPic = await that.getPicture(index);
					if(getPic.code===0){
							const data = await Promise.resolve(true).then(
									function(){
										Vue.set(that.picArr,[index],getPic.msg)
										Vue.set(that.picNum,[index],that.picArr[index].length)
										return that.picNum;
									}
								)
					}
				}

				that.localEdu[index].picId = [];
				$("#"+this.fineUploaderId[index]).html("")
					moreManualUploader({
							nameList:'manualUploader'+index,
						element:that.fineUploaderId[index],
						template: that.qqTemplate[index],
						url:MyAjax.urlsy+'/psnEduBackGround/batchUpload',
						deleteUrl:MyAjax.urlsy + "/psnEduBackGround/delPic/",
						anotherParam:that.localEdu[index].pkid,
						picIdCont:that.localEdu[index].picId,
						btnPrimary:".btn-primary",
						canUploadNum:Math.floor(3-that.picNum[index]),
					})
      },
      cancellEditEduExist(index){//编辑模式取消编辑事件
        Vue.set(this.editEdu.edit,[index],false);
				setTimeout(() => {
 					$("#"+this.fineUploaderId[index]).html("");
 				}, 1);
 				//this.localEdu[index]=JSON.parse(JSON.stringify(this.education[index]));
				this.localEdu[index].education=this.education[index].education;
				this.localEdu[index].professionName=this.education[index].professionName;
				this.localEdu[index].schoolTimeUp=this.education[index].schoolTimeUp;
				this.localEdu[index].schoolTimeDown=this.education[index].schoolTimeDown;
      },
      
      deleteEduExist(index){//删除按钮事件
				var aa = "deleteModalClass"+index;
    		Modal.makeText($('.'+aa))
        
      },
      closeModal(index){
				var aa = "deleteModalClass"+index;
    		Modal.closeModal($('.'+aa))
			},
      confirmDelete(index){
      	if(this.education.length==0){//数据完全删除后显示无数据提示
          Vue.set(this.empty,"promote",true);
        }
        var that = this;
        console.log(that.education[index].pkid)
        var url = MyAjax.urlsy+"/psnEduBackGround/del/"+that.education[index].pkid;
        MyAjax.delete(url)

        that.updateData();
        that.closeModal(index);
      },
      cancleDele(index){
    		//取消删除该项目
    		this.closeModal(index);
    	},
      //以上是状态的改变
      changeShoolName(index){//编辑状态，改变学校名称
        //console.log(this.inputValue.text[index].length)
        Vue.set(this.textLeng.schoolName,[index],this.localEdu[index].schoolName.length)
        //当input的值改变时后面会相应改变的数字

        if(this.localEdu[index].schoolName.length>=30){
          //this.localEdu[index].schoolName=this.localEdu[index].schoolName.slice(0,29);
        }
				let condition=this.localEdu[index].schoolName.length!=0
					&&this.localEdu[index].schoolTimeUp.length!=0
					&&this.localEdu[index].schoolTimeDown.length!=0;
        if(condition){
          Vue.set(this.buttonColor.exist,[index],false)
        }else {
          Vue.set(this.buttonColor.exist,[index],true)
        }
        //通过学校名字的长度，设置提交按钮的不同样式
      },
      changeProfession(index){//编辑状态，改变专业名称
        //console.log(this.inputValue.text[index].length)
        Vue.set(this.textLeng.profession,[index],this.localEdu[index].professionName.length)
        //当input的值改变时改变相应的数字
        if(this.localEdu[index].professionName.length>=30){
          //this.localEdu[index].professionName=this.localEdu[index].professionName.slice(0,29);
        }
      },
      //以上是改变数据
			keepEditEduExist(index){//编辑状态，提交保存
			let condition=this.localEdu[index].schoolName.length!=0
				&&this.localEdu[index].schoolTimeUp.length!=0
				&&this.localEdu[index].schoolTimeDown.length!=0;
				if(condition){
					//必填项是否为空判断
					var that = this;
					if(that.localEdu[index].schoolTimeDown=="至今"){
						that.localEdu[index].schoolTimeDown = "0000.00.00";
					}		
					var url = MyAjax.urlsy+"/psnEduBackGround/update"
					$.ajaxSetup({ contentType : 'application/json' });
					MyAjax.ajax({//更新到服务器
						type: "POST",
						url:url,
						data: JSON.stringify(that.localEdu[index]),
						dataType: "json",
						contentType:"application/json;charset=utf-8",
						async: true,
					},function(data){
						if(data.code === "200001"){
							console.log(data.msg)
						}else{
							that.updateData();
							setTimeout(() => {
								$("#"+that.fineUploaderId[index]).html("")
							}, 1);
							Vue.set(that.editEdu.edit,[index],false);//如果数据没有进行修改不会进行视图切换，单击取消视图会切换
						}
						
					})
				}	else{
						if(that.localEdu[index].schoolName.trim().length===0){
							that.showAlert.schoolName = true;
							that.alertText.schoolName = "请输入学校名称"
						}else{
							that.showAlert.schoolName = false;
							that.alertText.schoolName = ""
						}
						if(that.localEdu[index].schoolTimeUp.trim().length===0||that.localEdu[index].schoolTimeDown.trim().length===0){
							that.showAlert.schoolTime = true;
							that.alertText.schoolTime = "请输入在校时间"
						}else{
							that.showAlert.schoolTime = false;
							that.alertText.schoolTime = ""
						}
					}
        //提交编辑后的数据

      },
      //提交数据
      cancellEditEdu(){//添加模式下，取消编辑
        Vue.set(this.editEdu,"add",false);//取消添加的视图
        if(this.education.length==0){//在没有数据并且取消添加数据后，依然显示无数据视图
          Vue.set(this.empty,"promote",true);
        }
        Vue.set(this.newInputValue,"schoolName","")
        Vue.set(this.newInputValue,"schoolTimeUp","")
        Vue.set(this.newInputValue,"schoolTimeDown","")
        Vue.set(this.newInputValue,"professionName","")
        Vue.set(this.newInputValue,"education","")
        setTimeout(() => {
					$("#fine-uploader-manual-trigger").html("")
				}, 1);
				this.updateData();
        /*取消添加后，清除之前添加的数据*/
      },
      addShoolName(){//添加模式下，添加校名
        Vue.set(this.newTextLeng.schoolName,[0],this.newInputValue.schoolName.length)
        //当input的值改变时改变相应的数字
        if(this.newInputValue.schoolName.length>=30){
          //this.newInputValue.schoolName=this.newInputValue.schoolName.slice(0,29);
        }
				let condition=this.newInputValue.schoolName.length!=0
				&&this.newInputValue.schoolTimeUp.length!=0
				&&this.newInputValue.schoolTimeDown.length!=0;//必填项是否全部填写
        if(condition){
          Vue.set(this.buttonColor,"add",false)
        }else {
          Vue.set(this.buttonColor,"add",true)
        }
        //通过学校名字的长度，设置提交按钮的不同样式
      },
			addShoolTime(){
				let condition=this.newInputValue.schoolName.length!=0
				&&this.newInputValue.schoolTimeUp.length!=0
				&&this.newInputValue.schoolTimeDown.length!=0;//必填项是否全部填写
				if(condition){
					Vue.set(this.buttonColor,"add",false)
				}else {
          Vue.set(this.buttonColor,"add",true)
        }
			},
      addProfession(){//添加模式下，添加专业名
        Vue.set(this.newTextLeng.profession,[0],this.newInputValue.professionName.length)
        //当input的值改变时改变相应的数字

        if(this.newInputValue.professionName.length>=30){
          //this.newInputValue.professionName=this.newInputValue.professionName.slice(0,29);
        }
      },
      keepEditEduNew(){//添加模式下保存
				let condition=this.newInputValue.schoolName.length!=0
					&&this.newInputValue.schoolTimeUp.length!=0
					&&this.newInputValue.schoolTimeDown.length!=0;//必填项是否全部填写
				if(condition){
					if(that.newInputValue.schoolTimeDown=="至今"){
						that.newInputValue.schoolTimeDown = "0000.00.00";
					}
          this.localEdu.push(JSON.parse(JSON.stringify(this.newInputValue)))
          /*添加的数据，追加到本地数据里一份*/
         
					//以上是一些状态的控制
					var that = this;
					
					var url = MyAjax.urlsy+"/psnEduBackGround/insert";
					$.ajaxSetup({ contentType : 'application/json' });
					MyAjax.ajax({
						type: "POST",
						url:url,
						data:JSON.stringify(that.newInputValue),
						dataType: "json",
						async: false,
					},function(data){
						console.log(data)
					},function(err){
						console.log(err)
					})
					that.updateData();

					setTimeout(function(){
						$("#fine-uploader-manual-trigger").html("")
					},1)
        }else{
					if(that.newInputValue.schoolName.trim().length===0){
						that.showAlert.schoolName = true;
						that.alertText.schoolName = "请输入学校名称"
					}else{
						that.showAlert.schoolName = false;
						that.alertText.schoolName = ""
					} 
					if (that.newInputValue.schoolTimeUp.trim().length===0||that.newInputValue.schoolTimeDown.trim().length===0){
						that.showAlert.schoolTime = true;
						that.alertText.schoolTime = "请输入在校时间"
					}else{
						that.showAlert.schoolTime = false;
						that.alertText.schoolTime = ""
					}
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
  	float: right !important;
  }
  .educationIndex{
    width:940px;
    float: left;
    padding:0 40px;
    padding-bottom: 40px;
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
        	&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
          border-bottom: 1px solid $borderColor;
          div:nth-child(1){
            color: $themeColor;
            padding-bottom:12px;
            h4{
              font-size: 14px;
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
              .deleteEdu{
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
							    background: #f7f7f7;
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
								    	margin-left: 110px;
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
												padding-left: 0 !important;
								    		&.cancelBtn{
								    			border: 1px solid #e0e0e0;
							
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
						    		
						    		
						    }
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
            p:nth-child(1){//显示列表，时间
              width:154px;
              height: 21px;
            }
            p:nth-child(2){//显示列表，专业
              width:500px;
              height: 21px;
            }
          }
          .morePics{
						overflow: hidden;
						margin-top: 15px;
						float: left;
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						li{
							float: left;
							position: relative;
							&:hover{
								.delePic{
									display: block;

								}
							}
							img{
								float: left;
								width: 160px;
								height: 100px;
								margin-right: 15px;
								margin-bottom: 15px;

							}

						}

					}
					.viewMore{
						float: left;
						width: 100%;
						height: 14px;
						line-height: 14px;
						color: $activeColor;
						margin-top: 15px;
						margin-bottom: 20px;
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

      .editEduInfo{
        padding:20px 0;
        color: $themeColor;
        /*border-bottom:1px solid $borderColor;*/
        li{
          padding:10px 0;
          position: relative;
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
					.alet_container{
          	right: 10px;
          	top: 15px;
          	bottom: 0;
          }
        }
        li:nth-child(1){//学校名称
        	 height: 55px;
          input{
            width:480px;
            /*margin-left:26px;*/
          }
        }
        li:nth-child(2){//在校时间
          color: #000;
          span{
            float: left;
            line-height: 35px;
          }
          .year-month{
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
        li:nth-child(3){//专业名词
        	height: 55px;
          input{
            width:480px;
          }
        }
        li:nth-child(4){//学历下拉
          select{
						width:100px;
						height: 35px;
						border-radius: 5px;
						color: #363636;
						border: 1px solid #ebebeb;
						padding-left: 12px;
          }
        }
        li.img-wrap{
        	/*padding-left: 30px;*/
        	.imgShow{
        		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
        		width: 700px;
        		float: right;
        		li{
        			float: left;
        			width: 200px;
		         	height: 200px;
	          	padding: 10px;
	          	background: rgba(210,210,210,.3);
	          	border-radius: 10px;
	          	margin-right: 10px;
	          	margin-bottom: 10px;
							position: relative;
							&:hover{
								.delePic{
									display: block;
			
								}
							}
					img{
						width: 180px;
						max-height: 180px;
						margin-right: 15px;
						margin-bottom: 15px;

					}
					.delePic{
						width: 21px;
						height: 21px;
						position: absolute;
						right: 10px; top: 10px;
						background: url(../../../assets/img/personal/education/delePic.png) no-repeat;
						display: none;
						cursor: pointer;
					}
        		}

        	}

        	>div{
        		width: 700px;
        		float: right;

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
