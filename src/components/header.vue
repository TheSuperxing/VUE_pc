<template>
  <div class="header">
    <!--<div class="headerTop">
      <h2>{{petName}}</h2>
      <ul class="topRight">
        <li>
           <p v-on:mouseover="outTogOver(tog)" v-on:mouseout="outTogOut(tog)">
            <span>设置</span>
          </p> 
           <div class="tuichu" v-if="tog.value">
            <span></span>
            <p><em>退出登录</em></p>
          </div> 
        </li>
        <li class="notice">
          <router-link to="/notice">
            <span>消息</span>
            <span v-cloak>（{{msgNum}}）</span>
          </router-link>
        </li>
      </ul>
    </div>-->

    <!--<div class="headerNavBg" v-if="user.userState==1">
      <div class="headerNav">
        <h1>LOGO</h1>
        <ul class="navlist" v-bind:class="{'comStyle':user.userState==1}">
          <li class="primary" v-for="(item,_index) in nav"><router-link :to="item.rout[1]" @click="getState">{{item.text}}</router-link></li>
        	<li class="primary">
        		<div @click="redirect"><router-link to="/yhzx">用户中心</router-link></div>
        		<ul class="userNav">
		        	<li><router-link to="/yhzx/company/info">我的资料</router-link></li>
		        	<li><router-link to="/yhzx/demand">我的需求</router-link></li>
		        	<li><router-link to="/yhzx/deal">我的协议</router-link></li>
		        </ul>
        	</li>
        </ul>

      </div>
    </div>

    <div class="headerNavBg" v-if="user.userState==2">
      <div class="headerNav">
        <h1>LOGO</h1>
        <ul class="navlist" v-bind:class="{'teamStyle':user.userState==2}">
          <li class="primary" v-for="(item,_index) in nav"><router-link :to="item.rout[2]" @click="getState">{{item.text}}</router-link></li>
        	<li class="primary">
        		<div  @click="redirect"><router-link to="/yhzx">用户中心</router-link></div>
        		<ul class="userNav">
		        	<li><router-link to="/yhzx/team/info">我的资料</router-link></li>
		        	<li><router-link to="/yhzx/demand">我的需求</router-link></li>
		        	<li><router-link to="/yhzx/deal">我的协议</router-link></li>
		        </ul>
        	</li>
        </ul>
      </div>
    </div>-->

    <!--个人状态的导航-->
    <div class="headerNavBg"  >
      <div class="headerNav" >
        <div class="wrap-left">
        	<img src="../assets/img/header/001.png" />
        </div>
        <ul class="navlist" v-bind:class="{'personStyle':user.userState==0}">
          <li class="primary" v-for="(item,_index) in nav"><router-link :to="item.rout[0]">{{item.text}}</router-link></li>
        	<li class="primary" >
        		<div><router-link to="/yhzx/personal/info">用户中心</router-link></div>
        		<ul class="userNav">
		        	<li><router-link to="/yhzx/personal/info">我的资料</router-link></li>
		        	<li><router-link to="/yhzx/demand">我的需求</router-link></li>
		        	<li><router-link to="/yhzx/deal">我的协议</router-link></li>
		        </ul>
        	</li>
        </ul>
        <div class="searchBox" @keydown="keySearch($event)">
        	
        	<input type="text" placeholder="搜索需求" v-model="searchTxt" />
        	<span class="searchButton" @click="search(searchTxt)"></span>
        </div>
        <div class="wrap-right">
        	<div class="resLog" v-if="!haveLogin">
        		<router-link to="/login">登录</router-link>
        		<router-link to="/register">注册</router-link>
        	</div>
        	<div class="logState" v-if="haveLogin">
        		<router-link to="/notice">
						通知
						<span v-if="user.newNotice"></span>
						</router-link>
        		<div class="userImg">
        			<img src="../assets/img/header/1515.png" alt="../assets/img/header/1515.png"/>
        			<div class="log-out">
        				<img src="../assets/img/header/1616.png" />
        				<em @click="loginOut">退出登录</em>
        			</div>
        		</div>
        		
        	</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import {mapState} from "vuex"
  import router from "../router"
  import MyAjax from "../assets/js/MyAjax.js"
  import {cookieTool} from "../assets/js/cookieTool.js"
  
  export default {
    name: 'hello',
    data: function () {
      return {
        msgNum: "5",
        tog:{value:false},
        nav: [{
          text: "首页",
          rout: ["/indexcontent","/indexcontent","/indexcontent"],
          active: false
        }, {
          text: "交易大厅",
          rout: [{path:"/trading",query:{kw:""}},{path:"/trading",},{path:"/trading",}],
          active: false
        },],
        
        searchTxt:"",//头部搜索框内容

       	comStyle:true,
       	teamStyle:true,
        /*导航原始数据*/

        /*导航颜色切换原始状态*/
       	state:"",
				haveLogin:true,
				
      }
    },
    computed:mapState({
	      petName:state=>state.personal.personalMessage.baseInfo.petName,
	      user:state=>state.userState.user,
				//newNotice:state=>state.userState.user.newNotice
	    }),
		created(){
			this.getNewNote();
		},
	  mounted(){
				//判断有没有登录
				console.log(cookieTool.getCookie("token"))
				if(cookieTool.getCookie("token")==null){
					this.haveLogin = false;
				}else{
					this.haveLogin = true;
				}
				
				this.user.userState = sessionStorage.getItem("state");
				
				//首页请求信息
				var that = this;
				var url = MyAjax.urlhw+"/accountmanainfo/home";
				MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,					
				},function(data){
          data = data.msg;
					// if(data == "100004"){
					// 	cookieTool.delCookie("token")
					// 	router.push("/login")
          // } 
				},function(err){
					console.log(err)
				})

		},
	  updated(){
	  	this.user.userState = sessionStorage.getItem("state");
	  },
    methods: {
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
				},
				/*nav单击切换颜色*/
	      outTogOver:function (tog) {
	        Vue.set(tog,"value",true)
	      },
	      outTogOut:function (tog) {
	        Vue.set(tog,"value",false)
	      },
	      /*鼠标滑过 退出登录的显示隐藏*/

	     getState(){
	     	this.state = sessionStorage.getItem("state");
	     },

	     redirect(){
	     	//console.log(this.user.userState)
				// if(cookieTool.getCookie("token")==null){
				// 	router.push("/login")
				// }
				switch (this.user.userState){
					case '1':
						router.push("/yhzx/company/overview")
						break;
					case '2':
						router.push("/yhzx/team/overview")
						break;
					case '0':
						router.push("/yhzx/personal/overview")
						break;
					default:
						break;
				}
				event.stopPropagation();
			},
			loginOut(){
				// cookieTool.setCookie("token","")
				// console.log(cookieTool.getCookie("token"))
				// if(cookieTool.getCookie("token")==""){
				// 	router.push("/login")
				// }
				cookieTool.delCookie("token");
				router.push("/indexcontent/index")
				this.haveLogin = false;
			},
			search(searchTxt){
				router.push({name:"Trading",query:{kw:searchTxt}})
			},
			keySearch($event){//enter键登录事件
      	var event = $event || window.event;  
				 	if(event.keyCode==13){ 
		     		this.search(this.searchTxt);
	         	event.returnValue = false;    
	         	event.cancelBubble=true;
	         	event.preventDefault();
	         //event.stopProgagation();
	         	return false;
	      	} 
		
			},
    },


 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 $themeColor:#ff7403; 
  .header{
    width:100%;
    min-width: 1200px;
    height: 70px;
    position: fixed;
    top: 0;
    left:0;
    z-index: 1030;
    font-size: 14px;
    .headerTop{
      height: 39px;
      background: #323333;
      color: #e1e1e1;
      h2{
        font-size:14px;
        float: left;
        padding-left:50px;
        line-height: 40px;
      }
      .topRight{
        float: right;
        padding-right:39px;
        li{
          float: left;
          line-height: 40px;
          height: 40px;
          a{
            display: inline-block;
            padding-left:37px;
            color: #ffffff;
            span:nth-child(2){
              color: #2eb3df;
            }
          }
        }
        li:nth-child(1){
          position: relative;
          p{
            background: url("../assets/img/top/shezhi.png") left center no-repeat;
            span{
              padding-right:35px;
            }
          }
          .tuichu{
            width: 140px;
            height: 44px;
            background: #ffffff;
            margin-left:-35px;
            position: absolute;
            bottom: -49px;
            border-radius: 10px;
            span{
              display: inline-block;
              height: 25px;
              width: 25px;
              background: #fff;
              transform: rotate(45deg);
              border:1px solid #eee;
              position: absolute;
              top: -8px;
              left: 33px;
              z-index: 20;
            }
            P{
              width: 138px;
              height: 42px;
              padding:0;
              color: #535353;
              position: absolute;
              z-index: 30;
              background: #fff;
              padding-left:30px;
              font-size: 14px;
              line-height: 44px;
              em{
                background: url("../assets/img/top/tuichu.png") left center no-repeat ;
                padding-left:25px;
              }
            }
          }
        }
        .notice{
          a{
            background: url("../assets/img/top/xiaoxi.png") left center no-repeat;
          }
        }
      }
    }

    /*以上是top*/
    .headerNavBg{
      width:100%;
      height: 70px;
      background: #FFFFFF;
      border-bottom:1px solid #e0e0e0;

      .headerNav{
        width: 1200px;
        height:70px;
        position: relative;
        margin: 0 auto;
        .wrap-left{
          float: left;
          height: 100%;
          margin-right: 140px;
          img{
          	width: 201px;
          	height: 34px;
          	margin-top: 17px;
          }

        }
        .wrap-right{
        	float: right;
        	height: 70px;
        	text-align: 70px;
        	.resLog{
        		height:70px; 
        		line-height: 70px;
        		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
        		a{
        			height: 30px;
        			line-height: 30px;
	        		float: left;
	        		margin-top: 20px;
	        		color: $themeColor;
	        		
	        		&:first-child{
	        			margin-right: 16px;
	        		}
	        		
	        	}
        	}
        	.logState{
        		height:70px;
        		line-height:70px;
        		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
        		a{
        			float: left;
        			color: #353535;
        			margin-right: 16px;
        			position: relative;
							span{
								display: block;
								width:10px;
								height: 10px;
								background: url("../assets/img/header/notice.png") left center no-repeat;
								position: absolute;
								top:24px;
								right: -6px;
							}
        		}
        		.userImg{
        			width: 40px;
	        		height: 70px;
	        		line-height: 70px;
	        		border-radius:50%;
	        		position:  relative;
        			float: left;
        			&:hover{
        				.log-out{
        					display: block;
        					cursor: pointer;
        				}
        			}
        			.log-out{
        				position: absolute;
        				top: 70px;
        				left: -80%;
        				width: 100px;
        				height: 40px;
        				line-height: 40px;
        				text-align: center;
        				padding-top: 3px;
        				/*padding-left: 14px;*/
        				background: url(../assets/img/header/圆角矩形2.png) no-repeat;
        				color: #FFFFFF;
        				display:none;
        				img{
        					margin-right: 5px;
        					margin-bottom: 2px;
        				}
        				em{
        					display: inline-block;
        					
        				}
        			}
        		}
        		.loginBox{
        			height: 70px;
	        		line-height: 70px;
        		}
        	}
        	
        }

        .comStyle{
        	.primary{
        		a{
				  		&.router-link-active{
				      		color: #2EB3CF;

				      	}
				  	}
        	}


			  }
			  .teamStyle{
			  	.primary{
			  		a{

				  		&.router-link-active{
					  		color: #02a672;

					  	}
				  	}
			  	}


			  }
			  .personStyle{
			  	.primary{
			  		a{
				  		&.router-link-active{
					  		color: #FFFFFF;
		
					  	}
				  	}
			  	}

			  }
        .navlist{
          float: left;
          .primary{
            float: left;
            width: 108px;
            height:70px;
            line-height: 70px;

            position:relative;
            cursor: pointer;
            &:hover{
            	background: #333333;
            	a{
            		color: #FFFFFF;
            	}
							.userNav{
								display: block;
							}
            }

            a{
              width: 100%;
              height: 100%;
              text-align: center;
              color: #353535;
              text-decoration: none;
              display: block;
              height:70px;
              line-height: 70px;
              span{
                display: block;
                height:70px;
                border-bottom: 2px solid #f7f9fc;
              }
            }
            .userNav{
            	width: 100%;
            	background: #4d4d4d;
            	position: absolute;
            	
            	left: 0;
            	top: 70px;
            	display: none;
	          	li{
	          		height: 40px;
	          		line-height: 40px;

	          		a{
	          			height: 100%;
	          			width: 100%;
	          			display: inline-block;
	          			line-height: 40px;
	          			text-align: center;
	          		}
	          		&:hover{
	          			background: #333333;
	          		}
	          	}
	          }
          }

         a.router-link-active{
           	background: #333333;
           	color: #FFFFFF;
            span{
              border-bottom-color: #2eb3df;
            }
          }
        }
        .searchBox{
        	width: 300px;
        	height: 36px;
        	box-shadow: 0 0 15px rgba(179,179,179,.5);
        	border-radius: 17px;
        	float: left;
        	margin-left: 97px;
        	margin-top: 15px;
        	padding: 0 8px;
        	
        	background-position: 16px;
        	.searchButton{
        		width: 10%;
        		height: 100%;
        		float: left;
        		background: url(../assets/img/header/002.png) no-repeat center;
        		cursor: pointer;
        		
        		a{
        			display: block;
        			width: 100%;
        			height: 100%;
        		}
        	}
        	input{
        		width: 85%;
        		height: 100%;
        		margin-left: 5px;
        	}
        }

      }
    }
  }


</style>
