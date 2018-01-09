<template>
  <div class="stytem">
    <div class="title clear">
        <div class="text clear">
            <h2 v-cloak>通知</h2>
            <span>({{noticeNum}})</span>
        </div>
    </div>
    <ul class="notContain">
    	<li v-for="(item,index) in notice" class="clear"  v-bind:class="{read:!mesState[index],unread:mesState[index]}">
			<span @click="read(item.pkid)"></span>
			<p>{{item.mes[0]}}<em @click="goToDetail(item.id,item.pkid,item.urlName)">{{item.mes[1]}}</em>{{item.mes[2]}}</p>
		</li>
    </ul>
  </div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import MyAjax from "../../assets/js/MyAjax.js"
  export default {
    name: 'stytem',
    data:function(){
    	return{
    		notice:[
    			
    		],
    		noticeNum:"0",
    		mesState:[],
    	}
    },
    mounted(){
    	this.getData();
	},
	computed:mapState({
		user:state=>state.userState.user,
	}),
    methods:{
    	getData(){
    		var that = this;
    		var url = MyAjax.urlhw +"/sysmessageaccountrela/findByMySelf";
				MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					console.log(data)
					that.notice = [];
					that.mesState = [];
					that.noticeNum=data.msg.length;
					if(data.code==0){
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
									mes:"",
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
					}else{
						// if(data.msg=="100004"){//没有token
						// 	window.location.hash="/login"
						// }
					}
					console.log(that.notice)
				},function(err){
					console.log(err)
				})
   		},
   		goToDetail(id,pkid,urlName){
    		this.read(pkid);
    		router.push({name:urlName,query:{id:id}})
    	},
    	read(pkid){
				console.log(pkid)
				var that = this;
				var url = MyAjax.urlhw +"/sysmessageaccountrela/update";
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
						that.getNewNote()
					}
				},function(err){
					console.log(err)
				})
		},
		getNewNote(){//通知是否有新消息提示
			var that = this;
			var url = MyAjax.urlhw +"/ediHomePage/newNotice";
			MyAjax.ajax({
				type: "GET",
				url:url,
				dataType: "json",
				async: false,
			},function(data){
				console.log(data.msg)
				if(data.code==0){
					if(!(data.msg.sysCount||data.msg.businessCount)){
						that.user.newNotice=false;
					}else{
						that.user.newNotice=true;
					}
				}else{
					console.log("错误返回")
				}
			
			},function(err){
				console.log(err)
			})
		}
  }
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
                    cursor: pointer;
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
