<template>
  <div class="stytem">
    <div class="title">
        <div class="text">
            <h2 v-cloak>通知</h2>
            <span>（5）</span>
        </div>
    </div>
    <ul class="notContain">
        <li>
            <span></span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </li>
        <li>
            <span></span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam in odit totam itaque dolorem dolore modi nisi, veniam repellendus iusto ad, ullam perspiciatis necessitatibus temporibus voluptatibus? Aspernatur, molestias maiores?</p>
        </li>
        <li>
            <span></span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam in odit totam itaque dolorem dolore modi nisi, veniam repellendus iusto ad, ullam perspiciatis necessitatibus temporibus voluptatibus? Aspernatur, molestias maiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam in odit totam itaque dolorem dolore modi nisi, veniam repellendus iusto ad, ullam perspiciatis necessitatibus temporibus voluptatibus? Aspernatur, molestias maiores?</p>
        </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'stytem',
  }
</script>
<style scoped lang="scss">
    $themeColor:#f27519;
    $browse:#919191;
    .stytem{
        width: 940px;
        float: left;
        background: #ffffff;
        color: #353535;
        padding: 0 20px;
        .title{
            padding:35px 0 0 0;
            font-size: 18px; 
            border-bottom: 1px solid rgb(212, 212, 212);
            .text{
                float: left;
                border-bottom:2px solid $themeColor;
                margin-bottom:-1px;
                h2{
                    float: left;
                    padding-bottom: 8px;
                }
                span{
                    float: left;
                    color: $themeColor;
                }
            }
            
        }
        .notContain{
            padding: 20px 0;
            li{
                position: relative;
                line-height:20px;
                padding: 8px 0 8px 38px; 
                background: #f2f2f2;
                span{
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: $themeColor;
                    position: absolute;
                    top: 50%;
                    left: 14px;
                    margin-top: -5px;
                }
                p{
                    float: left;
                }
            }
            li:nth-child(2){
                background: #ebebeb;
            }
        }
    }
</style>
