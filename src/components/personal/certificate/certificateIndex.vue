<template>
  <div class="certificate">

    <div class="title clear">
      <h2 v-cloak>{{title.text}}</h2>
      <p v-on:click="addInfo" v-if="reveal.addCertificate">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="certificateContainer" v-show="reveal.addCertificate">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加执业资格信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="certificateInfo" v-for="(item,index) in certificate">
        <!--显示信息列表开始-->
        <div class="certificateInfoList clear" v-show="!reveal.editInfo[index]">
          <div class="certificateInfoTitle clear">
            <h4 v-cloak>{{item.qualificationName}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">
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
            <p v-cloak>注册单位  : {{item.registeredUnit}}</p>
            <p v-cloak>证书编号  ：{{item.certificateNumber}}</p>
          </div>
          <ul class="morePics" v-if="!show.tag[index]">
		    		<li v-for="item in picArr[index]">
							<img :src="item.pic"/>
						</li>
		    	</ul>
					<div class="viewMore" >
						<p v-bind:class="{viewDown:show.tag[index],viewUp:!show.tag[index]}" @click="upDown(index)">
							
								<span>{{updowntxt[index]}}</span>
						</p>
					</div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="certificateInfoEdit" v-show="reveal.editInfo[index]">
          <ul class="edit-wrap">
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li class="clear">
              <label>
                <h5>*&nbsp;资格名称</h5>
                <input v-model="localCertificate[index].qualificationName" type="text" placeholder="请输入资格名称">
              </label>
            </li>
            <li class="clear">
              <label>
                <h5>注册单位</h5>
                <input v-model="localCertificate[index].registeredUnit" type="text" placeholder="请输入注册单位">
              </label>
            </li>
            <li class="clear">
              <label>
                <h5>证件编号</h5>
                <input v-model="localCertificate[index].certificateNumber" type="text" placeholder="请输入证件编号">
              </label>
            </li>
            <li class="img-wrap clear" >
							<span class="wrap-left">图片展示</span>
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
        <li  class="clear">
          <label>
            <h5>*&nbsp;资格名称</h5>
            <input v-model="newCertificate.qualificationName" type="text" placeholder="请输入资格名称">
          </label>
        </li>
        <li  class="clear">
          <label>
            <h5>注册单位</h5>
            <input v-model="newCertificate.registeredUnit" type="text" placeholder="请输入注册单位">
          </label>
        </li>
        <li  class="clear">
          <label>
            <h5>证件编号</h5>
            <input v-model="newCertificate.certificateNumber" type="text" placeholder="请输入证件编号">
          </label>
        </li>
        <li class="img-wrap clear">
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
			    <div id="fine-uploader-manual-trigger"></div>
				</li>
				<li class="tip-wrap clear">
          <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
        </li>
        <li class="clear">
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
  import MyAjax from "../../../assets/js/MyAjax.js"
  import {singleManualUploader,moreManualUploader} from "../../../assets/js/manualUploader.js"
  
  
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
        updowntxt:[],
        show:{
        	tag:[],
        },
        certificate:[],
        localCertificate:[],
        newCertificate:{
          "accountID": "",
				  "certificateNumber": "",
				  "creAccountID": "",
				  "creTime": "",
				  "ifVisable": 1,
				  "pkid": "",
				  "qualificationName": "",
				  "registeredUnit": "",
				  picId:[],
        },
        picArr:[],//图片展示的数组
        picNum:[],//各条信息已经上传的图片数
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
        
      }
    },

    mounted(){
    	this.updateData();
    	//上传图片
      console.log(this.certificate)
			
      if(this.certificate.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
        this.reveal.editInfo.push(false);//信息是否可以编辑赋初始值
      }
      /*以上是初始化*/
      
     
    },
    updated(){
      if(this.certificate.length==0){
        Vue.set(this.reveal,"empty",true)
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newCertificate.qualificationName.length!=0){
        if(this.newCertificate.qualificationName.trim().length!=0){
          Vue.set(this.reveal,"keepAdd",false);
          Vue.set(this.newCertificate,"qualificationName",this.newCertificate.qualificationName.trim())//进行空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAdd",true);
      }
      /*控制保存按钮的背景颜色*/
    },
    
    methods:{
    	updateData(){
    		var that = this;
	    	var url = MyAjax.urlsy+"/psnQualification/findByMySelf/"+"string";
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
          if(data.code==0){
					  that.certificate = data.msg;
					}else{
						console.log("错误返回");
					}
				},function(err){
					console.log(err)
				})
	    	/*数据同步本地一份开始*/
        that.localCertificate=JSON.parse(JSON.stringify(that.certificate));
        that.fineUploaderId = [];
	    	that.qqTemplate = [];
	    	that.reveal.openOrPrivacyText = [];
	    	that.reveal.openOrPrivacy = [];
	    	that.show.tag=[];
	    	that.updowntxt=[];
	    	for(var i=0;i<that.certificate.length;i++){
	    		that.fineUploaderId.push("fine-uploader-manual-trigger"+that.localCertificate[i].pkid);
	    		that.qqTemplate.push("qq-template-manual-trigger"+that.localCertificate[i].pkid);
	    		that.show.tag[i]=true;
	    		that.updowntxt.push("展开查看更多");
	    		if(that.certificate[i].ifVisable==1){
	    			that.reveal.openOrPrivacy.push(true);//信息是否对外显示赋初始值
	        	that.reveal.openOrPrivacyText.push("显示");//信息是否对外显示文字切换赋初始值	
	        	
	    		}else{
	    			that.reveal.openOrPrivacy.push(false);//信息是否对外显示赋初始值
	        	that.reveal.openOrPrivacyText.push("隐藏");//信息是否对外显示文字切换赋初始值		
	    		}
	    	}
    	},
    	getPicture(index){
    		var that = this;
    		var url = MyAjax.urlsy+"/psnQualification/findPicsById/"+that.certificate[index].pkid;
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
//  		Vue.set(this.show,"tag[index]",false)
				console.log(this.show.tag[index])
				if(this.show.tag[index]==true){
					Vue.set(this.show.tag,[index],false)
					this.updowntxt[index] = "收起图片";
					this.getPicture(index);
				}else{
					Vue.set(this.show.tag,[index],true)
					this.updowntxt[index] = "展开查看更多" 
				}
    		this.show.tag[index] == true? false:true;
    		this.updowntxt[index]=="展开查看更多"?"收起图片":"展开查看更多";
    		var that = this;
    		that.getPicture(index).then(function(data){
    			Vue.set(that.picArr,[index],data.msg)
					Vue.set(that.picNum,[index],that.picArr[index].length)
    		});
    	},
      openOrPrivacy(index){//信息是否对外公开控制按钮
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);//通过类名控制图片和文字颜色
      	
        if(this.reveal.openOrPrivacyText[index]=="显示"){//显示隐藏文字切换
        	
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }else{
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }
        
        for(let i=0;i<this.reveal.openOrPrivacy.length;i++){
        	if(this.reveal.openOrPrivacy[i]==false){
        		this.certificate[i].ifVisable = 0;
        	}else{
        		this.certificate[i].ifVisable = 1;
        	}
        }
        
        var that = this;
        console.log(JSON.stringify(that.certificate[index]))
        var url = MyAjax.urlsy+"/psnQualification/update"
        $.ajaxSetup({contentType : 'application/json'});
        MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.certificate[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async:false,
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})
        that.updateData();
      },
      async certificateInfoEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
        var that = this;
        const getPic = await that.getPicture(index);
        if(getPic.code === 0){
      		const data = await Promise.resolve(true).then(
  				function(){
  					Vue.set(that.picArr,[index],getPic.msg)
	    	  	Vue.set(that.picNum,[index],that.picArr[index].length)
	    	  	return that.picNum;
  				})
  			}
				if(Math.floor(3-that.picNum[index])>0){
					that.localCertificate[index].picId = [];
					$("#"+that.fineUploaderId[index]).html("")
					 moreManualUploader({
	          nameList:'manualUploader'+index,
	          element:that.fineUploaderId[index],
	          template: that.qqTemplate[index],
	          url:MyAjax.urlsy+"/psnQualification/batchUpload",
	          picIdCont:that.localCertificate[index].picId,
	          btnPrimary:".btn-primary",
	          canUploadNum : Math.floor(3-that.picNum[index]),
	        })
				}
        //上传图片
      },
      deleThisPicPromise(id){//封装删除图片的promise，异步操作动态改变可上传数量
      	var that = this;
      	var url = MyAjax.urlsy + "/psnQualification/delPic/"+ id;
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
	  					console.log(data)
	  			}
	  		}
      	if(Math.floor(3-that.picNum[index])>0){
					that.localCertificate[index].picId = [];
					$("#"+this.fineUploaderId[index]).html("")
						moreManualUploader({
	          nameList:'manualUploader'+index,
	          element:that.fineUploaderId[index],
	          template: that.qqTemplate[index],
	          url:MyAjax.urlsy+"/psnQualification/batchUpload",
	          picIdCont:that.localCertificate[index].picId,
	          btnPrimary:".btn-primary",
	          canUploadNum : Math.floor(3-that.picNum[index]),
	        })
				}
      	
      },
      keepCertificateInfoEdit(index){//编辑状态，保存按钮
      	var that = this;
        var url = MyAjax.urlsy+"/psnQualification/update"
        $.ajaxSetup({ contentType : 'application/json' });
        MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.localCertificate[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async:false,
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})//更新到服务器
				//保存之后再重新拉取数据
				that.updateData();
        $("#"+this.fineUploaderId[index]).html("")
				
        if(that.localCertificate[index].qualificationName.trim().length!=0){
          Vue.set(that.reveal.editInfo,[index],!that.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        }
        
      },
      cancelCertificateInfoEdit(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        this.localCertificate[index]=JSON.parse(JSON.stringify(this.certificate[index]));
      },
      certificateInfoDel(index){//编辑状态，删除按钮
        var that = this;
        var url = MyAjax.urlsy+"/psnQualification/del/"+that.certificate[index].pkid;
        MyAjax.delete(url);
        that.updateData();
        
      },
      addInfo(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addCertificate",false);
        Vue.set(this.reveal,"empty",false)
        Vue.set(this.newCertificate,"qualificationName","");
        Vue.set(this.newCertificate,"certificateNumber","");
        Vue.set(this.newCertificate,"registeredUnit","");
        
        singleManualUploader({
	        element:"fine-uploader-manual-trigger",
					template: "qq-template-manual-trigger",
	        url:MyAjax.urlsy+"/psnQualification/batchUpload",
	        picIdCont:this.newCertificate.picId,
	        btnPrimary:".btn-primary",
					canUploadNum:3,
	      })
      },
      keepCertificateInfoAdd(){
        if(this.newCertificate.qualificationName.length!=0){
            /*同步信息到个人信息首页*/
            Vue.set(this.reveal,"addCertificate",true);
            //视图切换到执业资格的首页
            /*清除数据，保证下次输入时输入框为空*/
            this.reveal.openOrPrivacyText.push("显示")//追加显示隐藏按钮文字
            this.reveal.openOrPrivacy.push(true)//追加显示隐藏按钮状态
        }
        
        var that = this;
        var url = MyAjax.urlsy+"/psnQualification/insert";
        $.ajaxSetup({ contentType : 'application/json' });
        MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(that.newCertificate),
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})
        that.updateData();
        $("#fine-uploader-manual-trigger").html("")
      },
      cancelCertificateInfoAdd(){
        Vue.set(this.reveal,"addCertificate",true);
        //视图切换到执业资格的首页
        Vue.set(this.newCertificate,"qualificationName","");
        Vue.set(this.newCertificate,"certificateNumber","");
        Vue.set(this.newCertificate,"registeredUnit","");
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
		padding-bottom: 30px;
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
              /*color: rgb(186,186,186);*/
              margin-bottom: 11px;
            }
            p:last-child{
              margin-bottom:17px;
            }
          }
          .morePics{
						overflow: hidden;
						margin-top: 15px;
						float: left;
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						li{
							float: left;
							img{
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
        /*信息列表结束*/
        /*编辑信息列表开始*/
        .certificateInfoEdit{
          .edit-wrap{
            >li{
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
            >li:nth-child(1){
              color: #909090;
              margin-top:30px;
              margin-bottom:20px;
            }
            >li:nth-child(2){
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
				    	.imgShow{
		        		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
		        		width: 700px;
		        		float: left;
		        		>li{
		        			float: left;
		        			width: 200px;
				          height: 200px;
				          padding: 10px;
				          background: rgba(210,210,210,.3);
				          border-radius: 10px;
									position: relative;
									margin-right: 15px;
										margin-bottom: 15px;
									&:hover{
										.delePic{
											display: block;
											
										}
									}
									img{
										width: 180px;
										max-height: 180px;
										
										
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
				    		width: 730px;
				    		float: right;
				    	}
				    }
            >li:last-child{
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
      >ul{
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
				    		width: 700px;
				    		float: left;
				    	}
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
