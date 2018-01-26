<template>
  <div class="companyIndex">
    <div class="companyMessage">
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
        <h1 class="companyName">{{companyMessage.basicInfo.companyName}}</h1>
        <p class="companyAddress" v-if="stateOne.haveAddress">{{companyMessage.basicInfo.companyAddress}}</p>
        <p v-if="!stateOne.haveAddress" class="">(暂未填写公司地址)</p>
      </div>
    </div>
    <div class="companyProfile">
      <h3 class="c-title"><span>公司简介</span></h3>
      <div class="content-wrap" v-if="stateOne.haveCompanyDesc">{{companyMessage.basicInfo.companyDesc}}</div>
      <div v-if="!stateOne.haveCompanyDesc" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="companyLicense">
      <h3 class="c-title"><span>公司证照</span></h3>
      <ul>
      	<li><img :src="companyLicense"/></li>
      </ul>
      <div v-if="false" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="companyApitute">
      <h3 class="c-title"><span>公司资质</span></h3>
      <ul>
      	<li><img :src="companyApitute"/></li>
      </ul>
      <div v-if="false" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="companyTm">
      <h3 class="c-title"><span>高管团队</span></h3>
      <div class="seniorTable" v-if="stateOne.haveSenior">
      	<dl v-for="item in companyMessage.companyOrgaInfo.senior" class="seniorList">
      		<dt><img src="../../assets/img/company/icon_senior.png" /></dt>
      		<dd>{{item.dealId}}</dd>
      	</dl>
      </div>
      <div v-if="!stateOne.haveSenior" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="cadreman">
      <h3 class="c-title"><span>重要骨干</span></h3>
      <div class="backBoneTable" v-if="stateOne.haveBackbone">
      	<dl v-for="item in companyMessage.companyOrgaInfo.backbone" class="backboneList">
      		<dt><img src="../../assets/img/company/icon_senior.png" /></dt>
      		<dd>{{item.dealId}}</dd>
      	</dl>
      </div>
      <div v-if="!stateOne.haveBackbone" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="companyShow">
      <h3 class="c-title"><span>项目展示</span></h3>
        <div v-for="item in companyMessage.companyProInfo" class="projectTable" v-if="stateOne.haveProject">
      	<h4 class="projectName">{{item.proName}}</h4>
      		<div class="pr-wrap-a">
			  		<span class="completeTime">Time : {{item.parTakeTime_S}}——{{item.parTakeTime_E}}</span>
			  		<span class="takeOfficeBar">项目责任：<em class="takeOffice">建筑设计</em></span>
			  	</div>
			  	<p class="pr-wrap-b">{{item.detailDes}}</p>
			  	<router-link :to="{name:'ProjectDetail',query:{id:item.id}}">
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
    name:"companyIndex",
    data:function(){
      return {
        msg:"公司主页",
        companyLicense:require("../../assets/img/company/certificate01.png"),
        companyApitute:require("../../assets/img/company/certificate02.png"),
        companyInfo:{},
        stateOne:{
        	haveAddress:true,/*判断有无公司地址*/
        	haveCompanyDesc:true,/*有无公司介绍*/
        	haveLicense:true,/*有无证照*/
        	haveApitute:true,/*有无资质证件*/
        	haveSenior:true,/*有无高管*/
        	haveBackbone:true,/*有无骨干*/
        	haveProject:true,/*有无项目*/
        	
        }
      }
    },
    computed:mapState({
    	companyMessage:state=>state.company.companyMessage
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
				imgSrc: that.companyInfo.pic
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
					that.companyInfo.pic = img;
	
					$('.cropped').html('');
					$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
					$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
					$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
					
	//				var Blob = cropper.getBlob();
	//				var fd = new FormData();
	//				fd.append('file',Blob);
					Modal.closeModal($('.corpbox'))
					var url = MyAjax.urlsy+"/companyInfo/uploadAvatar";
					console.log(that.companyInfo.pic)
					MyAjax.ajax({
							type: "POST",
							url:url,
							data: {base64Data:that.companyInfo.pic,fileName:that.fileName},
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
    	
    	if(this.companyMessage.basicInfo.companyAddress.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveAddress = false;
    	}
    	if(this.companyMessage.basicInfo.companyDesc.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveCompanyDesc=false;
    		console.log(1)
    	}

    	if(this.companyMessage.companyOrgaInfo.senior.length===0){
    		this.stateOne.haveSenior = false;
    		console.log(4)
    	}
    	if(this.companyMessage.companyOrgaInfo.backbone.length===0){
    		this.stateOne.haveBackbone = false;
    		console.log(5)
    	}
    	if(this.companyMessage.companyProInfo.length === 0){
    		this.stateOne.haveProject = false;
    	}
    	
    	console.log(this.companyMessage);
    	
    },
    methods:{
    	getData(){
        var that=this;
        var url = MyAjax.urlsy+"/companyInfo/homePage";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          if(data.code==0){
            that.companyInfo=data.msg;
            //Vue.set(that,"psnMsg",data.msg);
//          if(that.companyInfo.teamProfile!=(""||null)){
//			    		that.stateOne.haveTeamDesc=true;
//			//  		console.log(1)
//			    	}
//			    	if(that.companyInfo.contactInfo!=(""||null)){
//			    		that.stateOne.haveTeamMail=true;
//			//  		console.log(2)
//			    	}
//			    	if(that.companyInfo.companyName!=(""||null)){
//			    		that.stateOne.haveCompany=true;
//			//  		console.log(3)
//			    	}
//			    	if(that.companyInfo.topManagers.length!=0 ){
//			    		that.stateOne.haveSenior = true;
//			//  		console.log(4)
//			    	}
//			    	if(that.companyInfo.importantPsns.length!=0){
//			    		that.stateOne.haveBackbone = true;
//			//  		console.log(5)
//			    	}
//			    	if(that.companyInfo.teamprojexpes.length != 0){
//			    		that.stateOne.haveProject = true;
//			    	}
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
    }
  }
</script>
<style lang="scss" scoped="">
$bfColor:#ffffff;
$activeColor: #2eb3cf;
	.companyIndex{
		.stateOne{
			font-size: 18px;
			color: #a7a7a7;
			height: 118px;
			line-height: 118px;
			text-align: center;
		}
		.companyLicense,.companyApitute{
			ul{
				padding: 30px 20px;
			}
		}
		.companyProfile{
		 	text-align: justify;
		 }
	  .companyTm{
	  	
	  	.seniorTable{
	  		overflow: hidden;
	  		padding:30px 20px;
	  		.seniorList,.backboneList{
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
	  	}
	  	
	 	
	  }
	  .cadreman{
	  	.backBoneTable{
	  		overflow: hidden;
	  		padding:30px 20px;
	  		.backboneList{
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
	  	}
	  }
	  .companyShow{
	  	.projectTable{
	  		padding: 30px 20px;
	  		.more{
	  			
	  			display: inline-block;
	  			color: $activeColor;
	  			margin-top: 15px;
	  			cursor: pointer;
	  		}
	  	}
	  }
	}
 

















</style>
