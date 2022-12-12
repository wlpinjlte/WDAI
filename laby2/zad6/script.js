function deleteElement(element){
    let toDelete=element.parentNode;
    toDelete.remove();
}

let addElement=document.querySelector("#addelement");
let container=document.querySelector("#container");
let form=document.querySelector("form");
let i=0;
addElement.addEventListener('click',(event)=>{
    event.preventDefault();
    let nameInput=document.querySelector("#name");
    let phoneInput=document.querySelector("#phone");
    if(nameInput.checkValidity()&&phoneInput.checkValidity()){
        container.innerHTML+=`
        <div class="element">
            <span>
                <p>${nameInput.value}</p>
                <p>${phoneInput.value.replace(/\s/g, '')}</p>
            </span>
            <button class="deleteButton" onclick="deleteElement(this)"><i class="fa-solid fa-trash-can"></i></button>
        </div>`;
    }
})