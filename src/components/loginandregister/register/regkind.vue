<template>
<div class="regkind">
	<ul class="person-wrap" v-if="state=='per'" @keydown="keyRegisterDonePer($event)">
		<li>
			<input type="text"  placeholder="请输入手机号" v-model="personalRegInput.tel" @blur="personTelCfm" class="tel"/>
		</li>
		<li>
			
			<input v-model="personalRegInput.picConfirm" @blur="picConfirm" type="text" placeholder="图形验证码" class="pic"/>
		    <img class="picConfirm" :src="picSrc" alt="" @click="changePic"/>
		    <span v-if="reveal.error">图片验证码错误</span>
		</li>
		<li>
			<div>
				<input type="text" placeholder="请确认短信验证码" v-model="personalRegInput.messageConfirm" @blur="personalMsgCfm" class="msg"/>
			</div>
			<button @click="settime" class="msgConfirm" :disabled="!show">
			     <span v-if="show">获取验证码</span>
			     <span v-if="!show" class="count">{{count}} s</span>
			</button>
		</li>
		<alertTip v-if="personalRegInput.showAlert" :showHide="personalRegInput.showAlert" @closeTip="closeTip" :alertText="personalRegInput.alertText"></alertTip>
		<div class="regBtn" @click="goRegisterDonePer" >
			注册
		</div>
		<p class="notice">
			<span v-bind:class="{'selected':agree[2]}" @click="agreeDeal" class="agreeBtn"></span>
			您已阅读并同意
			<router-link to="">
				[buildingshop用户协议]
			</router-link>
		</p>
	</ul>
	<ul class="com-wrap" v-if="state=='com'" @keydown="keyRegisterDoneCom($event)">
		<li>
			<input type="text"  placeholder="请输入公司名" v-model="comRegInput.name" @blur="nameConfirm"/>
		</li>
		<li>
			<input type="text"  placeholder="请输入您的邮箱" v-model="comRegInput.email" @blur="mailConfirm"/>
		</li>
		<li>
			<input type="password" placeholder="请输入密码(密码由6-14位字母（区分大小写）、数字或符号组成)" v-model="comRegInput.passWord" @blur="pwdConfirm"/>
		</li>
		<li>
			<input type="password" placeholder="请再次输入密码" v-model="comRegInput.passWordCfm" @blur="samePwd"/>
		</li>
		<alertTip v-if="comRegInput.showAlert" :showHide="comRegInput.showAlert" @closeTip="closeTip" :alertText="comRegInput.alertText"></alertTip>
		<div class="regBtn" @click="goRegisterDoneCom" >
			注册
		</div>
		<p class="notice">
			<span v-bind:class="{'selected':agree[0]}" @click="agreeDeal" class="agreeBtn"></span>
			<span>您已阅读并同意</span>
			<router-link to="">
				[buildingshop用户协议]
			</router-link>
		</p>
	</ul>
	<ul class="team-wrap" v-if="state=='team'" @keydown="keyRegisterDoneTeam($event)">
		<li>
			<input type="text"  placeholder="请输入团队名" v-model="teamRegInput.name" @blur="nameConfirm"/>
		</li>
		<li>
			<input type="text"  placeholder="请输入您的邮箱"v-model="teamRegInput.email" @blur="mailConfirm"/>
		</li>
		<li>
			<input type="password" placeholder="请输入密码(密码由6-14位字母（区分大小写）、数字或符号组成)" v-model="teamRegInput.passWord" @blur="pwdConfirm"/>
		</li>
		<li>
			<input type="password" placeholder="请确认密码" v-model="teamRegInput.passWordCfm" @blur="samePwd"/>
		</li>
		<alertTip v-if="teamRegInput.showAlert" :showHide="teamRegInput.showAlert" @closeTip="closeTip" :alertText="teamRegInput.alertText"></alertTip>
		<div class="regBtn" @click="goRegisterDoneTeam">
			注册
		</div>
		<p class="notice">
			<span v-bind:class="{'selected':agree[1]}" @click="agreeDeal" class="agreeBtn"></span>
			<span>您已阅读并同意</span>
			<router-link to="">
				[buildingshop用户协议]
			</router-link>
		</p>
	</ul>
	
</div>
</template>

<script>
	import router from "../../../router"
	import Vue from "vue";
	 import {mapState} from "vuex"
	import alertTip from '../alertTip'
	import MyAjax from "../../../assets/js/MyAjax.js"
    import {cookieTool} from "../../../assets/js/cookieTool.js"
	
	
	export default{
		name:"Regkind",
		data:function(){
			return {
				state:"",
				count:"",
				timer:null,
				show:true,
				agree:[false,false,false],/*同意协议与否*/
				picSrc:"",
				comRegInput:{
					name:"",
					email:"",
					passWord:"",
					passWordCfm:"",
					showAlert: false, //显示提示组件
					alertText: "", //提示的内容
				},
				teamRegInput:{
					name:"",
					email:"",
					passWord:"",
					passWordCfm:"",
					showAlert: false, //显示提示组件
					alertText: "", //提示的内容
				},
				personalRegInput:{
		           tel:"",
		           picConfirm:"",
		           messageConfirm:"",
		           showAlert: false, //显示提示组件
				   alertText: "", //提示的内容
		        },
		        makeRandom:{num:"",},
		        reveal:{
		          error:false,
		          buttonDisabled:false
		        },
		        
                
			}
		},
		components: {
            alertTip,
        },
        computed:{
        	
        	rightComEmail:function(){
        		return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/gi.test(this.comRegInput.email);
        		
        	},
        	rightTeamEmail:function(){
        		return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/gi.test(this.teamRegInput.email);
        		
        	},
        	
        },
		mounted(){
			
			this.changePic();//图形验证码
			var id = this.$route.params.id
			this.state = id;
//			console.log(this.state)
			do{
		        Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
		      }while (this.makeRandom.num<1000);
		},
		computed:mapState({
	      user:state=>state.userState.user,
				//newNotice:state=>state.userState.user.newNotice
	    }),
		methods:{
			settime(e) {
				var that = this;
				var url = MyAjax.urlsy + "/accountmanainfo/registorMobileCode/" + that.personalRegInput.tel;
		        MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==-1){
						switch (data.msg){
							case "100007":
								that.personalRegInput.showAlert = true;
								that.personalRegInput.alertText = "手机号已注册";
								break;
							
							default:
								break;
						}
					}else{
						if (!this.timer) {
			                this.count = 60;
			                this.show = false;
			                this.timer = setInterval(() => {
			                  if (this.count > 0 && this.count <= 60) {
			                    this.count--;
			                  } else {
			                    this.show = true;
			                    clearInterval(this.timer);
			                    this.timer = null;
			                  }
			                }, 1000)
		              	}
					}
				},function(err){
					console.log(err)
				})
			},
			changePic(){
				this.picSrc = MyAjax.urlsy+"/captcha.jpg?random="+Math.random()
//		    	this.picSrc = MyAjax.urlhw+"/captcha.jpg"
		    	$(".picConfirm").attr("src",this.picSrc)
		    	
		    },
		    keyRegisterDoneCom($event){//enter键登录事件
		      var event = $event || window.event;  
			 	if(event.keyCode==13){ 
			     this.goRegisterDoneCom()
		         event.returnValue = false;    
		         event.cancelBubble=true;
		         event.preventDefault();
		         //event.stopProgagation();
		         return false;
		      } 
		
			},
		    goRegisterDoneCom(){
		    	var that = this;
				var url = MyAjax.urlsy+"/companyInfo/register";
				if(that.comRegInput.name.trim().length!=0&&that.comRegInput.email.trim().length!=0&&that.comRegInput.passWord.trim().length!=0&&that.comRegInput.passWordCfm.trim().length!=0){
					var data = {name:that.comRegInput.name,email:that.comRegInput.email,pwd:that.comRegInput.passWord,confirmPwd:that.comRegInput.passWordCfm};
					MyAjax.ajax({
						type: "POST",
						url:url,
						data: JSON.stringify(data),
						dataType: "json",
						contentType:"application/json;charset=utf-8",
					}, function(data){
						console.log(data)
						console.log(data.token)
						cookieTool.setCookie("token",data.token,0.5)//12小时后失效
						if(data.code==0){
							//传递url用于发送邮件
							cookieTool.setCookie("accountID",data.accountID,1);//24小时内有效
							var url2 = MyAjax.urlsy + "/companyInfo/sendMail"
							var data2 = {
								url:"10.1.31.27:8080/yhzx/comfirmActivate/"+data.accountID,
								email:that.comRegInput.email
							}
							console.log(data2)
							MyAjax.ajax({
								type: "POST",
								url:url2,
								data: JSON.stringify(data2),
								dataType: "json",
								contentType:"application/json;charset=utf-8",
							}, function(data_url){
								console.log(data_url)
								if(data_url.msg == "success" && data.code == 0){
									router.push({name:"RegisterDone",query:{id:"com"}});
									cookieTool.setCookie("state","com",1);//注册成功后确认激活页的用户身份
									cookieTool.setCookie("email",that.comRegInput.email,1);//注册成功后确认激活页的用户身份
								}
							},function(err_url){
								console.log(err)
							})
							
							if(data.ifActivated == 0){
								sessionStorage.setItem("ifActivated",false);//24小时内有效  是否激活都没效了
							}else{
								sessionStorage.setItem("ifActivated",true);
							}
							
						}else if(data.code==-1){
							switch (data.msg){
								case "该公司名称已被注册":
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "该公司名称已被注册";
									break;
								case "该邮箱已被注册":
								console.log(222)
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "该邮箱已被注册";
									break;
								case "密码不一致":
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "密码不一致";
									break;
								case "对象不能为空":
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "对象不能为空";
									break;
								case "null":
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "系统报错";
									break;
								default:
									break;
							}
						}
					},function(err){
						console.log(err)
					})
				}
		    },
		    keyRegisterDoneTeam($event){//enter键登录事件
		      var event = $event || window.event;  
			 	if(event.keyCode==13){ 
			     this.goRegisterDoneTeam()
		         event.returnValue = false;    
		         event.cancelBubble=true;
		         event.preventDefault();
		         //event.stopProgagation();
		         return false;
		      } 
		
			},
		    goRegisterDoneTeam(){
	    	/*,url:"10.1.31.27:8080/yhzx/comfirmActivate/"*/
	    		console.log(555)
	    		var that = this;
				var url = MyAjax.urlsy+"/teamOrgaInfo/register";
				if(that.teamRegInput.name.trim().length!=0&&that.teamRegInput.email.trim().length!=0&&that.teamRegInput.passWord.trim().length!=0&&that.teamRegInput.passWordCfm.trim().length!=0){
					var data = {name:that.teamRegInput.name,email:that.teamRegInput.email,pwd:that.teamRegInput.passWord,confirmPwd:that.teamRegInput.passWordCfm};
					MyAjax.ajax({
						type: "POST",
						url:url,
						data: JSON.stringify(data),
						dataType: "json",
						contentType:"application/json;charset=utf-8",
					}, function(data){
						console.log(data)
						console.log(data.token)
						cookieTool.setCookie("token",data.token,0.5)//12小时后失效
						if(data.code==0){
							//传递url用于发送邮件
							cookieTool.setCookie("accountID",data.accountID);
							var url2 = MyAjax.urlsy + "/teamOrgaInfo/sendMail"
							var data2 = {
								url:"10.1.31.27:8080/yhzx/comfirmActivate/"+data.accountID,
								email:that.teamRegInput.email
							}
							console.log(data2)
							MyAjax.ajax({
								type: "POST",
								url:url2,
								data: JSON.stringify(data2),
								dataType: "json",
								contentType:"application/json;charset=utf-8",
							}, function(data_url){
								console.log(data_url)
								if(data_url.msg == "success" && data.code == 0){
									router.push({name:"RegisterDone",query:{id:"team"}});
									cookieTool.setCookie("state","team");
									cookieTool.setCookie("email",that.teamRegInput.email);
								}
							},function(err_url){
								console.log(err)
							})
							
							if(data.ifActivated == 0){
								sessionStorage.setItem("ifActivated",false);
							}else{
								sessionStorage.setItem("ifActivated",true);
							}
							
						}else if(data.code==-1){
							switch (data.msg){
								case "该团队名称已被注册":
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "该团队名称已被注册";
									break;
								case "该邮箱已被注册":
								console.log(222)
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "该邮箱已被注册";
									break;
								case "密码不一致":
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "密码不一致";
									break;
								case "对象不能为空":
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "对象不能为空";
									break;
								case "null":
									that.teamRegInput.showAlert = true;
									that.teamRegInput.alertText = "系统报错";
									break;
								default:
									break;
							}
						}
					},function(err){
						console.log(err)
					})
				}
		    },
		    keyRegisterDonePer($event){//enter键登录事件
		    	
		      var event = $event || window.event;  
		      console.log(666)
			 	if(event.keyCode==13){ 
			     this.goRegisterDonePer()
		         event.returnValue = false;    
		         event.cancelBubble=true;
		         event.preventDefault();
		         //event.stopProgagation();
		         return false;
		      } 
		
			},
			goRegisterDonePer(){
				var that = this;
				var url = MyAjax.urlsy+"/accountmanainfo/register";
				if(that.personalRegInput.tel.trim().length!=0&&that.personalRegInput.picConfirm.trim().length!=0&&that.personalRegInput.messageConfirm.trim().length!=0){
					MyAjax.ajax({
						type: "POST",
						url:url,
						data: {tel:that.personalRegInput.tel,pwd:that.personalRegInput.messageConfirm,verifyCode:that.personalRegInput.picConfirm},
						dataType: "json",
					}, function(data){
						console.log(data)
						console.log(data.token)
						cookieTool.setCookie("token",data.token,0.5)//12小时后失效
						if(data.code==0){
							router.push("/indexcontent");
							cookieTool.setCookie("state","per");
						}else if(data.code==-1){
							switch (data.msg){
								case "100002":
									console.log(222)
									that.personalRegInput.showAlert = true;
									that.personalRegInput.alertText = "注册失败";
									break;
								case "100005":
									that.personalRegInput.showAlert = true;
									that.personalRegInput.alertText = "图片验证码不一致";
									that.personalRegInput.picConfirm = "";
		    						$(".pic").focus();
		    						that.changePic();
									break;
								case "100006":
									that.personalRegInput.showAlert = true;
									that.personalRegInput.alertText = "短信验证码错误";
									break;
								case "100007":
									that.personalRegInput.showAlert = true;
									that.personalRegInput.alertText = "手机号已经注册";
									break;
								case "null":
									that.personalRegInput.showAlert = true;
									that.personalRegInput.alertText = "系统报错";
									break;
								default:
									break;
							}
						}
					},function(err){
						console.log(err)
					})
				}
			},
			
			agreeDeal(){
				for(var i=0;i<this.agree.length;i++){
					if(this.agree[i]!= true){
						Vue.set(this.agree,i,true)
					}else{
						console.log(11)
						Vue.set(this.agree,i,false)
					}
				}
				
			},
			random(){
			    do{
			      Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
			    }while (this.makeRandom.num<1000);
			
			    if(this.personalRegInput.picConfirm!=this.makeRandom.num&&this.personalRegInput.picConfirm){
			      Vue.set(this.reveal,"error",true)
			    }else {
			      Vue.set(this.reveal,"error",false)
			    }
			},
			picConfirm(){
		        if(this.personalRegInput.picConfirm.trim().length==0){
		            this.personalRegInput.showAlert = true;
		    		this.personalRegInput.alertText = '请输入图形验证码';
		    	}else{
		    		this.personalRegInput.showAlert = false;
		        };
		        
		       
		    },
		    nameConfirm(){/*验证输入的名字是否为空*/
		    	if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/gi.test(this.comRegInput.name.trim())){
		    		
		    		this.comRegInput.showAlert = true;
		    		this.comRegInput.alertText = '您输入的公司名称不能为空';
		    	}else{
		    		this.comRegInput.showAlert = false;
		    	};/*验证公司*/
		    	
		    	if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/gi.test(this.teamRegInput.name.trim())){
		    		this.teamRegInput.showAlert = true;
		    		this.teamRegInput.alertText = '您输入的团队名称不能为空';
		    	}else{
		    		this.teamRegInput.showAlert = false;
		    	};
		    	
		    },
		    mailConfirm(){/*验证邮箱*/
		    	if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/gi.test(this.comRegInput.email)){
		    		this.comRegInput.showAlert = true;
		    		this.comRegInput.alertText = '您输入的邮箱格式不正确';
		    	}else{
		    		this.comRegInput.showAlert = false;
		    	};/*验证公司邮箱*/
		    	if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/gi.test(this.teamRegInput.email)){
		    		this.teamRegInput.showAlert = true;
		    		this.teamRegInput.alertText = '您输入的邮箱格式不正确';
		    	}else{
		    		this.teamRegInput.showAlert = false;
		    	};/*验证团队邮箱*/
		    },
		    pwdConfirm(){/*验证密码*/
		    	if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,14}$/gi.test(this.comRegInput.passWord)&&this.comRegInput.passWord.trim().length!=0){
		    		this.comRegInput.showAlert = true;
		    		this.comRegInput.alertText = '您输入的密码格式不正确';
		    	}else{
		    		this.comRegInput.showAlert = false;
		    	};/*验证公司密码*/
		    	
		    	if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,14}$/gi.test(this.teamRegInput.passWord)&&this.teamRegInput.passWord.trim().length!=0){
		    		this.teamRegInput.showAlert = true;
		    		this.teamRegInput.alertText = '您输入的密码格式不正确';
		    	}else{
		    		this.teamRegInput.showAlert = false;
		    	};/*验证团队密码*/
		    },
		    samePwd(){
		    	if(this.comRegInput.passWord != this.comRegInput.passWordCfm){
		    		this.comRegInput.showAlert = true;
		    		this.comRegInput.alertText = '您两次输入的密码不一致';
		    	}else{
		    		this.comRegInput.showAlert = false;
		    		
		    	};
		    	if(this.teamRegInput.passWord != this.teamRegInput.passWordCfm){
		    		this.teamRegInput.showAlert = true;
		    		this.teamRegInput.alertText = '您两次输入的密码不一致';
		    	}else{
		    		this.teamRegInput.showAlert = false;
		    		
		    	}
		    },
		    personTelCfm(){/*验证个人登录的手机号*/
		    	if(!/^1[34578]\d{9}$/gi.test(this.personalRegInput.tel)&&this.personalRegInput.tel.trim().length!=0){
		    		this.personalRegInput.showAlert = true;
		    		this.personalRegInput.alertText = '请输入正确的手机号码';
		    	}else{
		    		this.personalRegInput.showAlert = false;
		    	}
		    },
		    personalMsgCfm(){
		    	console.log(99)
		    	if(this.personalRegInput.messageConfirm.trim().length==0){
		    		this.personalRegInput.showAlert = true;
		    		this.personalRegInput.alertText = '请输入短信验证码';
		    	}else{
		    		this.personalRegInput.showAlert = false;
		    	}
		    },
		    closeTip(){  /*关闭提示框*/
            this.comRegInput.showAlert = false;
            this.teamRegInput.showAlert = false;
            this.personalRegInput.showAlert = false;
        }
		},
		updated(){
			var id = this.$route.params.id
//			console.log(id)
			this.state = id;
//			console.log(this.state)
		},
		beforeDestroy(){
			$(document.body).css("overflow","scoll");
//			console.log(1111)
			
		},
		watch:{
			$route:function(){
				var id= window.location.href.split("/register/regkind/")[1];
				this.state = id;
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.regkind{
		ul{
			position: relative;
		}
		.com-wrap{
			li{
				border-bottom: 1px solid #EAEAEA;
				padding-left:48px;
				height: 35px;
				input{
					width: 300px;
					height: 30px;
					line-height: 30px;
					text-align: left;
				}
				&:nth-child(1){
					margin-top: 15px;
					background: url(../../../assets/img/register/icon_company.png) no-repeat left center;
				}
				&:nth-child(2){
					background: url(../../../assets/img/register/mail.png) no-repeat left center;
				}
				&:nth-child(3){
					background: url(../../../assets/img/register/icon_code.png) no-repeat left center;
				}
				&:nth-child(4){
					background: url(../../../assets/img/register/icon_confirmcode.png) no-repeat left center;
				}
			}
			.regBtn{
				background: url(../../../assets/img/register/blue_zhuce.png) no-repeat;;
			}
			.notice{
				.agreeBtn{
					cursor: pointer;
					&.selected{
						background: url(../../../assets/img/register/icon_blue_ok.png) no-repeat left center
					}
				}
				
				a{
					color:#2EB3CF ;
				}
				
			}
		}
		.team-wrap{
			li{
				border-bottom: 1px solid #EAEAEA;
				padding-left:48px;
				height: 35px;
				input{
					width: 300px;
					height: 30px;
					line-height: 30px;
					text-align: left;
				}
				&:nth-child(1){
					margin-top: 15px;
					background: url(../../../assets/img/register/icon_company.png) no-repeat left center;
				}
				&:nth-child(2){
					background: url(../../../assets/img/register/mail.png) no-repeat left center;
				}
				&:nth-child(3){
					background: url(../../../assets/img/register/icon_code.png) no-repeat left center;
				}
				&:nth-child(4){
					background: url(../../../assets/img/register/icon_confirmcode.png) no-repeat left center;
				}
			}
			.regBtn{
				background: url(../../../assets/img/register/green_zhuce.png) no-repeat;
			}
			.notice{
				.agreeBtn{
					cursor: pointer;
					&.selected{
						background: url(../../../assets/img/register/icon_green_ok.png) no-repeat left center
					}
				}
				
				a{
					color:#02a672 ;
				}
				
			}
		}
		.person-wrap{
			li{
				border-bottom: 1px solid #EAEAEA;
				padding-left:48px;
				height: 48px;
				input{
					width: 300px;
					height: 45px;
					line-height:45px;
					text-align: left;
				}
				&:nth-child(1){
					margin-top: 15px;
					background: url(../../../assets/img/register/icon_company.png) no-repeat left center;
				}
				
				&:nth-child(2){
					position: relative;
					background: url(../../../assets/img/register/confirm.png) no-repeat left center;
					.picConfirm{
						width: 70px;
						height: 27px;
						background: #E6E6E6;
						position: absolute;
						right: 20px;
						top: 10px;
						
					}
					position: relative;
					  
					  p{
					    position: absolute;
					    top: 15px;
					    right:120px;
					    width: 71px;
					    height:27px; line-height: 27px;
					    text-align: center;
					    background: #cccccc;
					    cursor: pointer;
					  }
					  span{
					    font-size: 14px;
					    line-height: 18px;
					    color: rgb(242,117,25);
					    display: block;
					    width:100px;
					    text-align: left;
					    position: absolute;
					    top: 17px;
					    right: 8px;
					  }
				}
				&:nth-child(3){
					position:relative;
					background: url(../../../assets/img/register/icon_confirmcode.png) no-repeat left center;
					div{
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						
					}
					.msgConfirm{
						position: absolute;
						right: 0; top: 12px;
						color: rgb(242,117,25);
						cursor: pointer;
						display: inline-block;
						border: none;
						width: 80px;
						height: 20px;
						background: none;
						
					}
					.count{
						color:rgb(242,117,25);
					}
				}
				
			}
			.alet_container{
				bottom: 120px;
				left: 50px;
			}
			.regBtn{
				display: block;
				background: url(../../../assets/img/register/orange_zhuce.png) no-repeat;;
				margin-top: 80px;
			}
			.notice{
				.agreeBtn{
					cursor: pointer;
					&.selected{
						background: url(../../../assets/img/register/icon_orange_ok.png) no-repeat left center
					}
				}
				
				a{
					color:rgb(242,117,25);
				}
				
			}
		}
		.regBtn{
			width: 314px;
			height: 50px;
			line-height: 50px;
			color: #FFFFFF;
			font-size: 20px;
			margin: 60px auto 0;
			border-radius: 5px;
			cursor: pointer;
		}
		.notice{
			width: 314px;
			height: 17px;
			line-height: 17px;
			margin: 20px auto 0;
			margin-left: 50px;
			text-align: left;
			span,a{
				float: left;
			}
			
			.agreeBtn{
				float: left;
				width: 17px;
				height: 17px;
				margin-right: 14px;
				background: url(../../../assets/img/register/agree_no.png) no-repeat left center;
				cursor: pointer;
			}
		}
		
	}
</style>