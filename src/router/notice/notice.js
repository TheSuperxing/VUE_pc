import Notice from "../../components/notice/notice.vue"
import Stytem from "../../components/notice/stytem.vue"
import Demand from "../../components/notice/demand.vue"

var notice = {
    path:"/notice",name:"Notice",component:Notice,redirect:"/notice/stytem",
    children:[
        {
            path:"/notice/stytem",name:"Stytem",component:Stytem
        },
        {
            path:"/notice/demand",name:"Demand",component:Demand
        },
    ]

}

function noticeRouter(){
	return notice;
}

export {noticeRouter}