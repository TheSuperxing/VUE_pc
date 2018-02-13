<template>
	<div class="comfirmActivate">
		<div  v-if="!success" class="content-wrap" v-bind:class='[{"com-wrap":state=="com"},{"team-wrap":state=="team"},{"person-wrap":state=="per"}]'>
			<h1 v-bind:class='{"expared":haveExpare}'>{{msg}}</h1>
			<p v-if="sendAgainflag">已重新发送邮件，请登录邮箱，点击链接激活账号，链接在24小时内有效。</p>
			<div class="btnBox">
				<span @click="sendComfirm" v-if="!haveExpare">确认激活</span>
				<span @click="sendAgain" v-if="haveExpare">重新发送</span>
			</div>
		</div>
		<div v-if="success"  class="content-wrap" v-bind:class='[{"com-wrap":state=="com"},{"team-wrap":state=="team"},{"person-wrap":state=="per"}]'>
			<h1 class="success">激活成功！正在跳转去登录。。。</h1>
			
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import {mapState} from "vuex"
	import MyAjax from "../../../assets/js/MyAjax.js"
	import router from "../../../router"
    import {cookieTool} from "../../../assets/js/cookieTool.js"
	
	
	export default{
		name:"activate",
		data:function(){
			return{
				state:"",
				sendAgainflag:false,
				email:"",
				msg:"请点击下方按钮完成激活",
				haveExpare:false,//有没有过期
				success:false
			}
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
	          ifFreeLogin:true,//是否能够进行免登录获取数据,true能够无登陆获取			
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
				switch (that.state){
					case "com":
						var url = MyAjax.urlsy+"/companyInfo/activationEmail/" + that.$route.params.id;
						break;
					case "team":
						var url = MyAjax.urlsy+"/teamOrgaInfo/activationEmail/" + that.$route.params.id;
						break;
					default:
						break;
				}
		        MyAjax.ajax({
		          type: "GET",
		          url:url,
		          dataType: "json",
		          async:false,
		        },function(data){
		        	console.log(data)
		        	if(data.code == 0 && data.msg == "success"){
		        		Vue.set(that,"success",true)
		        		setTimeout(()=>{
						    router.push("/login")
						},1000)
		        		
		        	}else if(data.code == -1 && data.msg == "超过24小时已过期"){
		        		console.log(333)
		        		that.msg = "激活连接超过24小时已经过期，请重新发送。";
		        		that.haveExpare = true;
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
				switch (that.state){
					case "com":
						var url2 = MyAjax.urlsy + "/companyInfo/sendMail"
						break;
					case "team":
						var url2 = MyAjax.urlsy + "/teamOrgaInfo/sendMail"
						break;
					default:
						break;
				}
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
			h1, .success{
				height: 50px;
				line-height: 50px;
				margin-top: 80px;
				font-size: 24px;
				text-align: center;
			}
			p{
				text-align: left;
				font-size: 20px;
				color: #8a8a8a;
			}
			.expared{
				color:red;
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
			h1,.success{
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
			h1,.success{
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
			h1,.success{
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