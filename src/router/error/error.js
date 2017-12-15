import Error from "../../components/error/error.vue"
import Error_404 from "../../components/error/404.vue"
import Error_500 from "../../components/error/500.vue"

var error = {
    path:"/error",name:"Error",component:Error,redirect:"/error/404",
    children:[
        {
            path:"/error/404",name:"Error_404",component:Error_404
        },
        {
            path:"/error/500",name:"Error_500",component:Error_500
        },
    ]

}

function errorRouter(){
	return error;
}

export {errorRouter}