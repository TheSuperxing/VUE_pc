
import Activate from "../../components/loginandregister/register/activate.vue"
import comfirmActivate from "../../components/loginandregister/register/comfirmActivate.vue"
import ResetPwd from "../../components/loginandregister/login/resetPwd.vue"

var activate = [
	{
		path:"/yhzx/activate",component:Activate,
	},{
		path:"/yhzx/comfirmActivate/:id",component:comfirmActivate,
	},{
    	path:"/yhzx/resetPwd/:id",name:"ResetPwd",component:ResetPwd
    }
]

function activateRouter(){
	return activate;
}

export {activateRouter}
