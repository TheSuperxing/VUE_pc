<template>
	<div class="overview">
		<div class="header-wrap">
			<img :src="personalMessage.personalbasicinfo.pic" />
			<span class="userName">{{personalMessage.personalbasicinfo.nickName}}</span>
		</div>
		<div class="info-content">
			<div class="eduExpInfo">
				<h3 class="info-title">
					<span>教育背景</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.psnEduBackGrounds">{{stateText.psnEduBackGrounds}}</li>
					<li v-for="item in personalMessage.psnEduBackGrounds">
						<h5 class="">{{item.schoolName}}</h5>
						<div class="t-p-wrap">
							<span>{{item.schoolTimeUp}}——{{item.schoolTimeDown}}</span>
							<span>{{item.education}}</span>
							<span>{{item.professionName}}</span>
						</div>
					</li>
				</ul> 
			</div>
			
			<div class="workExpInfo">
				<h3 class="info-title">
					<span>工作经历</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.workExperience">{{stateText.workExperience}}</li>
					<li v-for="item in personalMessage.psnWorkExperiences">
						<h5 class="">{{item.companyName}}</h5>
						<div class="t-p-wrap">
							<span>{{item.ocupationTimeUp}}——{{item.ocupationTimeDown}}</span>
							<span>{{item.ocupation}}</span>
						</div>
						<div class="introduce">{{item.jobDescription}}</div>
					</li>
				</ul> 
			</div>
			<div class="proInfo">
				<h3 class="info-title">
					<span>项目经历</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.projectExperience">{{stateText.projectExperience}}</li>
					<li v-for="item in personalMessage.psnProjExpes">
						<h5 class="">{{item.projectName}}</h5>
						<div class="t-p-wrap">
							<span>{{item.partakeTimeUp}}——{{item.partakeTimeDown}}</span>
							<span>{{item.takeOffice}}</span>
						</div>
						<div class="introduce">{{item.detailDes}}</div>
						<router-link :to="{name:'ProjectDetail',query:{id:'1'}}" target="_blank">查看更多>></router-link>
					</li>
				</ul>
			</div>
			<div class="teamInfo">
				<h3 class="info-title">
					<span>团队经历</span>
				</h3>
				<ul class="info-wrap">
					<p class="stateNone" v-if="stateNone.teamExperience">{{stateText.teamExperience}}</p>
					<li v-for="item in personalMessage.teamOrgaInfos">
						<h5 class="">{{item.teamName}}</h5>
						
					</li>
				</ul>
			</div>
			<div class="certificateInfo">
				<h3 class="info-title">
					<span>执业资格</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.psnQualifications">{{stateText.psnQualifications}}</li>
					<li v-for="item in personalMessage.psnQualifications">
						<h5 class="">{{item.qualificationName}}</h5>
						<div class="introduce">
							<p v-cloak>专业类别：&nbsp;&nbsp;{{item.professionCategory}}</p>
			              	<p v-cloak>岗位名称：&nbsp;&nbsp;{{item.postName}}</p>
			              	<p v-cloak>批准日期：&nbsp;&nbsp;{{item.approveDate}}</p>
			              	<p v-cloak>签发单位：&nbsp;&nbsp;{{item.issueUnit}}</p>
			             	<p v-cloak>签发日期：&nbsp;&nbsp;{{item.issueDate}}</p>
			             	<p v-cloak>签发日期：&nbsp;&nbsp;{{item.validTill}}</p>
			             	
						</div>
						
					</li>
				</ul>
			</div>
			<div class="titleExpInfo">
				<h3 class="info-title">
					<span>职称信息</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.psnTitleMessages">{{stateText.psnTitleMessages}}</li>
					<li v-for="item in personalMessage.psnTitleMessages">
						<h5 class="">{{item.titleName}}</h5>
						<div class="introduce">
							  <p v-cloak>职称专业：&nbsp;&nbsp;{{item.professionalTitle}}</p>
				              <p v-cloak>证书编号：&nbsp;&nbsp;{{item.certificateNumber}}</p>
				              <p v-cloak>评定日期：&nbsp;&nbsp;{{item.assessmentTime}}</p>
				              <p v-cloak>评审组织：&nbsp;&nbsp;{{item.certificateBody}}</p>
						</div>
					</li>
				</ul> 
			</div>
			<div class="awardExpInfo">
				<h3 class="info-title">
					<span>所获奖励</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.psnAwards">{{stateText.psnAwards}}</li>
					<li v-for="item in personalMessage.psnAwards">
						<h5 class="">{{item.awardName}}</h5>
						<div class="t-p-wrap">
							<span>评定时间：{{item.awardingTime}}</span>
							<span>颁发机构 :&nbsp;&nbsp;{{item.awardingBody}}</span>
						</div>
						
					</li>
				</ul> 
			</div>
			<div class="paperExpInfo">
				<h3 class="info-title">
					<span>论文专利</span>
				</h3>
				<ul class="info-wrap" style="border-bottom: 1px solid #E0E0E0;">
					<li class="stateNone" v-if="stateNone.psnPapers">{{stateText.psnPapers}}</li>
					<li v-for="item in personalMessage.psnPapers">
						<h5 class="">{{item.paperTitle}}</h5>
						<div class="t-p-wrap">
							<span>{{item.journal}}</span>
							<span>{{item.publicTime}}</span>
						</div>
						
					</li>
				</ul>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.psnPatents">{{stateText.psnPatents}}</li>
					<li v-for="(item,index) in personalMessage.psnPatents">
						<h5 class="">{{item.patentName}}</h5>
						<div class="t-p-wrap">
							<span>{{item.awardingBody}}</span>
							<span>{{validityTerm[index]}}</span>
						</div>
						
					</li>
				</ul>
			</div>
			<div class="languageExpInfo">
				<h3 class="info-title">
					<span>语言软件</span>
				</h3>
				<ul class="info-wrap"  style="border-bottom: 1px solid #E0E0E0;">
					<li class="stateNone" v-if="stateNone.psnlanguages">{{stateText.psnlanguages}}</li>
					<li v-for="item in personalMessage.psnlanguages">
						<h5 class="">{{item.language}}</h5>
						<div class="t-p-wrap">
							<span>熟练程度：{{item.proficiency}}</span>
							<!--<span>{{item.publicTime}}</span>-->
						</div>
						
					</li>
				</ul>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.psnsoftwares">{{stateText.psnsoftwares}}</li>
					<li v-for="(item,index) in personalMessage.psnsoftwares">
						<h5 class="">{{item.software}}</h5>
						<div class="t-p-wrap">
							<span>熟练程度：{{item.proficiency}}</span>
							<!--<span>{{validityTerm[index]}}</span>-->
						</div>
						
					</li>
				</ul>
			</div>
			<!--<div class="demandInfo">
				<h3 class="info-title">
					<span>我的需求</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.demandInfo">暂无信息</li>
					<li v-for="item in personalMessage.demandbasicinfos">
						<h5>
							<router-link :to="{name:'DemandDetail',query:{id:item.demandbasicinfo.pkid}}" target="_blank">
								{{item.demandbasicinfo.demandName}}
							</router-link>
							
						</h5>
						<div class="introduce">{{item.demandbasicinfo.describe}}</div>
						<div class="t-p-wrap">{{item.demandbasicinfo.reword}}</div>
					</li>
				</ul>
			</div>
			<div class="dealInfo">
				<h3 class="info-title">
					<span>我的协议</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.dealInfo">暂无信息</li>
					<li v-for="item in personalMessage.dealbasicinfos">
						<h5>{{item.dealName}}</h5>
						<div class="introduce">{{item.demandbasicinfo.describe}}</div>
						<div class="t-p-wrap">{{item.demandbasicinfo.reword}}</div>
					</li>
				</ul>
			</div>-->
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import MyAjax from "../../assets/js/MyAjax.js"
	export default{
		name:"overview",
		data:function(){
			return{
				overviewInfo:"",
				stateNone:{psnEduBackGrounds:false,workExperience:false,projectExperience:false,teamExperience:false,psnQualifications:false,psnTitleMessages:false,psnAwards:false,psnPapers:false,psnPatents:false,psnlanguages:false,psnsoftwares:false,},
				stateText:{psnEduBackGrounds:"",workExperience:"",projectExperience:"",teamExperience:"",psnQualifications:"",psnTitleMessages:"",psnAwards:"",psnPapers:"",psnPatents:"",psnlanguages:"",psnsoftwares:""},
				personalMessage:"",
				validityTerm:[],
			}
		},
//		computed:mapState({
//		  personalMessage:state=>state.personal.personalMessage,
//		  /*获取数据*/
//		}),
		created(){
			this.getData()
		},
		mounted(){
			function emptyText(text) {
		        if(text==null||text.length==0){
		          return "（暂无消息）";
		        }else{
		          return text;
		        }
		    }
			if(this.personalMessage.psnEduBackGrounds.length==0&&this.personalMessage.hasHiddenPsnEduBackGrounds==false){
				this.stateNone.psnEduBackGrounds=true;
				this.stateText.psnEduBackGrounds="暂无消息";
			}else if(this.personalMessage.psnEduBackGrounds.length==0&&this.personalMessage.hasHiddenPsnEduBackGrounds==true){
				this.stateNone.psnEduBackGrounds=true;
				this.stateText.psnEduBackGrounds="该用户设置了隐私权限，您暂时无法查看该内容";
			}
			
			if(this.personalMessage.psnWorkExperiences.length==0&&this.personalMessage.hasHiddenPsnWorkExperiences==false){
				this.stateNone.workExperience=true;
				this.stateText.workExperience="暂无消息";
			}else if(this.personalMessage.psnWorkExperiences.length==0&&this.personalMessage.hasHiddenPsnWorkExperiences==true){
				this.stateNone.workExperience=true;
				this.stateText.workExperience="该用户设置了隐私权限，您暂时无法查看该内容";
			}
			if(this.personalMessage.psnProjExpes.length==0&&this.personalMessage.hasHiddenPsnProjExpes==false){
				this.stateNone.projectExperience=true;
				this.stateText.projectExperience="暂无消息";
			}else if(this.personalMessage.psnProjExpes.length==0&&this.personalMessage.hasHiddenPsnProjExpes==true){
				this.stateNone.projectExperience=true;
				this.stateText.projectExperience="该用户设置了隐私权限，您暂时无法查看该内容";
			}
			if(this.personalMessage.teamOrgaInfos.length==0&&this.personalMessage.hasHiddenTeamOrgaInfos==false){
				this.stateNone.teamExperience=true;
				this.stateText.teamExperience="暂无信息";
			}else if(this.personalMessage.teamOrgaInfos.length==0&&this.personalMessage.hasHiddenTeamOrgaInfos==true){
				this.stateNone.teamExperience=true;
				this.stateText.teamExperience="该用户设置了隐私权限，您暂时无法查看该内容";
			}
			if(this.personalMessage.psnQualifications.length==0&&this.personalMessage.hasHiddenPsnQualifications==false){
				this.stateNone.psnQualifications=true;
				this.stateText.psnQualifications = "暂无信息"
			}else if(this.personalMessage.psnQualifications.length==0&&this.personalMessage.hasHiddenPsnQualifications==true){
				this.stateNone.psnQualifications=true;
				this.stateText.psnQualifications = "该用户设置了隐私权限，您暂时无法查看该内容"
			}
			if(this.personalMessage.psnTitleMessages.length==0&&this.personalMessage.hasHiddenPsnTitleMessages==false){
				this.stateNone.psnTitleMessages=true;
				this.stateText.psnTitleMessages = "暂无信息"
			}else if(this.personalMessage.psnTitleMessages.length==0&&this.personalMessage.hasHiddenPsnTitleMessages==true){
				this.stateNone.psnTitleMessages=true;
				this.stateText.psnTitleMessages = "该用户设置了隐私权限，您暂时无法查看该内容"
			}
			if(this.personalMessage.psnAwards.length==0&&this.personalMessage.hasHiddenPsnAwards==false){
				this.stateNone.psnAwards=true;
				this.stateText.psnAwards = "暂无信息"
			}else if(this.personalMessage.psnAwards.length==0&&this.personalMessage.hasHiddenPsnAwards==true){
				this.stateNone.psnAwards=true;
				this.stateText.psnAwards = "该用户设置了隐私权限，您暂时无法查看该内容"
			}
			if(this.personalMessage.psnPapers.length==0&&this.personalMessage.hasHiddenPsnPapers==false){
				this.stateNone.psnPapers=true;
				this.stateText.psnPapers = "暂无信息"
			}else if(this.personalMessage.psnPapers.length==0&&this.personalMessage.hasHiddenPsnPapers==true){
				this.stateNone.psnPapers=true;
				this.stateText.psnPapers = "该用户设置了隐私权限，您暂时无法查看该内容"
			}
			if(this.personalMessage.psnPatents.length==0&&this.personalMessage.hasHiddenPsnPatents==false){
				this.stateNone.psnPatents=true;
				this.stateText.psnPatents = "暂无信息"
			}else if(this.personalMessage.psnAwards.length==0&&this.personalMessage.hasHiddenPsnPatents==true){
				this.stateNone.psnPatents=true;
				this.stateText.psnPatents = "该用户设置了隐私权限，您暂时无法查看该内容"
			}
			if(this.personalMessage.psnlanguages.length==0&&this.personalMessage.hasHiddenpsnlanguages==false){
				this.stateNone.psnlanguages=true;
				this.stateText.psnlanguages = "暂无信息"
			}else if(this.personalMessage.psnlanguages.length==0&&this.personalMessage.hasHiddenpsnlanguages==true){
				this.stateNone.psnlanguages=true;
				this.stateText.psnlanguages = "该用户设置了隐私权限，您暂时无法查看该内容"
			}
			if(this.personalMessage.psnsoftwares.length==0&&this.personalMessage.hasHiddenPsnsoftwares==false){
				this.stateNone.psnsoftwares=true;
				this.stateText.psnsoftwares = "暂无信息"
			}else if(this.personalMessage.psnsoftwares.length==0&&this.personalMessage.hasHiddenPsnsoftwares==true){
				this.stateNone.psnsoftwares=true;
				this.stateText.psnsoftwares = "该用户设置了隐私权限，您暂时无法查看该内容"
			}
			for(let i=0;i<this.personalMessage.psnEduBackGrounds.length;i++){
				if(this.personalMessage.psnEduBackGrounds[i].schoolTimeDown=="0002.12"){
					this.personalMessage.psnEduBackGrounds[i].schoolTimeDown = "至今"
				}
				this.personalMessage.psnEduBackGrounds[i].professionName=emptyText(this.personalMessage.psnEduBackGrounds[i].professionName);
           		this.personalMessage.psnEduBackGrounds[i].education=emptyText(this.personalMessage.psnEduBackGrounds[i].education);
			}
			for(let i=0;i<this.personalMessage.psnWorkExperiences.length;i++){
				if(this.personalMessage.psnWorkExperiences[i].ocupationTimeDown=="0002.12"){
					this.personalMessage.psnWorkExperiences[i].ocupationTimeDown = "至今"
				}
				this.personalMessage.psnWorkExperiences[i].ocupation=emptyText(this.personalMessage.psnWorkExperiences[i].ocupation);
            	this.personalMessage.psnWorkExperiences[i].jobDescription=emptyText(this.personalMessage.psnWorkExperiences[i].jobDescription);
			}
			for(let i=0;i<this.personalMessage.psnProjExpes.length;i++){
				if(this.personalMessage.psnProjExpes[i].partakeTimeDown=="0002.12"){
					this.personalMessage.psnProjExpes[i].partakeTimeDown = "至今"
				}
				this.personalMessage.psnProjExpes[i].takeOffice=emptyText(this.personalMessage.psnProjExpes[i].takeOffice);
            	this.personalMessage.psnProjExpes[i].detailDes=emptyText(this.personalMessage.psnProjExpes[i].detailDes);
			}	
			for (let item in this.personalMessage.psnPapers){
	            this.personalMessage.psnPapers[item].journal=emptyText(this.personalMessage.psnPapers[item].journal);
	            this.personalMessage.psnPapers[item].publicTime=emptyText(this.personalMessage.psnPapers[item].publicTime);
	        }
			for (let item in this.personalMessage.psnPatents){
				this.personalMessage.psnPatents[item].awardingBody=emptyText(this.personalMessage.psnPatents[item].awardingBody);
	            if(this.personalMessage.psnPatents[item].validityTermE=="0002.12"){
	            	this.personalMessage.psnPatents[item].validityTermE = "至今"
	            }
	            if((this.personalMessage.psnPatents[item].validityTermS!=null||this.personalMessage.psnPatents[item].validityTermS.length!=0)&&(this.personalMessage.psnPatents[item].validityTermE!=null||psnPatents[item].validityTermE.length!=0)){
	              this.validityTerm[item]= this.personalMessage.psnPatents[item].validityTermS+"——"+this.personalMessage.psnPatents[item].validityTermE
	            }else{
	              this.validityTerm[item]="（暂无消息）";
	            }
	            
	        }
			for (let item in this.personalMessage.psnTitleMessages){
		        this.personalMessage.psnTitleMessages[item].titleName=emptyText(this.personalMessage.psnTitleMessages[item].titleName);
		        this.personalMessage.psnTitleMessages[item].certificateNumber=emptyText(this.personalMessage.psnTitleMessages[item].certificateNumber);
		        this.personalMessage.psnTitleMessages[item].assessmentTime=emptyText(this.personalMessage.psnTitleMessages[item].assessmentTime);
		        this.personalMessage.psnTitleMessages[item].certificateBody=emptyText(this.personalMessage.psnTitleMessages[item].certificateBody);
		    }
			for (let item in this.personalMessage.psnQualifications){
	            this.personalMessage.psnQualifications[item].professionCategory=emptyText(this.personalMessage.psnQualifications[item].professionCategory);
	            this.personalMessage.psnQualifications[item].postName=emptyText(this.personalMessage.psnQualifications[item].postName);
	            this.personalMessage.psnQualifications[item].approveDate=emptyText(this.personalMessage.psnQualifications[item].approveDate);
	            this.personalMessage.psnQualifications[item].qualificationName=emptyText(this.personalMessage.psnQualifications[item].qualificationName);
	            this.personalMessage.psnQualifications[item].issueUnit=emptyText(this.personalMessage.psnQualifications[item].issueUnit);
	            this.personalMessage.psnQualifications[item].issueDate=emptyText(this.personalMessage.psnQualifications[item].issueDate);
	            this.personalMessage.psnQualifications[item].validTill=emptyText(this.personalMessage.psnQualifications[item].validTill);
	            this.personalMessage.psnQualifications[item].manageNo=emptyText(this.personalMessage.psnQualifications[item].manageNo);
	            this.personalMessage.psnQualifications[item].certificateNumber=emptyText(this.personalMessage.psnQualifications[item].certificateNumber);
	        }
			for (let item in this.personalMessage.psnAwards){
	            this.personalMessage.psnAwards[item].awardName=emptyText(this.personalMessage.psnAwards[item].awardName);
	            this.personalMessage.psnAwards[item].awardingBody=emptyText(this.personalMessage.psnAwards[item].awardingBody);
	            this.personalMessage.psnAwards[item].awardingTime=emptyText(this.personalMessage.psnAwards[item].awardingTime);
	        }
			//console.log(this.stateNone)
	},
	methods:{
		getData(){
			console.log(this.$route.query.id)
				var that = this;
				var url = MyAjax.urlhw+"/ediHomePage/personDetail/" + that.$route.query.id
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						console.log(data.msg)
						Vue.set(that,"personalMessage",data.msg)
					}
					console.log(that.personalMessage)
				},function(err){
					console.log(err)
				})
		}
	}
		
	}
</script>

<style lang="scss" scoped="scoped">
 $themeColor:rgb(242,117,25);

.overview{
	padding: 40px;
	background: #FFFFFF;
	width: 1200px;
	margin: 120px auto;
	.header-wrap{
		padding-bottom:30px;
		border-bottom:1px solid #E0E0E0;
		
		img{
			width: 150px; height: 150px;
			margin-right: 20px;
			border-radius: 50%;
		}
		.userName{
			font-size: 24px;
			color: $themeColor;
		}
	}
	.info-content{
		margin-top: 20px;
		.info-title{
			height: 50px;
			line-height: 50px;
			text-align: left;
			border-bottom: 1px solid #E0E0E0;
			span{
				display: inline-block;
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				color: $themeColor;
				border-bottom: 2px solid $themeColor;
			}
		}
		.stateNone{
			height: 50px; line-height: 50px;
			text-align: center;
			color: #999999;
			margin: 0; padding: 0;
		}
		.eduExpInfo{
			.info-wrap{
				
			}
		}
		.workExpInfo,.proInfo,.certificateInfo,.eduExpInfo,.titleExpInfo,.awardExpInfo,.paperExpInfo,.languageExpInfo{
			.info-wrap{
				padding: 20px;
				
				li{
					padding-bottom:20px;
					border-bottom: 1px dashed #E0E0E0;
					margin-bottom: 20px;
					&:last-child{
						border: none;
						margin-bottom: 0;
					}
					h5{
						height: 40px;
						line-height: 40px;
						color: $themeColor;
						font-size: 18px;
					}
					.t-p-wrap{
						height: 40px;
						line-height: 40px;
						span{
							display: inline-block;
							float: left;
							margin-right: 180px;
						}
					}
					.introduce{
						text-align: justify;
						line-height: 24px;
						color: #666666;
					}
					a{
						display: block;
						color: $themeColor;
						margin-top: 20px;
					}
				}
			}
		}
		.teamInfo{
			
			.info-wrap{
				padding: 20px;
				>li{
					height: 50px;
					line-height: 50px;
					text-align: left;
					border-bottom:1px solid #E0E0E0 ;
					font-size: 18px;
					&:last-child{
						border: none;
					}
				}
			}
		}
		.demandInfo,.dealInfo{
			.info-wrap{
				padding: 20px;
				>li{
					height: 50px;
					line-height: 50px;
					text-align: left;
					border-bottom:1px dotted #E0E0E0 ;
					font-size: 18px;
					&:last-child{
						border: none;
					}
					h5{
						a{
							color: #333333;
						}
						a:hover{
							color: #FF7403;
						}
					}
				}
			}
		}
	}
}
</style>