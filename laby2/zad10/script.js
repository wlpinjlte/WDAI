let area=document.querySelector("#area");
let body=document.querySelector("body");
let rect = area.getBoundingClientRect();
console.log(rect.right);
ballon.style.top=rect.top+"px";
ballon.style.left=rect.left+"px";
area.addEventListener("click",(event)=>{
    let ballon=document.querySelector("#ballon");
    ballon.style="top:"+(event.clientY-25)+"px;"+"left:"+(event.clientX-25)+"px;";
    // console.log(event);
    event.stopPropagation();
},true);
body.addEventListener("click",()=>{
    alert("kliknoles poza");
    console.log("siema");
});