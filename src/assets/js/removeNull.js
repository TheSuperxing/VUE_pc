function removeNull(arr){
    let newArr=[];
    let flage=[];
    for(let i=0;i<arr.length;i++){
        flage.push(false)
        for(let key in arr[i]){
            if(arr[i][key]==null||arr[i][key]==""){
                
            }else{
                flage[i]=true;
            }
        }
        if(flage[i]){
            newArr.push(arr[i])
        }
    }
    return newArr;
}
export default removeNull