<template>
  <div class="companyInfoIndex">
    <h3 class="c-title">
    	<span>{{title}}</span>
    	<router-link to="/yhzx/company/info/companyInfo/editCompanyInfo" class="modifyInfo">
	    	编辑信息
	    </router-link>
    </h3>
    <ul class="ci-list">
      
      <li class="clear">
        <h4>公司名称</h4>
        <p v-if="stateOne.haveCompanyName">{{basicInfo.companyName}}</p>
        <p v-if="!stateOne.haveCompanyName">暂无信息</p>
      </li>
      <li  class="clear">
        <h4>公司地址</h4>
        <p v-if="stateOne.haveCompanyAddress">{{basicInfo.companyAddress}}</p>
        <p v-if="!stateOne.haveCompanyAddress">暂无信息</p>
      </li>
      <li class="clear">
        <h4>公司简介</h4>
        <p v-html="basicInfo.companyProfile" v-if="stateOne.haveCompanyDesc"></p>
        <p v-if="!stateOne.haveCompanyDesc">暂无信息</p>
      </li>
      <li  class="clear">
        <h4>公司电话</h4>
        <p v-html="basicInfo.contactInfo" v-if="stateOne.haveCompanyPhone"></p>
        <p v-if="!stateOne.haveCompanyPhone">暂无信息</p>
      </li>
    </ul>
  </div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import MyAjax from "../../../assets/js/MyAjax.js"
  export default {
    name:"companyInfoIndex",
    data:function(){
      return {
        title:"公司基本信息",
        info:{
        	companyName:'',
        	companyAddress:'',
        	companyDesc:"",
			    companyPhone:"",
        },
        basicInfo:{},
        stateOne:{
        	haveCompanyName:false,
        	haveCompanyAddress:false,
        	haveCompanyDesc:false,
        	haveCompanyPhone:false
        }
        
      }
    },
//  computed:mapState({
//    basicInfo:state=>state.company.companyMessage.basicInfo
//  }),
    mounted(){
    	this.getData();
    },
    methods:{
    	getData(){
        var that=this;
        var url = MyAjax.urlsy+"/companyInfo/getCompanyBasicInfo";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          if(data.code==0){
            that.basicInfo=data.msg;
            if(that.basicInfo.companyName!=""||that.basicInfo.companyName != null){/*两端空格*/
			    		that.stateOne.haveCompanyName = true;
			    	}
            if(that.basicInfo.companyAddress!=""||that.basicInfo.companyAddress != null){/*两端空格*/
			    		that.stateOne.haveteamDesc = true;
			    	}
            if(that.basicInfo.companyProfile!=""||that.basicInfo.companyProfile != null){/*两端空格*/
			    		that.stateOne.haveteamDesc = true;
			    	}
			    	if(that.basicInfo.contactInfo!=""){
			    		that.stateOne.haveteamPhone = true;
			    	}
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
      }
    }
  }
</script>

<style lang="scss" scoped>
$activeColor: #2eb3cf;
$bfColor:#ffffff;
.companyInfoIndex{
	width:940px;
	min-height: 430px;
  padding:40px;
  .modifyInfo{
    float: right;
    color: #2eb3cf;
    padding-left:20px;
    background: url("../../../assets/img/company/edit.png") left center no-repeat;
  }
  .ci-list{
    padding-left: 30px;
    
    li{
      width:100%;
      /*height:100px;*/
      padding-top:30px;
      line-height: 18px;
      overflow: hidden;
      h4{
        float: left;
        font-size: 18px;
        line-height: 24px;
        color: #353535;
        margin-right: 90px;
      }
      .logoBox{
      	width:100px; height: 100px;
      	border:1px solid #e0e0e0;
      	float: left;
      	overflow: hidden;
      }
      
      p{
        float: left;
        font-size: 14px;
        color: #666666;
        text-align: justify;
        width: 640px;
        line-height: 24px;
      }
      
    }
    li:nth-child(1){
      height:60px;
      line-height: 60px;
      p{
      	float:left;
      	width: 500px;
      }
     	a{
     		float: right;
     	}
      
    }
  }
}
  
</style>




































