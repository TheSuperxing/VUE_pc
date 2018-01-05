

export default{
	state:{
		user:{
			userState:0,//传递三种不同的用户
			newNotice:false,//header中的同时是否提示有新的通知（小红点）
		},
		
	},
	mutations:{
		user:(state,info)=>{state.user=info}
	}
}
