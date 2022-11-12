let update=()=>{
    scoreText.innerText="wynik to:"+score;
    if(score>30){
        red.classList.add('disable');
        red.removeEventListener("click",redadd,change);
    }
    if(score>50){
        yellow.classList.add('disable');
        yellow.removeEventListener("click",yellowadd,change);
    }
    if(propagation){
        propagationButton.innerText="Stop propagation";
    }
    else{
        propagationButton.innerText="Start propagation";
    }
    changeButton.innerHTML="Capture: "+change;
}

let blueadd=(event)=>{
    console.log(event);
    score+=1;
    update();
    paragrahDiv.innerHTML+="<h5>zdobywasz 1 pkt</h5>";
    if(!propagation){
        event.stopPropagation();
    }
}

let redadd=(event)=>{
    console.log(event.cancelBubble);
    score+=2;
    update();
    paragrahDiv.innerHTML+="<h5>zdobywasz 2 pkt</h5>";
    if(!propagation){
        event.stopPropagation();
    }
}

let yellowadd=(event)=>{
    console.log(event.cancelBubble);
    score+=5;
    update();
    paragrahDiv.innerHTML+="<h5>zdobywasz 5 pkt</h5>";
    if(!propagation){
        event.stopPropagation();
    }
}

let start=()=>{
    paragrahDiv.innerHTML="";
    red.classList.remove('disable');
    yellow.classList.remove('disable');
    blue.addEventListener("click",blueadd,change);
    red.addEventListener("click",redadd,change);
    yellow.addEventListener("click",yellowadd,change);
}

let propagation=false;
let change=false;
let score=0;
let blue=document.querySelector("#blue");
let red=document.querySelector("#red");
let yellow=document.querySelector("#yellow");
let scoreText=document.querySelector("#score");
let propagationButton=document.querySelector("#propagation");
let changeButton=document.querySelector("#change");
let reset=document.querySelector("#reset");
let paragrahDiv=document.querySelector("#paragraph");

propagationButton.addEventListener("click",()=>{
    propagation=!propagation;
    update();
})

changeButton.addEventListener("click",()=>{
    blue.removeEventListener("click",blueadd,change);
    red.removeEventListener("click",redadd,change);
    yellow.removeEventListener("click",yellowadd,change);
    change=!change;
    start();
    update();
})

reset.addEventListener('click',()=>{
    score=0;
    change=false;
    propagation=false;
    start();
    update();
})
start();
update();
