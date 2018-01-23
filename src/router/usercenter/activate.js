
import Activate from "../../components/loginandregister/register/activate.vue"
import comfirmActivate from "../../components/loginandregister/register/comfirmActivate.vue"

var activate = [
	{
		path:"/yhzx/activate",component:Activate,
	},{
		path:"/yhzx/comfirmActivate/:id",component:comfirmActivate,
	}
]

function activateRouter(){
	return activate;
}

export {activateRouter}
