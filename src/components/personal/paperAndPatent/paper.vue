<template>
  <div class="paperIndex">

    <div class="title clear">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addPaper" v-if="reveal.addPaper">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="paperContainer" v-show="reveal.addPaper">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加论文信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="paperInfo" v-for="(item,index) in this.paper">
        <!--显示信息列表开始-->
        <div class="paperInfoList clear" v-if="!reveal.editInfo[index]">
          <div class="paperInfoTitle clear">
            <h4 v-cloak>{{paper[index].paperTitle}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:!paper[index].ifVisable}" v-on:click="openOrPrivacy(index)">
                <p v-cloak>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="paperEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="paperEditDel(index)">
                <p>删除</p>
              </li>
              <!--确认删除该项目模态框-->
		    			<div id="modal-overlay" v-bind:class="deleteModalClass[index]">
								<div class="deletePaper">
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
          <div class="paperInfoBody clear">
            <p v-cloak>{{paper[index].journal}}</p>
            <p v-cloak>{{paper[index].publicTime}}</p>

            <div class="morePics" v-if="!show.tag[index]">
                <img v-for="item in show.picList[index]" :src="item.pic" />
                <!-- <img v-for="item in show.picList" :src="data:image/png;base64,item.pic" /> -->
            </div>
            <div class="viewMore">
              <p v-bind:class="{viewDown:show.tag[index],viewUp:!show.tag[index]}" @click="upDown(index)">
                <span>{{updowntxt[index]}}</span>
              </p>
            </div>

          </div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="paperInfoEdit" v-show="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li class="clear">
              <label>
                <h5>*&nbsp;论文名称</h5>
                <input v-model="localPaper[index].paperTitle" type="text" placeholder="请输入论文名称">
              </label>
              <alertTip v-if="showAlert.paperTitle" :showHide="showAlert.paperTitle"  :alertText="alertText.paperTitle"></alertTip>
              
            </li>
            <li class="clear">
              <label>
                <h5>发表期刊</h5>
                <input v-model="localPaper[index].journal" type="text" placeholder="请输入发表期刊">
              </label>
            </li>
            <li class="clear">
              <label>
                <h5>*&nbsp;发表时间</h5>
                <!--<input v-model="localPaper.info.time[index]" type="month">-->
                <!-- <datepicker v-model="localPaper[index].publicTime"></datepicker> -->
                <year-month v-model="localPaper[index].publicTime"></year-month>
              </label>
              <alertTip v-if="showAlert.publicTime" :showHide="showAlert.publicTime"  :alertText="alertText.publicTime"></alertTip>
              
            </li>
            <li class="img-wrap clear">
							<h5 class="wrap-left">图片展示</h5>

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
						                <button type="button"  class="btn btn-primary btn-primary-paper" id="trigger-upload">
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
              <button v-on:click="paperEditKeep(index)">保存</button>
              <button v-on:click="paperEditCancel(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->
    <div class="paperContainer" v-show="!reveal.addPaper">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li class="clear">
          <label>
            <h5>*&nbsp;论文名称</h5>
            <input v-model="newPaper.paperTitle" type="text" placeholder="请输入论文">
          </label>
          <alertTip v-if="showAlert.paperTitle" :showHide="showAlert.paperTitle"  :alertText="alertText.paperTitle"></alertTip>
          
        </li>
        <li class="clear">
          <label>
            <h5>发表期刊</h5>
            <input v-model="newPaper.journal" type="text" placeholder="请输入发表期刊">
          </label>
        </li>
        <li class="clear">
          <label>
            <h5>*&nbsp;发表时间</h5>
            <!--<input v-model="newPaper.info.time" type="month" placeholder="请输入发表时间">-->
            <!-- <datepicker v-model="newPaper.publicTime"></datepicker> -->
            <year-month v-model="newPaper.publicTime"></year-month> 
          </label>
          <alertTip v-if="showAlert.publicTime" :showHide="showAlert.publicTime"  :alertText="alertText.publicTime"></alertTip>
          
        </li>
        <li class="img-wrap clear">
					<h5 class="wrap-left">图片展示</h5>
					<script type="text/template" id="qq-template-manual-trigger-paper">
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
			                <button type="button"  class="btn btn-primary btn-primary-paper" id="trigger-upload-paper">
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
			    <div id="fine-uploader-manual-trigger-paper"></div>
				</li>
				<li class="tip-wrap clear">
          <p>( 可上传相关图片，支持JPG、PNG,不超过2M )</p>
        </li>
        <li class="clear">
          <button v-bind:class="{keepAdd:reveal.keepAddPaper}" v-on:click="keepNewPaper">保存</button>
          <button v-on:click="cancelNewPaper">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import datepicker from "../../units/Datepicker.vue"
  import YearMonth from "../units/yearMonth.vue"
  import qq from "fine-uploader"
  import MyAjax from "../../../assets/js/MyAjax.js"
  import {singleManualUploader,moreManualUploader} from "../../../assets/js/manualUploader.js"
	import Modal from "../../../assets/js/modal.js"
  import alertTip from "../units/alertTip.vue"
	
	
  export default {
    name:"PaperIndex",
    components:{
      datepicker,
      YearMonth,
      alertTip
    },
    data(){
      return {
        title:"论文",
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacyText:[],//信息是否公开显示,文字切换
          editInfo:[],//是否编辑信息
          addPaper:true,//是否添加信息
          keepAddPaper:true,//添加模式下，保存按钮是否可用
        },

        updowntxt:[],
        show:{
          tag:[],
          picList:[],
          picNum:[],
        },
        deleteModalClass:[],
        showAlert:{paperTitle:false,publicTime:false},//提示框显隐
	      alertText:{paperTitle:null,publicTime:null},
        paper:[],
        localPaper:[],
        newPaper:{
          accountID:"string",
          paperTitle:"",
          journal:"",
          publicTime:"",
          picId:[],//上传图片返回的ID
        },
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
        qqTriggerUpload:[],//上传按钮
        
      }
    },
    created(){
      this.getData();
    },
    mounted(){
	    
      if(this.paper.length!=0){
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
        for(let i=0;i<this.paper.length;i++){

          this.reveal.editInfo.push(false);//信息是否可以编辑赋初始值
          
          this.reveal.openOrPrivacyText.push("显示");//信息是否对外显示文字切换赋初始值
        }
      }else{
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }
      
    },
    updated(){
      if(this.paper.length!=0){
        Vue.set(this.reveal,"empty",false)
      }else if(this.paper.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newPaper.paperTitle.length!=0){
        if(this.newPaper.paperTitle.trim().length!=0){
          Vue.set(this.reveal,"keepAddPaper",false);//控制保存按钮的背景颜色
          Vue.set(this.newPaper,"paperName",this.newPaper.paperTitle.trim())//进行必填项的空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAddPaper",true);//控制保存按钮的背景颜色
      }
    },
    methods:{
      getData(){//用于每次信息更新后从新获取数据
        var that=this;
        var url = MyAjax.urlsy+"/psnPaperPatent/findByMySelfPaper/"+"string";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async: false,
        },function(data){
          if(data.code==0){
            that.paper=data.msg
            console.log(data)
          }else{
            console.log("错误返回");
          }
          
        },function(err){
          console.log(err)
        })
        // 从服务器获取数据
        that.localPaper=JSON.parse(JSON.stringify(this.paper));
        //数据库的数据放本地一份
				that.fineUploaderId = [];
				that.qqTemplate = [];
				that.qqTriggerUpload = [];
				that.updowntxt = [];
	    	that.deleteModalClass = [];
				that.showAlert.paperTitle = false;
	    	that.alertText.paperTitle = null;
	    	that.showAlert.publicTime = false;
	    	that.alertText.publicTime = null;
	    	
        for(var i=0;i<that.paper.length;i++){
          that.fineUploaderId.push("fine-uploader-manual-trigger-paper"+this.paper[i].pkid);
          that.qqTemplate.push("qq-template-manual-trigger-paper"+this.paper[i].pkid);
          that.qqTriggerUpload.push("trigger-upload"+this.paper[i].pkid);
          that.show.tag[i]=true;
          that.updowntxt.push("展开查看更多");
					that.deleteModalClass.push("deleteModalClass"+i);//添加模态框类名
          
          if(that.paper[i].ifVisable==0){
		        Vue.set(that.reveal.openOrPrivacyText,[i],"隐藏")
		      }else{
		        Vue.set(that.reveal.openOrPrivacyText,[i],"显示")
		      }
        }
        

      },
      getPic(index){
        var that=this;
        var url=MyAjax.urlsy+"/psnPaperPatent/findPicsById/"+that.paper[index].pkid;
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
        var that=this;
        if(this.paper[index].ifVisable==0){
          Vue.set(this.paper[index],"ifVisable",1);
        }else{
          Vue.set(this.paper[index],"ifVisable",0);
        }
        
        var url = MyAjax.urlsy+"/psnPaperPatent/updatePaper";
          MyAjax.ajax({
            type: "POST",
            url:url,
            data: JSON.stringify(that.paper[index]),
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            async: false,
          },function(data){
            //console.log(data)
          },function(err){
            console.log(err)
          })
          that.getData();
          
          
        //Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);//信息是否对外公开的切换（颜色，和图片切换）
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
      async paperEdit(index){//编辑状态进入按钮
      	//console.log(index)
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
        var that = this;
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
      		that.localPaper[index].picId=[];
      		$("#"+that.fineUploaderId[index]).html("")
	        moreManualUploader({
	          nameList:'manualUploader_paper_'+index,
	          element:that.fineUploaderId[index],
	          template: that.qqTemplate[index],
	          url:MyAjax.urlsy+'/psnPaperPatent/batchUpload',
	          picIdCont:that.localPaper[index].picId,
	          btnPrimary:".btn-primary-paper",
	          canUploadNum : Math.floor(3-that.show.picNum[index]),
	        })
      	}

        

      },
      deleThisPicPromise(id){//封装删除图片的promise，异步操作动态改变可上传数量
      	var that = this;
      	var url = MyAjax.urlsy+"/psnPaperPatent/delPic/"+id
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
	  		that.localPaper[index].picId=[];
	  		$("#"+that.fineUploaderId[index]).html("")
        moreManualUploader({
          nameList:'manualUploader_paper_'+index,
          element:that.fineUploaderId[index],
          template: that.qqTemplate[index],
          url:MyAjax.urlsy+'/psnPaperPatent/batchUpload',
          picIdCont:that.localPaper[index].picId,
          btnPrimary:".btn-primary-paper",
          canUploadNum : Math.floor(3-that.show.picNum[index]),
        })
        
      },
      paperEditKeep(index){//编辑状态，保存按钮
        var that=this;
        let condition = that.localPaper[index].paperTitle.trim().length!=0;
        if(condition){
        	var url = MyAjax.urlsy+"/psnPaperPatent/updatePaper";
          MyAjax.ajax({
            type: "POST",
            url:url,
            data: JSON.stringify(that.localPaper[index]),
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            async: false,
          },function(data){
              console.log(data)
          },function(err){
            console.log(err)
          })
          that.getData();
          Vue.set(that.reveal.editInfo,[index],!that.reveal.editInfo[index])//确认编辑后视图切换回到原来查看页面
          setTimeout(()=>(
       			$("#"+that.fineUploaderId[index]).html("")
          ),1)
          that.localPaper[index].picId=that.paper[index].picId;
        }else{
        	if(that.localPaper[index].paperTitle.trim().length===0){
        		that.showAlert.paperTitle = true;
        		that.alertText.paperTitle = "请输入论文名称"
        	}else{
        		that.showAlert.paperTitle = false;
        		that.alertText.paperTitle = ""
        	}
        	if(that.localPaper[index].publicTime.trim().length===0){
        		that.showAlert.publicTime = true;
        		that.alertText.publicTime = "请输入发表时间"
        	}else{
        		that.showAlert.publicTime = false;
        		that.alertText.publicTime = ""
        	}
        }
      },
      paperEditCancel(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        this.localPaper[index].paperTitle=this.paper[index].paperTitle;
        this.localPaper[index].journal=this.paper[index].journal;
        this.localPaper[index].publicTime=this.paper[index].publicTime;
        /*如果是取消编辑，从新从Vuex中得到数据*/
        //console.log($("#"+this.fineUploaderId[index]+" .qq-uploader"))
        setTimeout(()=>(
	   			$("#"+this.fineUploaderId[index]).html("")
	      ),1)
        
      },
      paperEditDel(index){//编辑状态，删除按钮
        var aa = "deleteModalClass"+index;
    		Modal.makeText($('.'+aa))
      },
      closeModal(index){
				var aa = "deleteModalClass"+index;
    		Modal.closeModal($('.'+aa))
			},
      confirmDelete(index){
      	var that=this;
        var url = MyAjax.urlsy+"/psnPaperPatent/delPaper/"+this.paper[index].paperID;
        MyAjax.delete(url);
        that.getData();
        that.closeModal(index);
      },
      cancleDele(index){
    		//取消删除该项目
    		this.closeModal(index);
    	},
      
      addPaper(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addPaper",false);
        Vue.set(this.reveal,"empty",false);

        var that = this;
        //上传图片
        //实例化编辑状态的上传图片
        singleManualUploader({
          element:"fine-uploader-manual-trigger-paper",
          template: "qq-template-manual-trigger-paper",
          url:MyAjax.urlsy+'/psnPaperPatent/batchUpload',
          picIdCont:that.newPaper.picId,
          btnPrimary:".btn-primary-paper",
          canUploadNum:3,
        })

      },
      keepNewPaper(){//添加模式下的保存
        var that=this;
        let condition = that.newPaper.paperTitle.trim().length!=0;
        if(condition){
        	var url = MyAjax.urlsy+"/psnPaperPatent/insertPaper";
	        MyAjax.ajax({
	          type: "POST",
	          url:url,
	  				data: JSON.stringify(that.newPaper),
	          dataType: "json",
	  			  contentType: "application/json;charset=UTF-8",
	          async: false,
	        },function(data){
	          //console.log(data)
	        },function(err){
	          console.log(err)
	        })
	        this.getData();
	        // 从新获取数据
	        setTimeout(()=>(
        		$("#fine-uploader-manual-trigger-paper").html("")
	        ),1)
	        Vue.set(this.reveal,"addPaper",true);
	        Vue.set(this.newPaper,"paperTitle","");
	        Vue.set(this.newPaper,"journal","");
	        Vue.set(this.newPaper,"publicTime","");
        }else{
        	if(that.newPaper.paperTitle.trim().length===0){
        		that.showAlert.paperTitle = true;
        		that.alertText.paperTitle = "请输入论文名称"
        	}else{
        		that.showAlert.paperTitle = false;
        		that.alertText.paperTitle = ""
        	}
        	if(that.newPaper.publicTime.trim().length===0){
        		that.showAlert.publicTime = true;
        		that.alertText.publicTime = "请输入发表时间"
        	}else{
        		that.showAlert.publicTime = false;
        		that.alertText.publicTime = ""
        	}
        }
      },

      cancelNewPaper(){

        Vue.set(this.reveal,"addPaper",true);
        //视图切换到执业资格的首页
        //视图切换到执业资格的首页
        Vue.set(this.newPaper,"paperTitle","");
        Vue.set(this.newPaper,"journal","");
        Vue.set(this.newPaper,"publicTime","");
        /*清除数据，保证下次输入时输入框为空*/
       	setTimeout(()=>(
    			$("#fine-uploader-manual-trigger-paper").html("")
        ),1)
       	this.getData();
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
  .paperIndex {
  	padding-bottom: 40px;
    .year-month{
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
    .paperContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .paperInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .paperInfoList{
          .paperInfoTitle{
            color: $themeColor;
            margin-top: 30px;
            margin-bottom:15px;
            h4{
              float: left;
              height: 18px;
              line-height: 18px;
              font-size: 14px;
              
            }
            ul{
              height: 18px;
              float: right;
              li{
                float: left;
                cursor: pointer;
                margin:0;
                padding:0;
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
              li:last-child{
                p{
                  padding-right:0;
                  padding-left:21px;
                  background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
                }
              }
              .deletePaper{
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
							    background: rgb(247,249,252);
							    padding: 0 40px;
							    
								}
								.modalChaBtn{
							     width: 20px;
							     height: 20px;
							     background: url(../../../assets/img/personal/workexperience/icon_close.png) no-repeat center;
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
          .paperInfoBody{
            p{
              height: 14px;
              line-height: 14px;
              color: rgb(53, 53, 53);
              span{
                color: #757575;
                margin-left:8px;
              }
            }
            p:nth-child(2){
              margin-bottom:17px;
              color: rgb(117, 117, 117);
              margin-top: 15px;
            }
          }
        }
        /*信息列表结束*/
        /*编辑信息列表开始*/
        .paperInfoEdit{
          ul{
            li{
              margin:20px 0;
              position: relative;
              h5{
                float: left;
                line-height: 35px;
                color: $themeColor;
                cursor: pointer;
                width: 90px;
                text-align: right;
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
    .paperContainer{
      ul{
        li{
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
            width: 90px;
            text-align: right;
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
        		width: 700px;
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
        width: 700px;
        float: left;
        .picList{
          float: left !important;
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
            right: 12px;
            cursor: pointer;
            background: url("../../../assets/img/personal/common/picDelete.png") no-repeat center;
          }
        }
      }
      // 编辑显示已有图片样式
  }
</style>
