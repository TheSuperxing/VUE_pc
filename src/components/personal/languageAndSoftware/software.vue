<template>
  <div class="softwareIndex">

    <div class="title clear">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addSoftware" v-if="reveal.addSoftware">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="softwareContainer" v-show="reveal.addSoftware">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加软件信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="softwareInfo clear" v-for="(item,index) in software">
        <!--显示信息列表开始-->
        <div class="softwareInfoList clear" v-if="!reveal.editInfo[index]">
          <div class="softwareInfoTitle clear">
            <h4 v-cloak>{{item.software}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">
                <p v-cloak>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="softwareEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="softwareEditDel(index)">
                <p>删除</p>
              </li>
              <!--确认删除该项目模态框-->
		    			<div id="modal-overlay" v-bind:class="deleteModalClass[index]">
								<div class="deleteSoftware">
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
          <div class="softwareInfoBody">
            <p v-cloak>熟练程度：{{item.proficiency}}</p>

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
        <div class="softwareInfoEdit" v-show="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li class="clear">
              <label>
                <h5>*&nbsp;软件名称</h5>
                <input @input="btnColor(index)" v-model="localSoftware[index].software" type="text" placeholder="请输入软件名称">
              </label>
              <alertTip v-if="showAlert.software" :showHide="showAlert.software"  :alertText="alertText.software"></alertTip>
              
            </li>
            <li class="clear">
              <label>
                <h5>*&nbsp;熟练程度</h5>
                <!-- <input v-model="localSoftware[index].proficiency" type="text" placeholder="请输入熟练程度"> -->
                <select @input="btnColor(index)" v-model="localSoftware[index].proficiency">
									<option value="初级（入门）">初级（入门）</option>
									<option value="中级（基础运用）">中级（基础运用）</option>
									<option value="高级（熟练运用）">高级（熟练运用）</option>
								</select>
              </label>
            </li>
            <li class="img-wrap clear">
							<span class="wrap-left">图片展示</span>

              <div class="picListCont">
                <div class="picList" v-for="(item,$index) in show.picList[index]">
                  <img :src="item.pic" alt="">
                  <button @click="deletePic(item.id,index,$index)"></button>
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
						                <button type="button"  class="btn btn-primary btn-primary-software" id="trigger-upload">
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
						<li class="tip-wrap clear">
				      <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
				    </li>
            <li class="clear">
              <button  v-bind:class="{btn_disable:reveal.btnColor[index]}" v-on:click="softwareEditKeep(index)">保存</button>
              <button v-on:click="softwareEditCancel(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->
    <div class="softwareContainer" v-show="!reveal.addSoftware">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li class="clear">
          <label>
            <h5>*&nbsp;软件名称</h5>
            <input v-model="newSoftware.software" type="text" placeholder="请输入软件名称">
          </label>
          <alertTip v-if="showAlert.software" :showHide="showAlert.software"  :alertText="alertText.software"></alertTip>
          
        </li>
        <li class="clear">
          <label>
            <h5>*&nbsp;熟练程度</h5>
            <!-- <input v-model="newSoftware.proficiency" type="text" placeholder="请输入熟练程度"> -->
            <select v-model="newSoftware.proficiency">
              <option value="初级（入门）">初级（入门）</option>
              <option value="中级（基础运用）">中级（基础运用）</option>
              <option value="高级（熟练运用）">高级（熟练运用）</option>
            </select>
          </label>
        </li>
        <li class="img-wrap clear">
					<span class="wrap-left">图片展示</span>
					<script type="text/template" id="qq-template-manual-trigger-software">
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
			                <button type="button"  class="btn btn-primary btn-primary-software" id="trigger-upload-software">
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
			    <div id="fine-template-manual-trigger-software"></div>
				</li>
				<li class="tip-wrap clear">
          <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
        </li>
        <li  class="clear">
          <button v-bind:class="{btn_disable:reveal.keepAddSoftware}" v-on:click="keepNewSoftware">保存</button>
          <button v-on:click="cancelNewSoftware">取消</button>
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
	import Modal from "../../../assets/js/modal.js" 
  import alertTip from "../units/alertTip.vue"
	
  export default {
    name:"SoftwareIndex",
    components:{
    	alertTip
    },
    data(){
      return {
        title:"软件",
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示,文字切换
          editInfo:[],//是否编辑信息
          addSoftware:true,//是否添加信息
          keepAddSoftware:true,//添加模式下，保存按钮是否可用
          btnColor:[],//编辑模式下，保存按钮是否可用颜色控制
        },

        updowntxt:[],
        show:{
          tag:[],
          picList:[],
          picNum:[],
        },
        deleteModalClass:[],
        showAlert:{software:false},//提示框显隐
	      alertText:{software:null},
        picInfo:[require("../../../assets/img/images/captainmiao1.jpg"),require("../../../assets/img/images/captainmiao2.jpg")],
        software:[],
        localSoftware:[],
        newSoftware:{
          "accountID": "",
				  "creAccountID": "",
				  "creTime": "",
				  "ifVisable": 1,
				  "pkid": "",
				  "proficiency": "",
				  "proficiencyCode": "",
          "software": "",
          picId:[],//上传图片返回的ID
        },
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
      }
    },
//  
    mounted(){
      this.updateData();
    },
    updated(){
      if(this.software.length!=0){
        Vue.set(this.reveal,"empty",false)
      }else if(this.software.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newSoftware.software.trim().length!=0&&this.newSoftware.proficiency.trim().length!=0){
        Vue.set(this.reveal,"keepAddSoftware",false);//控制保存按钮的背景颜色
        Vue.set(this.newSoftware,"software",this.newSoftware.software.trim())//进行必填项的空格去除处理
      }else {
        Vue.set(this.reveal,"keepAddSoftware",true);//控制保存按钮的背景颜色
      }
    },
    
    methods:{
    	updateData(){
      	var that = this;
	    	var url = MyAjax.urlsy+"/psnsoftware/findByMySelf";
	    	MyAjax.ajax({
					type: "GET",
					url:url,
	//				data: {accountID:"3b15132cdb994b76bd0d9ee0de0dc0b8"},
					dataType: "json",
	//				content-type: "text/plain;charset=UTF-8",
					async: false,
				},function(data){
          if(data.code==0){
            that.software = data.msg
          }else{
            console.log("错误返回");
          }
				},function(err){
					console.log(err)
				})
	    	/*数据同步本地一份开始*/
        that.localSoftware=JSON.parse(JSON.stringify(that.software));
        that.fineUploaderId = [];
	    	that.qqTemplate = [];
	    	that.reveal.openOrPrivacyText = [];
	    	that.reveal.openOrPrivacy = [];
	    	that.deleteModalClass = [];
	    	that.showAlert.software = false;
	    	that.alertText.software = null;
	    	for(var i=0;i<that.software.length;i++){
	    		that.fineUploaderId.push("fine-uploader-manual-trigger-software"+that.software[i].pkid);
          that.qqTemplate.push("qq-template-manual-trigger-software"+that.software[i].pkid);
          //通过pkid生成fineuploader特有的模版和对应模版容器
          that.show.tag[i]=true;
          that.updowntxt.push("展开查看更多");
					that.deleteModalClass.push("deleteModalClass"+i);//添加模态框类名
          that.reveal.btnColor.push(false);//编辑按钮是否可用颜色控制
	    		if(that.software[i].ifVisable==1){
	    			that.reveal.openOrPrivacy.push(true);//信息是否对外显示赋初始值
	        	that.reveal.openOrPrivacyText.push("显示");//信息是否对外显示文字切换赋初始值		
	    		}else{
	    			that.reveal.openOrPrivacy.push(false);//信息是否对外显示赋初始值
	        	that.reveal.openOrPrivacyText.push("隐藏");//信息是否对外显示文字切换赋初始值		
	    		}
	    	}
      },
      getPic(index){
        var that=this;
        var url=MyAjax.urlsy+"/psnsoftware/findPicsById/"+that.software[index].pkid;
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
      openOrPrivacy(index){//信息是否对外公开控制按钮
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);//信息是否对外公开的切换（颜色，和图片切换）
        if(this.reveal.openOrPrivacyText[index]=="显示"){//显示隐藏文字切换
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }else{
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }
        for(let i=0;i<this.reveal.openOrPrivacy.length;i++){
        	if(this.reveal.openOrPrivacy[i]==false){
        		this.software[i].ifVisable = 0;
        	}else{
        		this.software[i].ifVisable = 1;
        	}
        }
        var that = this;
        console.log(JSON.stringify(that.software[index]))
        var url = MyAjax.urlsy+"/psnsoftware/update"
        $.ajaxSetup({contentType : 'application/json'});
        MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.software[index]),
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
      upDown(index){
//  		Vue.set(this.show,"tag[index]",false)
				var that = this;
				if(that.show.tag[index]==true){
					Vue.set(that.show.tag,[index],false)
					that.updowntxt[index] = "收起";
					that.getPic(index).then(function(data){
						Vue.set(that.show.picList,[index],data.msg)
						Vue.set(that.show.picNum,[index],that.show.picList[index].length)
		    		});
				}else{
					Vue.set(that.show.tag,[index],true)
					that.updowntxt[index] = "展开查看更多" 
				}
    		that.show.tag[index] == true? false:true;
        that.updowntxt[index]=="展开查看更多"?"收起":"展开查看更多";
      },
      
      async softwareEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
        //上传图片
        var that = this
        const getPic = await that.getPic(index);
				if(getPic.code === 0){
      		const data = await Promise.resolve(true).then(
	  				function(){
	  					Vue.set(that.show.picList,[index],getPic.msg)
							Vue.set(that.show.picNum,[index],that.show.picList[index].length)
			    	  	return that.show.picNum;
	  				}
	  			)
      		console.log(that.show.picNum[index])
      		
      	}
				if(Math.floor(3-that.show.picNum[index])>0){
					that.localSoftware[index].picId=[];
					$("#"+that.fineUploaderId[index]).html("");
					
	        moreManualUploader({
	          nameList:'manualUploader_software_'+index,
	          element:that.fineUploaderId[index],
	          template: that.qqTemplate[index],
	          url:MyAjax.urlsy+'/psnsoftware/batchUpload',
	          picIdCont:that.localSoftware[index].picId,
	          btnPrimary:".btn-primary-software",
	          canUploadNum : Math.floor(3-that.show.picNum[index]),
	        })
				}

        
        
      },
			deleThisPicPromise(id){//封装删除图片的promise，异步操作动态改变可上传数量
      	var that = this;
      	var url = MyAjax.urlsy+"/psnlanguage/delPic/"+id
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
      async deletePic(id,index,$index){
        var that =this;
        const dele = await that.deleThisPicPromise(id);
        if(dele.code===0){
	  			const getPic = await that.getPic(index);
	  			if(getPic.code===0){
	  					const data = await Promise.resolve(true).then(
		      				function(){
		      					Vue.set(that.show.picList,[index],getPic.msg)
										Vue.set(that.show.picNum,[index],that.show.picList[index].length)
					    	  	return that.show.picNum;
		      				}
		      			)
	  					console.log(data)
	  			}
	  		}
        that.localSoftware[index].picId=[];
				$("#"+that.fineUploaderId[index]).html("");
        moreManualUploader({
          nameList:'manualUploader_software_'+index,
          element:that.fineUploaderId[index],
          template: that.qqTemplate[index],
          url:MyAjax.urlsy+'/psnsoftware/batchUpload',
          picIdCont:that.localSoftware[index].picId,
          btnPrimary:".btn-primary-software",
          canUploadNum : Math.floor(3-that.show.picNum[index]),
        })

      },
      btnColor(index){//
			  let condition=this.localSoftware[index].software.trim().length!=0
          &&this.localSoftware[index].proficiency.trim().length!=0
				if(condition){
					Vue.set(this.reveal.btnColor,[index],false);
				}else{
					Vue.set(this.reveal.btnColor,[index],true);
				}
			},
      softwareEditKeep(index){//编辑状态，保存按钮
        
        var that = this;
        let condition = that.localSoftware[index].software.trim().length!=0;
        if(condition){
        	var url = MyAjax.urlsy+"/psnsoftware/update"
	        $.ajaxSetup({ contentType : 'application/json' });
	        MyAjax.ajax({
						type: "POST",
						url:url,
						data: JSON.stringify(that.localSoftware[index]),
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
					setTimeout(()=>(
       			$("#"+that.fineUploaderId[index]).html("")
          ),1)
					Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//确认编辑后视图切换回到原来查看页面
        }else{
        	if(that.localSoftware[index].software.trim().length===0){
        		that.showAlert.software = true;
        		that.alertText.software = "请输入软件名称"
        	}else{
        		that.showAlert.software = false;
        		that.alertText.software = ""
        	}
        }
      },
      
      softwareEditCancel(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        
        this.localSoftware[index]=JSON.parse(JSON.stringify(this.software[index]));

        /*如果是取消编辑，从新从Vuex中得到数据*/
       	setTimeout(()=>(
	   			$("#"+this.fineUploaderId[index]).html("")
	      ),1)
       	this.updateData();
      },
      softwareEditDel(index){//编辑状态，删除按钮
        var aa = "deleteModalClass"+index;
    		Modal.makeText($('.'+aa))
       
      },
      closeModal(index){
				var aa = "deleteModalClass"+index;
    		Modal.closeModal($('.'+aa))
			},
      confirmDelete(index){
      	var that = this;
        console.log(that.software[index].pkid)
        var url = MyAjax.urlsy+"/psnsoftware/del/"+that.software[index].pkid;
        MyAjax.delete(url)
        that.updateData();
        that.closeModal(index);
      },
      cancleDele(index){
    		//取消删除该项目
    		this.closeModal(index);
    	},
      addSoftware(){//添加信息按钮，添加信息的视图切换
      	this.newSoftware.software = "";
        this.newSoftware.proficiency = "";
        Vue.set(this.reveal,"addSoftware",false);
        Vue.set(this.reveal,"empty",false);
        var that=this;

        //上传图片
        singleManualUploader({
          element:"fine-template-manual-trigger-software",
          template: "qq-template-manual-trigger-software",
          url:MyAjax.urlsy+'/psnsoftware/batchUpload',
          picIdCont:that.newSoftware.picId,
          btnPrimary:".btn-primary-software",
          canUploadNum:3,
        })

      },
      keepNewSoftware(){//添加模式下的保存
        var that = this;
        let condition = that.newSoftware.software.trim().length!=0;
        if(condition){
        	var url = MyAjax.urlsy+"/psnsoftware/insert";
	        $.ajaxSetup({ contentType : 'application/json' });
	        MyAjax.ajax({
						type: "POST",
						url:url,
						data:JSON.stringify(that.newSoftware),
						dataType: "json",
						async:false,
					},function(data){
						console.log(data)
					},function(err){
						console.log(err)
					})
	        that.updateData();
					setTimeout(()=>(
						$("#fine-uploader-manual-trigger-paper").html("")
        	),1)
					Vue.set(this.reveal,"addSoftware",true);
        }else{
        	if(that.newSoftware.software.trim().length===0){
        		that.showAlert.software = true;
        		that.alertText.software = "请输入软件名称"
        	}else{
        		that.showAlert.software = false;
        		that.alertText.software = ""
        	}
        }
        
      },
      cancelNewSoftware(){
        Vue.set(this.reveal,"addSoftware",true);
        //视图切换到执业资格的首页
        Vue.set(this.newSoftware,"software","");
        Vue.set(this.newSoftware,"proficiency","");
        /*清除数据，保证下次输入时输入框为空*/
				setTimeout(()=>(
					$("#fine-uploader-manual-trigger-paper").html("")
	    	),1)
				this.updateData();
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
  .softwareIndex {
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
    .softwareContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .softwareInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .softwareInfoList{
          .softwareInfoTitle{
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
                margin: 0;
                padding: 0;
                p{
                  color: $themeColor;
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
              li.img-wrap{
					    	/*padding-left: 30px;*/
					    	>div{
					    		width: 730px;
					    		float: left;
					    	}
					    }
					    li:last-child{
                p{
                  padding-right:0;
                  padding-left:21px;
                  background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
                }
              }
              .deleteSoftware{
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
                p{
                  background: url("../../../assets/img/personal/education/hidden.png") left center no-repeat!important;
                  color: #353535;
                }

              }
            }

          }
          .softwareInfoBody{
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
        .softwareInfoEdit{
          >ul{
            >li{
              margin:20px 0;
              position: relative;
              .wrap-left{
				      	line-height: 35px;
				      	text-align: right;
				      	float: left;
				      	color:$themeColor;
				      	margin-right: 25px;
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
              select{
                width:150px;
                height: 35px;
                border-radius: 5px;
                color: #363636;
                border: 1px solid #ebebeb;
                padding-left: 12px;
                margin-left: 22px;
              }
              .alet_container{
				      	right: 10px;
				      	top: 8px;
				      	bottom: 0;
				      }
            }
            li:nth-child(1){
              color: #909090;
              margin-top:30px;
              margin-bottom:20px;
            }
            li.img-wrap{
				    	/*padding-left: 30px;*/
				    	>div{
				    		width: 730px;
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
              .btn_disable{
                background: url("../../../assets/img/personal/education/btn_save_disabled.png.png") left center no-repeat !important;
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
    .softwareContainer{
      >ul{
       > li{
          margin:20px 0;
          position: relative;
          .wrap-left{
		      	line-height: 35px;
		      	text-align: right;
		      	float: left;
		      	color:$themeColor;
		      	margin-right: 25px;
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
          select{
            width:150px;
            height: 35px;
            border-radius: 5px;
            color: #363636;
            border: 1px solid #ebebeb;
            padding-left: 12px;
            margin-left: 22px;
          }
          .alet_container{
		      	right: 10px;
		      	top: 8px;
		      	bottom: 0;
		      }
        }
        li:nth-child(1){
          color: #909090;
          margin-top:30px;
          margin-bottom:20px;
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
          .btn_disable{
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
        width: 730px;
        float: left !important;
        .picList{
          float: left;
          width: 200px;
          height: 200px;
          padding: 8px;
          background: rgba(210,210,210,.3);
          border-radius: 10px;
          margin-right: 10px;
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
