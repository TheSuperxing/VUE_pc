<template>
  <div class="demand">
    <div class="title clear">
        <div class="text clear">
            <h2 v-cloak>通知</h2>
            <span>({{noticeNum}})</span>
        </div>
    </div>
    <ul class="notContain">
		<li v-for="(item,index) in notice" class="clear"  v-bind:class="{read:!mesState[index],unread:mesState[index]}">
			<span></span>
			<p>{{item.mes[0]}}<em @click="read(item.id,item.pkid,item.urlName)">{{item.mes[1]}}</em>{{item.mes[2]}}<a>hsdhas</a></p>
		</li>
    </ul>
  </div>
</template>

<script>
	import Vue from "vue"
	import MyAjax from "../../assets/js/MyAjax.js"
	import router from "../../router"
  export default {
    name: 'demand',
    data:function(){
    	return{
    		notice:[
    			
    		],
    		noticeNum:"0",
    		mesState:[],
    	}
    },
    mounted(){
    	this.getData()
    },
    methods:{
    	getData(){
    		var that = this;
    		var url = MyAjax.urlhw +"/businessmessageaccountrela/findByMySelf";
				MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					console.log(data)
					that.notice = [];
					that.mesState = [];
					that.noticeNum = data.msg.length;	
					for(let i=0;i<data.msg.length;i++){
						if(data.msg[i].mesType==1){
							that.mesState.push(true) //未读
						}else{
							that.mesState.push(false) //已读
						}
						if(data.msg[i].mesContent.match(/##(\S*)##/)!=null){
							let useful = data.msg[i].mesContent.match(/##(\S*)##/)[1];
							useful = useful.split(";");
							let obj = {
								mes:[],
								urlName:"",
								id:"",
								pkid:""
							}
							obj.mes =data.msg[i].mesContent.split(/##(\S*)##/);
							obj.mes[1] = useful[0];
							obj.urlName = useful[1]; 
							obj.id = useful[2];
							obj.pkid = data.msg[i].pkid;
							that.notice.push(obj);
						}else{
							let obj = {
								mes:[],
								urlName:"",
								id:"",
								pkid:""
							}
							obj.mes[0] =data.msg[i].mesContent;
							obj.pkid = data.msg[i].pkid;
							that.notice.push(obj);
						}
					}
					console.log(that.notice)
				},function(err){
					console.log(err)
				})
    	},
    	read(id,pkid,urlName){
    		console.log(id,pkid,urlName)
    		console.log(id)
    		var that = this;
    		var url = MyAjax.urlhw +"/businessmessageaccountrela/update";
    		var data = {
    			id:pkid
    		}
    		MyAjax.ajax({
				type: "POST",
				url:url,
				dataType: "json",
				data:data,
				async: false,
			},function(data){
				console.log(data)
				if(data.code==0){
					that.getData()
				}
			},function(err){
				console.log(err)
			})
    		router.push({name:urlName,query:{id:id}})
    	}
    }
  }
</script>
<style scoped lang="scss">
    $themeColor:#f27519;
    $browse:#919191;
    .demand{
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
                    em{
                    	color: #00afc7;
                    	cursor: pointer;
                    }
                }
            }
            .read{
            	background: #f2f2f2;
                
                span{
                	background: #666666;
                }
            }
            .unread{
            	background: #ebebeb;
            }
        }
    }
</style>
