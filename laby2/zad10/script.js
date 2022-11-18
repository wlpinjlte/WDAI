let area=document.querySelector("#area");
let body=document.querySelector("body");
// let rect = area.getBoundingClientRect();
let last=document.createElement("p");

area.addEventListener("click",(event)=>{
    last.remove();
    let rect = area.getBoundingClientRect();
    let ballon=document.querySelector("#ballon");
    ballon.style="top:"+(event.clientY-25-rect.top)+"px;"+"left:"+(event.clientX-25-rect.left)+"px;";
    console.log(event);
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