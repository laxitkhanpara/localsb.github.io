const getlocation=()=>{
    //get the location
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lat=position.coords.latitude;
            let long=position.coords.longitude
        })
    }else{
        alert("not supported")
    }
}