<template>
  <div class="companyOrganizIndex">
    <h3 class="c-title"><span>{{title}}</span></h3>
    <div class="orgTable"><!--高管部分 begin-->
    	<p class="t-title"><img src="../../../assets/img/company/senior01.png" />高管团队</p>
    	<ul class="seniorInfo">
    		<li class="stateOne" v-if="!haveSenior">(暂无高管团队)</li><!--暂无高管团队-->
    		<li v-for="(item,index) in companyOrgaInfo.topManagers" class="seniorList" v-if="haveSenior"><!--有高管团队-->
    			<img src="../../../assets/img/company/icon_senior.png"/>
    			<p class="seniorName">{{item.name}}</p>
    			<span class="deleSen" @click="removeSenior(index)" v-if="editSeniorShow"></span>
    		</li>
    		<span class="addMoreS" @click="overlay(state[0])" v-if="editSeniorShow"></span>
    		<div class="btnBox" v-if="editSeniorShow">
					<span class="saveBtn" @click="editDone(state[0])">保存</span>
					<span class="cancelBtn" @click="cancleEdit(state[0])">取消</span>
				</div>
    	</ul>
    	<span class="editPersonBtn" @click="toEdit(state[0])" v-if="!editSeniorShow">编辑</span>
    	<!--添加高管模态框-->
				<div id="modal-overlay" class="modal-topManagers">
					<div class="searchSenior"  @keydown="keySearch($event)">
						<h5>搜索员工</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap">
									<span class="wrap-left">员工姓名</span>
									<p class="wrap-right">
										<input type="text" v-model="searchText"/>
										<span class="sBtn" @click="getList"><img src="../../../assets/img/company/seacer.png" />搜索</span>
									</p>
								</div>
								<div class="result-wrap">
									<span class="wrap-left">搜索结果</span>
									<ul class="resultList">
										<li class="noResult" v-if="!haveResult">抱歉，未找到该项目，请重新搜索</li>
										<li v-for="(item,index) in list">
											<router-link :to="{name:'ProjectDetail',query:{id:item.psnID}}">{{item.psnName}}</router-link>
											<span class="choseBtn" @click="choseThis($event,index)">
											</span>
										</li>
									</ul>
									<span class="confirmBtn" @click="saveAdd(state[0])">确认</span>
								</div>
						</div>
					</div>
				</div>
				<!--添加高管模态框-->

    	
    </div><!--高管部分 begin-->
    <div class="orgTable"><!--骨干部分 begin-->
    	<p class="t-title"><img src="../../../assets/img/company/backbone01.png" />重要骨干</p>
    	<ul class="backboneInfo">
    		<li class="stateOne" v-if="!haveBackbone">(暂无骨干团队)</li><!--暂无骨干-->
    		<li v-for="(item,index) in companyOrgaInfo.importantPsns" class="backboneList" v-if="haveBackbone"><!--有骨干团队-->
    			<img :src="item.pic" :class="{'gray':item.IfCer=='0'}"/>
    			<p class="seniorName">{{item.name}}</p>
    			<span class="deleSen" @click="removeBackbone(index)" v-if="editBackboneShow"></span>
    		</li>
    		<span class="addMoreS" @click="overlay(state[1])" v-if="editBackboneShow"></span>
    		<div class="btnBox" v-if="editBackboneShow">
					<span class="saveBtn" @click="editDone(state[1])" >保存</span>
					<span class="cancelBtn" @click="cancleEdit(state[1])">取消</span>
				</div>
    	</ul>
    	<span class="editPersonBtn"  @click="toEdit(state[1])" v-if="!editBackboneShow">编辑</span>
    	<div id="modal-overlay" class="modal-importantPsns">
					<div class="searchBackbone"  @keydown="keySearch($event)">
						<h5>搜索员工</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap">
									<span class="wrap-left">员工姓名</span>
									<p class="wrap-right">
										<input type="text"  v-model="searchText"/>
										<span class="sBtn"  @click="getList"><img src="../../../assets/img/company/seacer.png" />搜索</span>
									</p>
								</div>
								<div class="result-wrap">
									<span class="wrap-left">搜索结果</span>
									<ul class="resultList">
										<li class="noResult" v-if="!haveResult">抱歉，未找到该项目，请重新搜索</li>
										<li v-for="(item,index) in list">
											<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">{{item.nickName}}</router-link>
											<span class="choseBtn" @click="choseThis($event,index)">
											</span>
										</li>
										
									</ul>
									<span class="confirmBtn" @click="saveAdd(state[1])">确认</span>
								</div>
						</div>
					</div>
				</div>


    </div><!--骨干部分 begin-->

    <!--没有员工添加贵公司经历的情况  模态框-->
    <div id="modal-overlay" class="modal-c" v-if="!haveStaff">
			<div class="searchHaveNone">
				<h5>搜索员工</h5>
				<span class="modalChaBtn" @click="closeModal"></span>
				<div class="content-wrap">
					<p class="haveNone">对不起，此处暂无员工添加贵公司工作经历</p>
					<p class="haveNone">您还无法添加高管团队及重要骨干成员</p>
				</div>
			</div>
		</div>
    <!--没有员工添加贵公司经历的情况  模态框-->

    <div class="orgTable"><!--下属员工部分-->
    	<p class="t-title"><img src="../../../assets/img/company/staff01.png" />下属员工</p>
    	<p class="notice">
    		个人用户在其“工作经历”中添加与本公司相关的信息后，才会出现下属员工，成为高级认证公司后，可对下属员工的工作经历进行认证。
    	</p>
    	<div class="staff">
    		<div class="tabWrap">
    			<p v-if="!haveStaff" v-for="(item,$index) in tabbarinfo" class="tabBar">
    				<img :src="item.pic1"/>
    				{{item.txt}}
    				<span class="verified">{{item.num}}</span>
    			</p>
    			<p v-if="haveStaff" v-for="(item,$index) in tabbarinfo" class="tabBar" :class="[{activeBar:active==$index},{unactiveBar:active!=$index}]" @click="switchTab($index)">
    				<img :src="item.pic1"/>
    				<img :src="item.pic2"/>
    				{{item.txt}}
    				<span class="verified">{{item.num}}</span>

    			</p>

    		</div>
    		<!--
            	底部Tab切换   子路由  staffList
            -->
            <div v-if="!haveStaff" class="staffList">
            	<p class="stateNone">(此处暂无个人用户添加贵公司经历)</p>
            </div>
            <div v-if="haveStaff" class="staffList">
            	<ul v-if="tab.aa[0]">
		        		<li v-for="(item,index) in companyOrgaInfo.cerMembers">
		        			<dl class="person">
		        				<dt><img src="../../../assets/img/company/icon_staff.png"></dt>
		        				<dd>{{item.name}}</dd>
		        				<p class="cerBtn" v-if="showCer" @click="certificateOrNot(item.psnID,0)">取消认证</p>
		        			</dl>
		        		</li>
		        	</ul>
            	<ul v-if="tab.aa[1]">
            		<li v-for="(item,index) in companyOrgaInfo.noCerMembers">
            			<dl class="person">
            				<dt><img src="../../../assets/img/company/icon_staff.png"></dt>
            				<dd>{{item.name}}</dd>
            				<p class="cerBtn" v-if="showCer" @click="certificateOrNot(item.psnID,1)">添加认证</p>
            			</dl>
            		</li>
            	</ul>
        			
       		</div>

    		<span class="editPersonBtn" @click="editPerson" v-if="!showCer">编辑</span>
    		<span class="saveBtn" @click="saveEditPerson" v-if="showCer">保存</span>
    	</div>

    </div>
  </div>
</template>

<script>
	//import axios from "axios";
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../../assets/js/modal.js"
	import MyAjax from "../../../assets/js/MyAjax.js"
	
  export default {
    name:"companyOrganizIndex",
    data:function(){
      return {
        title:"公司组织信息",
        haveStaff:false,/*有无员工(控制高管及骨干模态框 有无员工可搜索)*/
        haveSenior:false,/*有无高管*/
       	haveBackbone:false,/*有无骨干*/
       	haveResult:false,/*有无搜索结果*/
        state:["topManagers","importantPsns","members"],
        editSeniorShow:false,
        editBackboneShow:false,
        showCer:false,/*员工编辑状态的添加取消认证的按钮显隐*/
       	addCerArr:[],/*移除并添加认证的未认证员工*/
       	removeCerArr:[],/*移除并取消认证的已认证员工*/
        Tabflag:0,
        active:0,
       
        tabbarinfo:[
        	{
        		txt:"已认证员工",pic1:require("../../../assets/img/company/Authentication01.png"),
			    	pic2:require("../../../assets/img/company/Authentication03.png"),
			    	num:""
			    },
        	{
        		txt:"未认证员工",pic1:require("../../../assets/img/company/Authentication02.png"),
	        	pic2:require("../../../assets/img/company/Authentication04.png"),
	        	num:""
	        },
        	
        ],
        tab:{aa:[true,false]},
        have:{value:""},
        childimg:require("../../../assets/img/company/senior02.png"),
       	searchText:"", /*搜索框input值*/
        list:[], /*搜索结果*/
       companyOrgaInfo:{},
				chosedOne:{
					IfCer:"",
          defaultPic:"",
					name:"",
					pic:"",
					psnID:""
				}

      }
    },
    components:{
    	"staffList":{
    		props:["img"],
    		template:'<div class="staffList">'+
    			'<div class="stateNone"></div>'+
    			'<dl v-for="" class="person"><dt><img :src="img"/></dt><dd>王二麻子</dd></dl>'+
    		'</div>',
    		data:function(){
    			return{

    			}
    		}
    	}
    },
    computed:mapState({
//    companyOrgaInfo:state=>state.company.companyMessage.companyOrgaInfo/*获取vuex数据*/
    }),
    created(){
    	this.getData()
    },
    updated(){
    	if(this.companyOrgaInfo.topManagers.length!=0){
	  		this.haveSenior = true;
	  	}
	  	if(this.companyOrgaInfo.importantPsns.length!=0){
	  		this.haveBackbone = true;																																	
	  	}
	  	if(this.companyOrgaInfo.cerMembers.length!=0||this.companyOrgaInfo.noCerMembers.length!=0){ 
	  		this.haveStaff = true;
	  	}
    },
   
    methods:{
    	getData(){
    		var that=this;
        var url = MyAjax.urlsy+"/companyInfo/companyOrgInfo";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          if(data.code==0){
            that.companyOrgaInfo=data.msg;
            Vue.set(that.tabbarinfo[0],"num",that.companyOrgaInfo.cerCounts);
            Vue.set(that.tabbarinfo[1],"num",that.companyOrgaInfo.noCerCounts);
          }else{
            // if(data.msg=="100004"){//没有token
						// 	window.location.hash="/login"
						// }
          }
        },function(err){
          if(err.status!=200){
            //router.push("/index")
            status=err.status;
          }
        })
        
        if(this.companyOrgaInfo.topManagers.length!=0){
		  		this.haveSenior = true;
		  	}else{
		  		this.haveSenior = false;	
		  	}
		  	if(this.companyOrgaInfo.importantPsns.length!=0){
		  		this.haveBackbone = true;																																	
		  	}else{
		  		this.haveBackbone = false;	
		  	}
		  	if(this.companyOrgaInfo.cerMembers.length!=0||this.companyOrgaInfo.noCerMembers.length!=0){ 
		  		this.haveStaff = true;
		  	}else{
		  		this.haveStaff = false;	
		  	}
		  	console.log(this.haveSenior)
    	},
    	keySearch($event){//enter键登录事件
    		console.log(999)
	      	var event = $event || window.event;  
			 	if(event.keyCode==13){ 
			      this.getList()
		         event.returnValue = false;    
		         event.cancelBubble=true;
		         event.preventDefault();
		         //event.stopProgagation();
		         return false;
		      	} 
			},
			getList(){
				var that=this;
        var url = MyAjax.urlsy+"/companyInfo/searchPerson/" + that.searchText;
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          if(data.code==0){
          	that.list = data.msg;
          	that.haveResult = false;
            if(that.list.length!=0){
            	Vue.set(that,"haveResult",true)
            }else{
            	Vue.set(that,"haveResult",false)
            }
            //Vue.set(that,"psnMsg",data.msg);
          }else{
            // if(data.msg=="100004"){//没有token
						// 	window.location.hash="/login"
						// }
          }
        },function(err){
          if(err.status!=200){
            //router.push("/index")
            status=err.status;
          }
        })
        console.log(that.haveResult)
        $('.search-wrap').animate({marginTop:"30px",marginBottom:"40px"},100);
				$('.result-wrap').fadeIn(200);
			},
    	switchTab(index){
				this.active = index;

//  		console.log(this.tabbarinfo.length)

    		for(var i = 0 ; i < this.tabbarinfo.length;i++){
    			if(i!=index){
    				Vue.set(this.tab.aa,[i],false)
    			}else{
	    			Vue.set(this.tab.aa,[index],true)
	    		}
    		}

    	},
    	toEdit(state){
    		switch (state){
    			case "topManagers":
    				this.editSeniorShow = true;
    				break;
    			case "importantPsns":
    				this.editBackboneShow = true;
    				break;
    			case "members":
    				this.editStaffShow = true; 
    				break;
    			default:
    				break;
    		}
    	},
    	cancleEdit(state){
    		switch (state){
    			case "topManagers":
    				this.editSeniorShow = false;
    				break;
    			case "importantPsns":
    				this.editBackboneShow = false;
    				break;
    			case "members":
    				this.editStaffShow = false; 
    				break;
    			default:
    				break;
    		}
    		this.getData()
    	},
    	editDone(state){
    		var that=this;
    		switch (state){
    			case "topManagers":
    				var type = "高管";
    				var list = that.companyOrgaInfo.topManagers;
    				break;
    			case "importantPsns":
    				var type = "重要骨干";
    				var list = that.companyOrgaInfo.importantPsns;
    				break;
    			case "members":
    				var type = "下属员工";
    				var list = that.companyOrgaInfo.members;
    				break;
    			default:
    				break;
    		}
        var url = MyAjax.urlsy+"/companyInfo/saveCompanyOrgInfo";
        var data = {
        	list:list,
        	staffType:type
        }
        console.log(data)
    		MyAjax.ajax({
          type: "POST",
          url:url,
          data:JSON.stringify(data),
          dataType: "json",
          async:false,
          contentType:"application/json;",
        },function(data){
        	console.log(data)
        },function(err){
          if(err.status!=200){
            //router.push("/index")
            status=err.status;
          }
        })
    		switch (state){
    			case "topManagers":
    				that.editSeniorShow = false;
    				break;
    			case "importantPsns":
    				that.editBackboneShow = false;
    				break;
    			case "members":
    				that.editStaffShow = false; 
    				break;
    			default:
    				break;
    		}
    		that.getData();
    	},
    	saveAdd(state){/*添加员工   暂时   还需要点击确认或者取消*/
				console.log(state)
    		switch (state){
    			case "topManagers":
    				this.companyOrgaInfo.topManagers.push(this.chosedOne)
    				break;
    			case "importantPsns":
    				this.companyOrgaInfo.importantPsns.push(this.chosedOne)
    				break;
    			case "members":
    				this.companyOrgaInfo.members.push(this.chosedOne)
    				break;
    			default:
    				break;
    		}
    		this.closeModal()
    		console.log(this.companyOrgaInfo.topManagers)
    	},
    	
    	removeSenior(index){
//  		var that = this;
    		this.companyOrgaInfo.topManagers.splice(index,1);
    	},
    	removeBackbone(index){
//  		var that = this;

    		this.companyOrgaInfo.importantPsns.splice(index,1);

//  		console.log($(this))
    	},
    	editPerson(){
    		this.showCer = true;
//  		console.log(this.showCer)
    	},
    	saveEditPerson(){
    		/*保存取消和添加认证的操作到本地中*/
//  		this.companyOrgaInfo.staff.certified = this.addCerArr.reduce(function(coll,item){
//  			coll.push(item);
//  			return coll;
//  		},this.companyOrgaInfo.staff.certified)
//  		this.addCerArr = [];
//  		this.companyOrgaInfo.staff.uncertified = this.removeCerArr.reduce(function(coll,item){
//  			coll.push(item);
//  			return coll;
//  		},this.orgaInfo.staff.uncertified)
//  		this.removeCerArr = [];
//  		console.log(this.addCerArr);
//  		console.log(this.orgaInfo.staff)
//  		/*将本地数据保存到vuex当中*/
//  		for(var item in this.orgaInfo){
//  			this.companyOrgaInfo.staff = this.orgaInfo.staff
//  		}
    		this.showCer = false; /*关闭取消和添加按钮显示*/

    	},
    	addCer(index){/*添加认证 */
//  		console.log(index);

//  		this.addCerArr.push(this.orgaInfo.staff.uncertified[index])/*把未认证的添加员工添加到data中的addCerArr*/
//  		this.orgaInfo.staff.uncertified.splice(index,1);/*把这个员工从本地未认证数据数组中删除*/
//  		console.log(this.orgaInfo.staff.uncertified);

    	},
    	certificateOrNot(id,status){
    		console.log(id)
    		var that=this;
        var url = MyAjax.urlsy+"/companyInfo/confirmMemberCer/" + id + "/" + status;
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
        	if(data.code==0){
        		that.getData()
        	}
        },function(err){
          if(err.status!=200){
            //router.push("/index")
            status=err.status;
          }
        })
    	},
    	overlay(state){
    		/*模态框弹出有无可搜索员工判断*/
    		if(this.companyOrgaInfo != ""){
    		/*模态框弹出有无可搜索员工判断*/
		    		if(state == "topManagers"){
		    			var modalA= $('.modal-topManagers')
							Modal.makeText(modalA)
		    		}else if(state == "importantPsns"){
		    			var modalA= $('.modal-importantPsns')
							Modal.makeText(modalA)
		    		}
		    		$('.search-wrap').animate({marginTop:"50px",marginBottom:"80px"},100);
						$('.result-wrap').css("display","none");
						this.haveResult = false;
    		}else{
    			var modalC = $('.modal-c')
    			Modal.makeText(modalC)
    		}

			},
			closeModal(){
				var modalA = $('.modal-topManagers')
				Modal.closeModal(modalA)
				var modalB = $('.modal-importantPsns')
				Modal.closeModal(modalB)
				var modalC = $('.modal-members')
				Modal.closeModal(modalC)
				var modalD = $('.modal-com')
				Modal.closeModal(modalD)
				this.searchText = "",
				this.list = [];
			},
			choseThis(e,index){
				console.log($(e.target).hasClass("selected"))
				if($(e.target).hasClass("selected")==false){
					console.log(999)
					$(e.target).addClass("selected");
					$(e.target).parent().siblings().find("span").removeClass('selected');
//					console.log($(e.target).attr("class"))
				}else if($(e.target).hasClass("selected") == true){
//					console.log($(e.target).attr("class"))
					$(e.target).removeClass("selected");
					console.log($(e.target).attr("class"))
				}
				this.chosedOne.psnID = this.list[index].pkid;
				this.chosedOne.pic = this.list[index].pic;
				this.chosedOne.name = this.list[index].nickName;
				console.log(this.chosedOne)
				
			},
			/*模态框搜索获取数据*/
//			getData(){
//				/*var timer = "";
//				var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+this.searchText;
//				var that = this;
//				clearTimeout(this.timer);
//
//				this.timer = setTimeout(function(){
//					axios.get(url).then((responseText) => {
//						//获取到的数据一般都在responseText.data中
//						console.log(responseText)
//					}).catch((err) => {
//						console.log(err);
//					})
////					that.$http.jsonp(url,{
////						jsonp:"cb"
////					}).then((responseText)=>{
////						console.log(responseText.body)
////					},(err)=>{
////						console.log(err)
////					})
//				},500)*/
//			},

    },
    watch:{
//  	searchText:function(val){
//  		var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+val;
//				this.$http.jsonp(url,{
//					jsonp:"cb"
//				}).then((responseText)=>{
//					console.log(responseText.body.s);
//					this.list= responseText.body.s;
//				},(err)=>{
//					console.log(err);
//				})
//  	}
    }
  }
</script>

<style lang="scss" >
$bfColor:#f7f9fc;
$activeColor: #2eb3cf;
	.companyOrganizIndex{
		width:940px;
		padding: 40px;
		.addMoreS{
			float: left;
			width: 100px;
			height: 100px;
			cursor: pointer;
			background: url(../../../assets/img/company/plus.png);
		}
		.btnBox{
			width: 100%;
			height: 33px;
			overflow: hidden;
			float: left;
			margin-top: 30px;
			margin-left: 10px;
			span{
				width: 117px;
				height: 33px;
				line-height: 33px;
				float: left;
				margin-right: 30px;
				text-align: center;
				border-radius: 5px;
				cursor: pointer;
				&.cancelBtn{
    			border: 1px solid #bfcbd9;

    			&:hover{
    				border: 1px solid $activeColor;
    				color: $activeColor;
    			}
    		}
    		&.saveBtn{
    			background-image: url("../../../assets/img/company/rectangle06.png") ;
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
		.searchHaveNone{

			.content-wrap{
				padding-top: 102px;
				padding-bottom: 181px;
				.haveNone{
    			height: 30px;
	     		line-height: 30px;
	     		font-size: 18px;
	     		color: $activeColor;
	     		text-align: center;
    		}
			}
		}
		.searchSenior,.searchBackbone,.searchHaveNone{
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
		     background: $bfColor;
		     padding: 0 40px;

			}
			.modalChaBtn{
		     width: 20px;
		     height: 20px;
		     background: url(../../../assets/img/company/Close3.png) no-repeat center;
		     position: absolute;
		     top: 16px;
		     right: 40px;
		     cursor: pointer;
	     }
	    .content-wrap{
	    	width: 100%;
	    	overflow: hidden;

	    		.search-wrap,.result-wrap{

						text-align: center;
						padding-left:67px;
						margin-top:30px;
						margin-bottom:30px;
						overflow: hidden;
						.wrap-left{
							margin-right: 20px;
							font-size: 18px;
							float: left;
							height: 40px;
						  line-height: 40px;
						}
						.wrap-right{
							width: 325px;
							height: 40px;
							line-height: 40px;
							float: left;
							border: 1px solid #ebebeb;
							border-radius: 5px;
							overflow: hidden;
							input{
								width: 222px;
								float: left;
								text-indent: 8px;
							}
							.sBtn{
								display: inline-block;
								float: right;
								height: 40px;
								line-height: 40px;
								text-align: center;
								vertical-align: middle;
								width: 100px;
								color: #FFFFFF;
								cursor: pointer;
								background: url(../../../assets/img/company/rectangle08.png) no-repeat center;
								img{
									display: inline;
									vertical-align: middle;
									margin-right: 10px;
									margin-bottom: 5px;
									width: 21px; height: 20px;
								}
							}
						}
						.resultList{
							width: 325px;
							overflow: hidden;
							li{
								width: 325px;
								height: 36px;
								line-height: 36px;
								padding: 0 13px;
								text-align: left;
								float: left;
								background: #f8f8f8;
								overflow: hidden;
								cursor: pointer;
								a{
									color: $activeColor;
								}
								&:nth-child(2n){
									background: #f2f2f2;
								}
								.choseBtn{
									width: 15px;
									height: 15px;
									display: inline-block;
									float: right;
									margin-top: 10px;
									background: url(../../../assets/img/company/circular.png) no-repeat center;
								
									&:hover,&.selected{
										background: url(../../../assets/img/company/circular-blue.png) no-repeat center;
										
									}
									
								}
							}
						}
						.confirmBtn{
							width: 117px;
							height: 33px;
							line-height: 33px;
							text-align: center;
							color: #FFFFFF;
							/*margin: 30px auto;*/
							margin-left: 149px;
							margin-top: 30px;
							display: block;
							background: url(../../../assets/img/company/rectangle05.png) no-repeat center;
							cursor: pointer;
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
		.orgTable{
			padding:30px 20px;
			border-bottom:1px solid #ebebeb;
			.t-title{
				height: 28px !important;
				/*line-height: 30px !important;*/
				text-align: left;
				font-size: 18px;
				display: table-cell;
				vertical-align: middle;
				img{
					width: 25px; height: 28px;
					display: inline-block;
					margin-right: 15px;
				}
			}
			.seniorInfo,.backboneInfo{
				padding: 30px 20px;
				overflow: hidden;
				.stateOne{
					color: #898989;
				}
				.seniorList,.backboneList{
					width: 100px;
					height: 130px;
					float: left;
					margin-right: 30px;
					position: relative;
					margin-bottom: 15px;
					img{
							width: 100px;
							height: 100px;
							border-radius: 50%;
							background:#e6e6e6;
							position:relative;
						
					}
					.gray{
						 -webkit-filter: grayscale(100%);
					    -moz-filter: grayscale(100%);
					    -ms-filter: grayscale(100%);
					    -o-filter: grayscale(100%);
					    
					    filter: grayscale(100%);
						
					    filter: gray;
					}
					.seniorName,.backboneName{
						text-align: center;
						height: 45px;
						line-height: 45px;
					}
					.deleSen{
						width: 17px;
						height: 17px;
						background: url(../../../assets/img/company/Close.png) no-repeat center;
						display: block;
						position: absolute;
						top: 0; right: 0;
						cursor: pointer;
					}
				}

			}

			.editPersonBtn{
				height: 15px;
				line-height: 15px;
				text-align: left;
				padding-left: 27px;
				color: $activeColor;
				cursor: pointer;
				background: url(../../../assets/img/company/edit2.png) no-repeat left center;
			}
			&:last-child{
				border-bottom: none;
				.notice{
					padding-top: 20px;
					text-align: justify;
				}
				.staff{
					margin-top: 30px;
					overflow: hidden;
					position: relative;
					.tabWrap{
						height: 40px;
						/*line-height: 30px;*/
						text-align: left;
						display: table-cell;
						vertical-align: middle;
						overflow: hidden;
						background: url(../../../assets/img/company/bg01.png) no-repeat center;

						.tabBar{
							width: 160px;
							float: left;
							color: #898989;
							font-size: 18px;
							margin-right: 40px;
							cursor: pointer;

							&:last-child{
								margin-left: 40px;
								margin-right: 0;
							}
							&.unactiveBar{
								img{
									margin-right: 13px;
									width: 23px; height: 30px;
									float: left;
								}
								img:first-child{
										display:block ;
									}
									img:nth-child(2){
										display: none;
									}
							}
							&.activeBar{
								color: $activeColor;
								img{
									margin-right: 13px;
									width: 23px; height: 30px;
									float: left;

								}
								img:first-child{
										display: none;
									}
									img:last-child{
										display: block;
									}
							}

							&.switchTab{
								color: $activeColor;
								img{
									margin-right: 13px;
									width: 23px; height: 30px;
									&:first-child{
											display: none;
										}
										&:last-child{
											display: block;
										}
								}
							}
						}


					}
					.editPersonBtn{
							position: absolute;
							right: 0;
							top: 0;
					}
					.saveBtn{
							width: 117px;
						height: 33px;
						line-height: 33px;
						float: left;
						margin-right: 30px;
						text-align: center;
						border-radius: 5px;
						cursor: pointer;

							background-image: url("../../../assets/img/company/rectangle06.png") ;
		    			color: #FFFFFF;
		    			position: absolute;
		    			bottom: 0;
		    			left: 380px;
		    			&:hover{
		    				filter:alpha(opacity=80);       /* IE */
						  -moz-opacity:0.8;              /* 老版Mozilla */
						  -khtml-opacity:0.8;              /* 老版Safari */
						   opacity: 0.8;           /* 支持opacity的浏览器*/
		    			}
					}

				}
				.staffList{
						padding: 30px 20px;
						overflow: hidden;
						margin-bottom: 60px;
						.stateNone{
							font-size: 18px;
							color: #898989;
						}
						li{
							/*height: 110px;*/
							margin-right: 30px;
							margin-bottom: 30px;
							float: left;
							color: $activeColor;
							overflow: hidden;
							.person{
								text-align: center;
								dt{
									width: 80px;
									height: 80px;
									line-height: 80px;
									text-align: center;
									margin: 0 auto;
									img{
										width: 100%;
										height: 100%;
										
									}
								}
								dd{
									margin-top: 15px;
									height: 15px;
									line-height: 15px;
									text-align: center;
								}
								.cerBtn{
									width: 80px;
									height: 30px;
									margin: 14px auto 0;
									background: $activeColor;
									color: #FFFFFF;
									border-radius: 5px;
									line-height: 30px;
									text-align: center;
									cursor: pointer;
								}
							}
						}


					}
			}
		}

	}

</style>
