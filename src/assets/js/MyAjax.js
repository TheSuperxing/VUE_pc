//function MyAjax() {
//	);
//}
import {cookieTool} from "./cookieTool.js"
import fetchJsonp from "fetch-jsonp"
var MyAjax = {
	ajax(option,callback,errCallback) {
		$.ajax({
			type: option.type,
			url: option.url,
			beforeSend:function(request){
				request.setRequestHeader("token",cookieTool.getCookie("token"))
			},
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