let arr4 = [];
//problematic for loop
for(let l=0; l<5; l++){
    let delay =200;
    setTimeout(function(){
        arr4[l]={};
        arr4[l].something=l;
        console.log('inside set timeout solution3 loop',l, arr4);
    } , delay*l);
    console.log('inside for solution3 loop',l, arr4);
}