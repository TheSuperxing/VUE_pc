<template>
  <div class="teamOrganizIndex">
    <h3 class="t-title"><span>{{title}}</span></h3>
    <div class="orgTable"><!--高管部分 begin-->
    	<p class="org-title"><img src="../../../assets/img/team/icon_management.png" />高管团队</p>
    	<ul class="seniorInfo">
    		<li class="stateOne" v-if="!haveSenior">(暂无高管团队)</li><!--暂无高管团队-->
    		<li v-for="(item,index) in teamOrgaInfo.topManagers" class="seniorList" v-if="haveSenior"><!--有高管团队-->
    			<dl class="senior">
    				<dt>
    					<img :src="item.pic" :class="{'gray':item.IfCer=='0'}"/>
    				</dt>
    				<dd class="seniorName">{{item.name}}</dd>
    			</dl>
    			<span class="deleSen" @click="removeSenior(index)" v-if="editSeniorShow"></span>
    		</li>
    		<li class="addMoreS" @click="overlay(state[0])" v-if="editSeniorShow"></li>

    		<!--添加高管模态框-->
				<div id="modal-overlay" class="modal-topManagers">
					<div class="searchSenior">
						<h5>搜索个人用户</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap">
									<span class="wrap-left">个人用户手机号</span>
									<p class="wrap-right">
										<input type="text" v-model="searchText"/>
										<span class="sBtn" @click="getList" @keydown="keySearch($event)"><img src="../../../assets/img/team/icon.search.png" />搜索</span>
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
									<span class="confirmBtn" @click="saveAdd(state[0])">确认</span>
								</div>
						</div>
					</div>
				</div>
				<!--添加高管模态框-->
				<div class="btnBox" v-if="editSeniorShow">
					<span class="saveBtn" @click="editDone(state[0])">保存</span>
					<span class="cancelBtn" @click="cancleEdit(state[0])">取消</span>
				</div>
    	</ul>


    <span class="editPersonBtn" @click="toEdit(state[0])" v-if="!editSeniorShow">编辑</span>
    </div><!--高管部分 end-->
    <div class="orgTable"><!--骨干部分 begin-->
    	<p class="org-title"><img src="../../../assets/img/team/icon_bigpotato.png"/>重要骨干</p>
    	<ul class="backboneInfo">
    		<li class="stateOne" v-if="!haveBackbone">(暂无骨干团队)</li><!--暂无骨干-->
    		<li v-for="(item,index) in teamOrgaInfo.importantPsns" class="backboneList" v-if="haveBackbone"><!--有骨干团队-->
    			<dl class="backbone">
    				<dt>
    					<img :src="item.pic" :class="{'gray':item.IfCer=='0'}"/>

    				</dt>
    				<dd class="seniorName">{{item.name}}</dd>
    			</dl>
    			<span class="deleSen" @click="removeBackbone(index)" v-if="editBackboneShow"></span>
    		</li>
    		<li class="addMoreS" @click="overlay(state[1])" v-if="editBackboneShow"></li>
    		
    		<!--添加骨干-->
    		<div id="modal-overlay" class="modal-importantPsns">
					<div class="searchSenior">
						<h5>搜索个人用户</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap">
									<span class="wrap-left">个人用户手机号</span>
									<p class="wrap-right">
										<input type="text" v-model="searchText"/>
										<span class="sBtn" @click="getList" @keydown="keySearch($event)"><img src="../../../assets/img/team/icon.search.png" />搜索</span>
									</p>
								</div>
								<div class="result-wrap">
									<span class="wrap-left">搜索结果</span>
									<ul class="resultList">
										<li class="noResult" v-if="!haveResult">抱歉，未找到该项目，请重新搜索</li>
										<li v-for="(item,index) in list">
											<router-link :to="{name:'personalDetail',query:{id:item.accountID}}">{{item.nickName}}</router-link>
											<span class="choseBtn" @click="choseThis($event,index)">
											</span>
										</li>
									</ul>
									<span class="confirmBtn" @click="saveAdd(state[1])">确认</span>
								</div>
						</div>
					</div>
				</div>

				<div class="btnBox" v-if="editBackboneShow">
					<span class="saveBtn" @click="editDone(state[1])">保存</span>
					<span class="cancelBtn" @click="cancleEdit(state[1])">取消</span>
				</div>
    	</ul>

    	<span class="editPersonBtn" @click="toEdit(state[2])" v-if="!editBackboneShow">编辑</span>
    </div><!--骨干部分 end-->



    <div class="orgTable"><!--下属员工部分-->
    	<p class="org-title"><img src="../../../assets/img/team/icon_staff.png" />下属成员</p>
    	<p class="notice">
    		团队可以添加个人用户成为其成员，个人用户在其“工作经历”中同样添加对应团队或者确认后，才会正式成为认证成员。
    	</p>
    	<div class="staff">
            <div  class="staffList">
            	<ul>
            		<li class="stateNone"  v-if="!haveStaff">(此处暂无下属成员)</li>
            		<li v-for="(item,index) in teamOrgaInfo.members" v-if="haveStaff">
            			<dl class="person">
            				<dt>
								<img :src="item.pic" :class="{'gray':item.IfCer=='0'}" />
            				</dt>
            				<dd>{{item.name}}</dd>
            			</dl>
            			<span class="deleSen" @click="removeStaff(index)" v-if="editStaffShow"></span>
            		</li>
            		<li class="addMoreS" @click="overlay(state[2])" v-if="editStaffShow"></li>
            	</ul>

            </div>
						<!--添加下属员工-->
						<div id="modal-overlay" class="modal-members">
							<div class="searchSenior">
								<h5>搜索个人用户</h5>
								<span class="modalChaBtn" @click="closeModal"></span>
								<div class="content-wrap">
										<div class="search-wrap">
											<span class="wrap-left">个人用户手机号</span>
											<p class="wrap-right">
												<input type="text" v-model="searchText"/>
												<span class="sBtn" @click="getList" @keydown="keySearch($event)"><img src="../../../assets/img/team/icon.search.png" />搜索</span>
											</p>
										</div>
										<div class="result-wrap">
											<span class="wrap-left">搜索结果</span>
											<ul class="resultList">
												<li class="noResult" v-if="!haveResult">抱歉，未找到该项目，请重新搜索</li>
												<li v-for="(item,index) in list" >
													<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">{{item.psnName}}</router-link>
													<span class="choseBtn" @click="choseThis($event,index)">
													</span>
												</li>
											</ul>
											<span class="confirmBtn" @click="saveAdd(state[2])">确认</span>
										</div>
								</div>
							</div>
						</div>

    		<span class="editPersonBtn" @click="toEdit(state[2])" v-if="!editStaffShow">编辑</span>
    		<div class="btnBox" v-if="editStaffShow">
					<span class="saveBtn" @click="editDone(state[2])">保存</span>
					<span class="cancelBtn" @click="cancleEdit(state[2])">取消</span>
				</div>
    	</div>

    </div>
    <div class="orgTable"><!--所属公司部分-->
			<p class="org-title"><img src="../../../assets/img/team/icon_company.png" />所属公司</p>
			<ul class="companyInfo">
				<li class="stateNone" v-if="!haveCompany">(暂无所属公司)</p>
				<li class="addMoreC" @click="overlay_com" v-if="!haveCompany">添加所属公司</li>
				<li class="companyList" v-if="haveCompany">
					<p class="comName">
						{{teamOrgaInfo.companyName}}
					</p>
					<!--<span class="deleSen" @click="removeCompany(index)" v-if="editCompanyShow"></span>-->
				</li>
				<li class="addMoreS" @click="overlay_com" v-if="haveCompany">更改所属公司</li>
				
	
			</ul>
			
			<!--<span class="addMoreS" @click="toEditCompany" v-if="!editCompanyShow"></span>-->
			<!--添加	公司模态框-->
				<div id="modal-overlay" class="modal-com">
					<div class="searchCompany">
						<h5>搜索公司</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap" @keydown="keySearchCom($event)">
									<span class="wrap-left">公司名称</span>
									<p class="wrap-right">
										<input type="text" v-model="searchText"/>
										<span class="sBtn" @click="searchCompany" ><img src="../../../assets/img/team/icon.search.png" />搜索</span>
									</p>
								</div>
								<div class="result-wrap">
									<span class="wrap-left">搜索结果</span>
									<ul class="resultList">
										<li class="noResult" v-if="!haveResult">抱歉，未找到该项目，请重新搜索</li>
										<li v-for="(item,index) in list" >
											<router-link :to="{name:'TeamProDetail',query:{id:'1'}}">{{item.companyName}}</router-link>
											<span class="choseBtn" @click="choseThis($event,index)">
											</span>
										</li>
									</ul>
									<router-link to="/yhzx/team/info/teamOrganiz/defineCompany" @click="closeModal">
										<div class="goToDefinedCom">自定义添加公司</div>
									</router-link>
									<span class="confirmBtn" @click="saveChangeCom">确认</span>
								</div>
						</div>
					</div>
				</div>
				<!--添加公司模态框-->
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
    name:"teamOrganizIndex",
    data:function(){
      return {
        title:"团队组织信息",
        haveStaff:false,/*有无员工(控制高管及骨干模态框 有无员工可搜索)*/
        haveSenior:false,/*有无高管*/
       	haveBackbone:false,/*有无骨干*/
       	haveCompany:false,
       	haveResult:false,/*有无搜索结果*/
       	cerState:{
       		senior:[],
       		backbone:[],
       		staff:[]
       	},
        state:["topManagers","importantPsns","members"],
        editSeniorShow:false,
        editBackboneShow:false,
        editCompanyShow:false,
        editStaffShow:false,/*员工编辑状态的添加取消认证的按钮显隐*/
       	addCerArr:[],/*移除并添加认证的未认证员工*/
       	removeCerArr:[],/*移除并取消认证的已认证员工*/
        Tabflag:0,
        active:0,
        tabbarinfo:[
        	{txt:"未认证员工",pic1:require("../../../assets/img/company/Authentication02.png"),
        	pic2:require("../../../assets/img/company/Authentication04.png"),
        	num:"10"
        	},
        	{txt:"已认证员工",pic1:require("../../../assets/img/company/Authentication01.png"),
        	pic2:require("../../../assets/img/company/Authentication03.png"),
        	num:"8"
        	}
        ],
        tab:{aa:[true,false]},
        have:{value:""},
       	searchText:"", /*搜索框input值*/
        list:[], /*搜索结果*/
//     	comList:[],/*公司的搜索结果*/
				teamOrgaInfo:{},
				chosedOne:{
					IfCer:"",
          defaultPic:"",
					name:"",
					pic:"",
					psnID:""
				}
      }
    },

    
    created(){
    	this.getData();
    },
    updated(){
    	if(this.teamOrgaInfo.topManagers==null || this.teamOrgaInfo.topManagers.length==0){
	  		this.haveSenior = false;
	  	}else{
	  		this.haveSenior = true;
	  	}
	  	if(this.teamOrgaInfo.importantPsns.length!=0){
	  		this.haveBackbone = true;																																	
	  	}else{
	  		this.haveBackbone = false;
	  	}
	  	if(this.teamOrgaInfo.members.length!=0){ 
	  		this.haveStaff = true;
	  	}else{
	  		this.haveStaff = false;
	  	}
	  	if(this.teamOrgaInfo.companyName==""||this.teamOrgaInfo.companyName==null){
	  		this.haveCompany = false;
	  	}else{
	  		this.haveCompany = true;
	  	}
    },
    methods:{
			getData(){
		        var that=this;
		        var url = MyAjax.urlsy+"/teamOrgaInfo/teamOrgInfo";
		        MyAjax.ajax({
		          type: "GET",
		          url:url,
		          dataType: "json",
		          async:false,
		        },function(data){
		        	console.log(data)
		          if(data.code==0){
		            that.teamOrgaInfo=data.msg;
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
        /*判断有无高管团队*/
		  	if(this.teamOrgaInfo.topManagers==null || this.teamOrgaInfo.topManagers.length==0){
		  		this.haveSenior = false;
		  	}else{
		  		this.haveSenior = true;
		  	}
		  	if(this.teamOrgaInfo.importantPsns.length!=0){
		  		this.haveBackbone = true;																																	
		  	}else{
		  		this.haveBackbone = false;
		  	}
		  	if(this.teamOrgaInfo.members.length!=0){ 
		  		this.haveStaff = true;
		  	}else{
		  		this.haveStaff = false;
		  	}
		  	if(this.teamOrgaInfo.companyName==""||this.teamOrgaInfo.companyName==null){
		  		this.haveCompany = false;
		  	}else{
		  		this.haveCompany = true;
		  	}
      },
      getList(){
      	
      	var that=this;
        var url = MyAjax.urlsy+"/teamOrgaInfo/searchPerson/" + that.searchText;
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          if(data.code==0){
          	that.list = [];
          	that.haveResult = false;
            that.list.push(data.msg);
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
      searchCompany(){
      	var that=this;
        var url = MyAjax.urlsy+"/teamOrgaInfo/searchCompany/" + that.searchText;
        if(that.searchText.trim().length!=0){
        	MyAjax.ajax({
	          type: "GET",
	          url:url,
	          dataType: "json",
	          async:false,
	        },function(data){
	        	console.log(data)
	          if(data.code==0){
	          	Vue.set(that,"list",data.msg)
	          }
	          that.haveResult = false;
		        if(that.list.length!=0){
		        	Vue.set(that,"haveResult",true)
		        }else{
		        	Vue.set(that,"haveResult",false)
		        }
	        },function(err){
	          if(err.status!=200){
	            //router.push("/index")
	            status=err.status;
	          }
	        })
	        $('.search-wrap').animate({marginTop:"30px",marginBottom:"40px"},100);
					$('.result-wrap').fadeIn(200);
        }
        
      },
      keySearch($event){//enter键登录事件
		      	var event = $event || window.event;  
				 	if(event.keyCode==13){ 
				      this.getList()
			         event.returnValue = false;    
			         event.cancelBubble=true;
			         event.preventDefault();
			         //event.stopProgagation();
			         return false;
			      	} 
				this.current_page = 1;
			},
			keySearchCom($event){//enter键登录事件
				console.log(66666)
		      	var event = $event || window.event;  
				 	if(event.keyCode==13){ 
				      this.searchCompany();
			         event.returnValue = false;    
			         event.cancelBubble=true;
			         event.preventDefault();
			         //event.stopProgagation();
			         return false;
			      	} 
				this.current_page = 1;
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
    				var list = that.teamOrgaInfo.topManagers;
    				break;
    			case "importantPsns":
    				var type = "重要骨干";
    				var list = that.teamOrgaInfo.importantPsns;
    				break;
    			case "members":
    				var type = "下属员工";
    				var list = that.teamOrgaInfo.members;
    				break;
    			default:
    				break;
    		}
        var url = MyAjax.urlsy+"/teamOrgaInfo/saveTeamOrgInfo";
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
    				this.teamOrgaInfo.topManagers.push(this.chosedOne)
    				break;
    			case "importantPsns":
    				this.teamOrgaInfo.importantPsns.push(this.chosedOne)
    				break;
    			case "members":
    				this.teamOrgaInfo.members.push(this.chosedOne)
    				break;
    			default:
    				break;
    		}
    		this.closeModal()
    		console.log(this.teamOrgaInfo.members)
    		console.log(this.haveStaff)
    	},
    	saveChangeCom(){
    		var that=this;
        var url = MyAjax.urlsy+"/teamOrgaInfo/saveCompany/" + that.chosedOne.psnID;
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          
        },function(err){
          if(err.status!=200){
            //router.push("/index")
            status=err.status;
          }
        })
        that.closeModal()
        that.getData();
    	},
  
    	toEditCompany(){
    		this.editCompanyShow = true;
    		$(this).parent().remove()
    	},
    	
    	cancleEditCom(){
    		var str = JSON.stringify(this.teamOrgaInfo);
	    	var data = JSON.parse(str);
	    	console.log(data);
	    	for(var item in data){/*遍历  非引用赋值*/
	    		this.orgaInfo.senior = data.senior;
	    		this.orgaInfo.backbone = data.backbone;
	    		this.orgaInfo.staff = data.staff;
	    		this.orgaInfo.company = data.company
	    	}
    		this.editCompanyShow = false;
    	},
    	removeCompany(index){
    		
    		this.orgaInfo.company.splice(index,1);
    		if(this.orgaInfo.company.length===0){
	    		this.haveCompany = true;
	    	}
    	},
    	removeSenior(index){
//  		var that = this;
    		this.teamOrgaInfo.topManagers.splice(index,1);
    	},
    	removeBackbone(index){
			
    		this.teamOrgaInfo.importantPsns.splice(index,1);


    	},
    	removeStaff(index){
    		this.teamOrgaInfo.members.splice(index,1);
    	},
    	
    	overlay(state){
    		/*模态框弹出有无可搜索员工判断*/
    		if(state == "topManagers"){
    			var modalA= $('.modal-topManagers')
					Modal.makeText(modalA)
    		}else if(state == "importantPsns"){
    			var modalA= $('.modal-importantPsns')
					Modal.makeText(modalA)
    		}else if(state == "members"){
    			var modalA= $('.modal-members')
					Modal.makeText(modalA)
    		}
    		$('.search-wrap').animate({marginTop:"50px",marginBottom:"80px"},100);
				$('.result-wrap').css("display","none");
				this.haveResult = false;
			},
			overlay_com(){
					var modalB = $('.modal-com')
					Modal.makeText(modalB)
					$('.search-wrap').animate({marginTop:"50px",marginBottom:"80px"},100);
					$('.result-wrap').css("display","none");
					this.haveResult = false;
					
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
//				$(".resultList li span").removeClass('selected');
//				$(e.target).addClass("selected");
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

<style lang="scss" scoped="">
	$bfColor:#ffffff;
	$activeColor: #02a672;
	.teamOrganizIndex{
		width:940px;
		padding: 40px 40px 80px 40px;
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
		.gray{
			 -webkit-filter: grayscale(100%);
		    -moz-filter: grayscale(100%);
		    -ms-filter: grayscale(100%);
		    -o-filter: grayscale(100%);
		    
		    filter: grayscale(100%);
			
		    filter: gray;
		}
		.searchSenior{
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
		     background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
		     position: absolute;
		     top: 16px;
		     right: 40px;
		     cursor: pointer;
	     }
	    .content-wrap{
	    	width: 100%;
	    	
	    	overflow: hidden;
	    		.result-wrap{
						display:none;
						
					}
	    		.search-wrap,.result-wrap{
						text-align: center;
						padding-left:35px;
						margin-top:50px;
						margin-bottom:80px;
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
								background: url(../../../assets/img/team/icon_searching.png) no-repeat center;
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
									background: url(../../../assets/img/team/icon_selected.png) no-repeat center;
									cursor: pointer;
									&.selected{
										background: url(../../../assets/img/team/icon_selected_green.png) no-repeat center;
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
							background: url(../../../assets/img/team/icon_green_119inform_confirm.png) no-repeat center;
							cursor: pointer;
							&:hover{
	                filter:alpha(opacity=80);       /* IE */
	                -moz-opacity:0.8;              /* 老版Mozilla */
	                -khtml-opacity:0.8;              /* 老版Safari */
	                opacity: 0.8;           /* 支持opacity的浏览器*/
	            }
						}
	    		}
	    		.result-wrap{
	    			display: none;
	    			padding-left: 90px;
	    		}

	    }
		}
		.searchCompany{
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
		     background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
		     position: absolute;
		     top: 16px;
		     right: 40px;
		     cursor: pointer;
	     }
	     .content-wrap{
	    	width: 100%;
	    	overflow: hidden;
	    		.result-wrap{
						display:none;
					}
	    		.search-wrap,.result-wrap{
						text-align: center;
						padding-left:70px;
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
								background: url(../../../assets/img/team/icon_searching.png) no-repeat center;
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
									background: url(../../../assets/img/team/icon_selected.png) no-repeat center;
									cursor: pointer;
									&.selected{
										background: url(../../../assets/img/team/icon_selected_green.png) no-repeat center;
										
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
							background: url(../../../assets/img/team/icon_green_119inform_confirm.png) no-repeat center;
							&:hover{
	                filter:alpha(opacity=80);       /* IE */
	                -moz-opacity:0.8;              /* 老版Mozilla */
	                -khtml-opacity:0.8;              /* 老版Safari */
	                opacity: 0.8;           /* 支持opacity的浏览器*/
	            }
						}
						.goToDefinedCom{
								height: 15px;
					    	line-height: 15px;
					    	text-align: left;
					    	color: $activeColor;
					    	padding-left: 25px;
					    	margin-top: 30px;
					    	margin-left: 97px;
					    	background: url(../../../assets/img/team/plus.png) no-repeat left center;
						}
	    		}
					

	    }
		}
		.orgTable{
			padding:30px 0 30px 20px;
			border-bottom:1px solid #ebebeb;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;}
			.editPersonBtn{/*编辑键*/
				height: 15px;
				line-height: 15px;
				text-align: left;
				padding-left: 27px;
				color: $activeColor;
				cursor: pointer;
				background: url(../../../assets/img/team/icon_green-edit.png) no-repeat left center;
			}
			.btnBox{/*保存取消对键*/
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
		    			background-image: url("../../../assets/img/team/icon_green_119inform_confirm.png") ;
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
			.org-title{ /*标题*/
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
				padding: 30px 0;
				overflow: hidden;
				.stateOne{
					color: #898989;
					margin-bottom: 20px;
				}
				.addMoreS{
					float: left;
					width: 100px;
					height: 100px;
					cursor: pointer;
					border-radius: 50%;
					border: 1px dotted #d0d1d2;
					background: url(../../../assets/img/team/icon_add.png) no-repeat center;
				}
				.seniorList,.backboneList{
					width: 100px;
					height: 130px;
					float: left;
					margin-right: 30px;
					position: relative;
					margin-bottom: 30px;
					img{
							width: 100px;
							height: 100px;
							border-radius: 50%;
							background:#e6e6e6;
							position:relative;
						
					}

					.seniorName,.backboneName{
						text-align: center;
						height: 45px;
						line-height: 45px;
					}
					.deleSen{
						width: 17px;
						height: 17px;
						background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
						display: block;
						position: absolute;
						top: 0; right: 0;
						cursor: pointer;
					}
				}

			}


			&:nth-of-type(3){
				border-bottom:1px solid #ebebeb;

				.notice{
					padding-top: 20px;
				}
				.staff{
					margin-top: 30px;
					padding-bottom: 40px;
					overflow: hidden;
					position: relative;

					.editPersonBtn{
							position: absolute;
							right: 10px;
							top: 0;
					}


				}
				.staffList{
						padding-top: 20px;
						overflow: hidden;
						
						ul{
							&:after{display:block; content:''; clear:both; line-height:0; visibility:hidden;}
						}
						.stateNone{
							font-size: 18px;
							color: #898989;
						}
						.addMoreS{
							float: left;
							width: 80px;
							height: 80px;
							cursor: pointer;
							border-radius: 50%;
							border: 1px dotted #d0d1d2;
							background: url(../../../assets/img/team/icon_add.png) no-repeat center;
						}
						li{
							margin-right: 30px;
							margin-bottom: 30px;
							float: left;
							color: $activeColor;
							overflow: hidden;
							position: relative;
							.deleSen{
								width: 12px;
								height: 12px;
								background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
								display: block;
								position: absolute;
								top: 0; right: 0;
								cursor: pointer;
							}
							.person{
								/**/
								dt{
									height: 82px;
									line-height: 82px;
									text-align: center;
									overflow: hidden;
									img{
										width:80px;
										height: 80px;
										border-radius: 50%;
										margin-bottom: 1px;
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
			}/*下属员工*/

			.companyInfo{/*所属公司*/
				padding: 20px 0;
				.editPersonBtn{
					display: inline-block;

				}
				.stateNone{
					font-size: 18px;
					color: #898989;
				}
				.companyList{
					height: 35px;
					line-height: 35px;
					position: relative;
					padding-left: 10px;
					
					&:hover{
						background: #F1f1f1;
					}
					.comName{
						cursor: pointer;
					}
					.deleSen{
						width: 17px;
						height: 17px;
						background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
						display: inline-block;
						position: absolute;
						top: 10px; right: 10px;
						cursor: pointer;
					}

				}
				.addMoreC{
					float: left;
					margin-top: 15px;
					cursor: pointer;
					padding-left: 24px;
					color: $activeColor;
					background: url(../../../assets/img/team/plus.png) no-repeat left center;
				}
				.addMoreS{
					float: left;
					margin-top: 15px;
					cursor: pointer;
					padding-left: 24px;
					color: $activeColor;
					background: url(../../../assets/img/team/icon_green-edit.png) no-repeat left center;
				}
			}
		}

	}

</style>
