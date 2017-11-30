<template>
  <div class="personalIndex">
    <div class="psnCont">
    <div class="picture">
    	<div class="basicInfoImg">
    		<img v-bind:src="personal.personalPicture" alt=""/>
        
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
				  <!--<div class="cropped"></div>-->
				</div>
      </div>

      <p v-cloak>{{psnMsg.personalbasicinfo.nickName}}</p>
    </div>

    <ul class="personalIndexList">
      <li>
        <h3 class="pi-title">基础信息</h3>
        <div class="baseInfoContainer">

          <div class="emptyBasicInfo" v-if="empty.basicInfo">
            <h5>手机号码：</h5>
            <p>138-6666-8888</p>
          </div>

          <ul v-if="!empty.basicInfo">
            <li>
              <h5>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</h5>
              <p>{{psnMsg.personalbasicinfo.nickName}}</p>
            </li>
            <li>
              <h5>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h5>
              <p>{{psnMsg.personalbasicinfo.psnName}}</p>
            </li>
            <li>
              <h5>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</h5>
              <p>{{psnMsg.personalbasicinfo.sex}}</p>
            </li>
            <li>
              <h5>手机号码：</h5>
              <p>{{psnMsg.personalbasicinfo.phoneNumber}}</p>
            </li>
          </ul>
        </div>
      </li>
      <!--基础信息部分结束-->
      <li>
        <h3 class="pi-title">教育背景</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.education">（此处暂无信息）</div>

          <div v-for="(item,index) in this.psnMsg.psnEduBackGrounds">
            <h4 v-cloak>{{item.schoolName}}</h4>
            <div>
              <p v-cloak>{{item.schoolTimeUp}}——{{item.schoolTimeDown}}</p>
              <p v-cloak>专业：{{item.professionName}}</p>
              <p v-cloak>学历：{{item.education}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--教育背景结束-->
      <li>
        <h3 class="pi-title">工作经历</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.psnWorkExperiences">（此处暂无信息）</div>
          <div v-for="(item,index) in this.psnMsg.psnWorkExperiences">
            <h4 v-cloak>{{item.companyName}}</h4>
            <div>
              <p v-cloak>
                <span>{{item.ocupationTimeUp}}</span>
                <span>——</span>
                <span>{{item.ocupationTimeDown}}</span>
              </p>
              <p v-cloak>任职职位：{{item.ocupation}}</p>
              <p v-cloak>职位描述：{{item.jobDescription}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--工作经历结束-->
      <li>
        <h3 class="pi-title">项目经历</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.psnProjExpes">（此处暂无信息）</div>
          <div v-for="(item,index) in this.psnMsg.psnProjExpes">
            <h4 v-cloak>{{item.projectName}}</h4>
            <div>
              <p v-cloak>
                <span>{{item.partakeTimeUp}}</span>
                <span>——</span>
                <span>{{item.partakeTimeDown}}</span>
              </p>
              <p v-cloak>项目责任：{{item.takeOffice}}</p>
              <p v-cloak>责任描述：{{item.detailDes}}
              </p>
              <p>查看更多>></p>
            </div>
          </div>
        </div>
      </li>
      <!--项目经历结束-->
      <li>
        <h3 class="pi-title">团队经历</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.teamExperience">（此处暂无信息）</div>
          <div v-for="(item,index) in this.psnMsg.teamOrgaInfos">
            <h4 v-cloak>{{item.teamName}}</h4>
          </div>
        </div>
      </li>
      <!--团队经历结束-->
      <li>
        <h3 class="pi-title">执业资格</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.psnQualifications">（此处暂无信息）</div>
          <div v-for="(item,index) in this.psnMsg.psnQualifications">
            <h4 v-cloak>{{item.qualificationName}}</h4>
            <div>
              <p v-cloak>注册单位：{{item.registeredUnit}}</p>
              <p v-cloak>证书编号：{{item.certificateNumber}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--执业资格部分结束-->
      <li>
        <h3 class="pi-title">职称信息</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.psnTitleMessages">（此处暂无信息）</div>
          <div v-for="(item,index) in this.psnMsg.psnTitleMessages">
            <h4 v-cloak>{{item.professionalTitle}}</h4>
            <div>
              <p v-cloak>职称专业：&nbsp;&nbsp;{{item.titleName}}</p>
              <p v-cloak>职称级别：&nbsp;&nbsp;{{item.titleLevel}}</p>
              <p v-cloak>证书编号：&nbsp;&nbsp;{{item.certificateNumber}}</p>
              <p v-cloak>评定日期：&nbsp;&nbsp;{{item.assessmentTime}}</p>
              <p v-cloak>发证机构：&nbsp;&nbsp;{{item.certificateBody}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--职称信息结束-->
      <li>
        <h3 class="pi-title">所获奖励</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.psnAwards">（此处暂无信息）</div>
          <div v-for="(item,index) in this.psnMsg.psnAwards">
            <h4 v-cloak>{{item.awardName}}</h4>
            <div>
              <p v-cloak>颁发机构：&nbsp;&nbsp;{{item.awardingBody}}</p>
              <p v-cloak>评定时间：{{item.awardingTime}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--所获奖励结束-->
      <li>
        <h3 class="pi-title">论文专利</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.paperAndPatent">（此处暂无信息）</div>
          <div v-for="(item,index) in this.psnMsg.psnPapers">
            <h4 v-cloak>{{item.paperTitle}}</h4>
            <div>
              <p v-cloak>发表期刊：{{item.journal}}</p>
              <p v-cloak>发表时间：{{item.publicTime}}</p>
            </div>
          </div>
          <div v-for="(item,index) in this.psnMsg.psnPatents">
            <h4 v-cloak>{{item.patentName}}</h4>
            <div>
              <p v-cloak>颁发机构：{{item.awardingBody}}</p>
              <p v-cloak>有效期：{{validityTerm[index]}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--论文专利结束-->
      <li>
        <h3 class="pi-title">语言软件</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.otherSkill">（此处暂无信息）</div>
          <div v-for="(item,index) in this.psnMsg.psnlanguages">
            <h4 v-cloak>{{item.language}}</h4>
            <div>
              <p v-cloak>熟练程度：{{item.proficiency}}</p>
            </div>
          </div>
          <div v-for="(item,index) in this.psnMsg.psnsoftwares">
            <h4 v-cloak>{{item.software}}</h4>
            <div>
              <p v-cloak>熟练程度：{{item.proficiency}}</p>
            </div>
          </div>
        </div>
      </li>

    </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import Vue from "vue"
  import Modal from "../../assets/js/modal.js"
  import MyAjax from "../../assets/js/MyAjax.js"
  import "../../assets/js/units/corpbox/cropbox.js"
	import "../../assets/js/units/corpbox/style.css"
  
  export default{
    name: 'personalIndex',
    data(){
      return {
        empty:{
          basicInfo:false,
          education:true,
          psnWorkExperiences:true,
          psnProjExpes:true,
          teamOrgaInfos:true,
          psnQualifications:true,
          psnTitleMessages:true,
          psnAwards:true,
          // psnPapers:true,
          // paper:[true],
          paperAndPatent:true,
          // language:[true],
          // software:[true],
          otherSkill:true
        },
        psnMsg:[],//用于存放服务器获取的数据
        validityTerm:[],//validityTermS+validityTermE
        personal:{
          personalPicture:"",
          fileName:"",
        	fd :"",
        },
      }
    },
    created(){
      var that=this;
      var url = MyAjax.urlsy+"/psnHomePage/findByMySelf";
    	MyAjax.ajax({
				type: "GET",
				url:url,
				dataType: "json",
				
			},function(data){
        
        that.psnMsg=data.msg;
			},function(err){
				console.log(err)
      })
      
    },
    mounted(){

      var that = this;
    	//获取头像
    	var url = MyAjax.urlsy+"/psnHomePage/getAvatar";
    	MyAjax.ajax({
				type: "GET",
				url:url,
				dataType: "json",
//				content-type: "text/plain;charset=UTF-8",
				
			},function(data){
				console.log(data)
				if(data.code==0){
					that.personal.personalPicture = data.msg.pic
				}else if(data.code==-1){
					that.personal.personalPicture = require("../../assets/img/personal/personalIndex/picture.png");
				}
				
			},function(err){
				console.log(err)
			})
    	

    
//  	console.log(that.personal.personalPicture)
    	var options =
			{
				thumbBox: '.thumbBox',
				spinner: '.spinner',
				imgSrc: that.personal.personalPicture
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
				console.log(files.name)
				that.fileName = files.name;
				
			})
			$('#btnCrop').on('click', function(){
				var img = cropper.getDataURL();
//				console.log(img)
//				console.log(cropper.image)
				that.personal.personalPicture = img;

				$('.cropped').html('');
				$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
				$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
				$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
				
//				var Blob = cropper.getBlob();
//				var fd = new FormData();
//				fd.append('file',Blob);
				Modal.closeModal($('.corpbox'))
				var url = MyAjax.urlsy+"/psnHomePage/uploadHead";
				console.log(that.personal.personalPicture)
				$.ajax({
						type: "POST",
						url:url,
						data: {base64Data:that.personal.personalPicture,fileName:that.fileName},
						dataType: "json",
			//				content-type: "text/plain;charset=UTF-8",
						success:function(data){
						console.log(data)
			//					that.dataInfo = data
			//					console.log(that.dataInfo)
						},error:function(err){
							console.log(err)
						}
					})
				
			})
			$('#btnZoomIn').on('click', function(){
				cropper.zoomIn();
			})
			$('#btnZoomOut').on('click', function(){
				cropper.zoomOut();
				
			})
      //上传头像end
      
      // 服务器获取首页所需的数据
      function emptyText(text) {
        if(text==null||text.length==0){
          return "（暂无消息）";
        }else{
          return text;
        }
      }
      // 为空的数据进行处理
      console.log(this.psnMsg.personalbasicinfo)
      var personalbasicinfo=this.psnMsg.personalbasicinfo;
      if(personalbasicinfo.sex==0){
        return personalbasicinfo.sex="男"
      }else{
        return personalbasicinfo.sex="女"
      }
      if((personalbasicinfo.nickName==null||personalbasicinfo.nickName.length==0) && (personalbasicinfo.psnName==null||personalbasicinfo.psnName.length==0) && (personalbasicinfo.sex==null||personalbasicinfo.sex.length==0)){
        Vue.set(this.empty,"basicInfo",true)
      }
      //基础信息部分数据空和非空切换
      var psnEduBackGrounds=this.psnMsg.psnEduBackGrounds;
      if(psnEduBackGrounds.length!=0){
        Vue.set(this.empty,"education",false)
        for (let item in psnEduBackGrounds){
          psnEduBackGrounds[item].professionName=emptyText(psnEduBackGrounds[item].professionName);
          psnEduBackGrounds[item].education=emptyText(psnEduBackGrounds[item].education);
        }
      }
      //教育背景是否显示

      var psnWorkExperiences=this.psnMsg.psnWorkExperiences;
      if(psnWorkExperiences.length!=0){
        Vue.set(this.empty,"psnWorkExperiences",false)
        for (let item in psnWorkExperiences){
          psnWorkExperiences[item].ocupation=emptyText(psnWorkExperiences[item].ocupation);
          psnWorkExperiences[item].jobDescription=emptyText(psnWorkExperiences[item].jobDescription);
        }
      }
      // 工作经历是否显示
      var psnProjExpes=this.psnMsg.psnProjExpes;
      if(psnProjExpes.length!=0){
        Vue.set(this.empty,"psnProjExpes",false)
        for (let item in psnProjExpes){
          psnProjExpes[item].takeOffice=emptyText(psnProjExpes[item].takeOffice);
          psnProjExpes[item].detailDes=emptyText(psnProjExpes[item].detailDes);
        }
      }
      //项目经历是否显示
      var teamOrgaInfos=this.psnMsg.teamOrgaInfos;
      if(teamOrgaInfos.length!=0){
        Vue.set(this.empty,"teamOrgaInfos",false)
      }
      //团队经历是否显示
      var psnQualifications=this.psnMsg.psnQualifications;
      if(psnQualifications.length!=0){
        Vue.set(this.empty,"psnQualifications",false)
        for (let item in psnQualifications){
          psnQualifications[item].registeredUnit=emptyText(psnQualifications[item].registeredUnit);
          psnQualifications[item].qualificationName=emptyText(psnQualifications[item].qualificationName);
        }
      }
      //执业资格是否显示
      var psnTitleMessages=this.psnMsg.psnTitleMessages;
      if(psnTitleMessages.length!=0){
        Vue.set(this.empty,"psnTitleMessages",false)
        for (let item in psnTitleMessages){
          psnTitleMessages[item].titleName=emptyText(psnTitleMessages[item].titleName);
          psnTitleMessages[item].titleLevel=emptyText(psnTitleMessages[item].titleLevel);
          psnTitleMessages[item].certificateNumber=emptyText(psnTitleMessages[item].certificateNumber);
          psnTitleMessages[item].assessmentTime=emptyText(psnTitleMessages[item].assessmentTime);
          psnTitleMessages[item].certificateBody=emptyText(psnTitleMessages[item].certificateBody);
        }
      }
      //职称信息是否显示
      var psnAwards=this.psnMsg.psnAwards;
      if(psnAwards.length!=0){
        Vue.set(this.empty,"psnAwards",false)
        for (let item in psnAwards){
          psnAwards[item].awardName=emptyText(psnAwards[item].awardName);
          psnAwards[item].awardingBody=emptyText(psnAwards[item].awardingBody);
          psnAwards[item].awardingTime=emptyText(psnAwards[item].awardingTime);
        }
      }
      //所获奖励是否显示
      var psnPapers=this.psnMsg.psnPapers;
      if(psnPapers.length!=0){
        for (let item in psnPapers){
          psnPapers[item].journal=emptyText(psnPapers[item].journal);
          psnPapers[item].publicTime=emptyText(psnPapers[item].publicTime);
        }
      }
      var psnPatents=this.psnMsg.psnPatents;
      
      if(psnPatents.length!=0){
        for (let item in psnPatents){
          psnPatents[item].patentName=emptyText(psnPatents[item].patentName);
          if((psnPatents[item].validityTermS!=null||psnPatents[item].validityTermS.length!=0)&&(psnPatents[item].validityTermE!=null||psnPatents[item].validityTermE.length!=0)){
            this.validityTerm[item]= psnPatents[item].validityTermS+"-"+psnPatents[item].validityTermE
          }else{
            this.validityTerm[item]="（暂无消息）";
          }
          
          //psnPatents[item].validityTermE=emptyText(psnPatents[item].validityTermE);
        }
      }
      if(psnPapers.length!=0||psnPatents.length!=0){
        Vue.set(this.empty,"paperAndPatent",false)
      }
      //论文专利是否显示

      var psnlanguages=this.psnMsg.psnlanguages;
      if(psnlanguages.length!=0){
        for (let item in psnlanguages){
          psnlanguages[item].proficiency=emptyText(psnlanguages[item].proficiency);
        }
      }
      var psnsoftwares=this.psnMsg.psnsoftwares;
      if(psnsoftwares.length!=0){
        for (let item in psnsoftwares){
          psnsoftwares[item].proficiency=emptyText(psnsoftwares[item].proficiency);
        }
      }
      if(psnlanguages.length!=0||psnsoftwares.length!=0){
        Vue.set(this.empty,"otherSkill",false)
      }
      //语言软件是否显示
    },
    methods:{
    	croperShow(){
    		Modal.makeText($('.corpbox'))
    	},
//  	uploadAvatar(){
//  		var that = this;
//				var url = MyAjax.urlsy+"/psnHomePage/uploadHead";
//				console.log(that.personal.personalPicture)
//				$.ajax({
//						type: "POST",
//						url:url,
//						data: {base64Data:that.personal.personalPicture,fileName:that.fileName},
//						dataType: "json",
//			//				content-type: "text/plain;charset=UTF-8",
//						success:function(data){
//						console.log(data)
//			//					that.dataInfo = data
//			//					console.log(that.dataInfo)
//						},error:function(err){
//							console.log(err)
//						}
//					})
//				//上传头像
//  	}
    },
    destroyed(){
    	
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  .personalIndex {
  	
    width: 940px;
    padding: 40px 40px 60px 40px;
    background-color: $bfColor;
    float: left;
    border-radius: 5px;
    min-height:500px;
    .pi-title{
      padding:25px 0 11px 0;
      font-size: 18px;
      color: $activeColor;
      border-bottom: 1px solid $borderColor;
    }
    /*共有头部*/
    .pi-empty{
      padding: 40px 0 10px 0;
      font-size:18px;
      color: $emptyColor;
      text-align: center;
    }
    
    /*空数据*/
    .picture{
    	/*上传头像*/
    	.container{
    		position:absolute;top:50%;left:50%; 
				transform:translate(-50%,-50%);
				-webkit-transform:translate(-50%,-50%);
				-moz-transform:translate(-50%,-50%);
				-ms-transform:translate(-50%,-50%);
				-o-transform:translate(-50%,-50%);
				.Btnsty_peyton{
					text-align: center;
				}
				.thumbBox{
					border-radius: 50%;
				}
    	}
      padding-bottom:30px;
      border-bottom: 1px solid $borderColor;
      .basicInfoImg{
      	width: 115px;
      	height: 115px;
      	border-radius: 50%;
      	background: bisque;
      	overflow: hidden;
      	position: relative;
      	float: left;
      	&:hover{
      		.meng{
      			display: block;
      		}
      	}
      	img{
	        width: 115px;
      		height: 115px;
      		margin: 0 auto;
	      }
	      .meng{
	      	position: absolute;
	      	width: 100%;
	      	height: 115px;
	      	line-height: 115px;
	      	text-align: center;
	      	background: rgba(0,0,0,.5);
	      	top: 0; left: 0;
	      	color: #FFFFFF;
	      	cursor: pointer;
	      	display: none;
	      }
      }
      
      p{
        width:717px;
        float: left;
        padding-left:30px;
        color: $activeColor;
        font-size: 24px;
        margin-top:31px;
      }
    }
    .personalIndexList{
      li{
        .infoContainer{
          color: rgb(53,53,53);
          padding:0 22px;
          h4{
            padding-top:25px;
            padding-bottom:15px;
            font-size: 18px;
            color: $themeColor;
          }
          div{
            border-bottom:1px solid $borderColor;
            p{
              float: left;
              padding-bottom:17px;
              span{
                float: left;
              }
            }
          }
          div:last-child{
            border-bottom: 0;
          }
        }
      }
      li:nth-child(1){
        .emptyBasicInfo{
          padding-left:20px;
          color: rgb(114,114,114);
          h5{
            float: left;
            color: rgb(53,53,53);
            padding-left:25px;
            background: url("../../assets/img/personal/personalIndex/baseinfo/phone.png") left center no-repeat;
          }
          p{
            float: left;
            margin-left:13px;
          }
        }
        .baseInfoContainer{
          padding-top: 30px;
          ul{
            color: rgb(114,114,114);
            padding-left:20px;
            li{
              padding-bottom:20px;
              h5{
                float: left;
                color: rgb(53,53,53);
                padding-left:25px;
                //width:95px;
              }
              p{
                float: left;
                margin-left:13px;
              }
            }
            li:nth-child(1) {
              h5 {
                background: url("../../assets/img/personal/personalIndex/baseinfo/petName.png") left center no-repeat;
              }
            }
            li:nth-child(2) {
              h5 {
                background: url("../../assets/img/personal/personalIndex/baseinfo/name.png") left center no-repeat;
              }
            }
            li:nth-child(3){
              h5{
                background: url("../../assets/img/personal/personalIndex/baseinfo/sex.png") left center no-repeat;
              }
            }
            li:nth-child(4){
              padding-bottom:10px;
              h5{
                background: url("../../assets/img/personal/personalIndex/baseinfo/phone.png") left center no-repeat;
              }
            }
          }
          div:last-child{
            padding-bottom: 15px;
          }
        }
      }
      li:nth-child(2){
        div{
          p{
            padding-right:0px;
          }
          p:nth-child(1){
            width:292px;
          }
          p:nth-child(2){
            width:214px;
          }
        }
      }
      li:nth-child(3){
        .infoContainer{
          div{
            p:nth-child(1){
              width:292px;
            }
            p:last-child{
              padding-right:0px;
              width:820px;
            }
          }
        }
      }

      li:nth-child(4){
        .infoContainer{
          div{
            p:nth-child(1){
              width:292px;
            }
            p:nth-child(3){
              padding-right:0px;
              width:820px;
            }
            p:last-child{
              color: $themeColor;
              cursor: pointer;

            }
          }
        }
      }

      li:nth-child(5){
        .infoContainer{
          div{
            h4:nth-child(1){
              color: rgb(53,53,53);
            }
            p:last-child{
              padding-right:0px;
            }
          }
        }
      }
      li:nth-child(6){
        .infoContainer{
          div{
            p:nth-child(1){
              width:800px;
              padding-right:0;
              padding-bottom:10px;
              color: rgb(120,120,120);
            }
            p:nth-child(2){
              width:800px;
              padding-right:0;
              color: rgb(53,53,53);
            }
          }
        }
      }
      li:nth-child(7){
        .infoContainer{
          div{
            p{
              width:800px;
            }
          }
        }
      }
      li:nth-child(8){
        .infoContainer{
          div{
            p{
              width:800px;
            }
          }
        }
      }
      li:nth-child(9){
        .infoContainer{
          div{
            p{
              width:800px;
            }
            p:last-child{
              color: rgb(117,117,117);
            }
          }
        }
      }

    }
  }
</style>
