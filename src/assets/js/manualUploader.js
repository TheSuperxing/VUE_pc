import qq from "fine-uploader"
function singleManualUploader(option){//url,picIdCont
    
var manualUploader = new qq.FineUploader({
        element: document.getElementById(option.element),
        template: option.template,
        request: {
            endpoint:option.url
        },
        thumbnails: {

        },
        validation: {
            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
            itemLimit: 5,
            sizeLimit: 1500000
        },
        autoUpload: false,
        debug: true,
        callbacks:{
            onSubmit:  function(id,  fileName)  {
                $("#"+option.element+" .qq-uploader-selector .buttons .btn-primary").show()
                setTimeout(function(){
                    $(".qq-upload-cancel").css("background-image","url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDAwRjA4RTVENEE0MTFFNzgyMzlCQTZGQTY0QzZEMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDAwRjA4RTZENEE0MTFFNzgyMzlCQTZGQTY0QzZEMTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMDBGMDhFM0Q0QTQxMUU3ODIzOUJBNkZBNjRDNkQxOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMDBGMDhFNEQ0QTQxMUU3ODIzOUJBNkZBNjRDNkQxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp1o6y4AAAGDSURBVHjaYvz//z8DDmAAxLFAbA3EskAsAsRvgPgxEB8F4sVAfAGrTpChaFgJiNcB8b//+ME/qDoldDPQDfQA4g//SQMfoPqwGuoHxH/+kwf+QPWjGKoKxJ//UwZA+tWQDd3+nzpgO8xQY6zSNSb//++ZgVv78ZX//1caYJMxBhnah1XTydX//0cxQDSjg3ObIXIH5mLT2Qsy9ARO11zZC9F8cg1C7OIOiNjp9bh0nQEZ+hRvKMEMuX/u//8XdzAtwQTvGIhKRk+v//+fwPX/fyzL//8PzhNUzgTMVJ8YCAF2bgaGPz8ZGP7+YWBgYSek+j3IpafxWnv9IMTLN4/+///kKoR9dhM+HWdwxz4I3D4OMeTQAiQtGyBi57fi0gWOfROsUue2QJPNPNzJ7fBibDpNcOcoUOLfMQm3Jw8v+v+/TBtnjmKA5llK8/4X9LxPk1IKhgPJcPFnqD6chTQIK0NLdGLAOqh6FDMYiaij7IFYGYgFgPgDEN8F4oP46iiAAAMAQnmMnKvzBWYAAAAASUVORK5CYII=')")
                },10)
            },
            onCancel: function(){
                var imgList=$("#"+option.element+" .qq-uploader-selector .qq-upload-list-selector .list")
                if(imgList.length<=1){
                    $("#"+option.element+" .qq-uploader-selector .buttons .btn-primary").hide()
                }
            },
            onComplete: function (id, fileName, responseJSON, maybeXhr) {
                $("#"+option.element+" .qq-uploader-selector .buttons .btn-primary").hide()
                option.picIdCont.push(responseJSON.msg)
            },
        }
    });


    var btnPrimary= $("#"+option.element+" .qq-uploader-selector .buttons "+option.btnPrimary);
    qq(btnPrimary[0]).attach("click", function() {
        manualUploader.uploadStoredFiles();
    });
}
function moreManualUploader(option){
    //console.log(option.element)
    //if(window[option.nameList]==undefined){
        window[option.nameList]= new qq.FineUploader({
          element: document.getElementById(option.element),
          template: option.template,
          request: {
            endpoint: option.url
          },
          thumbnails: {
          },
          validation: {
            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
            itemLimit: 5,
            sizeLimit: 2000000
          },
          autoUpload: false,
          debug: true,
          callbacks:{
            onSubmit:  function(id,fileName){
              $("#"+option.element+" .qq-uploader-selector .buttons "+option.btnPrimary).show()
              var imgList=$("#"+option.element+" .qq-uploader-selector .qq-upload-list-selector .list")

              console.log(imgList)
              for(let i=0;i<=imgList.length;i++){
                  qq(imgList[i]).attach("click", function() {
                    if(!i>0){
                      $("#"+option.element+" .qq-uploader-selector .buttons "+option.btnPrimary).hide()
                    }
                  });
              }
            },
            onCancel: function(){
                var imgList=$("#"+option.element+" .qq-uploader-selector .qq-upload-list-selector .list")
                if(imgList.length<=1){
                    $("#"+option.element+" .qq-uploader-selector .buttons "+option.btnPrimary).hide()
                }
            },
            onComplete: function (id, fileName, responseJSON, maybeXhr) {
                $('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-fail').show();
		        $('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-success').hide();
                option.picIdCont.push(responseJSON.msg)
                console.log(option.picIdCont)
            },
          }
        });
      //}
                  
    var btnPrimary= $("#"+option.element+" .qq-uploader-selector .buttons "+option.btnPrimary);
    qq(btnPrimary[0]).attach("click", function() {
        eval(option.nameList).uploadStoredFiles();
        btnPrimary.hide()
    });
}
export {singleManualUploader,moreManualUploader}