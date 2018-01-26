<template>
	<div id="modal-overlay" class="registerDone" >
		<div class="content-wrap" v-bind:class='[{"com-wrap":state=="com"},{"team-wrap":state=="team"},{"person-wrap":state=="per"}]'>
			<p class="congraduation">请输入你要找回密码的登录邮箱</p>
			<p class="mail-wrap" v-if="!sendAgainflag">
				<label>验证邮箱为</label><input type="text" placeholder="请在此输入邮箱" v-model="email" />
			</p>
			<p v-if="sendAgainflag">请登录邮箱，点击链接更改密码。</p>
			<!--<p v-if="sendAgainflag">已重新发送邮件，请登录邮箱，点击链接激活账号，链接在24小时内有效。</p>-->
			<div class="btnBox" v-if="!sendAgainflag">
				<!--<span><router-link to="/indexcontent">暂不激活</router-link></span>-->
				<span @click="sendEmail">发送至验证邮箱</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Modal from "../../../assets/js/modal.js"
	import Vue from "vue";
  	import {mapState} from "vuex"
  	import MyAjax from "../../../assets/js/MyAjax.js"
	export default{
		name:"registerDone",
		data:function(){
			return{
				state:"",
				sendAgainflag:false,
				email:""
			}
		},
		mounted(){
			var modal = $('.registerDone');
			Modal.makeText(modal);
			var id = this.$route.params.id
			this.state = id;
//			Vue.set(this,"email",sessionStorage.getItem("email"))
			
		},
		methods:{
			sendEmail(){
				var that = this ;
				var url2 = MyAjax.urlsy + "/teamOrgaInfo/sendResetPwdMail"
				var data2 = {
					url:"10.1.31.27:8080/yhzx/resetPwd",
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
						this.sendAgainflag = true;
					}
				},function(err){
					console.log(err)
				})
					
			}
		},
		beforeDestroy(){
			$(document.body).css("overflow","scoll");
			var modal = $('.registerDone');
			Modal.closeModal(modal);
			
		}
	}
</script>

<style lang="scss" scoped="">
	.registerDone{
		box-sizing: border-box;
		background-image: url(../../../assets/img/register/bg_login_register.png) !important;
		background-size: 100% 100% !important;
		.content-wrap{
			width: 715px;
			height: 487px;
			background: #FFFFFF;
			border-radius: 10px;
			position:absolute;top:50%;left:50%; 
			transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
			-moz-transform:translate(-50%,-50%);
			-ms-transform:translate(-50%,-50%);
			-o-transform:translate(-50%,-50%);
			padding-top: 45px;
			padding-left: 96px;
			padding-right:96px;
			p{
				text-align: left;
				font-size: 20px;
				color: #8a8a8a;
			}
			.btnBox{
				width: 400px;
				height: 50px;
				overflow: hidden;
				margin-top: 90px;
				margin-left: 55px;
				font-size: 18px;
				color: #535353;
				span{
					width: 180px;
					height: 50px;
					line-height: 50px;
					border-radius: 5px;
					cursor: pointer;
					color: #FFFFFF;
					display: block;
					margin: 0 auto; 
					&:hover{
						filter: Alpha(opacity=90); -moz-opacity:0.9; opacity:0.9;
					}
				}
			}
		}
		.com-wrap{
			.congraduation{
				height: 20px;
				line-height: 20px;
				text-align: left;
				padding-left: 36px;
				color: #2EB3CF;
				background: url(../../../assets/img/register/Smile.png) no-repeat left center;
				background-size:auto 100%;
			}
			.mail-wrap{
				margin-top: 80px;
				color: #2EB3CF;
				height: 50px; line-height: 50px;
				text-align: left;
				a{
					color: #2EB3CF !important;
				}
				label{float: left; margin-right: 30px;}
				input{
					width: 300px;
					height: 50px;
					border: 1px solid #E0E0E0;
					border-radius: 5px;
					text-indent: 10px;
					color: #353535;
				}
			}
			.btnBox{
				span{
					
					background: url(../../../assets/img/register/rectangle04.png) no-repeat ;
					background-size: 100% 100%;
				}
			}
		}
		.team-wrap{
			.congraduation{
				height: 20px;
				line-height: 20px;
				text-align: left;
				padding-left: 36px;
				background: url(../../../assets/img/register/icon_green_congratulation.png) no-repeat left center;
				background-size:auto 100%;
				color: #02a672;
			}
			.mail-wrap{
				color: #02a672;
				margin-top: 80px;
				height: 50px; line-height: 50px;
				text-align: left;
				a{
					color: #02a672 !important;
				}
				label{float: left; margin-right: 30px;}
				input{
					width: 300px;
					height: 50px;
					border: 1px solid #E0E0E0;
					border-radius: 5px;
					text-indent: 10px;
					color: #353535;
				}
			}
			.btnBox{
				span{
					background: url(../../../assets/img/register/icon_green_sendagain.png) no-repeat ;
					background-size: 100% 100%;
				}
			}
		}
		.person-wrap{
			.congraduation{
				height: 20px;
				line-height: 20px;
				text-align: left;
				padding-left: 36px;
				background: url(../../../assets/img/register/icon_green_congratulation.png) no-repeat left center;
				background-size:auto 100%;
				color: rgb(242,117,25);
			}
			.mail-wrap{
				color: rgb(242,117,25);
				margin-top: 80px;
				a{
					color: rgb(242,117,25) !important;
				}
			}
			.btnBox{
				span{
					&:first-child{
						&:hover{
							border-color: rgb(242,117,25);
							
							a{
								color: rgb(242,117,25);
							}
						}
					}
					&:last-child{
						background: url(../../../assets/img/register/btn_submit.png) no-repeat ;
						background-size: 100% 100%;
					}
				}
			}
		}
	}
</style>