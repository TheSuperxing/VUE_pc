<template>
  <div class="awardIndex">

    <div class="title">
      <h2 v-cloak>{{title.text}}</h2>
      <p v-on:click="addInfo">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="awardContainer" v-show="reveal.addAward">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加收获奖励信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="awardInfo" v-for="(item,index) in this.award">
        <!--显示信息列表开始-->
        <div class="awardInfoList" v-show="!reveal.editInfo[index]">
          <div class="awardInfoTitle">
            <h4 v-cloak>{{award[index].awardName}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:!award[index].ifVisable}" v-on:click="openOrPrivacy(index)">
                <p>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="awardEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="awardDel(index)">
                <p>删除</p>
              </li>
            </ul>
          </div>
          <div class="awardInfoBody">
            <p v-cloak>发证机构：<span>{{award[index].awardingBody}}</span></p>
            <p v-cloak>评定日期：<span>{{award[index].awardingTime}}</span></p>
          </div>
          <ul class="morePics" v-if="!show.tag[index]" >
						<li v-for="item in picArr[index]">
							<img :src="item.pic"/>
						</li>
								
		    	</ul>
					<div class="viewMore">
						<p v-bind:class="{viewDown:show.tag[index],viewUp:!show.tag[index]}" @click="upDown(index)">
							
								<span>{{updowntxt[index]}}</span>
						</p>
					</div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="awardInfoEdit" v-show="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li>
              <label>
                <h5>*&nbsp;奖励名称</h5>
                <input v-model="localAward[index].awardName" type="text" placeholder="请输入资格名称">
              </label>
            </li>
            <li>
              <label>
                <h5>颁发机构</h5>
                <input v-model="localAward[index].awardingBody" type="text" placeholder="请输入发证机构">
              </label>
            </li>
            <li>
              <label>
                <h5>评定日期</h5>
                <datepicker v-model="localAward[index].awardingTime"></datepicker>
              </label>
            <li class="img-wrap">
							<span class="wrap-left">图片展示</span>
							<ul class="imgShow">
								<li v-for="(item,$ind) in picArr[index]">
									<img :src="item.pic"/>
									<span class="delePic" @click="deleThisPic(item.id,index,$ind)"></span>
								</li>
								
							</ul>
							<script type="text/template" :id="qqTemplate[index]">
						        <div class="qq-uploader-selector qq-uploader" qq-drop-area-text="Drop files here">
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
              <button v-on:click="keepAwardEdit(index)">保存</button>
              <button v-on:click="cancelAwardEdit(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->

    <div class="addAwardContainer" v-show="!reveal.addAward">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li>
          <label>
            <h5>*&nbsp;奖励名称</h5>
            <input v-model="newAward.awardName" type="text" placeholder="请输入资格名称">
          </label>
        </li>
        <li>
          <label>
            <h5>颁发机构</h5>
            <input v-model="newAward.organ" type="text" placeholder="请输入注册单位">
          </label>
        </li>
        <li>
          <label>
            <h5>获奖时间</h5>
            <!--<input v-model="newAward.info.time" type="month" placeholder="请输入注册单位">-->
            <datepicker v-model="newAward.time"></datepicker>
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
				<li class="tip-wrap">
          <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
        </li>
        <li>
          <button v-bind:class="{keepAdd:reveal.keepAdd}" v-on:click="keepAwardAdd">保存</button>
          <button v-on:click="cancelAwardAdd">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import datepicker from "../../units/Datepicker.vue"
  import qq from "fine-uploader"
  import MyAjax from "../../../assets/js/MyAjax.js"
  import {singleManualUploader,moreManualUploader} from "../../../assets/js/manualUploader.js"
  

  export default {
    name:"awardIndex",
    components:{
      datepicker
    },
    data(){
      return {
        title:{text:"所获奖励"},
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[false,false],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示文本,通过服务器获取的数据
          editInfo:[],//是否编辑信息
          addAward:true,//是否添加信息
          keepAdd:true,//添加模式下，保存按钮是否可用
        },
        updowntxt:[],
        show:{
        	tag:[],
        },
        award:[],
        localAward:[],
        newAward:{
          awardName:"",
          organ:"",
          time:"",
          picId:[],
        },
        picArr:[],//图片展示的数组
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
      }
    },
    created(){
      this.getData()
    },
    mounted(){
    	//上传图片
//			var manualUploader = new qq.FineUploader({
//	        element: document.getElementById('fine-uploader-manual-trigger'),
//	        template: 'qq-template-manual-trigger',
//	        request: {
//	            endpoint: MyAjax.urlsy+"/psnAwards/batchUpload"
//	        },
//	        thumbnails: {
//	//	                placeholders: {
//	//	                    waitingPath: '../../../assets/js/units/fine-uploader/placeholders/waiting-generic.png',
//	//	                    notAvailablePath: '../../../assets/js/units/fine-uploader/placeholders/not_available-generic.png'
//	//	                }
//	        },
//	        validation: {
//	            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
//	            itemLimit: 5,
//	            sizeLimit: 1500000
//	        },
//	        autoUpload: false,
//	        debug: true,
//	        callbacks:{
//	        	onSubmit:  function(id,  fileName)  {
//	        		$("#fine-uploader-manual-trigger  .qq-uploader-selector .buttons .btn-primary").show()
//          },
//          onCancel: function(){
//              var imgList=$("#fine-uploader-manual-trigger .qq-uploader-selector .qq-upload-list-selector .list")
//              if(imgList.length<=1){
//                $("#fine-uploader-manual-trigger  .qq-uploader-selector .buttons .btn-primary").hide()
//              }
//            },
//	        	onComplete: function (id, fileName, responseJSON, maybeXhr) {
//	                //alert('This is onComplete function.');
//									//alert("complete name:"+responseJSON);//responseJSON就是controller传来的return Json
//	                console.log(responseJSON)
//	                if(responseJSON.success==true){
//	                	that.newAward.picId.push(responseJSON.msg)
//	                }
//	                $("#fine-uploader-manual-trigger .qq-uploader-selector .buttons .btn-primary").hide()
//	          	},
//	    	}
//	    });
//			qq(document.getElementById("trigger-upload")).attach("click", function() {
//	        manualUploader.uploadStoredFiles();
//	    });
	    
      if(this.award.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
      }
      /*以上是初始化*/
      if(this.award.length!=0){
        for(let i=0;i<this.award.length;i++){
          if(this.award[i].ifVisable==0){
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
      if(this.award.length==0){
        Vue.set(this.reveal,"empty",true)
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newAward.awardName.length!=0){
        if(this.newAward.awardName.trim().length!=0){
          Vue.set(this.reveal,"keepAdd",false);
          Vue.set(this.newAward,"awardName",this.newAward.awardName.trim())//进行空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAdd",true);
      }
      /*控制保存按钮的背景颜色*/
    },
    methods:{
      getData(){//用于每次信息更新后从新获取数据
        var that=this;
        var url = MyAjax.urlsy+"/psnAwards/findByMySelf/"+"string";
            MyAjax.ajax({
              type: "GET",
              url:url,
              dataType: "json",
              async:false,
            },function(data){
              if(data.code==0){
                that.award=data.msg
                //console.log()
              }else{
                console.log("错误返回");
              }
              
            },function(err){
              console.log(err)
            })
            // 从服务器获取数据
            that.localAward=JSON.parse(JSON.stringify(that.award));
            that.fineUploaderId = [];
            that.qqTemplate = [];
            that.show.tag=[];
	    	    that.updowntxt=[];
            for(let i=0;i<that.localAward.length;i++){//拼接fineUploader的ID
              that.fineUploaderId.push("fine-uploader-manual-trigger"+i);
              that.qqTemplate.push("qq-template-manual-trigger"+i);
         	    that.show.tag[i]=true;
	    				that.updowntxt.push("展开查看更多");
            }
      },
      getPicture(index){
    		var that = this;
    		var url = MyAjax.urlsy+"/psnAwards/findPicsById/"+that.award[index].pkid;
    		MyAjax.ajax({
					type: "GET",
					url:url,
	//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
					dataType: "json",
	//				content-type: "text/plain;charset=UTF-8",
					
				},function(data){
					console.log(data)
					Vue.set(that.picArr,[index],data.msg)
//					that.picArr[index] = 
					console.log(that.picArr)
				},function(err){
					console.log(err)
				})
    	},
      upDown(index){
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
    		
    	},
      openOrPrivacy(index){//信息是否对外公开控制按钮\
        
        if(this.award[index].ifVisable==0){
          Vue.set(this.award[index],"ifVisable",1);
        }else{
          Vue.set(this.award[index],"ifVisable",0);
        }
        var that=this;
        var url = MyAjax.urlsy+"/psnAwards/update/";
          MyAjax.ajax({
            type: "POST",
            url:url,
            data: JSON.stringify(that.award[index]),
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            
          },function(data){
            //console.log(data)
          },function(err){
            console.log(err)
          })
          that.getData();
          
          if(this.award[index].ifVisable==0){
            Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
          }else{
            Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
          }
          console.log(this.award)
      },
      awardEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
        this.getPicture(index);
        var that = this;

        //上传图片
//      if(window['manualUploader'+index]==undefined){
//        window['manualUploader'+index]= new qq.FineUploader({
//          element: document.getElementById(that.fineUploaderId[index]),
//          template: this.qqTemplate[index],
//          request: {
//            endpoint: MyAjax.urlsy+"/psnAwards/batchUpload"
//          },
//          thumbnails: {
//          },
//          validation: {
//            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
//            itemLimit: 5,
//            sizeLimit: 2000000
//          },
//          autoUpload: false,
//          debug: true,
//          callbacks:{
//            onSubmit:  function(id,fileName){
//              $("#"+that.fineUploaderId[index]+"  .qq-uploader-selector .buttons .btn-primary").show()
//            },
//            onCancel: function(){
//              var imgList=$("#"+that.fineUploaderId[index]+"  .qq-uploader-selector .qq-upload-list-selector .list")
//              if(imgList.length<=1){
//                $("#"+that.fineUploaderId[index]+" .qq-uploader-selector .buttons .btn-primary").hide()
//              }
//            },
//            onComplete: function (id, fileName, responseJSON, maybeXhr) {
//            	console.log(responseJSON)
//              if(responseJSON.success==true){
//              	if(that.localAward[index].picId == null){
//              		that.localAward[index].picId = [];
//              	  that.localAward[index].picId.push(responseJSON.msg)
//              	}else{
//              		that.localAward[index].picId.push(responseJSON.msg)
//              	}
//              	console.log(that.localAward[index].picId)
//              }
//            },
//          }
//        });
//      }
//
//      var btnPrimary=$("#"+that.fineUploaderId[index]+" .qq-uploader-selector .buttons .btn-primary");
//      qq(btnPrimary[0]).attach("click", function() {
//        eval('manualUploader'+index).uploadStoredFiles();
//        btnPrimary.hide()
//      });

				that.localAward[index].picId = [];
	     	moreManualUploader({
          nameList:'manualUploader'+index,
          element:that.fineUploaderId[index],
          template: that.qqTemplate[index],
          url:MyAjax.urlsy+"/psnAwards/batchUpload",
          picIdCont:that.localAward[index].picId,
          btnPrimary:".btn-primary"
        })

      },
      keepAwardEdit(index){//编辑状态，保存按钮
        var that=this;
        if(this.localAward[index].awardName.trim().length!=0){
          var url = MyAjax.urlsy+"/psnAwards/update/";
          MyAjax.ajax({
            type: "POST",
            url:url,
            data: JSON.stringify(that.localAward[index]),
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            
          },function(data){
            //console.log(data)
          },function(err){
            console.log(err)
          })
          that.getData();
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//取消编辑后视图切换回到原来查看页面
          /*如果是保存，把数据保存到Vuex中*/
         	$("#"+this.fineUploaderId[index]).html("")
        }
      },
      deleThisPic(id,index,$ind){//删除图片
      	var that = this;
      	var url = MyAjax.urlsy + "/psnAwards/delPic/"+ id
      	MyAjax.ajax({
					type: "GET",
					url:url,
	//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
					dataType: "json",
	//				content-type: "text/plain;charset=UTF-8",
				},function(data){
					console.log(data)
					if(data.code==0){
//						that.picArr[index].splice($ind,1)
						that.getPicture(index);
					}
				},function(err){
					console.log(err)
				})
      	
      },
      cancelAwardEdit(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        this.localAward[index].awardName=this.award[index].awardName;
        this.localAward[index].awardingBody=this.award[index].awardingBody;
        this.localAward[index].awardingTime=this.award[index].awardingTime;
				$('.qq-upload-success').hide();
        /*如果是取消编辑，从新从Vuex中得到数据*/
      },
      awardDel(index){//编辑状态，删除按钮
        var that=this;
        var url = MyAjax.urlsy+"/psnAwards/del/"+this.award[index].pkid;
        MyAjax.delete(url);
        
        that.getData();
        
        // 从新获取数据
        for(let i=0;i<this.localAward.length;i++){//拼接fineUploader的ID
          this.fineUploaderId.push("fine-uploader-manual-trigger"+i);
          this.qqTemplate.push("qq-template-manual-trigger"+i);
        }
      },
      addInfo(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addAward",false);
        Vue.set(this.reveal,"empty",false);
        
        singleManualUploader({
	        element:"fine-uploader-manual-trigger",
					template: "qq-template-manual-trigger",
	        url:MyAjax.urlsy+"/psnAwards/batchUpload",
	        picIdCont:this.newAward.picId,
	        btnPrimary:".btn-primary"
	      })
      },
      keepAwardAdd(){//添加模式下的保存
        if(this.newAward.awardName.length!=0){

          if(this.newAward.awardName.trim().length!=0){
            Vue.set(this.reveal,"addAward",true);
            //视图切换到执业资格的首页
            
            this.reveal.openOrPrivacyText.push("隐藏")//设置是否对外显示文本
            var that=this;
            var url = MyAjax.urlsy+"/psnAwards/insert";
            MyAjax.ajax({
              type: "POST",
              url:url,
      				data: JSON.stringify({
                accountID:"string",
                awardName:that.newAward.awardName,
                awardingBody:that.newAward.organ,
                awardingTime:that.newAward.time,
              }),
              dataType: "json",
      			  contentType: "application/json;charset=UTF-8",
              
            },function(data){
              //console.log(data)
            },function(err){
              console.log(err)
            })
            this.getData();
            // 从新获取数据
            for(let i=0;i<this.localAward.length;i++){//拼接fineUploader的ID
              this.fineUploaderId.push("fine-uploader-manual-trigger"+i);
              this.qqTemplate.push("qq-template-manual-trigger"+i);
            }
          }
        }

        Vue.set(this.newAward,"awardName","");
        Vue.set(this.newAward,"time","");
        Vue.set(this.newAward,"organ","");
        
        $("#fine-uploader-manual-trigger").html("")
        /*清除数据，保证下次输入时输入框为空*/
      },
      cancelAwardAdd(){
        Vue.set(this.reveal,"addAward",true);
        //视图切换到执业资格的首页
        Vue.set(this.newAward,"awardName","");
        Vue.set(this.newAward,"time","");
        Vue.set(this.newAward,"organ","");
        /*清除数据，保证下次输入时输入框为空*/
       	$("#fine-uploader-manual-trigger").html("")
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
  .awardIndex {
    width: 940px;
    float: left;
    padding: 0 40px;
    background: $bfColor;
    min-height: 671px;
    padding-bottom: 40px;
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
    .awardContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .awardInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .awardInfoList{
          .awardInfoTitle{
            color: $themeColor;
            margin-top: 30px;
            margin-bottom:19px;
            h4{
              float: left;
            }
            >ul{
              float: right;
              margin-top:2px;
              li{
                float: left;
                cursor: pointer;
                p{
                  padding:0 17px 0 12px;
                }
              }
              >li:nth-child(1){
                p{
                  padding-left:32px;
                  background: url("../../../assets/img/personal/education/eye.png") left center no-repeat;
                }
              }
              >li:nth-child(2){
                p{
                  padding-left:27px;
                  background: url("../../../assets/img/personal/education/edit.png") left center no-repeat;
                }
              }
              >li:last-child{
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
          .awardInfoBody{
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
        /*信息列表结束*/
        /*编辑信息列表开始*/
        .awardInfoEdit{
          >ul{
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
            li.img-wrap{
		        	/*padding-left: 30px;*/
		        	.imgShow{
		        		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
		        		width: 700px;
		        		float: left;
		        		li{
		        			float: left;
		        			height: 100px;
									position: relative;
									margin-right: 15px;
										margin-bottom: 15px;
									&:hover{
										.delePic{
											display: block;
											
										}
									}
									img{
										width: 160px;
										height: 100px;
									}
									.delePic{
										width: 21px;
										height: 21px;
										position: absolute;
										right: 5px; top: 5px;
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
		        li.tip-wrap{
				    	padding-left: 110px;
				    	color: #999999;
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
    .addAwardContainer{
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
