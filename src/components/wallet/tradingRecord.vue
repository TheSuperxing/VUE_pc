<template>
	<div class="tradingRecord">
		<h1 class="flow-title"><span>交易记录</span><em>如对交易记录有疑问，请联系管理员</em></h1>
		<table class="flow-wrap" border="0" cellpadding="0" cellspacing="0">
			<tr class="f-title">
				<th>交易时间</th>
				<th>金额</th>
				<th>交易对象</th>
				<th>关联协议</th>
				<th>状态</th>
				<th></th>
			</tr>
			
			<tr v-for="(item,index) in flowInfo">
				<td>{{item.tradingDate}}&nbsp;&nbsp;{{item.time}}</td>
				<td>{{item.amount}}</td>
				<td>{{item.tradingObj}}</td>
				<td>{{item.dealName}}</td>
				<td>{{item.status}}</td>
				<td ><span @click="alertModal(index)">去确认</span></td>
				
				
			</tr>
		</table>
	</div>
</template>

<script>
	export default{
		name:"tradingRecord",
		data:function(){
			return{
				flowInfo:[
					{
						tradingNum:"FDAD1545426",
						tradingDate:"2013.05.06",
						time:"14:30",
						amount:"5000",
						remain:"13000",
						dealName:"与万达的协议",
						tradingType:"协议内付款",
						tradingObj:"万达",
						operate:"收款",
						status:"待确认"
						
					},
					{
						tradingNum:"DSAD1545256",
						tradingDate:"2017.09.06",
						time:"14:30",
						amount:"8000",
						remain:"13000",
						dealName:"与万达的协议",
						tradingType:"协议内付款",
						tradingObj:"万达",
						operate:"收款",
						status:"已确认"
						
					},
					{
						tradingNum:"DSCA1545256",
						tradingDate:"2015.06.06",
						time:"14:30",
						amount:"-8000",
						remain:"13000",
						dealName:"与腾讯腾讯腾讯腾讯腾讯腾讯腾讯腾讯的协议",
						tradingType:"协议内付款",
						tradingObj:"腾讯",
						operate:"打款",
						status:"待确认"
					},
					{
						tradingNum:"DSCA1545256",
						tradingDate:"2015.06.06",
						time:"14:30",
						amount:"-8000",
						remain:"13000",
						dealName:"与腾讯的协议",
						tradingType:"协议内付款",
						tradingObj:"腾讯",
						operate:"打款",
						status:"待对方确认"
					}
				],
			}
		},
		mounted(){
			
		}
	}
	
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
	.tradingRecord{
		padding: 30px;
		/*margin-top: 27px;*/
		.flow-title{
			height: 40px;
			line-height: 40px;
			border-bottom:1px solid #EBEBEB;
			
			span{
				height: 40px;
				line-height: 40px;
				display: inline-block;
				color: $activeColor;
				border-bottom: 2px $activeColor solid;
				font-size: 16px;
			}
			em{
				margin-left: 20px;
				font-size: 14px;
				color: #808080;
			}
		}
		.flow-wrap{
			/*width: 100%;*/
			border-collapse:collapse;
			margin-top: 30px;
			tr{
				
				padding: 22px 0;
				border-bottom: 1px dotted #cdcdcd;
				&:hover{
					color: #F27519;
					td:last-of-type{
						
						span{
							background: url(../../assets/img/wallet/bg40.png);
						}
					}
				}
				td{
					width: 120px;
					height: 62px;
					line-height: 62px;
					text-align: center;
					margin: 0; padding: 0;
					&:nth-child(1){
						width: 180px;
						text-align: left;
						padding-left: 15px;
						span{
							margin-right: 10px;
						}
					}
					&:nth-of-type(4n){
						line-height: 24px;
					}
					&:last-of-type{
						width: 160px;
						text-align: center;
						
						span{
							width: 100px;
							height: 30px;
							line-height: 30px;
							color: #FFFFFF;
							display: inline-block;
							background: url(../../assets/img/wallet/bg41.png);
							cursor: pointer;
							vertical-align: middle;/*样式修正*/
							cursor: pointer;
							float: right;
						}
					}
				}
			}
			.f-title{
				
				
				/*display: inline-block;*/
				background: #f8f8f8;
				
				border:1px solid #EBEBEB;
				th{
					color: #767676;
					font-weight: normal;
					width: 120px;height: 58px;
					text-align: center;
					&:nth-child(1){
						width: 180px;
						text-align: left;
						padding-left: 22px;
					}
					&:nth-child(4){
						width: 180px;
					}
					
				}
			}
		}
	}
</style>