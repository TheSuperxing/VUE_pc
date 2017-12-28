<template>
	<div class="search_all">
		<div class="menu">
			<ul>
				<li v-for="(item,$index) in tab" @click="tabChange($index)">
					<router-link :to='{name:item.rout,query:{kw:"all"}}'>{{item.text}}</router-link>
				</li>
				
			</ul>
			<div v-for="(item,index) in tab" class="search-wrap" v-if="index==indexActive">
				<input type="text" :placeholder="item.text" v-model="searchText"/>
				<span class="searchButton" @click="search(searchText,item.rout)"></span>
			</div>
			<div class="hotWordsWrap">
				<p v-for="(item,index) in hotWords" @click="choseHot(index)">{{item}}</p>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import Vue from "vue"
	import router from "../../router"
	export default{
		name:"search_all",
		data:function(){
			return{
				tab:[
					{
						text:"搜个人",
						rout:"SearchPersonal",
					},{
						text:"搜团队",
						rout:"SearchTeam",
					},{
						text:"搜公司",
						rout:'SearchCompany',
					},{
						text:"搜项目",
						rout:'SearchProject',
					},
					
				],
				indexActive:"",
				searchText:"",
			    hotWords:["李彦宏","马化腾","马云","优秀"],
			}
		},
		mounted(){
			console.log(this.$router.history.current.name)
			console.log(this.$route.query)
			
			switch (this.$router.history.current.name){
				case "SearchPersonal":
					Vue.set(this,"indexActive",0)
					break;
				case "SearchTeam":
					Vue.set(this,"indexActive",1)
					break;
				case "SearchCompany":
					Vue.set(this,"indexActive",2)
					break;
				case "SearchProject":
					Vue.set(this,"indexActive",3)
					break;
				default:
					break;
			}
			console.log(this.indexActive)
			
		},
		methods:{
			tabChange(index){
				
				Vue.set(this,"indexActive",index)
				
			},
			choseHot(index){
    			this.searchText = this.hotWords[index]
    		},
			search(txt,rout){
				router.push({name:rout,query:{kw:txt}})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
.search_all{
	padding-top: 70px;
	
	background: #FFFFFF;
	.menu{
		width: 1200px;
		margin: 70px auto;
		ul{
			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			border-bottom:2px solid #ff7403;
			background:#FFFFFF;
			li{
				float: left;
				width: 25%;
				height: 50px;
				a{
					display: block;
					width: 100%;
					height: 52px;
					line-height: 52px;
					text-align: center;
					font-size: 16px;
					color: #333333;
					
				}
				.router-link-active{
					color: #ff7403;
					/*background: #ff7403;*/
					border: 2px solid #ff7403;
					border-radius: 5px 5px 0 0;
					border-bottom: 2px solid #FFFFFF;
					font-weight: bold;
				}
				&:hover{
					/*background: rgba(255,116,3,.3);*/
				}
			}
		}
		.search-wrap{
			width: 700px;
			height: 50px;
			border-radius: 25px;
			box-shadow: 0 0 15px rgba(179,179,179,.5);
			padding: 0 20px ;
			margin: 0px auto 0;
			background-color: #FFFFFF;
			margin-top: 40px;
			input{
        		width: 95%;
        		height: 100%;
        		background: none;
        		font-size: 16px;
        	}
        	.searchButton{
        		width: 5%;
        		height: 100%;
        		float: right;
        		background: url(../../assets/img/header/1717.png) no-repeat center;
        		cursor: pointer;
        	}
        	
		}
		.hotWordsWrap{
			width: 700px;
			margin: 10px auto;
    		height: 20px;
    		p{
    			display: inline-block;
    			padding-right: 10px;
    			margin-left: 12px;
    			font-size: 14px;
    			height: 14px;
    			line-height: 14px;
    			border-right: 2px solid #353535;
    			cursor: pointer;
    		}
    		p:last-child{
    			border-right: none;
    		}
        }
	}
}
</style>