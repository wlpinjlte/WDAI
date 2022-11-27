const api_url = "https://restcountries.com/v3.1/all";
let subregionDivArray=[];
async function getapi() {
    try {
        const response = await fetch(api_url)
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err);
    }
}

let subregionPopulation=(array)=>{
    let populationToReturn=0;
    array.forEach(region=>{
        populationToReturn+=region.population;
    });
    return populationToReturn;
}
let subregionArea=(array)=>{
    let areaToReturn=0;
    array.forEach(region=>{
        areaToReturn+=region.area;
    });
    return areaToReturn;
}
function loadRegionsToSubregions(regionContainer,regionArray){
    regionArray.forEach(region=>{
        regionContainer.innerHTML+=`
        <div class="region">
            <p>${region.name}</p>
            <img src="${region.flag}">
            <p>${region.population}</p>
            <p>${region.area}</p>
        </div>`;
    })
}

function loadSubregions(subregion,mapForSubregions){
    let subregionContainer=document.querySelector("#subregions-container");
    let subregionDiv=document.createElement("div");
    subregionDivArray.push(subregionDiv);
    subregionDiv.classList.add("subregion");
    subregionDiv.innerHTML+=`
    <div class="data">
        <h1>${subregion}</h1>
        <h1>${subregionArea(mapForSubregions.get(subregion))}</h1>
        <h1>${subregionPopulation(mapForSubregions.get(subregion))}</h1>
    </div>
    <div class="region-container"></div>`;
    let regionContainer=subregionDiv.querySelector(".region-container");
    let openn=false;
    subregionDiv.querySelector(".data").addEventListener("click",()=>{
        console.log(1);
        if(openn){
            regionContainer.style.display="none";
            
        }else{
            regionContainer.style.display="flex";
        }
        openn=!openn;
    })
    loadRegionsToSubregions(regionContainer,mapForSubregions.get(subregion));
    subregionContainer.appendChild(subregionDiv);
}
let areaComper=(a,b)=>{
    let areaA=a.querySelector(".data").querySelectorAll("h1")[1].innerText;
    let areaB=b.querySelector(".data").querySelectorAll("h1")[1].innerText;
    return areaB-areaA;
}
let populationComper=(a,b)=>{
    let areaA=a.querySelector(".data").querySelectorAll("h1")[2].innerText;
    let areaB=b.querySelector(".data").querySelectorAll("h1")[2].innerText;
    return areaB-areaA;
}
function reload(){
    let subregionContainer=document.querySelector("#subregions-container");
    subregionContainer.innerHTML="";
    subregionDivArray.forEach(element=>{
        subregionContainer.appendChild(element);
    })
}
getapi().then(data=>{
    console.log(data);
    const subregions=new Set();
    const mapForSubregions=new Map();
    data.forEach(element => {
        subregions.add(element.subregion);
    });
    subregions.forEach(region=>{
        console.log(region)
        mapForSubregions.set(region,[]);
    });
    data.forEach(element=>{
        mapForSubregions.get(element.subregion).push({
            name:element.name.common,
            population:element.population,
            area:element.area,
            flag:element.flags.png
        })    
    })
    subregions.forEach(region=>{
        loadSubregions(region,mapForSubregions);
    })
    // console.log(subregionDivArray);
    // subregionDivArray.sort((a,b)=>populationComper(a,b));
    // console.log(subregionDivArray);
    // reload();
});