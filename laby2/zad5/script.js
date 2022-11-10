let updatescore=()=>{
    scoreText.innerText="wynik to:"+score;
}

let blue=document.querySelector("#blue");
let red=document.querySelector("#red");
let yellow=document.querySelector("#yellow");
let scoreText=document.querySelector("#score");
let propagationButton=document.querySelector("#propagation");
let changeButton=document.querySelector("#change");
let score=0;
let propagation=false;
let change=false;
updatescore();

blue.addEventListener("click",()=>{
    score+=1;
    alert("zdobywasz 1 pkt");
    updatescore();
},change)

red.addEventListener("click",(event)=>{
    score+=2;
    alert("zdobywasz 2 pkt");
    updatescore();
    if(!propagation){
        event.stopPropagation();
    }
},change)

yellow.addEventListener("click",(event)=>{
    score+=5;
    alert("zdobywasz 5 pkt");
    updatescore();
    if(!propagation){
        event.stopPropagation();
    }
},change)

propagationButton.addEventListener("click",()=>{
    propagation=!propagation;
})

changeButton.addEventListener("click",()=>{
    console.log(1);
    change=!change;
    console.log(change);
})
