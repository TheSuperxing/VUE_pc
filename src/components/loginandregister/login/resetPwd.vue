<template>
	<div class="comfirmActivate">
		<div class="content-wrap" v-bind:class='[{"com-wrap":state=="com"},{"team-wrap":state=="team"},{"person-wrap":state=="per"}]'>
			<h1 v-bind:class='{"expared":haveExpare}'>{{msg}}</h1>
			<p>
				<label>设置新密码</label>
				<input type="text" placeholder="请输入新密码" v-model="newPwd" @blur="comNewPwd"/>
					
			</p>
			<p><span>(密码由6-14位字母（区分大小写）、数字或符号组成)</span></p>
			<p>
				<label>确认新密码</label>
				<input type="text" placeholder="请输入新密码" v-model="confirmNewPwd" @blur="sameConfirm"/>
			</p>
			<alertTip v-if="showAlert" :showHide="showAlert"  :alertText="alertText"></alertTip>
			<div class="btnBox">
				<span @click="sendComfirm" v-if="!haveExpare">确认</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Vue from "vue";
	import {mapState} from "vuex"
	import MyAjax from "../../../assets/js/MyAjax.js"
	import router from "../../../router"
	import alertTip from '../alertTip'
	export default{
		name:"activate",
		data:function(){
			return{
				state:"",
				sendAgainflag:false,
				email:"",
				msg:"请重新设置登录密码",
				haveExpare:false,//有没有过期
				newPwd:"",
				confirmNewPwd:"",
				showAlert:false,//显隐
   		 	    alertText:"",//提示信息		
				
			}
		},
		components:{
	    	alertTip,
	    },
		computed:mapState({
	      user:state=>state.userState.user
	    }),
		mounted(){
			var that=this;
			console.log(that.$route.params)
	        var url = MyAjax.urlsy+"/teamOrgaInfo/getInfo/" + that.$route.params.id;
	        MyAjax.ajax({
	          type: "GET",
	          url:url,
	          dataType: "json",
	          async:false,
	        },function(data){
	        	console.log(data)
	        	if(data.code==0){
	        		switch (data.msg.accountType){
	        			case "1002":
	        				Vue.set(that,"state","com")
	        				break;
	        			case "1003":
	        				Vue.set(that,"state","team")
	        				break;
	        			default:
	        				break;
	        		}
	        		
	        	}
	        },function(err){
	          if(err.status!=200){
	            //router.push("/index")
	            status=err.status;
	          }
	        })
//			this.state = sessionStorage.getItem("state");
//			console.log(this.state)
//			Vue.set(this.user,'userState',this.state)
//			this.user = id;
//			sessionStorage.setItem("state",this.user.userState);
//			Vue.set(this,"email",sessionStorage.getItem("email"))
		},
		methods:{
			sendComfirm(){
				var that = this;
				var url = MyAjax.urlsy+"/teamOrgaInfo/resetPwd";
				var data = {
					newPwd : that.newPwd,
					accountId : that.$route.params.id
				}
		        MyAjax.ajax({
		          type: "post",
		          url:url,
		          dataType: "json",
		          data:data,
		          async:false,
		        },function(data){
		        	console.log(data)
		        	if(data.code == 0 && data.msg == "success"){
		        		router.push("/login")
		        	}
		        },function(err){
		          if(err.status!=200){
		            //router.push("/index")
		            status=err.status;
		          }
		        })
			},
			sendAgain(){
				var that = this ;
				var url2 = MyAjax.urlsy + "/teamOrgaInfo/sendMail"
				var data2 = {
					url:"10.1.31.27:8080/yhzx/comfirmActivate/"+ that.$route.params.id,
					email:that.email
				}
				console.log(data2)
				MyAjax.ajax({
					type: "POST",
					url:url2,
					data: data2,
					dataType: "json",
//								contentType:"application/json;charset=utf-8",
				}, function(data){
					console.log(data)
					if(data.msg == "success"&&data.code == 0){
						that.sendAgainflag = true;
					}
				},function(err){
					console.log(err)
				})
			},
			comNewPwd(){
				if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,14}$/gi.test(that.newPwd)&&that.newPwd.trim().length!=0){
		    		this.showAlert = true;
		    		this.alertText = '您输入的密码格式不正确';
		    	}else{
		    		this.showAlert = false;
		    	};/*验证公司密码*/
			},
			sameConfirm(){
				if(this.newPwd != this.confirmNewPwd){
		    		this.showAlert = true;
		    		this.alertText = '您两次输入的密码不一致';
		    	}else{
		    		this.showAlert = false;
		    		
		    	};
			}
		},
		beforeDestroy(){
			$(document.body).css("overflow","scoll");
//			console.log(2222)
			var modal = $('.registerDone');
//			Modal.closeModal(modal);
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
.comfirmActivate{
	box-sizing: border-box;
		/*background-image: url(../../../assets/img/register/bg_login_register.png) !important;*/
		background-size: 100% 100% !important;
		
		.content-wrap{
			margin: 0 auto;
			width: 715px;
			height: 487px;
			background: #FFFFFF;
			border-radius: 10px;
			/*position:absolute;top:50%;left:50%; 
			transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
			-moz-transform:translate(-50%,-50%);
			-ms-transform:translate(-50%,-50%);
			-o-transform:translate(-50%,-50%);*/
			padding-top: 45px;
			padding-left: 96px;
			padding-right:96px;
			h1{
				height: 50px;
				line-height: 50px;
				margin-top: 50px;
				font-size: 20px;
				text-align: center;
			}
			p{
				text-align: left;
				font-size: 20px;
				color: #8a8a8a;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				&:nth-child(3){
					height: 20px;
					line-height: 30px;
					text-align: right;
					margin: 0;
					padding-right:30px ;
					span{
						width: 350px;
						text-align: center;
						display: inline-block;
						height: 20px; line-height: 20px;
						font-size: 12px;
					}
				}
				line-height: 50px;
				height: 50px;
				margin-top: 20px;
				label{
					float: left;
					color: #535353;
					margin-right: 20px;
				}
				input{
					width: 350px;
					height: 50px;
					line-height: 50px;
					border: 1px solid #E0E0E0;
					border-radius: 5px;
					text-indent: 10px;
					color: #353535;
				}
				
			}
			.expared{
				color:red;
			}
			.btnBox{
				width: 400px;
				height: 50px;
				overflow: hidden;
				margin-top: 50px;
				margin-left: 55px;
				font-size: 18px;
				color: #535353;
				span{
					width: 180px;
					height: 50px;
					line-height: 50px;
					/*float: left;*/
					border-radius: 5px;
					cursor: pointer;
					text-align: center;
					color: #FFFFFF;
					display: block;
					margin:0 auto;
					&:hover{
						filter: Alpha(opacity=90); -moz-opacity:0.9; opacity:0.9;
					}
					
				}
			}
		}
		.com-wrap{
			h1{
				color: #2EB3CF;
			}
			.btnBox{
				span{
					background: url(../../../assets/img/register/rectangle04.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.team-wrap{
			h1{
				color: #02a672;
			}
			.btnBox{
				span{
					background: url(../../../assets/img/register/icon_green_sendagain.png) no-repeat ;
					background-size: 100% 100%;
				}
			}
		}
		.person-wrap{
			h1{
				color: rgb(242,117,25);
			}
			.btnBox{
				span{
					background: url(../../../assets/img/register/btn_submit.png) no-repeat ;
					background-size: 100% 100%;
				}
			}
		}
}
</style>