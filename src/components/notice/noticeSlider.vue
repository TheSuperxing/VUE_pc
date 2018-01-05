<template>
  <div class="noticeSlider">
    <ul class="sliderNavList">

      <li v-for="(item,$index) in pics">
        <router-link :to="item.route">
          <div class="sliderBorder">
            <div>
              <img :src="item.pic1"/>
              <img :src="item.pic2"/>
            </div>
            <p>{{item.text}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from 'vue'
//import "../../assets/js/units/sliderUpdatedColor"
  export default{
    data:function(){
      return{
        pics:[
          {text:"系统通知",pic2:require("../../assets/img/personal/siderbar/individual.png"),pic1:require("../../assets/img/personal/siderbar/individual.gray.png"),route:"/notice/stytem"},
          {text:"需求通知",pic1:require("../../assets/img/personal/siderbar/massage.gray.png"),pic2:require("../../assets/img/personal/siderbar/massage.png"),route:"/notice/demand"},
          // {text:"协议通知",pic1:require("../../assets/img/personal/siderbar/education.gray.png"),pic2:require("../../assets/img/personal/siderbar/education.png"),route:"/notice/deal"},
          // {text:"交易通知",pic1:require("../../assets/img/personal/siderbar/we.gray.png"),pic2:require("../../assets/img/personal/siderbar/we.png"),route:"/notice/merchandise"},
        ]
      }
    },
    mounted(){
      $(".sliderNavList .router-link-active").parent("li").addClass("selected");
    }
  }
</script>
<style scoped="" lang="scss">
  $activeColor: #f27519;
  $bfColor:#ffffff;
  .noticeSlider{
    width:240px;
    background:$bfColor;
    float: right;
    margin-left:20px;
    border-radius:5px;

    overflow:hidden;

    .sliderNavList{
      width:240px;
      //    height:370px;
      li{
        width:240px;
        height: 61px;
        a{
          width: 240px;
  //      height: 52px;
          color: #353535;
          display: inline-block;
          .sliderBorder{
              width: 240px;
              height: 61px;
              padding-top: 20px;
              padding-bottom: 20px;
              padding-left: 42px;
              font-size: 14px;
              border-left:2px solid $bfColor;

              div{
                float: left;
                position: relative;
  //            top:18px;
                width:21px;
                height:21px;
                z-index: 0;
                img{
                  position: absolute;
                  top: 0;
                  left:0;
                  z-index: 0;
                }
                  img:nth-child(1){
                    display: block;
                  }
                  img:nth-child(2){
                    display: none;
                  }
              }
              p{
                float: left;
  //            line-height: 52px;
                padding-left: 18px;
              }
          }
        }
      }
        a.router-link-active{
          color:$activeColor;
          .sliderBorder{
            border-left:2px solid $activeColor;
            img:nth-child(1){
              display: none;
            }
            img:nth-child(2){
              display: block;
            }
          }
        }
    }
  }
</style>
