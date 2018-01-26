<template>
  <div class="teamIndex">
    <div class="teamMessage">
      <div class="m-logo">
      	<img :src="teamInfo.pic"/>
      	<span class="meng" @click="croperShow">更换头像</span>
      </div>
      
      <div id="modal-overlay" class="corpbox">
      	<div class="container">
				  <div class="imageBox">
				    <div class="thumbBox"></div>
				    <div class="spinner" style="display: none">Loading...</div>
				  </div>
				  <div class="action"> 
				     <!--<input type="file" id="file" style=" width: 200px">-->
				    <div class="new-contentarea tc"> <a href="javascript:void(0)" class="upload-img">
				      <label for="upload-file">上传图像</label>
				      </a>
				      <input type="file" class="" name="upload-file" id="upload-file" multiple/>
				    </div>
				    <input type="button" id="btnCrop"  class="Btnsty_peyton" value="确定" />
				    <input type="button" id="btnZoomIn" class="Btnsty_peyton" value="+">
				    <input type="button" id="btnZoomOut" class="Btnsty_peyton" value="-">
				  </div>
				  <div class="cha" @click="croperClose"></div>
				  <!--<div class="cropped"></div>-->
				</div>
      </div>
      
      <div class="m-warp">
        <h1 class="teamName">{{teamInfo.teamName}}</h1>
        
      </div>
    </div>
    <div class="teamProfile">
      <h3 class="t-title"><span>团队简介</span></h3>
      <div v-if="stateOne.haveTeamDesc" class="content-wrap">{{teamInfo.teamProfile}}</div>
      <div v-if="!stateOne.haveTeamDesc" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="teamMail">
      <h3 class="t-title"><span>联系方式</span></h3>
      <div v-if="stateOne.haveTeamMail" class="content-wrap">{{teamInfo.contactInfo}}</div>
      <div v-if="!stateOne.haveTeamMail" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="teamCompany">
      <h3 class="t-title"><span>所属公司</span></h3>
      <div v-if="stateOne.haveCompany" class="content-wrap">
      		{{teamInfo.companyName}}
      </div>
      <div v-if="!stateOne.haveCompany" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="teamTeam">
      <h3 class="t-title"><span>管理团队</span></h3>
      <div class="seniorTable" v-if="stateOne.haveSenior" >
      	<dl v-for="(item,index) in teamInfo.topManagers" class="seniorList">
      		<dt>
      			<img src="../../assets/img/team/icon_green_person.png" v-if="teamMessage.teamOrgaInfo.senior[index].cerState"/>
      			<img src="../../assets/img/team/icon_gray_person.png" v-if="!teamMessage.teamOrgaInfo.senior[index].cerState"/>
      		</dt>
      		<dd>{{item.name}}</dd>
      	</dl>
      </div>
      <div v-if="!stateOne.haveSenior" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="cadreman">
      <h3 class="t-title"><span>重要骨干</span></h3>
      <div class="backBoneTable" v-if="stateOne.haveBackbone" >
      	<dl v-for="(item,index) in teamInfo.importantPsns" class="backboneList">
      		<dt>
      			<img src="../../assets/img/team/icon_green_person.png" v-if="teamMessage.teamOrgaInfo.backbone[index].cerState"/>
      			<img src="../../assets/img/team/icon_gray_person.png"  v-if="!teamMessage.teamOrgaInfo.backbone[index].cerState"/>
      		</dt>
      		<dd>{{item.name}}</dd>
      	</dl>
      </div>
      <div v-if="!stateOne.haveBackbone" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="teamShow">
      <h3 class="t-title"><span>项目展示</span></h3>
      <!--<div>
      	<h4 class="projectName">北京08年奥运会——水立方</h4>
      	<h5 class="pr-wrap-a">
      		<span class="completeTime">Time : 2006.7-2008.8</span>
      		<span class="takeOfficeBar">项目责任：<em class="takeOffice">建筑设计</em></span>
      	</h5>

      	<p class="pr-wrap-b">等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦
      	等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦
      	等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦
      	等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦</p>

      </div>-->
      <div v-for="item in teamInfo.teamprojexpes" class="projectTable"  v-if="stateOne.haveProject">
      	<h4 class="projectName">{{item.projectName}}</h4>
      		<h5 class="pr-wrap-a">
			  		<span class="completeTime">Time : {{item.partakeTimeUp}}——{{item.partakeTimeDown}}</span>
			  		<span class="takeOfficeBar">项目责任：<em class="takeOffice">{{item.takeOffice}}</em></span>
			  	</h5>
			  	<p class="pr-wrap-b">{{item.detailDes}}</p>
			  	
			  	<router-link :to="{name:'ProjectDetail',query:{id:item.projectID}}">
			  		<span class="more">查看详情>></span>
			  	</router-link>
      </div>
      <div v-if="!stateOne.haveProject" class="stateOne">（此处暂无详细信息）</div>
    </div>
  </div>

</template>
<script>
	import {mapState} from "vuex"
	import MyAjax from "../../assets/js/MyAjax.js"
  import "../../assets/js/units/corpbox/cropbox.js"
	import "../../assets/js/units/corpbox/style.css"
  import Modal from "../../assets/js/modal.js"
	
  export default {
    name:"teamIndex",
    data:function(){
      return {
        msg:"团队主页",
        teamLicense:require("../../assets/img/team/certificate01.png"),
        teamApitute:require("../../assets/img/team/certificate02.png"),
        cerState:{
       		senior:[],
       		backbone:[],
       		staff:[]
       	},
       	stateOne:{ /**/
       		haveTeamDesc:false,/*有无团队介绍*/
       		haveTeamMail:false,/*团队联系方式*/
       		haveCompany:false,/*有无所属公司*/
       		haveSenior:false,/*有无管理人员*/
       		haveBackbone:false,/*有无骨干*/
       		haveProject:false,/*有无项目展示*/
       		
       	},
       	teamInfo:{}
      }
    },
    computed:mapState({
    	teamMessage:state=>state.team.teamMessage
    }),
    created(){
    	this.getData()
    },
    mounted(){
    	var that=this;
      //获取头像
    	var options =
			{
				thumbBox: '.thumbBox',
				spinner: '.spinner',
				imgSrc: that.teamInfo.pic
			}
			var cropper = $('.imageBox').cropbox(options);
			$('#upload-file').on('change', function(){
				var reader = new FileReader();
				reader.onload = function(e){
				options.imgSrc = e.target.result;
				cropper = $('.imageBox').cropbox(options);
//					console.log(e.target.result)
				}
				var files=document.getElementById("upload-file").files[0];
				reader.readAsDataURL(files);
//				console.log(files)
				that.fileName = files.name;
				
			})
			
			$('#btnCrop').on('click', function(){
//				console.log(document.getElementById("upload-file").files[0])
				if(document.getElementById("upload-file").files[0]!=undefined){
					var img = cropper.getDataURL();
//				console.log(img)
//				console.log(cropper.image)
					that.teamInfo.pic = img;
	
					$('.cropped').html('');
					$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
					$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
					$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
					
	//				var Blob = cropper.getBlob();
	//				var fd = new FormData();
	//				fd.append('file',Blob);
					Modal.closeModal($('.corpbox'))
					var url = MyAjax.urlsy+"/teamOrgaInfo/uploadAvatar";
					console.log(that.teamInfo.pic)
					MyAjax.ajax({
							type: "POST",
							url:url,
							data: {base64Data:that.teamInfo.pic,fileName:that.fileName},
							dataType: "json",
	//						contentType:"application/json;charset=utf-8",//
							async:false,
						}, function(data){
//							that.dataInfo = data
//							console.log(that.dataInfo)
							console.log(data)
						},function(err){
							console.log(err)
						})
				}
				
				
			})
			$('#btnZoomIn').on('click', function(){
				cropper.zoomIn();
			})
			$('#btnZoomOut').on('click', function(){
				cropper.zoomOut();
			})
    	
    	
//  	console.log(this.stateOne);
//  	console.log(this.teamMessage)
    },
    methods:{
    	getData(){
        var that=this;
        var url = MyAjax.urlsy+"/teamOrgaInfo/homePage";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          if(data.code==0){
            that.teamInfo=data.msg;
            //Vue.set(that,"psnMsg",data.msg);
            if(that.teamInfo.teamProfile!=(""||null)){
			    		that.stateOne.haveTeamDesc=true;
			//  		console.log(1)
			    	}
			    	if(that.teamInfo.contactInfo!=(""||null)){
			    		that.stateOne.haveTeamMail=true;
			//  		console.log(2)
			    	}
			    	if(that.teamInfo.companyName!=(""||null)){
			    		that.stateOne.haveCompany=true;
			//  		console.log(3)
			    	}
			    	if(that.teamInfo.topManagers.length!=0 ){
			    		that.stateOne.haveSenior = true;
			//  		console.log(4)
			    	}
			    	if(that.teamInfo.importantPsns.length!=0){
			    		that.stateOne.haveBackbone = true;
			//  		console.log(5)
			    	}
			    	if(that.teamInfo.teamprojexpes.length != 0){
			    		that.stateOne.haveProject = true;
			    	}
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
        
      },
      croperShow(){
    		Modal.makeText($('.corpbox'))
    	},
    	croperClose(){
    		Modal.closeModal($('.corpbox'))
    	}
    },
    updated(){
    	if(this.teamMessage.basicInfo.teamDesc.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveTeamDesc=false;
    	}else if(this.teamMessage.accountInfo.teamMail.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveTeamMail=false;
    	}else if(this.teamMessage.teamOrgaInfo.company.length===0){
    		this.stateOne.haveCompany=false;
    	}else if(this.teamMessage.teamOrgaInfo.senior.length===0){
    		this.stateOne.haveSenior = false;
    	}else if(this.teamMessage.teamOrgaInfo.backbone.length===0){
    		this.stateOne.haveBackbone = false;
    	}else if(this.teamMessage.teamProInfo.length === 0){
    		this.stateOne.haveProject = false;
    	}
    }
  }
</script>
<style lang="scss" scoped="">
$bfColor:#f7f9fc;
$activeColor:#02a672;
	.teamIndex{
		.stateOne{
			font-size: 18px;
			color: #a7a7a7;
			height: 118px;
			line-height: 118px;
			text-align: center;
		}
		
		.teamProfile{
			 margin-top:70px;
			  .content-wrap{
			  	padding: 20px 20px;
			    font-size: 14px;
			    color:#353535;
			    font-family: 'Microsoft Yahei';
					text-align: justify;
			  }
		 	
		}
		.teamMail{
			.content-wrap{
		  	padding: 20px 20px;
		    font-size: 14px;
		    color:#353535;
		    font-family: 'Microsoft Yahei';
				text-align: justify;
		  }
		}
		.teamCompany{
			.content-wrap{
		  	padding: 20px 20px;
		    font-size: 14px;
		    color:#353535;
		    font-family: 'Microsoft Yahei';
				text-align: justify;
		  }
		}
	  .teamTeam{
	  	
	  	.seniorTable{
	  		overflow: hidden;
	  		padding: 30px;
	  		.seniorList{
		  		float: left;
		  		text-align: center;
		  		margin-right: 30px;
		  		dt{
		  			overflow: hidden;
		  		}
		  		dd{
		  			margin-top:15px;
		  		}
		  	}
		  	.seniorList{
		  		margin-bottom: 30px;
		  		dt{
		  			width: 100px;
		  			height: 100px;
		  			border-radius: 50%;
		  			background: #e6e6e6;
		  			position: relative;
		  			img{
		  				position:absolute;top:50%;left:50%; 
						 transform:translate(-50%,-50%);
						 -webkit-transform:translate(-50%,-50%);
						-moz-transform:translate(-50%,-50%);
						-ms-transform:translate(-50%,-50%);
						-o-transform:translate(-50%,-50%);
		  			}
		  		}
		  	}
		  	
	  	}
	  	
	 	
	  }
	  .cadreman{
	  	.backBoneTable{
	  		overflow: hidden;
	  		padding: 30px;
	  		.backboneList{
		  		float: left;
		  		text-align: center;
		  		margin-right: 30px;
		  		margin-bottom: 30px;
		  		dt{
		  			width: 80px;
		  			height: 80px;
		  			border-radius: 50%;
		  			background: #e6e6e6;
		  			position: relative;
		  			overflow: hidden;
		  			img{
		  				position:absolute;top:50%;left:50%; 
						 transform:translate(-50%,-50%);
						 -webkit-transform:translate(-50%,-50%);
						-moz-transform:translate(-50%,-50%);
						-ms-transform:translate(-50%,-50%);
						-o-transform:translate(-50%,-50%);
		  			}
		  		}
		  		dd{
		  			margin-top:15px;
		  		}
		  	}
		  	
	  	}
	  }
	  .teamShow{
      .projectTable{
        padding: 30px 20px;
        .projectName{
            font-size: 18px;
            font-family: "microsoft yahei";
            color: $activeColor;
            font-weight: bold;
            line-height: 18px;

        }
        .pr-wrap-a{
            height: 18px;
            line-height: 18px;
            font-size: 18px;
            font-family: "microsoft yahei";
            line-height: 18px;
            margin: 20px 0;
            
            .completeTime{
                font-size: 18px;
                font-family: "microsoft yahei";
                float: left;
            }
            .takeOfficeBar{
                font-size: 18px;
                font-family: "microsoft yahei";
                float: right;
            }
        }
				.more{
					display: inline-block;
					color: $activeColor;
					margin: 20px 0;
					cursor: pointer;
				}

      }

    }
	}
 

















</style>
