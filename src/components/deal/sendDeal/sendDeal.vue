<template>
  <div class="sendDeal">

    <div id="modal-overlay">
      <div class="alert">
        <ul>
          <li>确认提交后，该协议将由交易管理员进行审核。</li>
          <li>审核通过后，将发生至协议相关方</li>
          <li>如未通过审核，该协议将退回至“我的协议”——“协议草稿”</li>
        </ul>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmEdit">进入编辑</button>
      </div>
    </div>

    <div id="modal-overlay2">
      <div class="alert">
        <p>是否终止协议？</p>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmStopDeal">确认</button>
      </div>
    </div>

    <div id="modal-overlay3">
      <div class="alert">
        <p>已向协议关联方发送终止通知</p>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="closeStopDealAlert">确认</button>
      </div>
    </div>
    <div id="modal-overlay4">
      <div class="alert">
        <p>是否同意终止协议？</p>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmAgreeDealStop">同意</button>
      </div>
    </div>
    <!--终止/编辑提示-->
    <ul class="sendDealContainer">
      <li v-for="(item,index) in data.dealInfo">
        <ul class="sendDealTitle">
          <li>
            <h2 v-cloak>
              <router-link :to="{path:'/yhzx/deal/sendDealIndex/sendDealInfo',query:{id:item.pkid}}">
                {{item.dealName}}
              </router-link>
            </h2>
          </li>
          <li v-cloak>{{item.dealState}}</li>
          <li class="titleButton">
            <div @click="agreeDealStopBtn(index)" v-if="reveal.dealState[index][2]&&item.ifConfirmStop" class="cancel">
              终止
             </div><!--对方发起终止，确认终止 -->
            <div @click="stopDeal(index)" v-if="reveal.dealState[index][1]" class="cancel">
              终止
            </div>
            <div @click="editPrompt(index)" v-if="reveal.dealState[index][0]" class="edit">
              编辑
            </div>
            <!--<router-link :to="{path:'/yhzx/deal/sendDealIndex/editSendDeal',query:{id:index}}" v-if="reveal.dealState[index][1]" class="cancel">终止</router-link>-->

            <!--<router-link :to="{path:'/yhzx/deal/sendDealIndex/editSendDeal',query:{id:index}}" v-if="reveal.dealState[index][0]" class="edit">编辑</router-link>-->

          </li>
        </ul>
        <p v-cloak>创建时间：{{item.publishTime}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import ModalOpp from "../../../assets/js/modalOpp"
  import MyAjax from "../../../assets/js/MyAjax.js"
  export default {
    name:"sendDeal",
    data(){
      return{
        reveal:{
          dealState:[],//不同的协议状态对应不同的按钮
          index:"",
        },
        routerLinkPath:{//发送的协议和接受的协议对应的不同跳转
          path:""
        },
        data:{
          dealInfo:{}
        }
      }
    },
    computed:mapState({
      //dealInfo:state=>state.myDeal.dealInfo,
      /*获取数据*/
    }),
    created(){
      this.gitDelList();
      for(let i=0;i<this.data.dealInfo.length;i++){
        this.reveal.dealState.push([])
        switch (this.data.dealInfo[i].dealState){
          case "签订中":
            this.reveal.dealState[i].push(true)
            this.reveal.dealState[i].push(true)
            this.reveal.dealState[i].push(false)
            break;
          case "履行中":
            this.reveal.dealState[i].push(true)
            this.reveal.dealState[i].push(true)
            this.reveal.dealState[i].push(false)
            break;
          case "协议完成":
            this.reveal.dealState[i].push(false)//协议完成时，可以编辑
            this.reveal.dealState[i].push(false)//协议完成时不能终止
            this.reveal.dealState[i].push(false)//对方发出终止，是否可以确定终止
            break;
          case "评价完成":
            this.reveal.dealState[i].push(false)
            this.reveal.dealState[i].push(false)
            this.reveal.dealState[i].push(false)
            break;
          case "审核中":
            this.reveal.dealState[i].push(false)
            this.reveal.dealState[i].push(false)
            this.reveal.dealState[i].push(false)
            break;
          case "终止申请中":
            this.reveal.dealState[i].push(false)
            this.reveal.dealState[i].push(false)
            this.reveal.dealState[i].push(true)
            break;
        }
      }
    },
    methods:{
      gitDelList(){
        var that = this;
	    	var url = MyAjax.urlsy +"/dealbasicinfo/mySendedDeals";
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					if(data.code==0){
            Vue.set(that.data,"dealInfo",data.msg)
            console.log(data.msg)
					}else{
            // if(data.msg=="100004"){//没有token
						// 	window.location.hash="/login"
						// }
            console.log("错误返回");
            //window.location.hash="/error/404"
					}
				},function(err){
					console.log(err)
				})
      },
      setStopDeal(index,pkid){
        var that = this;
	    	var url = MyAjax.urlsy +"/dealbasicinfo/stop/"+pkid;
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					if(data.code==0){
            that.gitDelList();
            that.reveal.dealState[index][1]=false;
            that.reveal.dealState[index][0]=false;
            var modal3= new ModalOpp("#modal-overlay3");
            modal3.makeText();
            console.log("终止提醒发送成功")
					}else{
            console.log("错误返回");
            //window.location.hash="/error/404"
					}
				},function(err){
					console.log(err)
				})
      },
      agreeDealStop(index,pkid){
        console.log("456")
        var that = this;
	    	var url = MyAjax.urlsy +"/dealbasicinfo/agreeDealStop/"+pkid;
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					if(data.code==0){
            that.gitDelList();
            that.reveal.dealState[index][2]=false;
            that.reveal.dealState[index][1]=false;
            that.reveal.dealState[index][0]=false;
            console.log("终止确定成功")
					}else{
            console.log("错误返回");
            //window.location.hash="/error/404"
					}
				},function(err){
					console.log(err)
				})
      },
      editPrompt(index){//协议编辑的提示信息
        var modal= new ModalOpp("#modal-overlay");
        modal.makeText();
        Vue.set(this.reveal,"index",index)
      },
      closeAlert(){//弹框关闭按钮
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        var modal3= new ModalOpp("#modal-overlay3");
        modal3.closeModal();
        var modal4= new ModalOpp("#modal-overlay4");
        modal4.closeModal();
      },
      confirmEdit(){
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        //this.data.dealInfo[this.reveal.index].pkid
        location.hash="/yhzx/deal/sendDealIndex/editSendDeal?id="+this.data.dealInfo[this.reveal.index].pkid;
      },
      stopDeal(index){//终止协议
        var modal= new ModalOpp("#modal-overlay2");
        modal.makeText();
        Vue.set(this.reveal,"index",index)
      },
      confirmStopDeal(){//确认终止协议，向协议方发送通知
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        this.setStopDeal(this.reveal.index,this.data.dealInfo[this.reveal.index].pkid)
      },
      agreeDealStopBtn(index){
        var modal4= new ModalOpp("#modal-overlay4");
        modal4.makeText();
        Vue.set(this.reveal,"index",index)
      },
      confirmAgreeDealStop(){
        var modal4= new ModalOpp("#modal-overlay4");
        modal4.closeModal();
        console.log("123")
        this.agreeDealStop(this.reveal.index,this.data.dealInfo[this.reveal.index].pkid)
      },
      closeStopDealAlert(){//关闭通知
        var modal3= new ModalOpp("#modal-overlay3");
        modal3.closeModal();
      }
    }
  }
</script>
<style scoped lang="scss">
  $themeColor:#546686;
  $normalColor:#353535;
  $alertColor:#525252;
  .sendDeal{
    #modal-overlay{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:72px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 42px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    #modal-overlay2{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:102px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 52px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    #modal-overlay3{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:102px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 52px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    #modal-overlay4{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:102px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 52px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    /*以上是弹框提示*/
    .sendDealContainer{
      color: $normalColor;
      li{
        width: 900px;
        height: 80px;
        border-bottom:1px solid #ebebeb;
        .sendDealTitle{
          height:44px;
          padding-top:14px;
          li{
            width:33%;
            height:30px;
            line-height: 30px;
            float: left;
            border:0;
            h2{
              cursor: pointer;
              font-size:18px;
              line-height: 30px;
              float: left;
              a{
                display: block;
                line-height: 30px;
                color: $normalColor;
              }
            }
          }
          li:nth-child(2){
            padding-left:140px;
            color: #f56212;
          }
          .titleButton{
            float: right;
            .edit,.cancel{
              float: right;
              padding-left: 24px;
              margin-left:19px;
              cursor: pointer;
              color: $normalColor;
            }
            .edit{
              background: url("../../../assets/img/deal/sendDeal/edit-gray.png") left center no-repeat;
            }
            .cancel{
              background: url("../../../assets/img/deal/sendDeal/cancell-gray.png") left center no-repeat;
            }
            .edit:hover{
              background: url("../../../assets/img/deal/sendDeal/edit.png") left center no-repeat;
              color: $themeColor;
            }
            .cancel:hover{
              background: url("../../../assets/img/deal/sendDeal/cancell.png") left center no-repeat;
              color: $themeColor;
            }
          }

        }
        p{
          line-height: 22px;
        }
      }
    }
  }
</style>
