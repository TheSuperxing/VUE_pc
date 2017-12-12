<template>
  <div class="awardIndex">

    <div class="title clear">
      <h2 v-cloak>{{title.text}}</h2>
      <p v-on:click="addInfo" v-if="reveal.addAward">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="awardContainer" v-show="reveal.addAward">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加所获奖励信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="awardInfo" v-for="(item,index) in this.award">
        <!--显示信息列表开始-->
        <div class="awardInfoList clear" v-show="!reveal.editInfo[index]">
          <div class="awardInfoTitle clear">
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
              <!--确认删除该项目模态框-->
		    			<div id="modal-overlay" v-bind:class="deleteModalClass[index]">
								<div class="deleteAward">
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
            <li class="clear">
              <label>
                <h5>*&nbsp;奖励名称</h5>
                <input @input="btnColor(index)" v-model="localAward[index].awardName" type="text" placeholder="请输入资格名称">
              </label>
            </li>
            <li class="clear">
              <label>
                <h5>颁发机构</h5>
                <input v-model="localAward[index].awardingBody" type="text" placeholder="请输入发证机构">
              </label>
            </li>
            <li class="clear">
              <label>
                <h5>*&nbsp;评定日期</h5>
                <!-- <datepicker v-model="localAward[index].awardingTime"></datepicker> -->
                <year-month v-model="localAward[index].awardingTime"></year-month>
              </label>
            <li class="img-wrap clear">
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
              <button v-bind:class="{but_disable:reveal.btnColor[index]}" v-on:click="keepAwardEdit(index)">保存</button>
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
        <li  class="clear">
          <label>
            <h5>*&nbsp;奖励名称</h5>
            <input v-model="newAward.awardName" type="text" placeholder="请输入资格名称">
          </label>
        </li>
        <li  class="clear">
          <label>
            <h5>颁发机构</h5>
            <input v-model="newAward.organ" type="text" placeholder="请输入注册单位">
          </label>
        </li>
        <li  class="clear">
          <label>
            <h5>*&nbsp;获奖时间</h5>
            <!--<input v-model="newAward.info.time" type="month" placeholder="请输入注册单位">-->
            <!-- <datepicker v-model="newAward.time"></datepicker> -->
            <year-month v-model="newAward.time"></year-month>
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
        <li  class="clear">
          <button v-bind:class="{but_disable:reveal.keepAdd}" v-on:click="keepAwardAdd">保存</button>
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
  import YearMonth from "../units/yearMonth.vue"
  import qq from "fine-uploader"
  import MyAjax from "../../../assets/js/MyAjax.js"
  import {singleManualUploader,moreManualUploader} from "../../../assets/js/manualUploader.js"
	import Modal from "../../../assets/js/modal.js"  
  

  export default {
    name:"awardIndex",
    components:{
      datepicker,
      YearMonth
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
          btnColor:[],//编辑模式下，保存按钮是否可用颜色控制
        },
        updowntxt:[],
        show:{
        	tag:[],
        },
        deleteModalClass:[],
        
        award:[],
        localAward:[],
        newAward:{
          awardName:"",
          organ:"",
          time:"",
          picId:[],
        },
        picArr:[],//图片展示的数组
        picNum:[],//各条信息已经上传的图片数
        fineUploaderId:[],//存放实例化div的id名数组
        qqTemplate:[],//存放script标签的id数组
        qqFineloader:[],//实例化的上传组件数组  一旦点击一个就全部实例化
      }
    },
    created(){
      this.getData()
    },
    mounted(){
      if(this.award.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
      }
      /*以上是初始化*/
      
      /*以上是是否对外显示文本信息初始化*/

    },
    updated(){
      if(this.award.length==0){
        Vue.set(this.reveal,"empty",true)
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newAward.awardName.trim().length!=0&&this.newAward.awardingTime.length!=0){
        Vue.set(this.reveal,"keepAdd",false);
        Vue.set(this.newAward,"awardName",this.newAward.awardName.trim())//进行空格去除处理
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
              }else{
                console.log("错误返回");
              }
              
            },function(err){
              console.log(err)
            })
            // 从服务器获取数据
            function emptyText(text){
              if(text==null||text.length == 0){
                return "（暂无信息）";
              }else {
                return text;
              }
            }
            that.localAward=JSON.parse(JSON.stringify(that.award));
            that.fineUploaderId = [];
            that.qqTemplate = [];
            that.show.tag=[];
	    	    that.updowntxt=[];
	    	    that.deleteModalClass = [];
	    	    
            for(let i=0;i<that.award.length;i++){//拼接fineUploader的ID
              that.award[i].awardingBody = emptyText(that.award[i].awardingBody);
              that.award[i].awardingTime = emptyText(that.award[i].awardingTime);
              // 进行为空的数据处理
              that.fineUploaderId.push("fine-uploader-manual-trigger"+that.localAward[i].pkid);
              that.qqTemplate.push("qq-template-manual-trigger"+that.localAward[i].pkid);
              //通过pkid生成fineuploader特有的模版和对应模版容器
         	    that.show.tag[i]=true;
	    				that.updowntxt.push("展开查看更多");
					    that.deleteModalClass.push("deleteModalClass"+i);//添加模态框类名
              that.reveal.btnColor.push(false);//编辑按钮是否可用颜色控制
	    				if(this.award[i].ifVisable===0){
		            Vue.set(this.reveal.openOrPrivacyText,[i],"隐藏")
		            //this.reveal.openOrPrivacyText.push("显示")
		          }else{
		            Vue.set(this.reveal.openOrPrivacyText,[i],"显示")
		            //this.reveal.openOrPrivacyText.push("隐藏")
		          }
            }
            console.log(this.award)
      },
      getPicture(index){
    		var that = this;
    		var url = MyAjax.urlsy+"/psnAwards/findPicsById/"+that.award[index].pkid;
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
				console.log(this.show.tag[index])
				if(this.show.tag[index]==true){
					Vue.set(this.show.tag,[index],false)
					this.updowntxt[index] = "收起";
					this.getPicture(index);
				}else{
					Vue.set(this.show.tag,[index],true)
					this.updowntxt[index] = "展开查看更多" 
				}
    		this.show.tag[index] == true? false:true;
    		this.updowntxt[index]=="展开查看更多"?"收起":"展开查看更多";
    		var that = this;
    		that.getPicture(index).then(function(data){
    			Vue.set(that.picArr,[index],data.msg)
					Vue.set(that.picNum,[index],that.picArr[index].length)
    		});
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
            async:false,
          },function(data){
            //console.log(data)
          },function(err){
            console.log(err)
          })
          that.getData();
      },
      async awardEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
        let awardingBody =this.localAward[index].awardingBody;
        let awardingTime=this.localAward[index].awardingTime;
        awardingBody=="（暂无信息）"?this.localAward[index].awardingBody="":awardingBody=awardingBody;
        awardingTime=="（暂无信息）"?this.localAward[index].awardingTime="":awardingTime=awardingTime;
				//如果将要编辑的数据为（暂无信息），则重置位空
        var that = this;
        const getPic = await that.getPicture(index);
        if(getPic.code === 0){
      		const data = await Promise.resolve(true).then(
  				function(){
  					Vue.set(that.picArr,[index],getPic.msg)
	    	  	Vue.set(that.picNum,[index],that.picArr[index].length)
	    	  	return that.picNum;
  				}
  			)
      		console.log(that.picNum[index])
      		
      	}
				if(Math.floor(3-that.picNum[index])>0){
					that.localAward[index].picId = [];
					$("#"+that.fineUploaderId[index]).html("")
		     	moreManualUploader({
	          nameList:'manualUploader'+index,
	          element:that.fineUploaderId[index],
	          template: that.qqTemplate[index],
	          url:MyAjax.urlsy+"/psnAwards/batchUpload",
	          anotherParam:that.localAward[index].pkid,
	          picIdCont:that.localAward[index].picId,
	          btnPrimary:".btn-primary",
	          canUploadNum : Math.floor(3-that.picNum[index]),
	        })
				}
				

      },
      btnColor(index){//
			  let condition=this.localAward[index].awardName.trim().length!=0
				if(condition){
					Vue.set(this.reveal.btnColor,[index],false);
				}else{
					Vue.set(this.reveal.btnColor,[index],true);
				}
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
            async: false, 
          },function(data){
            //console.log(data)
          },function(err){
            console.log(err)
          })
          that.getData();
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//取消编辑后视图切换回到原来查看页面
          /*如果是保存，把数据保存到Vuex中*/
         	setTimeout(() => {
             $("#"+this.fineUploaderId[index]).html("")
           }, 1);
        }
      },
      deleThisPicPromise(id){//封装删除图片的promise，异步操作动态改变可上传数量
      	var that = this;
      	var url = MyAjax.urlsy + "/psnAwards/delPic/"+ id;
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
      	that.localAward[index].picId = [];
      	$("#"+this.fineUploaderId[index]).html("")
	     	moreManualUploader({
          nameList:'manualUploader'+index,
          element:that.fineUploaderId[index],
          template: that.qqTemplate[index],
          url:MyAjax.urlsy+"/psnAwards/batchUpload",
          anotherParam:that.localAward[index].pkid,
          picIdCont:that.localAward[index].picId,
          btnPrimary:".btn-primary",
          canUploadNum : Math.floor(3-that.picNum[index]),
        })
      	
      },
      cancelAwardEdit(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        this.localAward[index].awardName=this.award[index].awardName;
        this.localAward[index].awardingBody=this.award[index].awardingBody;
        this.localAward[index].awardingTime=this.award[index].awardingTime;
        /*如果是取消编辑，从新从Vuex中得到数据*/
        setTimeout(() => {
          $("#"+this.fineUploaderId[index]).html("")
        }, 1);
      },
      awardDel(index){//编辑状态，删除按钮
        var aa = "deleteModalClass"+index;
    		Modal.makeText($('.'+aa))
        
      },
      closeModal(index){
				var aa = "deleteModalClass"+index;
    		Modal.closeModal($('.'+aa))
			},
      confirmDelete(index){
      	var that=this;
        var url = MyAjax.urlsy+"/psnAwards/del/"+this.award[index].pkid;
        MyAjax.delete(url);
        that.getData();
        that.closeModal(index);
      },
      cancleDele(index){
    		//取消删除该项目
    		this.closeModal(index);
    	},
      addInfo(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addAward",false);
        Vue.set(this.reveal,"empty",false);
        //上传图片
        singleManualUploader({
	        element:"fine-uploader-manual-trigger",
					template: "qq-template-manual-trigger",
	        url:MyAjax.urlsy+"/psnAwards/batchUpload",
	        picIdCont:this.newAward.picId,
	        btnPrimary:".btn-primary",
					canUploadNum:3,
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
              async: false,
            },function(data){
              //console.log(data)
            },function(err){
              console.log(err)
            })
            this.getData();
            // 从新获取数据
            
          }
        }

        Vue.set(this.newAward,"awardName","");
        Vue.set(this.newAward,"time","");
        Vue.set(this.newAward,"organ","");
        
        setTimeout(() => {
          $("#fine-uploader-manual-trigger").html("")
        }, 1);
        /*清除数据，保证下次输入时输入框为空*/
      },
      cancelAwardAdd(){
        Vue.set(this.reveal,"addAward",true);
        //视图切换到执业资格的首页
        Vue.set(this.newAward,"awardName","");
        Vue.set(this.newAward,"time","");
        Vue.set(this.newAward,"organ","");
        /*清除数据，保证下次输入时输入框为空*/
       	setTimeout(() => {
           $("#fine-uploader-manual-trigger").html("");
         }, 1);
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
              >li:nth-child(3){
                p{
                  padding-right:0;
                  padding-left:21px;
                  background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
                }
              }
              .deleteAward{
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
            >li:nth-child(4){
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
              .but_disable{
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
        li:nth-child(4){
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
          .but_disable{
            background: url("../../../assets/img/personal/education/btn_save_disabled.png.png") left center no-repeat !important;
          }
        }
      }
    }
    /*添加信息结束*/
  }
</style>
