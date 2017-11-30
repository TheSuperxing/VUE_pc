<template>
  <div class="languageIndex">

    <div class="title">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addLanguage">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="languageContainer" v-show="reveal.addLanguage">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加语言信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="languageInfo" v-for="(item,index) in language">
        <!--显示信息列表开始-->
        <div class="languageInfoList" v-if="!reveal.editInfo[index]">
          <div class="languageInfoTitle">
            <h4 v-cloak>{{item.language}}</h4>
            <ul class="toolsBox">
              <li v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">
                <p v-cloak>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="languageEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="languageEditDel(index)">
                <p>删除</p>
              </li>
            </ul>
          </div>
          <div class="languageInfoBody">
            <p v-cloak>{{item.proficiency}}</p>


            <div class="morePics" v-if="!show.tag[index]">
                <img v-for="item in show.picList[index]" :src="item.pic" />
                <!-- <img v-for="item in show.picList" :src="data:image/png;base64,item.pic" /> -->
            </div>
            <div class="viewMore">
              <p v-bind:class="{viewDown:show.tag[index],viewUp:!show.tag[index]}" @click="upDown(index)">
                <!--<img src="../../../assets/img/company/double-bottom-down.png" />
                <img src="../../../assets/img/company/double-bottom-up.png" />-->
                <span>{{updowntxt[index]}}</span>
              </p>
            </div>

          </div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="languageInfoEdit" v-show="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li>
              <label>
                <h5>*&nbsp;语言种类</h5>
                <input v-model="localLanguage[index].language" type="text" placeholder="请输入语言种类">
              </label>
            </li>
            <li>
              <label>
                <h5>熟练程度</h5>
                <input v-model="localLanguage[index].proficiency" type="text" placeholder="请输入熟练程度">
              </label>
            </li>
            <li class="img-wrap">
							<span class="wrap-left">上传附件</span>
              <div class="picListCont">
                <div class="picList" v-for="(item,$index) in show.picList[index]">
                  <img :src="item.pic" alt="">
                  <button @click="deletePic(index,$index)"></button>
                </div>
              </div>

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
						                <button type="button"  class="btn btn-primary btn-primary-language" id="trigger-upload">
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
              <button v-on:click="languageEditKeep(index)">保存</button>
              <button v-on:click="languageEditCancel(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->
    <div class="languageContainer" v-show="!reveal.addLanguage">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li>
          <label>
            <h5>*&nbsp;语言种类</h5>
            <input v-model="newLanguage.language" type="text" placeholder="请输入语言种类">
          </label>
        </li>
        <li>
          <label>
            <h5>熟练程度</h5>
            <input v-model="newLanguage.proficiency" type="text" placeholder="请输入熟练程度">
          </label>
        </li>
        <li class="img-wrap">
					<span class="wrap-left">图片展示</span>
					<script type="text/template" id="qq-template-manual-trigger-language">
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
			                <button type="button"  class="btn btn-primary btn-primary-language" id="trigger-upload-language">
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
			    <div id="fine-template-manual-trigger-language"></div>
				</li>
				<li class="tip-wrap">
          <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
        </li>
        <li>
          <button v-bind:class="{keepAdd:reveal.keepAddLanguage}" v-on:click="keepNewLanguage">保存</button>
          <button v-on:click="cancelNewLanguage">取消</button>
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
    name:"LanguageIndex",
    data(){
      return {
        title:"语言",
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示,文字切换
          editInfo:[],//是否编辑信息
          addLanguage:true,//是否添加信息
          keepAddLanguage:true,//添加模式下，保存按钮是否可用
        },

        updowntxt:[],
        show:{
          tag:[],
          picList:[],
        },

        language:[],
        localLanguage:[],
        picInfo:[require("../../../assets/img/images/captainmiao1.jpg"),require("../../../assets/img/images/captainmiao2.jpg")],
        
        newLanguage:{
				  "ifVisable": 1,
				  "language": "",
          "proficiency": "",
           picId:[],//上传图片返回的ID
        },
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
      }
    },
    mounted(){
    	this.updateData();
      //上传图片
    },
    updated(){
      if(this.language.length!=0){
        Vue.set(this.reveal,"empty",false)
      }else if(this.language.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newLanguage.language.length!=0){
        if(this.newLanguage.language.trim().length!=0){
          Vue.set(this.reveal,"keepAddLanguage",false);//控制保存按钮的背景颜色
          Vue.set(this.newLanguage,"language",this.newLanguage.language.trim())//进行必填项的空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAddLanguage",true);//控制保存按钮的背景颜色
      }
    },
    
    methods:{
    	updateData(){
      	var that = this;
	    	var url = MyAjax.urlsy+"/psnlanguage/findByMySelf";
	    	MyAjax.ajax({
					type: "GET",
					url:url,
	//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
					dataType: "json",
	//				content-type: "text/plain;charset=UTF-8",
					
				},function(data){
					data = data.msg;
					that.language = data;
				},function(err){
					console.log(err)
				})
	    	/*数据同步本地一份开始*/
        that.localLanguage=JSON.parse(JSON.stringify(that.language));
        that.fineUploaderId = [];
	    	that.qqTemplate = [];
	    	that.reveal.openOrPrivacyText = [];
	    	that.reveal.openOrPrivacy = [];
        if(this.language.length!=0){
          Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
          for(var i=0;i<that.language.length;i++){
            that.fineUploaderId.push("fine-uploader-manual-trigger-language"+that.language[i].pkid);
            that.qqTemplate.push("qq-template-manual-trigger-language"+that.language[i].pkid);
            that.show.tag[i]=true;
            that.updowntxt.push("展开查看更多");
            that.reveal.editInfo.push(false);//信息是否可以编辑赋初始值
            if(that.language[i].ifVisable==1){
              that.reveal.openOrPrivacy.push(true);//信息是否对外显示赋初始值
              that.reveal.openOrPrivacyText.push("显示");//信息是否对外显示文字切换赋初始值	  	
            }else{
              that.reveal.openOrPrivacy.push(false);//信息是否对外显示赋初始值
              that.reveal.openOrPrivacyText.push("隐藏");//信息是否对外显示文字切换赋初始值		
            }
          }
        }else{
          Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
        }

        
      },
      getPic(pkid,index){
        var that=this;
        var url=MyAjax.urlsy+"/psnlanguage/findPicsById/"+pkid;
        MyAjax.ajax({
            type: "GET",
            url:url,
            dataType: "json",
          },function(data){
            Vue.set(that.show.picList,[index],data.msg)
          },function(err){
            console.log(err)
          })
      },
      openOrPrivacy(index){//信息是否对外公开控制按钮
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);//信息是否对外公开的切换（颜色，和图片切换）
        if(this.reveal.openOrPrivacyText[index]=="显示"){//显示隐藏文字切换
        	
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }else{
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }
        
        for(let i=0;i<this.reveal.openOrPrivacy.length;i++){
        	if(this.reveal.openOrPrivacy[i]==false){
        		this.language[i].ifVisable = 0;
        	}else{
        		this.language[i].ifVisable = 1;
        	}
        }
        
        var that = this;
        console.log(JSON.stringify(that.language[index]))
        var url = MyAjax.urlsy+"/psnlanguage/update"
        $.ajaxSetup({contentType : 'application/json'});
        MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.language[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})
      },
      upDown(index){
//  		Vue.set(this.show,"tag[index]",false)
				if(this.show.tag[index]==true){
					Vue.set(this.show.tag,[index],false)
					this.updowntxt[index] = "收起图片"
				}else{
					Vue.set(this.show.tag,[index],true)
					this.updowntxt[index] = "展开查看更多" 
				}
    		this.show.tag[index] == true? false:true;
        this.updowntxt[index]=="展开查看更多"?"收起图片":"展开查看更多";
        this.getPic(this.language[index].pkid,index)
			  console.log(this.show.picList)
    	},
      languageEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
        var that = this;
        //上传图片
        this.getPic(this.language[index].pkid,index)

        that.language[index].picId=[];
        moreManualUploader({
          nameList:'manualUploader_language_'+index,
          element:that.fineUploaderId[index],
          template: that.qqTemplate[index],
          url:MyAjax.urlsy+'/psnlanguage/batchUpload',
          picIdCont:that.language[index].picId,
          btnPrimary:".btn-primary-language"
        })
        
      },
      deletePic(index,$index){
        var that =this;
        var url = MyAjax.urlsy+"/psnlanguage/delPic/"+this.show.picList[index][$index].id
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
        },function(data){
          // if(data.msg=="success"){
          //   that.show.picList[index][$index]="";
          // }
          //console.log(data)
        },function(err){
          console.log(err)
        })
        console.log(this.show.picList[index]);
        this.getPic(this.language[index].pkid,index)
        console.log(this.show.picList[index]);

      },
      languageEditKeep(index){//编辑状态，保存按钮
        var that = this;
        var url = MyAjax.urlsy+"/psnlanguage/update"
        $.ajaxSetup({ contentType : 'application/json' });
        MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.language[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					
				},function(data){
					//console.log(data)
				},function(err){
					console.log(err)
				})//更新到服务器
				//保存之后再重新拉取数据
				that.updateData();
				if(this.localLanguage[index].length!=0){
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//确认编辑后视图切换回到原来查看页面
        }
        $("#"+this.fineUploaderId[index]).html("")
      },
      languageEditCancel(index){//编辑状态，取消按钮
       Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        
        this.localLanguage[index]=JSON.parse(JSON.stringify(this.language[index]));

        /*如果是取消编辑，从新从Vuex中得到数据*/
        $("#"+this.fineUploaderId[index]).html("")
      },
      languageEditDel(index){//编辑状态，删除按钮
        var that = this;
        var url = MyAjax.urlsy+"/psnlanguage/del/"+that.language[index].pkid;
        MyAjax.delete(url)
				that.updateData();
				

      },
      addLanguage(){//添加信息按钮，添加信息的视图切换
        /*先清除数据，保证下次输入时输入框为空*/
        Vue.set(this.newLanguage,"language","");
        Vue.set(this.newLanguage,"proficiency","");
        Vue.set(this.reveal,"addLanguage",false);
        Vue.set(this.reveal,"empty",false);

        var that=this;
        singleManualUploader({
          element:"fine-template-manual-trigger-language",
          template: "qq-template-manual-trigger-language",
          url:MyAjax.urlsy+'/psnlanguage/batchUpload',
          picIdCont:that.newLanguage.picId,
          btnPrimary:".btn-primary-language"
        })
      },
      keepNewLanguage(){//添加模式下的保存
        if(this.newLanguage.language.length!=0){
//      	this.localLanguage.push(JSON.parse(JSON.stringify(this.newLanguage)))
//      	this.language.push(JSON.parse(JSON.stringify(this.newLanguage)))
	        Vue.set(this.reveal,"addLanguage",true);
	        this.reveal.openOrPrivacyText.push("显示")//追加显示隐藏按钮文字
          this.reveal.openOrPrivacy.push(true)//追加显示隐藏按钮状态
        }
        var that = this;
//      console.log(that.software[index])
        var url = MyAjax.urlsy+"/psnlanguage/insert";
        $.ajaxSetup({ contentType : 'application/json' });
        MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(that.newLanguage),
					dataType: "json",
					
				},function(data){
					console.log(data)
				},function(err){
					console.log(err)
				})
        that.updateData();

        $("#fine-template-manual-trigger-language").html("")
      },
      cancelNewLanguage(){
        Vue.set(this.reveal,"addLanguage",true);
        //视图切换到执业资格的首页
        Vue.set(this.newLanguage,"language","");
        Vue.set(this.newLanguage,"proficiency","");
        /*清除数据，保证下次输入时输入框为空*/
        $("#fine-template-manual-trigger-language").html("")
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
  .languageIndex {
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
    .languageContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .languageInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .languageInfoList{
          .languageInfoTitle{
            color: $themeColor;
            margin-top: 30px;
            margin-bottom:19px;
            h4{
              float: left;
            }
            .toolsBox{
              float: right;
              margin-top:2px;
              >li{
                float: left;
                cursor: pointer;
                margin:0;
                padding:0;
                p{
                  color: $themeColor;
                  padding:0 17px 0 12px;
                }
                &:nth-child(1){
	                p{
	                  padding-left:32px;
	                  background: url("../../../assets/img/personal/education/eye.png") left center no-repeat;
	                }
	              }
	              &:nth-child(2){
	                p{
	                  padding-left:27px;
	                  background: url("../../../assets/img/personal/education/edit.png") left center no-repeat;
	                }
	              }
	              &.img-wrap{
						    	/*padding-left: 30px;*/
						    	>div{
						    		width: 680px;
						    		float: left;
						    	}
						    }
						    
						    &.tip-wrap{
						    	padding-left: 90px;
						    	color: #999999;
						    }
	              &:last-child{
	                p{
	                  padding-right:0;
	                  padding-left:21px;
	                  background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
	                }
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
          .languageInfoBody{
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
            .showImg{
            	padding-bottom: 20px;
            	&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;}
            	li{
            		float: left;
            		margin-right: 10px;
            		img{
	            		width: 120px;
	            	}
            	}
            	
            }
          }
        }
        /*信息列表结束*/
        /*编辑信息列表开始*/
        .languageInfoEdit{
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
		        		width: 720px;
		        		float: right;
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
            }
          }
        }
        /*编辑信息列表结束*/
      }
      /*显示编辑信息列表结束*/
    }
    /*添加信息开始*/
    .languageContainer{
      >ul{
        >li{
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
    .morePics{
      overflow: hidden;
      margin-top: 15px;
      img{
        float: left;
        width: 160px;
        height: 100px;
        margin-right: 15px;
        margin-bottom: 15px;
        
      }
    }
    .viewMore{
				width: 100%;
				height: 14px;
				line-height: 14px;
				margin-top: 15px;
				cursor: pointer;
        margin-bottom: 30px;
				.viewDown{
					width: 120px;
					height: 100%;
					padding-left: 20px;
					margin: 0 auto!important;
					background: url(../../../assets/img/personal/projectexperience/icon_lookmore.png) no-repeat left center;
        }
        span{
          color: $themeColor!important;
        }
				.viewUp{
					width: 120px;
					height: 100%;
					padding-left: 20px;
					margin: 0 auto!important;
					background: url(../../../assets/img/personal/projectexperience/icon_revoke_075.3.png) no-repeat left center;
				}
				img{
					vertical-align: middle;
					margin-bottom: 3px;
					margin-right: 5px;
				}
			}
      // 显示图片样式
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
      // 编辑显示已有图片样式
  }
</style>
