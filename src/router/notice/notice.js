import Notice from "../../components/notice/notice.vue"
import Stytem from "../../components/notice/stytem.vue"
import Demand from "../../components/notice/demand.vue"
import Deal from "../../components/notice/deal.vue"
import Merchandise from "../../components/notice/merchandise.vue"
var notice = {
    path:"/notice",name:"Notice",component:Notice,redirect:"/notice/stytem",
    children:[
        {
            path:"/notice/stytem",name:"Stytem",component:Stytem
        },
        {
            path:"/notice/demand",name:"Demand",component:Demand
        },
        {
            path:"/notice/deal",name:"Deal",component:Deal
        },
        {
            path:"/notice/merchandise",name:"Merchandise",component:Merchandise
        }
    ]

}

function noticeRouter(){
	return notice;
}

export {noticeRouter}