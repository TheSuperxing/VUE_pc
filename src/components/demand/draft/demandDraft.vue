<template>
	<div class="demandDraft">
		<ul class="draftTable">
			<li class="stateNone" v-if="!haveInfo">暂无草稿</li>
			<li v-for="(item,index) in draftInfo">
				<h3>
					<router-link :to="{path:'/yhzx/demand/draft/detail',query:{id:item.demandbasicinfo.pkid}}">{{item.demandbasicinfo.demandName}}</router-link>
					<span @click="deleteThis(item.demandbasicinfo.pkid)">
						<img src="../../../assets/img/demand/delete-black.png" />
						<img src="../../../assets/img/demand/icon49.png" />
						删除
					</span>
					<span @click="goToModify(item.demandbasicinfo.pkid)">
						<img src="../../../assets/img/demand/icon3.png" />
						<img src="../../../assets/img/demand/icon1.png" />
						编辑
					</span>
				</h3>
				<p>创建时间：{{item.demandbasicinfo.creTime}}</p>
				<div id="modal-overlay" v-bind:class="confirmDelete[index]">
					<div class="detail-wrap">
						<h5></h5>
						<span class="modalChaBtn" @click="closeModal(item.demandbasicinfo.pkid)"></span>
						<p>确定删除该草稿吗？</p>
						
						<div class="confirmBtn" @click="cfmDelete(item.demandbasicinfo.pkid)">
							确认删除
						</div>
					</div>
				</div>
			</li>
		</ul>
		
		<!--模态框-->
		
	</div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import router from '../../../router'
	import Modal from "../../../assets/js/modal"
    import MyAjax from "../../../assets/js/MyAjax.js"
	
	export default{
		name:"demandDraft",
		data:function(){
			return{
				confirmDelete:[],//确认删除的模态框类名
				draftInfo:[],
				haveInfo:false,
			}
		},
//		computed:mapState({
//			draftInfo:state=>state.demand.draftInfo/*获取vuex数据*/
//		}),
		created(){
			this.getData();
		},
		mounted(){
			$(document.body).scrollTop(0)
			//遍历所有需求列获取需求个数来确定模态框个数；
			
		},
		methods:{
			getData(){
				var that = this;
				var url = MyAjax.urlhw+"/demandbasicinfo/findByMySelf/" + "draft"
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						console.log(data.msg)
						Vue.set(that,"draftInfo",data.msg)
						if(that.draftInfo.length!=0){
							Vue.set(that,"haveInfo",true)
						}else{
							Vue.set(that,"haveInfo",false)
						}
						console.log(that.haveInfo)
					}
					
					console.log(that.draftInfo)
				},function(err){
					console.log(err)
				})
		    	that.confirmDelete = [];
		    	for(var i=0;i<that.draftInfo.length;i++){
					that.confirmDelete.push("confirmDelete"+that.draftInfo[i].demandbasicinfo.pkid);
				}
			},
			deleteThis(id){
				var deleteMoadl = "confirmDelete"+id;
				Modal.makeText($("."+deleteMoadl));
				
			},
			goToModify(id){
				this.closeModal(id);
				router.push({name:"modifyDraft",query:{id:id}})
			},
			cfmDelete(id){
				
				var that = this;
				var url = MyAjax.urlhw+"/demandbasicinfo/del/" + id
		    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.getData();
						that.closeModal(id);
					}
				},function(err){
					console.log(err)
				})
				
			},
			closeModal(id){
				var deleteMoadl = "confirmDelete"+id;
				Modal.closeModal($("."+deleteMoadl));
			}
		}
		
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.demandDraft{
	width: 940px;
	min-height: 410px;
	float: left;
	background: $bfColor;
	border-radius: 5px;
	padding: 30px 20px 50px;
	.draftTable{
		.stateNone{
			border: none;
			font-size: 18px;
			line-height: 24px;
			text-align: center;
			color: #898989;
		}
		li{
			padding:20px 0;
			border-bottom: 1px solid #E0E0E0;
			h3{
				height: 34px;
				line-height: 34px;
				text-align: left;
				font-size: 18px;
				color: $activeColor;
				position: relative;
				a{
					color: $activeColor;
					float: left;
					
				}
				span{
					/*position: absolute;*/
					float: right;
					height: 34px;
					line-height: 34px;
					color: #535353;
					cursor: pointer;
					font-size: 14px;
					&:nth-of-type(2){
						margin-right: 20px;
					}
					
					img{
						margin-right: 10px;
						margin-top: 10px;
						float: left;
						&:first-child{
							display: block;
						}
						&:last-child{
							display: none;
						}
					}
					&:hover{
						color:$activeColor ;
						img{
							&:first-child{
								display: none;
							}
							&:last-child{
								display: block;
							}
						}
					}
				}
			}
			p{
				color: #858585;
			}
		}
	}
	#modal-overlay{
		.detail-wrap{
			width: 480px;
			padding: 50px 0px;
			background: #FFFFFF;
			border-radius: 10px;
			position:absolute;top:50%;left:50%; 
			transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
			-moz-transform:translate(-50%,-50%);
			-ms-transform:translate(-50%,-50%);
			-o-transform:translate(-50%,-50%);
			p{
				font-size: 18px;
				height: 30px;
				line-height: 30px;
				text-align: center;
			}
			.modalChaBtn{
				width: 20px;
			     height: 20px;
			     background: url(../../../assets/img/demand/icon004.png) no-repeat center;
			     position: absolute;
			     top: 20px;
			     right: 30px;
			     cursor: pointer;
			}
			.confirmBtn{
				
				width: 160px;
				height: 42px;
				line-height: 42px;
				text-align: center;
				background: url(../../../assets/img/demand/bg21.png) no-repeat;
				margin: 30px auto 10px;
				color: $bfColor;
				cursor:pointer;
			}
		}
	}
}

</style>