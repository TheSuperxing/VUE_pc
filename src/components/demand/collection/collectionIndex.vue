<template>
	<div class="collectionIndex">
		<ul class="collectionTable">
			<li class="stateNone" v-if="!haveValue">暂无数据</li>
			<li v-for="(item,index) in collections">
				<h3>
					<router-link :to="{name:'colletionDetail',query:{id:item.demandbasicinfo.pkid}}">{{item.demandbasicinfo.name}}</router-link>
					<span @click="cancelCollect(item.demandbasicinfo.pkid)">取消收藏</span>
				</h3>
				<p>创建时间：{{item.demandbasicinfo.creTime}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../../assets/js/modal.js"
	import router from '../../../router'
    import MyAjax from "../../../assets/js/MyAjax.js"
	
	export default{
		name:"collectionIndex",
		data:function(){
			return{
				haveValue:true,
				collections:[],
				
			}
		},
		computed:mapState({
		  demandInfo:state=>state.demand.demandInfo/*获取vuex数据*/,
		  colletionInfo:state=>state.demand.colletionInfo,
		  applicationInfo:state=>state.demand.applicationInfo,
		}),
		mounted(){
			
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				var that = this;
				var url_valid = MyAjax.urlhw+"/demandbasicinfo/findByMySelf/" + "collect"
		    	MyAjax.ajax({
					type: "GET",
					url:url_valid,
					dataType: "json",
					async:false,
				},function(data){
					console.log(data)
					if(data.code==0){
						console.log(data.msg)
						Vue.set(that,"collections",data.msg)
					}
					console.log(that.collections)
				},function(err){
					console.log(err)
				})
		    	if(that.collections.length!=0){
		    		Vue.set(this,'haveValue',true)
		    	}else{
		    		Vue.set(this,'haveValue',false)
		    	}//判断有效需求里面有没有数据
		    	
			},
			cancelCollect(id){
				var url = MyAjax.urlsy +"/tradeHall/collect/"+id+"/"+"0";
				var that=this;
				$.ajaxSetup({ contentType : 'application/json' });
				MyAjax.ajax({
					type: "POST",
					url:url,
//					data: JSON.stringify(that.dataInfo[index]),
					dataType: "json",
					contentType:"application/json;charset=utf-8",
					async: false,
				},function(data){
					console.log(data)
					if(data.code==0){
						that.getData();
					}
				},function(err){
					console.log(err)
				})//更新到服务器
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.collectionIndex{
	padding: 20px 20px;
	.collectionTable{
		.stateNone{
			border-bottom: none;
			height:50px;
			line-height: 50px;
			text-align: center;
			color: #858585;
			font-size: 18px;
		}
		li{
			padding:10px 0;
			border-bottom: 1px solid #E0E0E0;
			h3{
				height: 34px;
				line-height: 34px;
				text-align: left;
				font-size: 18px;
				color: $activeColor;
				position: relative;
				a{
					float:left;
					color: $activeColor;
				}
				span{
					/*position: absolute;*/
					float: right;
					height: 34px;
					line-height: 34px;
					color: #535353;
					cursor: pointer;
					font-size: 14px;
					padding-left: 24px;
					background: url(../../../assets/img/demand/icon59.png) no-repeat left center;
				}
			}
			p{
				color: #858585;
			}
		}
	}
}
</style>