let area=document.querySelector("#area");
let body=document.querySelector("body");
let rect = area.getBoundingClientRect();
let last=document.createElement("p");
console.log(rect.right);
ballon.style.top=rect.top+"px";
ballon.style.left=rect.left+"px";

area.addEventListener("click",(event)=>{
    last.remove();
    let ballon=document.querySelector("#ballon");
    ballon.style="top:"+(event.clientY-25)+"px;"+"left:"+(event.clientX-25)+"px;";
    // console.log(event);
    event.stopPropagation();
},true);

body.addEventListener("click",(event)=>{
    last.remove();
    let alertt=document.createElement("p");
    alertt.innerText="Kliknąłeś poza";
    alertt.style.color="red";
    alertt.style.position="absolute";
    alertt.style.top=event.clientY+"px";
    alertt.style.left=event.clientX+"px";
    body.appendChild(alertt);
    last=alertt;
    // alert("kliknoles poza");
    console.log(event);
});