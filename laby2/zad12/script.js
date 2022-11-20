let board=document.querySelector("#board");
let potencialInterval=[15,20,25,30,35];
let cursor=document.querySelector('#cursor');
let score=0;
let lives=3;
let livesDisplay=document.querySelector("#lives");
let scoreDisplay=document.querySelector("#score");
let gameOn=false;
let userName;
let start=document.querySelector("#start");
let startDisplay=document.querySelector("#startGame");
let header=document.querySelector("header");
let gameOverDisplay=document.querySelector("#gameOver");
let restartButton=document.querySelector("#restart");

let update=()=>{
    scoreDisplay.innerText=score;
    if(lives==0){
        lives=-1;
        gameOver();
    }
    let livesToDisplay="";
    for(let i=0;i<lives;i++){
        livesToDisplay+="♥"
    }
    livesDisplay.innerText=livesToDisplay;
}

function convertPXToVW(vw) {
	return vw * (document.documentElement.clientWidth/100);
}

let zombieAnimation=(zombie,speed)=>{
    let interval=potencialInterval[speed];
    zombie.style.transition=`left${interval}s`;
    let backgroundPosition=0;
    let left=110;
    let animation=setInterval(()=>{
        zombie.style.backgroundPosition=backgroundPosition+"px";
        zombie.style.left=left+"vw";
        backgroundPosition-=200;
        left-=1;
        if(convertPXToVW(left)<-300){
            zombie.remove();
            clearInterval(animation);
            if(zombie.style.display!="none"){
                lives-=1;
            }
            update();
            console.log(lives);
        }
    },interval);
}

let createZombie=()=>{
    let zombie=document.createElement("div");

    zombie.classList.add("zombie");
    let top=Math.floor(Math.random()*15)+50;
    zombie.style.top=top+"%";
    zombie.style.left=110+"vw";

    let size=Math.random()/2+0.5;
    let speed=Math.floor(Math.random()*5);
    zombie.addEventListener("click",(event)=>{
        zombie.style.display="none";
        event.stopPropagation();
        score+=12;
        update();
        console.log(score);
    });
    zombie.style.transform=`scale(${size})`;
    
    board.appendChild(zombie);

    zombieAnimation(zombie,speed);
}

function gameStart(){
    let header=document.querySelector("header");
    score=0;
    lives=3;
    gameOn=true;
    board.style.cursor="none";
    cursor.style.display="block";
    update();
    document.addEventListener("mousemove",(event)=>{
        cursor.style.top=event.pageY+"px";
        cursor.style.left=event.pageX+"px";
    })
    let zombieSpawner=setInterval(()=>{
        if(gameOn){
            createZombie();
        }else{
            clearInterval(zombieSpawner);
        }
    },600);
}

function gameOver(){
    gameOverDisplay.style.display="flex";
    board.style.cursor='default';
    gameOn=false;
    header.style.display="none";
    cursor.style.display="none";
    document.querySelector("#endScore").innerText="Your Score:"+score;
    document.querySelectorAll(".zombie").forEach((zombie)=>{
        zombie.style.display="none";
        zombie.remove();
    });
    let lederboard=document.querySelector("#lederboard");
    lederboard.querySelectorAll("div").forEach((div)=>{
        div.remove();
    })
    getapi().then(data=>{
        console.log(data);
        updateHighscore(data);
    });
}

start.addEventListener("click",(event)=>{
    userName=startDisplay.querySelector("input").value
    document.querySelector("#username").innerText=userName;
    header.style.display="flex";
    gameStart();
    startDisplay.remove();
    event.stopPropagation();
});
restartButton.addEventListener("click",(event)=>{
    event.stopPropagation();
    header.style.display="flex";
    gameStart();
    gameOverDisplay.style.display="none";
});

document.addEventListener("click",()=>{
    score-=6;
    update();
});



const api_url = "https://jsonblob.com/api/jsonBlob/1043939973950357504";

async function getapi() {
    try {
        const response = await fetch(api_url)
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err);
    }
}

let displayResult=(scores)=>{
    let i=1;
    let lederboard=document.querySelector("#lederboard");
    for(result of scores){
        let div=document.createElement("div");
        div.innerHTML=`<span>${i}</span>.User:<span>${result.name}</span> Score:<span>${result.score}</span> Date:<span>${result.date}</span>`;
        lederboard.appendChild(div);
        i+=1;
    }
}

async function updateHighscore(scores){
    const todayDate=new Date();
    let day=todayDate.getDate();
    let month=todayDate.getMonth()+1;
    let year=todayDate.getFullYear();
    let dateToSave=day+"-"+month+"-"+year;
    console.log(dateToSave);
    scores.push({name:userName,
        score:score,
        date:dateToSave
    });
    scores=scores.sort((a,b)=>b.score-a.score)
    displayResult(scores.slice(0, 7));
    await sendScore(scores.slice(0, 7));
}

async function sendScore(data = {}) {
    const response = await fetch(api_url, {
      method: 'PUT', 
      mode: 'cors', 
      cache: 'no-cache', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
}



