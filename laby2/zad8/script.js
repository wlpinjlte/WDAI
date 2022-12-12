let labels=document.querySelectorAll("label");
let input=labels[0].children[0];
let iconsCheck=document.querySelector("#requrementsCheck").querySelectorAll('p');
let specialCharacterFormat=/^[!@#+\-=\[\]{};':*$$%^&*()_"\\|,.<>\/?]/;

labels.forEach(label=>{
    let children=label.children;
    let input=children[0];
    let eye=children[1];
    let eyeSlash=children[2];

    eye.addEventListener('click',()=>{
        eye.style.display="none";
        eyeSlash.style.display="block";
        input.type="text";
    })

    eyeSlash.addEventListener('click',()=>{
        eye.style.display="block";
        eyeSlash.style.display="none";
        input.type="password";
    })
})

let check=(inputToCheck)=>{
    let value=inputToCheck.value;
    let specialCharacterFlag=false;
    let capitalLetterFlag=false;
    let digitFlag=false;
    let checked=true;
    
    if(value.length>=8){
        iconsCheck[0].children[0].style.display="inline";
        iconsCheck[0].children[1].style.display="none";
    }else{
        iconsCheck[0].children[1].style.display="inline";
        iconsCheck[0].children[0].style.display="none";
        checked=false;
    }

    for(char of value){
        if(char.match(specialCharacterFormat)){
            specialCharacterFlag=true;
        }else if(char.match("[0-9]")){
            digitFlag=true;
        }else if(char.match("[A-Z]")){
            capitalLetterFlag=true;
        }
    }

    if(specialCharacterFlag){
        iconsCheck[1].children[0].style.display="inline";
        iconsCheck[1].children[1].style.display="none";
    }else{
        iconsCheck[1].children[1].style.display="inline";
        iconsCheck[1].children[0].style.display="none";
        checked=false;
    }

    if(capitalLetterFlag){
        iconsCheck[2].children[0].style.display="inline";
        iconsCheck[2].children[1].style.display="none";
    }else{
        iconsCheck[2].children[1].style.display="inline";
        iconsCheck[2].children[0].style.display="none";
        checked=false;
    }

    if(digitFlag){
        iconsCheck[3].children[0].style.display="inline";
        iconsCheck[3].children[1].style.display="none";
    }else{
        iconsCheck[3].children[1].style.display="inline";
        iconsCheck[3].children[0].style.display="none";
        checked=false;
    }
    
    return checked;
}

input.addEventListener("keyup",()=>{
    check(input);
})

let alrt1=document.createElement("div");
alrt1.style.color="red";
alrt1.innerText="Hasła się róźnią";
alrt1.style.fontFamily="sans-serif";
alrt1.style.margin.top="1rem";
let alrt2=document.createElement("div");
alrt2.style.color="red";
alrt2.innerText="Hasło nie spełnia kryteriów";
alrt2.style.fontFamily="sans-serif";
alrt2.style.margin.top="1rem";

document.addEventListener("keydown",(event)=>{
    let inputs=document.querySelectorAll("input");
    let passwordsContainer=document.querySelector("#passwordsContainer");
    
    if(event.key=="Enter"){
        try{
            passwordsContainer.removeChild(alrt2);
        }catch{}
        try{
            passwordsContainer.removeChild(alrt1);
        }catch{}
        if(labels[0].children[0].value==labels[1].children[0].value&&check(inputs[0])){
            inputs.forEach(a=>{
                a.style.border="3px solid green";
            })
        }
        else{
            // let alrt=document.createElement("div");
            inputs.forEach(a=>{
                a.style.border="3px solid red";
            })
            if(labels[0].children[0].value!=labels[1].children[0].value){
                passwordsContainer.appendChild(alrt1)
            }
            if(!check(inputs[0])){
                passwordsContainer.appendChild(alrt2)
            }
        }
    }
})