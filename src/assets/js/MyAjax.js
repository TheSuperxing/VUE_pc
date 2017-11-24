//function MyAjax() {
//	);
//}
import fetchJsonp from "fetch-jsonp"
var MyAjax = {
	urlsy:"http://10.1.31.16:8080",
	ajax(option,callback,errCallback) {
		$.ajax({
			type: option.type,
			url: option.url,
//			beforeSend:function(request){
//				request.setRequestHeader("token",token)
//			},
			data: option.data,
			dataType: option.dataType,
			contentType: option.contentType, 
			
			async: false, // 使用同步方式  
			success: function(data) {			
				callback(data);
			},error:function(error){
				errCallback(error)
			}
		})
	},
	delete(url){
		$.ajax({
			type: "DELETE",
			url: url, 
			async: false, // 使用同步方式  
			success: function(data) {	
				console.log("ok")
			},error:function(error){
				console.log(error)
			}
		})
	},
	fetch(url, successCallback, errCallback){
		fetch(url).then(function(response){
			return response.json();
		}).then(function(data){
			successCallback(data);
		}).catch(function(e){
			errCallback("error");
		});
	},
	fetchJsonp(url, successCallback, errCallback) {
//		debugger;
		fetchJsonp(url).then(function(response) {
			return response.json();
		}).then(function(data){
			successCallback(data);
		}).catch(function(e) {
			errCallback("error");
		});
	}

}
export default MyAjax;