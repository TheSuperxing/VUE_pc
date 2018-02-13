<template>
  <div class="teamInfoIndex">
    <h3 class="t-title">
    	<span>{{title}}</span>
    	<router-link to="/yhzx/team/info/teamInfo/editTeamInfo" class="modifyInfo">
	    	编辑信息
	    </router-link>
    </h3>
    <ul class="ci-list">
      
      <li class="clear">
        <h4>团队名称</h4>
        <p >{{basicInfo.teamName}}</p>
       	
      </li>
     
      <li class="clear">
        <h4>团队简介</h4>
        <p v-if="stateOne.haveteamDesc">{{basicInfo.teamProfile}}</p>
        <p v-if="!stateOne.haveteamDesc">暂无信息</p>
      </li>
      <li  class="clear">
        <h4>团队电话</h4>
        <p v-if="stateOne.haveteamPhone">{{basicInfo.contactInfo}}</p>
        <p v-if="!stateOne.haveteamPhone">暂无信息</p>
      </li>
    </ul>
  </div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import MyAjax from "../../../assets/js/MyAjax.js"
  export default {
    name:"teamInfoIndex",
    data:function(){
      return {
        title:"团队基本信息",
        info:{
        	teamName:'',
        	teamAddress:'',
        	teamDesc:"",
			    teamPhone:"",
        },
        stateOne:{
        	haveteamDesc:false,
        	haveteamPhone:false
        },
        basicInfo:{}
        
      }
    },
    computed:mapState({
//    basicInfo:state=>state.team.teamMessage.basicInfo
    }),
    mounted(){
    	this.getData();
    },
    methods:{
    	getData(){
        var that=this;
        var url = MyAjax.urlsy+"/teamOrgaInfo/getTeamBasicInfo";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async:false,
        },function(data){
        	console.log(data)
          if(data.code==0){
            that.basicInfo=data.msg;
            if(that.basicInfo.teamProfile!=""&&that.basicInfo.teamProfile != null){/*两端空格*/
			    		that.stateOne.haveteamDesc = true;
			    	}
			    	if(that.basicInfo.contactInfo!=""&&that.basicInfo.contactInfo != null){
			    		that.stateOne.haveteamPhone = true;
			    	}
            //Vue.set(that,"psnMsg",data.msg);
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
$bfColor:#ffffff;
$activeColor: #02a672;
.teamInfoIndex{
	width:940px; 
  padding:40px 40px 80px 40px;
	&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
  
  .modifyInfo{
    float: right;
    color: $activeColor; 
    padding-left:20px;
    background: url(../../../assets/img/team/icon_green-edit.png) left center no-repeat;
  }
  .ci-list{
    padding-left: 30px;
    .clear{
      width:100%;
      /*height:100px;*/
      padding-top:30px;
      line-height: 18px;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
      
      h4{
        float: left;
        height: 28px;
        line-height: 28px;
        font-size: 18px;
        color: #353535;
        margin-right: 90px;
      }
      .logoBox{
      	width:100px; height: 100px;
      	border:1px solid #e0e0e0;
      	float: left;
      	overflow: hidden;
      }
      img{
        
      }
      p{
        float: left;
        font-size: 14px;
        line-height: 28px;
        color: #666666;
        text-align: justify;
        width: 640px;
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




































