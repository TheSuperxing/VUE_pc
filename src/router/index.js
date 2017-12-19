import Vue from 'vue'
import Router from 'vue-router'
import IndexContent from "../components/index/index_content.vue"
import Index from "../components/index/index.vue"
import SearchPersonal from "../components/index/search_personal.vue"
import SearchTeam from "../components/index/search_team.vue"
import SearchCompany from "../components/index/search_company.vue"
import SearchProject from "../components/index/search_project.vue"
import Trading from "../components/trading/trading.vue"
import TradingIndex from "../components/trading/tradingIndex.vue"
import DemandDetail from "../components/trading/demandDetail.vue"

import Users from "../components/users.vue"
import Register from "../components/loginandregister/register/Register.vue"
import Login from "../components/loginandregister/login/loginIndex.vue"
import Regkind from "../components/loginandregister/register/regkind.vue"
import RegisterDone from "../components/loginandregister/register/registerDone.vue"
/*用户部分路由开始*/

/*|获取公司部分路由|*/
//import {companyRouter} from "./company"
///*|获取个人部分路由|*/
//import {personalRouter} from "./personal"
//
//import {teamRouter} from "./team"


//console.log(RegisterDone.data().state);/*0*/
/*用户部分路由结束*/
//获取不同用户 对应不同用户的处理结果 
/*路由逻辑开始*/
import {userRouter} from "../assets/js/router"
var routerChildren = userRouter();
/*路由逻辑结束*/
/*通知部分路由开始*/
import {noticeRouter} from "./notice/notice"
var notice=noticeRouter();
/*通知部分路由结束*/
/*错误路由开始*/
import {errorRouter} from "./error/error"
var error=errorRouter();
/*错误路由结束*/
/*主体路由开始*/
Vue.use(Router)

export default new Router({
  routes: [
   	{
    	path:"/",redirect:"/login"
    },
    {
    	path:"/login",name:"LoginIndex",component:Login
    },
    {
    	path:"/register",redirect:"/register/regkind/0",
    },
    {
    	path:"/register",name:"Register",component:Register,
    	children:[
    		{
    			path:"regkind/:id",name:"regkind",component:Regkind
    		}
    	]
    },
    {
    	path:"/registerDone/:id",name:"RegisterDone",component:RegisterDone
    },{
    	path:"/indexcontent",name:"IndexContent",component:IndexContent,redirect:'/indexcontent/index',
    	children:[
    		{
    			path:'/indexcontent/index', name:'Index',component:Index,
    		},{
    			path:'/indexcontent/serachperson', name:'SearchPersonal',component:SearchPersonal,
    		},{
    			path:'/indexcontent/serachteam', name:'SearchTeam',component:SearchTeam,
    		},{
    			path:'/indexcontent/serachcompany', name:'SearchCompany',component:SearchCompany,
    		},{
    			path:'/indexcontent/serachproject', name:'SearchProject',component:SearchProject,
    		},
    	]
    },{
    	path:"/trading",name:"Trading",component:Trading,redirect:"/trading/index",
    	children:[
    		{
    			path:"/trading/index",component:TradingIndex,
    		},{
    			path:"/trading/detail",component:DemandDetail,name:"DemandDetail",
    		}
    	]
    },
    {
      path:"/yhzx", name:"Users",component:Users,
      children:routerChildren
		},
		notice,
		error
  ],
  scrollBehavior (to,from,savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	}
})





























