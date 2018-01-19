<template>
  <div class="companyLogin">
    <ul class="loginInput">
      <li>
        <input v-model="reveal.email" type="text" placeholder="请输入您的邮箱">
      </li>
      <li>
        <input v-model="reveal.pwd" type="text" placeholder="请输入您的密码">
      </li>
    </ul>
		<alertTip v-if="showAlert" :showHide="showAlert" :alertText="alertText"></alertTip>
    
    <ul class="loginSubmit">
      <li>
        <button @click="teamLogin" @keydown="keyLogin($event)"><router-link to="">登录</router-link></button>
      </li>
      <li>
        <p>忘记密码？</p>
        <!-- <p><router-link to="/register">立即注册>></router-link></p> -->
      </li>
    </ul>
  </div>
</template>
<script>
	import Vue from "vue";
  import {mapState} from "vuex"
  import router from "../../../router"
  import alertTip from '../alertTip'
	import MyAjax from "../../../assets/js/MyAjax.js"
  import {cookieTool} from "../../../assets/js/cookieTool.js"
	
  export default {
    name:"companyLogin",
    data(){
      return{
        reveal:{
          email:"",//用户名
          pwd:""//密码
        },
        showAlert: false, //显示提示组件
				alertText: "", //提示的内容
      }
    },
    computed:mapState({
      user:state=>state.userState.user
    }),
    components: {
      alertTip,
    },
    mounted(){
      
      
    },
    methods:{
      teamLogin(){
//    	var that = this;
//				var url = MyAjax.urlsy+"/teamOrgaInfo/login";
//				if(that.reveal.email.trim().length!=0&&that.reveal.pwd.trim().length!=0){
//					var data = that.reveal;
//					MyAjax.ajax({
//						type: "POST",
//						url:url,
//						data: JSON.stringify(data),
//						dataType: "json",
//						contentType:"application/json;charset=utf-8",
//					}, function(data){
//						console.log(data)
//						console.log(data.token)
//						cookieTool.setCookie("token",data.token)
//						if(data.code==0){
//							router.push("/indexcontent");
//							sessionStorage.setItem("state","team");
//						}else if(data.code==-1){
//							switch (data.msg){
//								case "登录错误":
//									that.showAlert = true;
//									that.alertText = "登录错误";
//									break;
//								default:
//									break;
//							}
//						}
//					},function(err){
//						console.log(err)
//					})
//				}
				router.push("/indexcontent");
				sessionStorage.setItem("state","team");
      },
      keyLogin($event){//enter键登录事件
	      var event = $event || window.event;  
			 	if(event.keyCode==13){ 
			     this.teamLogin()
	         event.returnValue = false;    
	         event.cancelBubble=true;
	         event.preventDefault();
	         //event.stopProgagation();
	         return false;
	      } 

		 },
    },
    destroyed(){
			sessionStorage.setItem("state","team")
    }
  }
</script>
<style scoped lang="scss">
  $teamThemeColor:#02a672;
  .loginInput{
    li{
      padding:11px 0;
      height:48px;
      border-bottom:1px solid #eaeaea;
      padding-left: 41px;
      background: url("../../../assets/img/logoin/icon_code.png") left center no-repeat;
      &:first-child{
      	background: url(../../../assets/img/logoin/mail.png) left center no-repeat;
      }
      input{
        font-size:14px;
        width:396px;
        line-height: 25px;
        height: 25px;
      }
    }
  }
  .alet_container{
  	bottom: 230px !important;
  	.tip_text{
  		font-size: 14px !important;
  	}
  }
  .loginSubmit{
    margin-top:40px;
    li{
      width: 314px;
      margin:20px auto;
      button{
        width: 314px;
        height:50px;
        background: url("../../../assets/img/logoin/icon_green_sendagain.png") left center no-repeat;
        border:0px;
        color: #ffffff;
        border-radius: 5px;
        cursor: pointer;
        a{
          display: block;
          width: 314px;
          height:50px;
          line-height: 50px;
          border-radius: 5px;
          color: #ffffff;
        }
      }
      p{
        color: $teamThemeColor;
        cursor: pointer;
      }
      p:nth-child(1){
        float: left;
      }
      // p:nth-child(2){
      //   float: right;
      //   a{
      //     color: $teamThemeColor;
      //   }
      // }
    }
  }
</style>



































