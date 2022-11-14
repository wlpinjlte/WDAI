let leftButton=document.querySelector("#left");
let rightButton=document.querySelector("#right");
let randomButton=document.querySelector("#random")
let content=document.querySelector("#content");
const api_url = "workers.json";

async function getapi() {
    try {
        const response = await fetch(api_url)
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err);
    }
}

let changeData=(dataToChange)=>{
    const img=content.querySelector("img");
    const name=content.querySelectorAll("h3")[0];
    const position=content.querySelectorAll("h3")[1];
    const descripton=content.querySelector("p");
    // console.log(img,name,position,descripton);
    console.log(dataToChange);
    img.src='image\\'+dataToChange.img;
    name.innerText=dataToChange.name;
    position.innerText=dataToChange.position;
    descripton.innerText=dataToChange.description;
}

getapi().then(data=>{
    const workers=data.workers;
    let i=0;
    const n=workers.length;
    changeData(workers[i]);
    rightButton.addEventListener("click",()=>{
        content.style="animation-name:rightOut;animation-duration:1s";
        i+=1;
        setTimeout(()=>{
            changeData(workers[i%n]);
            content.style="animation-name:leftIn;animation-duration:1s";
        },1000);
    })

    leftButton.addEventListener("click",()=>{
        content.style="animation-name:leftOut;animation-duration:1s";
        i-=1;
        if(i<0){
            i=n+i;
        }
        setTimeout(()=>{
            changeData(workers[i%n]);
            content.style="animation-name:rightIn;animation-duration:1s";
        },1000);
    })

    randomButton.addEventListener("click",()=>{
        coin=Math.round(Math.random()*2);
        i=Math.round(Math.random()*20*n/20);
        if(coin==0){
            content.style="animation-name:leftOut;animation-duration:1s";
            setTimeout(()=>{
                changeData(workers[i%n]);
                content.style="animation-name:rightIn;animation-duration:1s";
            },1000);
        }else{
            content.style="animation-name:rightOut;animation-duration:1s";
            setTimeout(()=>{
                changeData(workers[i%n]);
                content.style="animation-name:leftIn;animation-duration:1s";
            },1000);
        }
    })
})
