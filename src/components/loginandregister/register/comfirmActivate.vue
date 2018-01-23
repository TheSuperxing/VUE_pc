<template>
	<div class="comfirmActivate">
		<div class="content-wrap" v-bind:class='[{"com-wrap":state=="com"},{"team-wrap":state=="team"},{"person-wrap":state=="per"}]'>
			<h1>请点击下方按钮完成激活</h1>
			<div class="btnBox">
				<span @click="sendComfirm">确认激活</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Vue from "vue";
	import {mapState} from "vuex"
	import MyAjax from "../../../assets/js/MyAjax.js"
	import router from "../../../router"
	
	export default{
		name:"activate",
		data:function(){
			return{
				state:"",
				sendAgainflag:false,
				email:""
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
				var url = MyAjax.urlsy+"/teamOrgaInfo/activationEmail/" + this.$route.params.id;
		        MyAjax.ajax({
		          type: "GET",
		          url:url,
		          dataType: "json",
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
				margin-top: 80px;
				font-size: 24px;
				text-align: center;
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