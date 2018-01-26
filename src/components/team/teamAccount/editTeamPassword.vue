<template>

	<div class="editTeamPassword">
		<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
		  <el-form-item label="输入原密码">
		    <el-input v-model="formLabelAlign.oldPwd"></el-input>
		  </el-form-item>
		  <el-form-item label="输入新密码">
		    <el-input v-model="formLabelAlign.newPwd"></el-input>

		  </el-form-item>
		  <p class="notice">密码由6-14位字母（区分大小写）、数字或符号组成</p>
		  <el-form-item label="确认新密码">
		    <el-input v-model="formLabelAlign.cfmnewPwd" @blur="comNewPwd"></el-input>
		  </el-form-item>
		</el-form>
		<alertTip v-if="showAlert" :showHide="showAlert"  :alertText="alertText"></alertTip>
		
		<div class="btnBox">
			<router-link to="/yhzx/team/info/teamAccount">
				<span class="cancelBtn">取消</span>
			</router-link>
				<span class="confirmBtn" @click="confirmEdit">确认</span>
			
		</div>
		<div class="succseed" v-if="showSuc">
			<div class="s-wrap">您已成功修改代码！</div>
			<span class="confirmBtn">完成</span>
		</div>
	</div>

</template>

<script>
	import Vue from 'vue'
	import {Form,FormItem,Input} from "element-ui"
	Vue.use(FormItem)
	Vue.use(Input)
	Vue.use(Form)
	import MyAjax from "../../../assets/js/MyAjax.js"
	import alertTip from "../units/alertTip.vue"
	import router from "../../../router"
	export default{
		data() {
	      return {
	      	name:"editTeamPassword",
	        labelPosition: 'left',
	        formLabelAlign: {
	          oldPwd: '',
	          newPwd: '',
	          cfmnewPwd: ''
	        },
	        showAlert:false,//显隐
   		 	  alertText:"",//提示信息		
	        showSuc:false
	      };
	    },
	    components:{
	    	alertTip,
	    },
	    mounted(){
	    	console.log($('.el-input__inner'))
	    	var that = this;
	    	$('.el-input__inner').blur(function(){
	    		console.log("blur")
	    		if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,14}$/gi.test(that.formLabelAlign.newPwd)&&that.formLabelAlign.newPwd.trim().length!=0){
		    		that.showAlert = true;
		    		that.alertText = '您输入的密码格式不正确';
		    	}else{
		    		that.showAlert = false;
		    	};/*验证公司密码*/
	    	})
	    },
	    methods:{
	    	comNewPwd(){	
	    		if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,14}$/gi.test(this.formLabelAlign.newPwd)&&this.formLabelAlign.newPwd.trim().length!=0){
		    		this.showAlert = true;
		    		this.alertText = '您输入的密码格式不正确';
		    	}else{
		    		this.showAlert = false;
		    	};/*验证公司密码*/
	    	},
	    	confirmEdit(){
	    		var that=this;
		        var url = MyAjax.urlsy+"/teamOrgaInfo/updatePwd";
//		        if(that.formLabelAlign.oldPwd.trim().length!=0&&that.formLabelAlign.newPwd.trim().length!=0
//		        &&that.formLabelAlign.cfmnewPwd.trim().length!=0){
		        	var data = {
		        		oldPwd:that.formLabelAlign.oldPwd,
		        		newPwd:that.formLabelAlign.newPwd
		        	}
		        	console.log(JSON.stringify(data))
		        	MyAjax.ajax({
			          type: "POST",
			          url:url,
			          data:data,
			          dataType: "json",
			          async:false,
			        },function(data){
			        	console.log(data)
		        		switch (data.msg){
		        			case "原密码输入不正确":
		        				Vue.set(that,"showAlert",true)
		        				Vue.set(that,"alertText",data.msg)
		        				break;
		        			case "修改密码成功":
		        				Vue.set(that,"showAlert",true)
		        				Vue.set(that,"alertText",data.msg)
		        				setTimeout(()=>{
		        					router.push("/yhzx/team/info/teamAccount")
								},1000)
		        				break;
		        			default:
		        				break;
		        		}
			        },function(err){
			          if(err.status!=200){
			            //router.push("/index")
			            status=err.status;
			          }
			        })
//		        }
		        
	    	},
	    }
	}
</script>

<style lang="scss">
    $bfColor:#ffffff;
    $activeColor: #02a672;
	.editTeamPassword{
		width:940px;
	    padding:60px 0px;
	    background-color:$bfColor;
	    float:left;
	    border-radius:5px;
	    position: relative;
	    form{
	    	width: 480px;
	    	margin: 0 auto;
		    &.el-form{
		    	position: relative;
		    	.el-form-item{
		    		margin-bottom: 30px !important;
		    		&:nth-child(2){
						margin-bottom: 54px !important;
					}
		    		.el-form-item__label{
		    			font-size: 18px !important;
		    			margin-right: 20px;
		    			padding: 0;
		    			float: left;
		    			height: 40px;
		    			line-height: 40px;
		    			width: 95px !important;
		    		}
		    		.el-form-item__content{
		    			width: 270px !important;
		    			height: 40px;
		    			margin: 0 !important;
		    			float: left;

		    			.el-input{
		    				height: 40px;
		    				.el-input__inner{
		    					height: 40px;
		    				}
		    			}

		    		}
		    	}
		    	.notice{
					position: absolute;
					top: 120px;
					right: 0;
					height: 14px;
					line-height: 14px;
					font-size: 14px;
					color: #9a9a9a;

				}

		    }
	    }
		.alet_container{
			position: absolute;
			left: 50%; bottom:170px ;
			transform:translate(-90%);
			 -webkit-transform:translate(-90%);
			-moz-transform:translate(-90%);
			-ms-transform:translate(-90%);
			-o-transform:translate(-90%);
		}
	    .btnBox{
	    	height: 40px;
	    	width: 330px;
	    	margin:50px auto;
	    	display: flex;
	    	justify-content: space-between;
	    	overflow: hidden;
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
				color: #353535;
	    		&.cancelBtn{
	    			
	    			border: 1px solid #bfcbd9;

	    			&:hover{
	    				border: 1px solid $activeColor;
	    				color: $activeColor;
	    			}
	    		}
	    		&.confirmBtn{
	    			background-image: url("../../../assets/img/team/icon_green_next_nor.png") ;
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

	    .succseed{
	    	width: 940px;
	    	height: 400px;
	    	padding-top: 129px;
	    	background: $bfColor;
	    	z-index: 9999;
	    	position: absolute;
	    	left: 0; top: 0;
	    	padding-left: 341px;
	    	border-radius: 5px;
	    	.s-wrap{
	    		height: 28px;
	    		background: url(../../../assets/img/team/icon_green_congratulation.png) no-repeat left center;

	    		font-size: 24px;
	    		line-height: 28px;
	    		color: $activeColor;
	    		margin-bottom: 60px;
	    		padding-left: 51px;


	    	}
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
	    		margin-left: 59px;
	    		&.confirmBtn{
	    			background-image: url(../../../assets/img/team/icon_green_next_nor.png) ;
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

</style>
