<template>
  <div class="personalLogin" @keydown="keyLogin($event)">
    <ul class="loginInput">
      <li>
        <input v-model="personalLoginInput.tel" type="text" placeholder="手机号" @blur="personTelCfm" class="tel" autofocus/>
      </li>
      <li>
        <input v-model="personalLoginInput.picConfirm" @blur="picConfirm"  type="text" placeholder="图形验证码"  class="pic"/>
        <img class="picConfirm" :src="changePic" alt="" @click="changePic"/>
        <!--<p v-cloak @click="random">{{makeRandom.num}}</p>-->
        <span v-if="reveal.error">图片验证码错误</span>
      </li>
      <li>
        <!-- <div :class="{focus:reveal.focus}" class="input" contenteditable placeholder="请输入密码"  @keydown="keydown($event)"
        	v-bind:html="personalLoginInput.messageConfirm"></div> -->
          <div>
            <input type="password" placeholder="请输入密码" v-model="personalLoginInput.messageConfirm" @blur="msgConfirm($event)" maxlength="14">
          </div>
        <!-- <button :disabled="reveal.buttonDisabled" @click="getMessageConfirm" v-cloak>{{messageConfirm.confirmText}}</button> 从新获取短信验证码-->
      </li>
      
    </ul>
		<alertTip v-if="showAlert" :showHide="showAlert" :alertText="alertText"></alertTip>
    
    <ul class="loginSubmit">
      <li>
        <button @click="personalLogin"><router-link to="">登录</router-link></button>
      </li>
      <li>
         <p>忘记密码？</p>
    	  <!-- <p><router-link to="/register">立即注册>></router-link></p> -->
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
          buttonDisabled:false,
          focus:false,//短信验证码获取焦点后的添加类名
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
//  	console.log(cookieTool.getCookie("token"));
      do{
        Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
      }while (this.makeRandom.num<1000);

      
      
    },
    methods:{
      login(){
        var that = this;
//      that.personTelCfm();
//      that.picConfirm();
//      that.msgConfirm(event);
      	var url = MyAjax.urlsy+"/accountmanainfo/login";
      	console.log(JSON.stringify({tel:that.personalLoginInput.tel,pwd:that.personalLoginInput.messageConfirm,verifyCode:that.personalLoginInput.picConfirm}))
      	if(that.personalLoginInput.tel.trim().length!=0&&that.personalLoginInput.messageConfirm.trim().length!=0
      	&&that.personalLoginInput.picConfirm.trim().length!=0){
      		var data = {tel:that.personalLoginInput.tel,pwd:that.personalLoginInput.messageConfirm,verifyCode:that.personalLoginInput.picConfirm};
      		MyAjax.ajax({
						type: "POST",
						url:url,
						data: JSON.stringify(data),
						dataType: "json",
						async:false,
						contentType:"application/json;charset=utf-8",
					}, function(data){
						console.log(data)
						cookieTool.setCookie("token",data.token,0.5)//12小时后需要重新登录
						if(data.code==0){
              console.log("success")
              console.log(window.history.length)
              window.history.back()
              cookieTool.setCookie("state","per",0.5);//12小时后需要重新登录
							//router.push("/index")
						}else if(data.code==-1){
							switch (data.msg){
								case "100001":
									that.showAlert = true;
									that.alertText = "手机号或密码错误";
									break;
								case "100008":
									that.showAlert = true;
									that.alertText = "手机号未注册";
									break;
								case "100005":
									that.showAlert = true;
									that.alertText = "图片验证码不一致";
									that.personalLoginInput.picConfirm = "";
									$('.pic').focus();
									that.changePic();
									break;
								case "100006":
									that.showAlert = true;
									that.alertText = "短信验证码错误";
									that.personalLoginInput.messageConfirm = "";
									$('.input').focus()
									break;
								default:
									break;
							}
						}
					},function(err){
            console.log("error")
						console.log(err)
					})
      	}
        
        
        
      },
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
     		if(this.personalLoginInput.tel.trim().length!=0){
     			if(!/^1[34578]\d{9}$/gi.test(this.personalLoginInput.tel)){
		    		this.showAlert = true;
		    		this.alertText = '您输入的手机号码格式不正确';
		    		this.personalLoginInput.tel = "";
		    		$(".tel").focus();
		    	}else{
		    		this.showAlert = false;
		    	}
     		}
	    },
	    changePic(){
	    	this.picSrc = MyAjax.urlsy+"/captcha.jpg?random="+Math.random()
	    	$(".picConfirm").attr("src",this.picSrc)
	    },
      picConfirm(){
      	//图片验证不能为空
      	
      	if(this.personalLoginInput.picConfirm.trim().length==0){
      		this.showAlert = true;
      		this.alertText  = "请输入图形验证码";
      	}else{
      		this.showAlert = false;
      	}
        
      },
      msgConfirm(event){
      	if(this.personalLoginInput.messageConfirm.trim().length==0){
      		this.showAlert = true;
          this.alertText  = "请输入密码";
          Vue.set(this.reveal,"focus",false)
      	}else{
          this.showAlert = false;
        }
      },
      getMessageConfirm(){
        Vue.set(this.reveal,"buttonDisabled",true)
        Vue.set(this.messageConfirm,"confirmText","60s");
        //Vue.set(this.messageConfirm,"confirmText",);
        var self =this;
        // var url = MyAjax.urlhw + "/accountmanainfo/loginMobileCode/" + self.personalLoginInput.tel;
        // MyAjax.ajax({
				// 	type: "GET",
				// 	url:url,
				// 	dataType: "json",
					
				// },function(data){
				// 	console.log(data)
				// 	if(data.code==-1){
				// 		switch (data.msg){
				// 			case "100008":
				// 				console.log(222)
				// 				self.showAlert = true;
				// 				self.alertText = "手机号未注册";
				// 				break;
							
				// 			default:
				// 				break;
				// 		}
				// 	}else{
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
					// }
				// },function(err){
					// console.log(err)
				// })
        
        
      },
    personalLogin(){
         this.login()
        // $.ajax({
        //   type: "POST",
        //   url: "http://10.1.31.7:8080/hello1",
        //   dataType: "json",
        //   contentType:"application/json;charset=utf-8",
        //   data: {id:"1"},
        //   //xhrFields: {withCredentials: true},
        //   //crossDomain: true,
        //   async:false,//使用同步方式
        //   success: function(data){
        //     console.log(data)
        //   },error:function(error){
        //     console.log(error)
        //   }
        // });
     },
     keyLogin($event){//enter键登录事件
      var event = $event || window.event;  
		 	if(event.keyCode==13){ 
		     this.login()
         event.returnValue = false;    
         event.cancelBubble=true;
         event.preventDefault();
         //event.stopProgagation();
         return false;
      } 

		 },
    },
    destroyed(){
    }
  }
</script>
<style scoped lang="scss">
  $personalThemeColor:rgb(242,117,25);
  .personalLogin{
  	margin-bottom: 20px;
  }
  .input{  
      width:200px;  
      height:24px;  
      line-height:24px;  
      font-size:14px;  
      text-align: left;
      color: rgb(169, 169, 169);  
      cursor: text;
  }  
  .input:empty::before {  
      content: attr(placeholder);  
  }  

  .alet_container{
  	bottom:185px !important;
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

    li{
      width: 314px;
      margin:18px auto;
      margin-top: 26px;
      margin-bottom: 0;
      cursor: pointer;
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
      p{
        color: $personalThemeColor;
        cursor: pointer;
      }
      p:nth-child(1){
        float: left;
      }
      // p:nth-child(2){
      //   float: right;
      //   a{
      //     color: $personalThemeColor;
      //   }
      // }
    }
  }
</style>



































