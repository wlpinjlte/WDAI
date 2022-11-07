let area=document.querySelector("#area");
let body=document.querySelector("body");
console.log(area);
area.addEventListener("click",(event)=>{
    
    let ballon=document.querySelector("#ballon");
    ballon.style="top:"+(event.clientY-25)+"px;"+"left:"+(event.clientX-25)+"px;";
    // console.log(event);
    event.stopPropagation();
});
body.addEventListener("click",()=>{
    alert("kliknoles poza");
    console.log("siema");
});