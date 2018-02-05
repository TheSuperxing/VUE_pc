<template>
	<div class="demandDetail">
		<div class="title-wrap">
			<h3 class="D-title">{{detailInfo.demandbasicinfo.demandName}}
				<div class="toolsBox">
					<div v-if="isMine"  v-show="canEdit">
						<span @click="toDelete(detailInfo.demandbasicinfo.pkid)" class="deleteBtn" v-if="canDelete" >
							<img src="../../assets/img/demand/delete-black.png" />
							<img src="../../assets/img/demand/icon49.png" />
							删除
						</span>
						<span @click="toOffLine(detailInfo.demandbasicinfo.pkid)" class="offlineBtn" v-if="canOffline">
							<img src="../../assets/img/demand/icon50.png" />
							<img src="../../assets/img/demand/icon51.png" />
							下线
						</span>
						<span @click="toModify(detailInfo.demandbasicinfo.pkid)" class="editBtn" v-if="canEdit">
							<img src="../../assets/img/demand/icon3.png" />
							<img src="../../assets/img/demand/icon1.png" />
							编辑
						</span>
					</div>
					<div class="auditStatus" >{{auditStatusTxt}}</div>
					<div v-if="!isMine">
						<span class="cancelBtn" @click="cancelCollect(detailInfo.demandbasicinfo.pkid)" v-if="haveCollect">
							<img src="../../assets/img/demand/icon59.png"/>
							<img src="../../assets/img/demand/icon59.png"/>
							取消收藏
						</span>
						<span v-if="!haveCollect" class="collectBtn" @click="collectThis(detailInfo.demandbasicinfo.pkid)">
							<img src="../../assets/img/demand/icon002.png"/>
							收藏
						</span>
					</div>
					
					<!--编辑此需求的模态框 start-->
					<div id="modal-overlay" class="confirmModify">
						<div class="modal-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal"></span>
							<p>进入编辑状态后，该需求将在需求中心下线。</p>
							<p>且编辑后需等待管理员审核通过后才可再次进入需求中心。</p>
							<p>是否确认进入编辑？</p>
							<div class="confirmBtn" @click="cfmModify(detailInfo.demandbasicinfo.pkid)">
								进入编辑
							</div>
						</div>
					</div>
					<!--确认下线的模态框 start-->
					<div id="modal-overlay" class="confirmOffline">
						<div class="modal-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal"></span>
							<p>如您确认进行下线操作，该需求将在需求中心下线。</p>
							<p>您可在  "我的发布"——"无效需求"  中进行查看。</p>
							<div class="confirmBtn" @click="cfmOffLine(detailInfo.demandbasicinfo.pkid)">
								确认下线
							</div>
						</div>
					</div>
					<div id="modal-overlay" class="confirmDelete">
						<div class="modal-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal(detailInfo.demandbasicinfo.pkid)"></span>
							<p>是否确认删除该需求？</p>
							<div class="confirmBtn" @click="cfmDelete(detailInfo.demandbasicinfo.pkid)">
								确认删除
							</div>
						</div>
					</div>
				</div>
				
			</h3>
			<p class="time-wrap">发布时间：{{detailInfo.demandbasicinfo.complateTime}}</p>
		</div>
		<div class="info-wrap">
			<div class="pub-wrap">
				<h5 class="info-title">
					<span>发布方</span>
				</h5>
				<p>{{detailInfo.demandbasicinfo.pubName}}</p>
			</div>
			<h5 class="info-title">
				<span>我的需求</span>
				<em v-bind:class="{up:updownFlag,down:!updownFlag}" @click="upDwon">{{updownText}}</em>
			</h5>
			<div class="detail-wrap">
				<ul>
					<li>
						<div class="wrap-left">需求描述</div>
						<p>{{detailInfo.demandbasicinfo.describe}}</p>
						<p v-if="!haveValue.describe">暂无信息</p>
					</li>
					<li>
						<div class="wrap-left">完成时间</div>
						<p>{{detailInfo.demandbasicinfo.complateTime}}</p>
						<p v-if="!haveValue.complateTime">暂无信息</p>
					</li>
					<li>
						<div class="wrap-left">需求对象</div>
						<p>
							<em v-for="item in detailInfo.demandobjs">{{item}}</em>
						</p>
						<p v-if="!haveValue.demandObj">暂无信息</p>
					</li>
					<li> 
						<div class="wrap-left">对象要求</div>
						<p>{{detailInfo.demandbasicinfo.objRequire}}</p>
						<p v-if="!haveValue.objRequire">暂无信息</p>
					</li>
					<li>
						<div class="wrap-left">需求酬劳</div>
						<p>{{detailInfo.demandbasicinfo.reword}}{{currencyUnit}}</p>
						<p v-if="!haveValue.reword">暂无信息</p>
					</li>
					<li>
						<div class="wrap-left">备注信息</div>
						<p>{{detailInfo.demandbasicinfo.remark}}</p>
						<p v-if="!haveValue.remark">暂无信息</p>
					</li>
					
				</ul>
				<div class="meng" v-if="mengShow"></div>
				
			</div>
			<p class="border_bottom"></p>
			<div class="applicant-wrap" v-if="havePublished">
				<h5 class="A-title">
					<span>申请方</span>
					<span class="submitApp" v-if="!isMine" v-show="!myIntention" @click="sendApply(detailInfo.demandbasicinfo.pkid)">提交申请</span>
				</h5>
				<div class="content-applicant">
					<p class="stateNone" v-if="!haveCooper">( 暂无申请方 )</p>
					<dl v-for="(item,index) in detailInfo.demandappinfos" v-if="!isMine">
						<dd><img :src="item.psnAvatar"/></dd>
						<dt>
							<p class="comName">{{item.nickName}}</p>
							<span class="alreadySent">
								{{intentionTxt[index]}}
							</span>
							<span v-if="item.app_isMine" @click="callReturnModal()" v-bind:class="['notyetSent',{disabled:!canOffline}]">{{myIntentionTxt}}</span>
							<div id="modal-overlay" class="confirmWithdraw" v-if="item.app_isMine">
								<div class="modal-wrap">
									<h5></h5>
									<span class="modalChaBtn" @click="closeModal()"></span>
									<p>确认撤回对该需求的申请吗？</p>
									
									<div class="confirmBtn" @click="withdrowIntention(item.pkid,2)">
										确认撤回
									</div>
								</div>
							</div>
							<div id="modal-overlay" class="confirmReturn" v-if="item.app_isMine">
								<div class="modal-wrap">
									<h5></h5>
									<span class="modalChaBtn" @click="closeModal()"></span>
									<p>是否退回对发布方的合作意向</p>
									<div class="confirmBtn" @click="returnIntention(item.pkid,4)">
										确认退回
									</div>
								</div>
							</div>
						</dt>
					</dl>
					<dl v-for="(item,index) in detailInfo.demandappinfos" v-if="isMine">
						<dd><img :src="item.psnAvatar"/></dd>
						<dt>
							<p class="comName">{{item.nickName}}</p>
							<span class="alreadySent">
								{{intentionTxt[index]}}
							</span>
							<span v-if="item.status=='1'" v-bind:class="['notyetSent',{disabled:!canOffline}]" @click="sentIntention(item.pkid,3)">同意合作申请</span>
						</dt>
					</dl>
				</div>
				
			</div>
			<div class="relatedDeal-wrap" v-if="havePublished">
				<h5 class="A-title">关联协议</h5>
				<ul class="content-relatedDeal">
					<li class="noDeal" v-if="!haveDeal">暂无关联协议</p>
					<li v-for="(item,index) in detailInfo.deals">
						与{{item.dealName}}签订的协议
						<span class="cancleDeal" @click="cancelDeal(item.dealID)" v-if="isMine">取消协议</span>
						<span class="dealState valid" v-if="item.valid">已生效</span>
						<span class="dealState unvalid" v-if="!item.valid">未生效</span>
					</li>
					<p class="stateNone" v-bind:class="{disabled:!canOffline}"  @click="addDeal" v-if="isMine">添加关联协议</p>
					<div id="modal-overlay" class="addDealModal">
						<div class="modal-wrap">
							<h5>添加关联协议</h5>
							<span class="modalChaBtn" @click="closeModal"></span>
							<div class="selectBox">
								<p>请选择关联协议</p>
								<select v-on:change="selectThisDeal($event)"  v-model="seletedDealName">
									<option v-for="item in relatedDeals"  v-bind:value="item.dealID" @click="">{{item.dealName}}</option>
								</select>
							</div>
							
							<div class="confirmBtn" @click="comfirmInsertDeal">
								确定
							</div>
						</div>
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../assets/js/modal.js"
	import router from '../../router'
	import MyAjax from "../../assets/js/MyAjax.js"
	export default{
		name:"demandDetail",
		data:function(){
			return{
				isMine:false,//是否是我发布的需求
				myIntention:false,//如果不是我的需求，判断我是否申请了需求
				myIntentionTxt:"",
				detailId:{id:""},//所查看的需求id
				detailInfo:"",//对应的所查看的需求详情信息
				updownText:"展开查看详情",
				updownFlag:false,//false收起状态
				mengShow:true,//true收起状态
				haveCooper:false,//有无申请方
				haveDeal:false,//有无关联协议
				havePublished:false,//有没有被发布过(审核状态值是一个大于等于3的值说明已经通过审核)有申请者和关联协议
				canEdit:false,//有没有在线(审核状态为"草稿1"、"已经通过2"、"未通过4"、"手动5和自动下线6")具有编辑的功能
				canOffline:false,//可以进行下线操作（已经通过3）
				canDelete:false,
				haveCollect:false,
				intentionTxt:[],//我发布的需求，针对申请者 有无合作意向之后的文字信息
				auditStatusShow:false,//需求审核状态的提示显隐 为auditStatus='0'表示在审核中，'1'表示审核完成可以编辑,"2"表示需求下线
				auditStatusTxt:"",//需求审核状态的文字
				haveValue:{describe:false,complateTime:false,demandObj:false,objRequire:false,reword:false,remark:false},//判断各行有没有信息显示
				relatedDeals:[],
				seletedDealName:"",
				selectedDeal:{
					demandID:"",
					dealID:"",
				}
			}
		},
		computed:mapState({
//			detailInfo:state=>state.demand.detailInfo,/*获取vuex数据  需求数组*/
//		    demandInfo:state=>state.demand.demandInfo,/*获取vuex数据  需求数组*/
//		    unvalidInfo:state=>state.demand.unvalidInfo,
//		    applicationInfo:state=>state.demand.applicationInfo,
//		    draftInfo:state=>state.demand.draftInfo,/*获取vuex数据  需求数组*/
//		    colletionInfo:state=>state.demand.colletionInfo,
//		    userID:state=>state.userState.user.userID,/*我的ID*/
			currencyUnit:function(){
				return this.detailInfo.demandbasicinfo.currency.split("-")[0]
			},		   	
		}),
		created(){
			this.getData()
		},
		mounted(){
			
			
		},
		methods:{
			getData(){
				var that = this;
				var url = MyAjax.urlhw+"/demandbasicinfo/findByID/" + that.$route.query.id
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"detailInfo",data.msg)
					}
//					console.log(that.detailInfo)
				},function(err){
					console.log(err)
				})
		    	that.detailInfo.demandobjs = that.detailInfo.demandobjs[0].split(",")
		    	for(let i=0;i<that.detailInfo.demandobjs.length;i++){
					if(that.detailInfo.demandobjs.length!=0){
						that.haveValue.demandObj = true;
					}
					switch (that.detailInfo.demandobjs[i]){
						case "1001":
							Vue.set(that.detailInfo.demandobjs,[i],"个人")
							break;
						case "1002":
							Vue.set(that.detailInfo.demandobjs,[i],"公司")
							break;
						case "1003":
							Vue.set(that.detailInfo.demandobjs,[i],"团队")
							break;
						default:
							break;
					}
					
				}
				console.log(that.detailInfo.demandobjs)
				//判断是否为我发布的需求
				if(that.detailInfo.demandbasicinfo.basic_isMine==true){
					Vue.set(that,"isMine",true)
				}else{
					Vue.set(that,"isMine",false)
				}
				//判断有没有被收藏
				if(that.detailInfo.demandcolinfo.col_isMine==true){
					Vue.set(that,"haveCollect",true)
				}else{
					Vue.set(that,"haveCollect",false)
				}
				
				// 判断各项有无数据
				if(that.detailInfo.demandbasicinfo.describe!=""){
					that.haveValue.describe=true;
				}
				if(that.detailInfo.demandbasicinfo.complateTime!=""){
					that.haveValue.complateTime=true;
				}
				if(that.detailInfo.demandbasicinfo.objRequire!=""){
					that.haveValue.objRequire=true;
				}
				if(that.detailInfo.demandbasicinfo.reword!=""){
					that.haveValue.reword=true;
				}
				if(that.detailInfo.demandbasicinfo.remark!=""){
					that.haveValue.remark=true;
				}
				
				//判断有无关联协议
				if(that.detailInfo.deals.length!=0){
					Vue.set(that,"haveDeal",true)
				}else{
					Vue.set(that,"haveDeal",false)
				}
				//判断有没有合作方
				
				for(let i=0;i<that.detailInfo.demandappinfos.length;i++){
					if(that.detailInfo.demandappinfos[0].pkid==null){
						that.haveCooper = false ;
						that.detailInfo.demandappinfos = []
					}else{
						that.haveCooper = true ;
					}
				}
				
				//申请方各自的状态
				that.intentionTxt = [];
				for(let i=0;i<that.detailInfo.demandappinfos.length;i++){
					if(that.detailInfo.demandappinfos[i].status=="1"){
						that.intentionTxt.push("未达成合作意向")
					}else if(that.detailInfo.demandappinfos[i].status=="3"){
						that.intentionTxt.push("已达成合作意向")
					}
					
					
				}
				for(let i=0;i<that.detailInfo.demandappinfos.length;i++){
					if(that.detailInfo.demandappinfos[i].app_isMine==true){
						if(that.detailInfo.demandappinfos[i].status=="1"){
							Vue.set(that,"myIntention",true);//我已经发送了申请   未达成
							Vue.set(that,"myIntentionTxt","撤回申请")
						}else if(that.detailInfo.demandappinfos[i].status=="3"){
							Vue.set(that,"myIntention",true);//我已经发送了申请并且   已达成
							Vue.set(that,"myIntentionTxt","退回合作意向")//
						}else{
							Vue.set(that,"myIntention",false);//我已经发送了申请   未达成
						}
						break;
					}else{
						Vue.set(that,"myIntention",false);//我已经发送了申请
					}
				}
				console.log(that.myIntention)
				//判断需求的状态
				if(that.detailInfo.demandreviewinfo.applyStatus!="2"){
					that.canEdit = true;//可以编辑
				}else{
					that.canEdit = false;//不可以编辑
					Vue.set(that,'auditStatusTxt',"需求审核中");	
				}
				if(that.detailInfo.demandreviewinfo.applyStatus != "2"||that.detailInfo.demandreviewinfo.applyStatus != "3"){
					Vue.set(that,"canDelete",true)
				}
				if(that.detailInfo.demandreviewinfo.applyStatus=="3"){
					that.canOffline = true;//可以下线操作
					Vue.set(that,"canDelete",false)
				}else{
					that.canOffline = false;
					
				}
				if(that.detailInfo.demandreviewinfo.applyStatus=="5"||that.detailInfo.demandreviewinfo.applyStatus=="6"){
					Vue.set(that,'auditStatusTxt',"需求已下线");//需求下线的情况
				}
				//需求有没有上线过
				if(Math.floor(that.detailInfo.demandreviewinfo.applyStatus)>=3){
					Vue.set(that,"havePublished",true)
				}else{
					Vue.set(that,"havePublished",false)
				}
			},
			cancelCollect(id){//取消收藏
				var url = MyAjax.urlsy +"/tradeHall/collect/"+id+"/"+0;
				var that=this;
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.detailInfo),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"haveCollect",false)
					}
				},function(err){
					console.log(err)
				})//更新到服务器

			},
			collectThis(id){
				var url = MyAjax.urlsy +"/tradeHall/collect/"+id+"/"+1;
				var that=this;
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(that.detailInfo),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"haveCollect",true)
					}
				},function(err){
					console.log(err)
				})//更新到服务器
//				this.haveCollect = true;
			},
			toModify(id){
				if(this.detailInfo.demandreviewinfo.applyStatus=="3"){
					Modal.makeText($(".confirmModify"));
				}else{
					router.push({name:"modifyDraft",query:{id:id}});
				}
				
			},
			cfmModify(id){
				
				this.closeModal();
				router.push({name:"modifyDraft",query:{id:id}});
				
			},
			toDelete(){
				Modal.makeText($(".confirmDelete"));
			},
			cfmDelete(id){
				var that = this;
				var url = MyAjax.urlhw+"/demandbasicinfo/invalid/" + id
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.closeModal();
						router.go(-1);
					}
				},function(err){
					console.log(err)
				})
				
				
			},
			toOffLine(id){
				Modal.makeText($(".confirmOffline"));
			},
			cfmOffLine(id){//下线此需求
				var that = this;
				var url = MyAjax.urlhw+"/demandbasicinfo/invalid/" + id
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.detailInfo.demandreviewinfo.applyStatus=="5";
						that.getData();
						that.closeModal();
					}
				},function(err){
					console.log(err)
				})
			},
			closeModal(){
				Modal.closeModal($(".confirmModify"))
				Modal.closeModal($(".confirmOffline"))
				Modal.closeModal($(".addDealModal"))
				Modal.closeModal($(".confirmReturn"))
				Modal.closeModal($(".confirmWithdraw"))
				Modal.closeModal($(".confirmDelete"))
				
			},
			upDwon(){
				var tempheight = $('.detail-wrap').css("height");
				var ultempheight = $('.detail-wrap ul').css("height");
				var arrHeight = [tempheight,ultempheight];
				console.log(tempheight)
				sessionStorage.setItem("height",JSON.stringify(arrHeight))
				console.log(JSON.parse(sessionStorage.getItem("height")))
				if(this.updownFlag!=false){
					Vue.set(this,'updownFlag',false)
					this.updownText="展开查看详情"
					$('.detail-wrap').animate({height:"100px"},50,
//						
					)
					setTimeout(
						Vue.set(this,'mengShow',true),2000
					)
						
				}else{
					Vue.set(this,'updownFlag',true)
					this.updownText="收起";
					Vue.set(this,'mengShow',false)
					$('.detail-wrap').animate({height:ultempheight},500,
//						
					)
					setTimeout(
						Vue.set(this,'mengShow',false),2000
					)
				}
				
			},
			sendApply(id){
				var url = MyAjax.urlsy +"/demandappinfo/insert/"+id;
				var that=this;
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"myIntention",true)
						that.getData();
					}
				},function(err){
					console.log(err)
				})//更新到服务器
//				
			},
			callReturnModal(){//不是我发布的需求的情况下，我申请或者达成合作后撤回意向的模态框
				if(this.myIntentionTxt == "撤回申请"){
					Modal.makeText($(".confirmWithdraw"));//确认撤回申请的模态框
				}else{
					Modal.makeText($(".confirmReturn"));//确认退回合作意向的模态框
				}
				
				
			},
			withdrowIntention(pkid,status){//撤回合作申请
				var url = MyAjax.urlsy +"/demandappinfo/update/";
				var that=this;
				var data = {
					"pkid": pkid,
					"status":status,
					"demandID":that.$route.query.id,
				}
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(data),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"myIntention",false)
						that.getData();
						that.closeModal()
						
					}
				},function(err){
					console.log(err)
				})//更新到服务器
			},
			returnIntention(pkid,status){
				var url = MyAjax.urlsy +"/demandappinfo/update/";
				var that=this;
				var data = {
					"pkid": pkid,
					"status":status,
					"demandID":that.$route.query.id,
				}
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(data),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"myIntention",false)
						that.getData();
						that.closeModal()
						
					}
				},function(err){
					console.log(err)
				})//更新到服务器
			},
			cancelDeal(id){
				var that = this;
				var url = MyAjax.urlsy +"/demanddealrela/cancelDeal";
				var data = {
					pkid:id
				};
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(data),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.getData();
						that.closeModal()
					}
				},function(err){
					console.log(err)
				})//更新到服务器
			},
			addDeal(){
				var that = this;
				if(that.canOffline!=false){
					Modal.makeText($(".addDealModal"))
				}
				var url = MyAjax.urlhw+"/demanddealrela/findByMySelf";
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"relatedDeals",data.msg)
					}
					
				},function(err){
					console.log(err)
				})
				
				
			},
			selectThisDeal(e){
				console.log(e.target.value)
				this.selectedDeal = {
					demandID : this.$route.query.id,
					dealID : e.target.value
				}
				
			},
			comfirmInsertDeal(){
				var that = this;
				var url = MyAjax.urlsy +"/demanddealrela/insert";
				var data = that.selectedDeal;
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(data),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.getData();
						that.closeModal()
					}
				},function(err){
					console.log(err)
				})//更新到服务器
			},
			sentIntention(pkid,status){
				var url = MyAjax.urlsy +"/demandappinfo/update/";
				var that=this;
				var data = {
					"pkid": pkid,
					"status":status,
					"demandID":that.$route.query.id,
				}
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
					data:JSON.stringify(data),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						Vue.set(that,"myIntention",false)
						that.getData();
						that.closeModal()
						
					}
				},function(err){
					console.log(err)
				})//更新到服务器
				
				
			},
			destroyed(){
				console.log("detory")
				sessionStorage.setItem("height",[]); 
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor:#546686;
	.demandDetail{
		width: 100%;
		padding: 26px 20px;
		background: #FFFFFF;
		max-width: 1200px;
		margin: 120px auto;
		.title-wrap{
			height:100px;
			border-bottom:1px solid #E0E0E0;
			.D-title{
				height: 50px;
				line-height: 50px;
				font-size: 28px;
				color: $activeColor;
				
				.toolsBox{
					float: right;
					margin-top: 10px;
				    &:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
					>div{
						float: right;
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
					}
					.auditStatus{
						float: right;
						color: #f76c0f !important;
						font-size: 14px;
						margin-right: 30px;
						height: 30px;
						line-height: 30px;
					}
					span{
						/*position: absolute;*/
						width: 80px;
						float: right;
						height: 30px;
						line-height: 30px;
						color: #535353;
						cursor: pointer;
						font-size: 14px;
						
						
						/*img{
							margin-right: 10px;
							margin-top: 20px;
							float: left;
							&:first-child{
								display: block;
							}
							&:last-child{
								display: none;
							}
						}
						&:hover{
							color:$activeColor ;
							img{
								&:first-child{
									display: none;
								}
								&:last-child{
									display: block;
								}
							}
						}*/
					}
					.offlineBtn,.editBtn,.deleteBtn{
						img{
							margin-right: 10px;
							margin-top: 10px;
							float: left;
							&:first-child{
								display: block;
							}
							&:last-child{
								display: none;
							}
						}
						&:hover{
							color:$activeColor ;
							img{
								&:first-child{
									display: none;
								}
								&:last-child{
									display: block;
								}
							}
						}
					}
					
					.cancelBtn{
						display: inline-block;
						width: 120px !important;
						img{
							margin-right: 10px;
							margin-top: 8px;
							float: left;
							&:first-child{
								display: block;
							}
							&:last-child{
								display: none;
							}
						}
						&:hover{
							color:$activeColor ;
							img{
								&:first-child{
									display: none;
								}
								&:last-child{
									display: block;
								}
							}
						}
					}
					.collectBtn{
						width: 80px;
						height: 30px;
						line-height: 30px;
						color: #FFFFFF;
						text-align: center;
						display: inline-block;
						background: url(../../assets/img/demand/icon008.png) no-repeat;
						img{
							margin-bottom: 3px;
						}
					}
				}
				#modal-overlay{
					.modal-wrap{
						min-width: 480px;
						padding: 80px 50px;
						background: #FFFFFF;
						border-radius: 10px;
						position:absolute;top:50%;left:50%; 
						transform:translate(-50%,-50%);
						-webkit-transform:translate(-50%,-50%);
						-moz-transform:translate(-50%,-50%);
						-ms-transform:translate(-50%,-50%);
						-o-transform:translate(-50%,-50%);
						p{
							font-size: 18px;
							height: 30px;
							line-height: 30px;
							text-align: center;
						}
						.modalChaBtn{
							width: 20px;
						     height: 20px;
						     background: url(../../assets/img/demand/icon004.png) no-repeat center;
						     position: absolute;
						     top: 20px;
						     right: 30px;
						     cursor: pointer;
						}
						.confirmBtn{
							
							width: 160px;
							height: 42px;
							line-height: 42px;
							text-align: center;
							background: url(../../assets/img/demand/bg21.png) no-repeat;
							margin: 30px auto 10px;
							color: $bfColor;
							cursor:pointer;
							font-size: 14px;
						}
					}
				}
			}
			.time-wrap{
				color: #858585;
			}
			
			
		}
		.info-wrap{
			padding-top: 25px;
			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			.pub-wrap{
				margin-bottom: 20px;
				p{
					height: 50px;
					line-height: 50px;
					text-align: left;
				}
			}
			.info-title{
				height: 46px;
				line-height: 46px;
				border-bottom: 1px solid #E0E0E0;
				span{
					height: 46px;
					line-height: 46px;
					display:inline-block;
					text-align: center;
					font-size: 18px;
					color: $activeColor;
					border-bottom: 2px solid $activeColor;
				}
				.up{
					float: right;
					padding-left: 25px;
					color: $activeColor;
					cursor: pointer;
					background: url(../../assets/img/demand/icon10.png) no-repeat left center;
				}
				.down{
					float: right;
					padding-left: 25px;
					color: $activeColor;
					cursor: pointer;
					background: url(../../assets/img/demand/icon11.png) no-repeat left center;
				}
			}
			.detail-wrap{
				position: relative;
				
				background: #FFFFFF;
				
				height: 100px;
				overflow: hidden;
				ul{
					width:100%;
					overflow: hidden;
					li{
						margin-top: 15px;
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						.wrap-left{
							float: left;
							/*margin-right: 14px;*/
							
						}
						p{
							width: 93%;
							color: #8c8c8c;
							float: right;
							text-align: justify;
							em{
								float: left;
								margin-right: 10px;
							}
						}
					}
				}
				.meng{
					width: 100%;
					height: 100px;
					position: absolute;
					top: 0; left: 0;
					z-index: 1;
					 background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
					 background-image: -webkit-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
					background-image: -o-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
					background-image: -moz-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
				}
				
			}
			.border_bottom{
				padding-bottom: 30px;
				border-bottom: 1px solid #E0E0E0;
			}
			.applicant-wrap{
				padding-top: 40px;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				.A-title{
					height: 42px;
					line-height: 42px;
					font-size: 18px;
					span{
						float: left;
					}
					.submitApp{
						margin-left: 15px;
						width: 120px;
						height: 42px;
						line-height: 42px;
						text-align: center;
						color: #FFFFFF;
						display: inline-block;
						cursor: pointer;
						background: url(../../assets/img/demand/icon011.png) no-repeat;
						&:hover{
							
						}
					}
				}
				.content-applicant{
					padding-left: 40px;
					border: none;
					margin-top: 10px;
					&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
					.stateNone{
						height: 50px;
						line-height: 50px;
						color: #8C8C8C;
					}
					dl{
						height: 200px;
						float: left;
						margin-right: 30px;
						margin-top: 10px;
						dd{
							margin-bottom: 10px;
							text-align: center;
							width: 80px;
							height: 80px;
							border-radius: 50%;
							margin: 0 auto;
							overflow: hidden;
							img{
								width: 100%;
							}
						}
						dt{
							/*height: 40px;*/
							/*line-height: 40px;*/
							text-align: center;
							margin-top: 5px;
							
							width: 112px;
							/*overflow: hidden;*/
							&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
							position: relative;
							>p{
								float: left;
								min-width: 112px;
								/*height: 30px;*/
								color: $activeColor;
							}
							span{
								float: left;
								/*width: 100%;*/
								min-width: 112px;
								height: 30px;
								line-height: 30px;
								
								
								
							}
							.disabled{
								color: #FFFFFF !important;
								background: #828282 !important;
							}
							.alreadySent{
								background: none;
								color: #f76c0f;
							}
							.notyetSent{
								margin-top: 10px;
								background: #353535;
								color: #FFFFFF;
								border-radius: 3px;
								cursor: pointer;
								&:hover{
									background: $activeColor;
								}
							}
						}
					}
				}
				#modal-overlay{
					.modal-wrap{
						min-width: 480px;
						padding: 80px 50px;
						background: #FFFFFF;
						border-radius: 10px;
						position:absolute;top:50%;left:50%; 
						transform:translate(-50%,-50%);
						-webkit-transform:translate(-50%,-50%);
						-moz-transform:translate(-50%,-50%);
						-ms-transform:translate(-50%,-50%);
						-o-transform:translate(-50%,-50%);
						p{
							font-size: 18px;
							height: 30px;
							line-height: 30px;
							text-align: center;
						}
						.modalChaBtn{
							width: 20px;
						     height: 20px;
						     background: url(../../assets/img/demand/icon004.png) no-repeat center;
						     position: absolute;
						     top: 20px;
						     right: 30px;
						     cursor: pointer;
						}
						.confirmBtn{
							
							width: 160px;
							height: 42px;
							line-height: 42px;
							text-align: center;
							background: url(../../assets/img/demand/bg21.png) no-repeat;
							margin: 30px auto 10px;
							color: $bfColor;
							cursor:pointer;
						}
					}
				}
			}
			
			.relatedDeal-wrap{
				
				margin-top: 20px;
				.A-title{
					height: 42px;
					line-height: 42px;
					font-size: 18px;
				}
				.content-relatedDeal{
					.noDeal{
						height: 40px;
						line-height: 40px;
						color: #8C8C8C;
						border: none;
					}
					li{
						margin:0 40px;
						height: 35px;
						line-height: 35px;
						border-bottom: 1px dotted #E0E0E0;
						.dealState{
							float:right;
							margin-right:300px;
							&.valid{
								color: #f76c0f;
							}
							&.unvalid{
								color: #858585;
							}
						}
						.cancleDeal{
							float: right;
							margin-right: 0;
							padding-left: 24px;
							cursor: pointer;
							background: url(../../assets/img/demand/icon005.png) no-repeat left center;
						}
						
					}
					.stateNone{
						border: none;
						color: $activeColor;
						padding-left: 28px;
						background: url(../../assets/img/demand/icon53.png) no-repeat left center;
						cursor: pointer;
						margin-top: 20px;
						display: inline-block;
						float: left;
					}
					.disabled{
						padding-left: 28px;
						margin-top: 20px;
						background: url(../../assets/img/demand/icon53.png) no-repeat left center;
						cursor: pointer;
						border: none;
						color: #828282;
					}
					.addDealModal{
						position: relative;
						.modal-wrap{
							min-width: 480px;
							padding: 0px 20px 80px;
							background: #FFFFFF;
							border-radius: 10px;
							position:absolute;top:50%;left:50%; 
							transform:translate(-50%,-50%);
							-webkit-transform:translate(-50%,-50%);
							-moz-transform:translate(-50%,-50%);
							-ms-transform:translate(-50%,-50%);
							-o-transform:translate(-50%,-50%);
							h5{
								height: 50px;
								line-height: 50px;
								text-align: left;
								font-size: 18px;
								/*padding-left: 20px;*/
								color: $activeColor;
							}
							.selectBox{
								margin-top: 30px;
								&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
								p{
									font-size: 16px;
									height: 30px;
									line-height: 30px;
									text-align: center;
									float: left;
									margin-left: 50px;
								}
								select{
									height: 30px;
									line-height: 30px;
									border-radius: 3px;
									float: left;
									margin-left: 20px;
									width: 180px;
								}
							}
							
							.modalChaBtn{
								width: 20px;
							    height: 20px;
							     background: url(../../assets/img/demand/icon004.png) no-repeat center;
							     position: absolute;
							     top: 20px;
							     right: 30px;
							     cursor: pointer;
							}
							.confirmBtn{
								
								width: 160px;
								height: 42px;
								line-height: 42px;
								text-align: center;
								background: url(../../assets/img/demand/bg21.png) no-repeat;
								margin: 30px auto 10px;
								color: $bfColor;
								cursor:pointer;
							}
						}
					}
				}
				
			}
		}
	}
</style>