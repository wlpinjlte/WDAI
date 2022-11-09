let updatescore=()=>{
    scoreText.innerText="wynik to:"+score;
}

let blue=document.querySelector("#blue");
let red=document.querySelector("#red");
let yellow=document.querySelector("#yellow");
let scoreText=document.querySelector("#score");
let score=0;
updatescore();

blue.addEventListener("click",(event)=>{
    score+=1;
    alert("zdobywasz 1 pkt");
    updatescore();
})
