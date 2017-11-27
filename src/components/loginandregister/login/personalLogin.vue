<template>
  <div class="personalLogin">
    <ul class="loginInput">
      <li>
        <input v-model="personalLoginInput.tel" type="tel" placeholder="手机号" @blur="personTelCfm">
      </li>
      <li>
        <input v-model="personalLoginInput.picConfirm" @blur="picConfirm" type="text" placeholder="图形验证码">
        <img class="picConfirm" :src="picSrc" alt="" @click="changePic"/>
        <!--<p v-cloak @click="random">{{makeRandom.num}}</p>-->
        <span v-if="reveal.error">图片验证码错误</span>
      </li>
      <li>
        <input v-model="personalLoginInput.messageConfirm" type="text" placeholder="短信验证码" maxlength="8"/>
        <button :disabled="reveal.buttonDisabled" @click="getMessageConfirm" v-cloak>{{messageConfirm.confirmText}}</button>
      </li>
    </ul>
		<alertTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alertTip>
    
    <ul class="loginSubmit">
      <li>
        <button @click="personalLogin"><router-link to="">登录</router-link></button>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import MyAjax from "../../../assets/js/MyAjax.js"
  import router from "../../../router"
  import {cookieTool} from "../../../assets/js/cookieTool.js"
	import alertTip from '../alertTip'
  
  export default {
    name:"companyLogin",
    data(){
      return{
        makeRandom:{num:"",},
        messageConfirm:{
          confirmText:"获取验证码",
          inputPlaceholder:"短信验证码"
        },
        reveal:{	
          error:false,//图片验证码
          buttonDisabled:false
        },
        personalLoginInput:{
          tel:"",
          picConfirm:"",
          messageConfirm:""
        },
        picSrc:"",
        showAlert:false,//显隐
        alertText:"",//提示信息
      }
    },
		components: {
      alertTip,
    },
    computed:mapState({
      user:state=>state.userState.user
    }),
    mounted(){
    	
    	this.changePic();
    	console.log(cookieTool.getCookie("token"));
      do{
        Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
      }while (this.makeRandom.num<1000);

      sessionStorage.setItem("account","15612345678")
      
      Vue.set(this.user,'userState',2)
      sessionStorage.setItem("state",this.user.userState)
      
      var that = this;
    	var url = "http://10.1.31.7:8080/hello"
    	MyAjax.ajax({
				type: "GET",
				url:url,
				dataType: "json",
//					token:document.cookie,
			}, function(data){
				console.log(data)
				
			},function(err){
				console.log(err)
			})
    },
    methods:{
      random(){
        do{
          Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
        }while (this.makeRandom.num<1000);

        if(this.personalLoginInput.picConfirm!=this.makeRandom.num&&this.personalLoginInput.picConfirm){
          Vue.set(this.reveal,"error",true)
        }else {
          Vue.set(this.reveal,"error",false)
        }
      },
      personTelCfm(){/*验证个人登录的手机号*/
	    	if(!/^1[34578]\d{9}$/gi.test(this.personalLoginInput.tel)){
	    		console.log(11)
	    		this.showAlert = true;
	    		this.alertText = '您输入的手机号码格式不正确';
	    	}else{
	    		this.showAlert = false;
	    	}
	    },
	    changePic(){
	    	console.log(777)
	    	this.picSrc = "http://10.1.31.7:8080/captcha.jpg"
	    	$(".picConfirm").attr("src",this.picSrc)
	    },
	    
      picConfirm(){
      	//图片验证不能为空
      	if(this.personalLoginInput.picConfirm.trim().length==0){
      		this.showAlert = true;
      		this.alertText  = "图形验证码不能为空";
      	}else{
      		this.showAlert = false;
      	}
        
      },
      getMessageConfirm(){
        Vue.set(this.reveal,"buttonDisabled",true)
        Vue.set(this.messageConfirm,"confirmText","60s");
        //Vue.set(this.messageConfirm,"confirmText",);
        var self =this;
        var timer=setInterval(
          function () {
            if(parseInt(self.messageConfirm.confirmText)>1){
              self.messageConfirm.confirmText=parseInt(self.messageConfirm.confirmText)-1+"s";
            }else {
              clearInterval(timer);
              self.reveal.buttonDisabled=true;
              self.messageConfirm.confirmText="重新获取验证码";
            }

          },1000);
      },
      personalLogin(){
      	
      	var that = this;
      	var url = MyAjax.urlhw+"/accountmanainfo/login";
      	if(that.personalLoginInput.tel.trim().length!=0&&that.personalLoginInput.messageConfirm.trim().length!=0
      	&&that.personalLoginInput.picConfirm.trim().length!=0){
      		MyAjax.ajax({
						type: "POST",
						url:url,
						data: {tel:that.personalLoginInput.tel,pwd:that.personalLoginInput.messageConfirm,verifyCode:that.personalLoginInput.picConfirm},
						dataType: "json",
					}, function(data){
						console.log(data)
						console.log(data.token)
						cookieTool.setCookie("token",data.token)
						if(data.code==0){
							router.push("/index")
						}else if(data.code==-1){
							switch (data.msg){
								case "100001":
									console.log(222)
									that.showAlert = true;
									that.alertText = "手机号或者短信验证码错误";
									break;
								case "100005":
									that.showAlert = true;
									that.alertText = "图片验证码不一致";
									break;
								default:
									break;
							}
						}
					},function(err){
						console.log(err)
					})
      	}
      	
        var account = sessionStorage.getItem("account");

     },
     closeTip(){  /*关闭提示框*/
			    this.showAlert = false;
			},

    },
    destroyed(){
    	Vue.set(this.user,'userState',2)

      sessionStorage.setItem("state",this.user.userState)

    }
  }
</script>
<style scoped lang="scss">
  $personalThemeColor:rgb(242,117,25);
  .alet_container{
  	bottom:200px !important;
  	left: 100px;
  	font-size: 14px;
  	.tip_text_container{
  		.tip_text{
	  		font-size: 14px !important;
	  	}
  	}
  	
  }
  .loginInput{
    li{
      padding:11px 0;
      height:48px;
      border-bottom:1px solid #eaeaea;
      padding-left: 41px;
      background: url("../../../assets/img/logoin/icon_code.png") left center no-repeat;
      input{
        font-size:14px;
        width:396px;
        line-height: 25px;
        height: 25px;
      }
    }
    li:nth-child(1){
      background: url("../../../assets/img/logoin/phone.png") 4px center no-repeat;
    }
    li:nth-child(2){
      position: relative;
      background: url("../../../assets/img/logoin/confirm.png") left center no-repeat;
      p,img{
        position: absolute;
        top: 10px;
        right:40px;
        width: 71px;
        height:27px;
        background: #eaeaea;
        cursor: pointer;
      }
      span{
        font-size: 14px;
        line-height: 18px;
        color: $personalThemeColor;
        display: block;
        width:70px;
        text-align: left;
        position: absolute;
        top: 10px;
        right: -38px;
      }
      
    }
    li:nth-child(3){
      position: relative;
      button{
        font-size:14px;
        position: absolute;
        top:0;
        right:12px;
        height: 46px;
        line-height: 46px;
        width:100px;
        cursor: pointer;
        color: $personalThemeColor;
        text-align: left;
        border: 0;
        background: #ffffff;

      }
    }
  }
  .loginSubmit{
    margin-top:40px;
    li{
      width: 314px;
      margin:80px auto;
      margin-bottom: 0;
      button{
        width: 314px;
        height:50px;
        background: url("../../../assets/img/logoin/personal.png") left center no-repeat;
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
    }
  }
</style>



































