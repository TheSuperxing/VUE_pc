<template>
  <div class="companyAccountIndex">
    <h3 class="c-title"><span>{{title}}</span></h3>
    <ul class="cA-BasicInfo">
      <li class="clearfix">
        <h4 class="info-left"><img src="../../../assets/img/connect/zcshijian.png"/>注册时间</h4>
        <p class="registerTime">{{accountInfo.registerTime}}</p>
        <div style="clear: both"></div>
      </li>
      <li class="clearfix">
        <h4 class="info-left"><img src="../../../assets/img/connect/zcmail.png"/>登录邮箱</h4>
        <p class="companyMail">{{accountInfo.accountName}}</p>
        <div style="clear: both"></div>
      </li>
      <li class="clearfix">
        <h4 class="info-left"><img src="../../../assets/img/connect/zcmima.png"/>登录密码</h4>
        <p class="companyPassword">******</p>
        <router-link to="/yhzx/company/info/companyAccount/editPassword">
          <span class="editPwd" >
             修改密码
          </span>
        </router-link>
        <div style="clear: both"></div>
      </li>
    </ul>

    <ul class="cA-contactInfo" v-if="!ediCtrShow">
      <li class="contactor">
        <dl>
          <dt><img src="../../../assets/img/company/big-man.png" /></dt>
          <dd>
            <p class="contactN" v-html="accountInfo.accountContacts1"></p>
            <p class="contactP">{{accountInfo.contactPhone1}}</p>
          </dd>
        </dl>
      </li>
      <li class="contactor">
        <dl>
          <dt><img src="../../../assets/img/company/big-man.png" /></dt>
          <dd>
            <p class="contactN" v-html="accountInfo.cccountContacts2"></p>
            <p class="contactP">{{accountInfo.contactPhone2}}</p>
          </dd>
        </dl>
      </li>
      <p class="editCtr" v-if="!ediCtrShow">
          <span class="editPwd" @click="toEditCtr">
             	编辑信息
          </span>
      </p>
      
    </ul>
    
    <!--编辑联系人状态栏   点击上面编辑信息显示出来-->
    <ul class="ediCtrBox" v-if="ediCtrShow">
    	<li class="contactor">
        <dl>
          <dt><img src="../../../assets/img/company/big-man.png" /></dt>
          <dd>
            <p class="contactN"><input placeholder="请输入联系人名称" v-model="localContactInfo.accountContacts1" class="input1"/></p>
            <p class="contactP"><input placeholder="请输入联系人手机号" v-model="localContactInfo.contactPhone1"/></p>
          </dd>
        </dl>
      </li>
      <li class="contactor">
        <dl>
          <dt><img src="../../../assets/img/company/big-man.png" /></dt>
          <dd>
            <p class="contactN"><input placeholder="请输入联系人名称" v-model="localContactInfo.cccountContacts2" class="input1"/></p>
            <p class="contactP"><input placeholder="请输入联系人手机号" v-model="localContactInfo.contactPhone2"/></p>
          </dd>
        </dl>
      </li>
      <div class="btnBox">  
				<span class="cancelBtn" @click="canlceEdit">取消</span>
				<span class="confirmBtn" @click="ediContactors">确认</span>
			</div>
    </ul>
    
  </div>
</template>
<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import MyAjax from "../../../assets/js/MyAjax.js"
	
  export default {
    name:"companyAccount",
    data:function(){
      return {
        title:"公司帐号信息",
        contactsss:{
        	info:[
        	{
        		name:"",phoneNum:""
        	},{
        		name:"",phoneNum:""
        	}
        	]
        },
        ediCtrShow:false,
        accountInfo:{},
        localContactInfo:{
        	accountContacts1:"",
        	contactPhone1:"",
        	cccountContacts2:"",
        	contactPhone2:""
        }
      }
    },
    computed:mapState({
//    accountInfo:state=>state.company.companyMessage.accountInfo
    }),
    created(){
    	this.getData()
    },
    mounted(){
    	
   
    },
    methods:{
    	getData(){
        var that=this;
        var url = MyAjax.urlsy+"/companyInfo/accountInfo";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          if(data.code==0){
//          that.accountInfo=data.msg;
              Vue.set(that,"accountInfo",data.msg);
          }else{
            // if(data.msg=="100004"){//没有token
						// 	window.location.hash="/login"
						// }
          }
        },function(err){
          if(err.status!=200){
            //router.push("/index")
            status=err.status;
          }
        })
        function empty(text){
	    		if(text==null||text==""){
	    			return "暂无信息"
	    		}else{
	          return text;
	        }
	    	}
	    	function empty2(text){
	    		if(text == "暂无信息"){
	    			return ""
	    		}else{
	    			return text;
	    		}
	    	}
	    	that.accountInfo.registerTime = empty(that.accountInfo.registerTime)
	    	that.accountInfo.accountName = empty(that.accountInfo.accountName)
	    	that.accountInfo.passWord = empty(that.accountInfo.passWord)
//	    	if(that.accountInfo.passWord!=(null||"")){
//	    		that.accountInfo.passWord = "******"
//	    	}
	    	that.accountInfo.accountContacts1 = empty(that.accountInfo.accountContacts1)
	    	that.accountInfo.contactPhone1 = empty(that.accountInfo.contactPhone1)
	    	that.accountInfo.cccountContacts2 = empty(that.accountInfo.cccountContacts2)
	    	that.accountInfo.contactPhone2 = empty(that.accountInfo.contactPhone2)
	    	console.log(that.accountInfo.accountContacts1)
	    	that.localContactInfo.accountContacts1 = empty2(that.accountInfo.accountContacts1);
	    	that.localContactInfo.contactPhone1 = empty2(that.accountInfo.contactPhone1);
	    	that.localContactInfo.cccountContacts2 = empty2(that.accountInfo.cccountContacts2);
	    	that.localContactInfo.contactPhone2 = empty2(that.accountInfo.contactPhone2);
      },
    	toEditCtr(){
    		this.ediCtrShow = true;
    		
    	},
    	canlceEdit(){
    		this.ediCtrShow = false;
    		this.localContactInfo.accountContacts1 = this.empty2(this.accountInfo.accountContacts1);
	    	this.localContactInfo.contactPhone1 = this.empty2(this.accountInfo.contactPhone1);
	    	this.localContactInfo.cccountContacts2 = this.empty2(this.accountInfo.cccountContacts2);
	    	this.localContactInfo.contactPhone2 = this.empty2(this.accountInfo.contactPhone2);
    		
    	},
    	empty2(text){
    		if(text == "暂无信息"){
    			return ""
    		}else{
    			return text;
    		}
    	},
    	ediContactors(){
    		var that=this;
        var url = MyAjax.urlsy+"/companyInfo/editContactInfo";
//      if(that.localContactInfo.accountContacts1.trim().length!=0||that.localContactInfo.contactPhone1.trim().length!=0
//      ||that.localContactInfo.cccountContacts2.trim().length!=0||that.localContactInfo.contactPhone2.trim().length!=0){
        	this.accountInfo.accountContacts1 = this.localContactInfo.accountContacts1
		    	this.accountInfo.contactPhone1 = this.localContactInfo.contactPhone1
		    	this.accountInfo.cccountContacts2 = this.localContactInfo.cccountContacts2
		    	this.accountInfo.contactPhone2 = this.localContactInfo.contactPhone2
        	var data = that.accountInfo;
        	console.log(JSON.stringify(data))
        	MyAjax.ajax({
	          type: "POST",
	          url:url,
	          data:JSON.stringify(data),
	          dataType: "json",
	          async:false,
	          contentType:"application/json;charset=utf-8",
	        },function(data){
	        	console.log(data)
        		
	        },function(err){
	          if(err.status!=200){
	            status=err.status;
	          }
	        })
//      }
        that.getData();
    		that.ediCtrShow = false;
//			this.$store.commit("ediContactors",this.contactsss.info)
    	}
    },
    updated(){
//  	console.log(this.accountInfo)
//  	console.log(this.contactsss)
    }
  }
</script>
<style lang="scss" scoped="scoped">
$activeColor: #2eb3cf;
$bfColor:#f7f9fc;
.companyAccountIndex{
	
	
	.ediCtrBox{
	padding-top: 32px;
	padding-bottom: 30px;
	overflow: hidden;
	
	background: #FFFFFF;
	overflow: hidden;
	.contactor{
    width: 260px;
    height: 104px;
    background: #f7f7f7;
    border-radius: 5px;
    float: left;
    margin-right: 40px;
    dl{
    	&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
    	/*height: 100%;*/
        dt{
        	height: 74px;
        	float:left;	
        	margin-top: 30px;
          margin-left: 30px;
	        img{
	            width: 37px;
	            height: 42px;
	            float: left;
	            margin-right: 20px;
	        }
        }
        dd{
            float: left;
            width: 145px;
            height: 104px;
            .contactN,.contactP{
            	width: 100%;
            	height: 34px;
            	line-height: 33px;
            	margin-top: 10px;
            	border-bottom: 1px solid #b6b6b6;
            	input{
            		width: 100%;
            		color: #353535 !important;
            		font-size: 14px;
            		text-indent: 8px;
            		
            	}
                

            }
            
        }
    }
	}
	.btnBox{
		height: 40px;
		width: 330px;
		float: left;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		margin-top: 40px;
		margin-left: 161px;
		span{
			float: left;
			/*margin-right: 50px;*/
			width: 140px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			vertical-align: middle;
			font-size: 18px;
			border-radius: 5px;
			cursor: pointer;
	
			&.cancelBtn{
				border: 1px solid #bfcbd9;
	
				&:hover{
					border: 1px solid $activeColor;
					color: $activeColor;
				}
			}
			&.confirmBtn{
				background-image: url("../../../assets/img/company/rectangle06.png") ;
				color: #FFFFFF;
				&:hover{
					filter:alpha(opacity=80);       /* IE */
				  -moz-opacity:0.8;              /* 老版Mozilla */
				  -khtml-opacity:0.8;              /* 老版Safari */
				   opacity: 0.8;           /* 支持opacity的浏览器*/
				}
			}
		}
	}
}
}

	
	



















</style>
