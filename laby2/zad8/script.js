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

document.addEventListener("keydown",(event)=>{
    if(event.key=="Enter"){
        if(labels[0].children[0].value==labels[1].children[0].value&&check(labels[0].children[0])){
            alert("hasła się zgadzaja i spelniają kryteria");
        }else if(labels[0].children[0].value==labels[1].children[0].value){
            alert("hasła się zgadzaja ale nie spelniaja kryteriow");
        }
        else{
            alert("hasla się roznią");
        }
    }
})