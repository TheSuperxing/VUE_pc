<template>
  <div class="teamExperienceIndex">
    <div  class="title clear">
      <h2 v-cloak>{{title}}</h2>
    </div>
    <div class="teamExperienceContainer">
      <div class="personal-empty" v-if="reveal.empty">（您尚未有团队认证信息）</div>
      <ul  class="clear" v-if="!reveal.empty">
        <li v-for="(item,index) in this.teamExperience" v-bind:class="{confirm:item.ifCer}">
          <p  v-cloak class="teamName">{{item.teamName}}</p>
          <div>
            <p v-cloak v-if="teamExperience[index].ifCer" :class="{openOrPrivacy:!reveal.abs[index]}" @click="openOrPrivacy(index)">{{reveal.openOrPrivacyText[index]}}</p>
            <p  v-cloak v-on:click="togConfirm(index)">{{reveal.confirmText[index]}}</p>
          </div>
          
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import MyAjax from "../../../assets/js/MyAjax.js"

  export default {
    name:"teamExperienceIndex",
    data(){
      return {
        title:"团队经历",
        reveal:{
          "empty":true,
          abs:[],
          confirmText:[],
          openOrPrivacyText:[],//是否对外显示的文本信息
        },
        //introduce:[],//团队是否认证的状态
        teamExperience:[],//团队经历，后端获取的数据
      }
    },
    created(){
      this.getData()
    },
    mounted(){
      if(this.teamExperience.length!=0){
        Vue.set(this.reveal,"empty",false);//是否为空提示
        for(let i=0;i<this.teamExperience.length;i++){
          //this.introduce[i]=this.teamExperience[i].info.introduce//同步数据到本地
          if(this.teamExperience[i].ifCer){
            this.reveal.confirmText.push("取消认证");
            this.reveal.abs[i]=true;
            this.reveal.openOrPrivacyText[i]="显示"
          }else {
            this.reveal.confirmText.push("认证经历");
          }
        }
      }else{
        Vue.set(this.reveal,"empty",true);//是否为空提示
      }
    },
    methods:{
      getData(){
        var that=this;
        var url = MyAjax.urlsy+"/teamOrgaInfo/findByMySelf";
        MyAjax.ajax({
          type: "GET",
          url:url,
          dataType: "json",
          async: false,
        },function(data){
          if(data.code==0){
            that.teamExperience=data.msg
            //Vue.set(that,"teamExperience",data.msg)//ifCer标识是否认证，0未认证，1已经认证
          }else{
            console.log("错误返回");
          }
        },function(err){
          console.log(err)
        })
      },
      openOrPrivacy(index){
        Vue.set(this.reveal.abs,[index],!this.reveal.abs[index]);
        if(this.reveal.abs[index]){
          this.reveal.openOrPrivacyText[index]="显示"
        }else{
          this.reveal.openOrPrivacyText[index]="隐藏"
        }

      },
      togConfirm(index){
        //console.log(this.teamExperience[index])
        if(this.teamExperience[index].ifCer==0){
          Vue.set(this.teamExperience[index],"ifCer",1)
          Vue.set(this.reveal.confirmText,[index],"取消认证");
          Vue.set(this.reveal.abs,[index],true)
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }else{
          Vue.set(this.teamExperience[index],"ifCer",0)
          Vue.set(this.reveal.confirmText,[index],"认证经历");
        }

        //console.log(this.teamExperience[index].ifCer)

        var that=this;
        var url = MyAjax.urlsy+"/teamOrgaInfo/update";
        MyAjax.ajax({
          type: "POST",
          url:url,
          data: JSON.stringify(that.teamExperience[index]),
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          async: false,
        },function(data){
          //console.log(data)
        },function(err){
          console.log(err)
        })

        that.getData();

        
      }
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  .teamExperienceIndex {
    width: 940px;
    float: left;
    padding: 0 40px;
    background: $bfColor;
    min-height: 671px;
    .title{
      padding:35px 0 0 0;
      font-size: 18px;
      color: $activeColor;
      border-bottom: 1px solid $borderColor;
      h2{
        float: left;
        padding-bottom: 8px;
        border-bottom: 2px solid $themeColor;
        margin-bottom: -1px;
      }
    }
    /*头部*/
    .personal-empty{
      width: 820px;
      padding: 35px 0 10px 0;
      font-size:16px;
      color: $emptyColor;
      text-align: center;
    }
    /*信息为空提示*/
    .teamExperienceContainer{
      ul{
        li{
          float: left;
          width:817px;
          margin-left:22px;
          border-bottom:1px solid $borderColor;
          font-size: 14px;
          p{
            float: left;
            height: 54px;
            line-height: 54px;
          }
          div{
            float: right;
            p{
              cursor: pointer;
              padding-left:20px;
              margin-left: 20px;
              //background: url("../../../assets/img/personal/teamexperience/icon_ok.png") left 32px no-repeat;
            }
          }
          
        }
        .confirm{
          color: $themeColor;
          .teamName{
            padding-right: 25px;
            background: url("../../../assets/img/personal/teamexperience/icon_selected.png") right center no-repeat;
          }
          div{
              float: right;
              p{
                padding-left: 33px;
                background: url("../../../assets/img/personal/teamexperience/eye.png") left center no-repeat;
              }
              .openOrPrivacy{
                 color: #353535;
                 background: url("../../../assets/img/personal/teamexperience/eye_gray.png") left center no-repeat;
              }
              p:nth-child(2){
                background: url("../../../assets/img/personal/teamexperience/icon_cannel_large.png") left center no-repeat;
              }
          }
          
        }
      }
    }
  }
</style>
