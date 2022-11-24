const api_url = "https://restcountries.com/v3.1/all";

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
let subregionarea=(array)=>{
    let areaToReturn=0;
    array.forEach(region=>{
        areaToReturn+=region.area;
    });
    return areaToReturn;
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
            name:element.name.official,
            population:element.population,
            area:element.area,
            flag:element.flags.png
        })    
    })
    subregions.forEach(region=>{
        console.log(subregionPopulation(mapForSubregions.get(region)));
    });
    console.log();
    console.log(subregions);
    console.log(mapForSubregions);
    subregions.forEach(region=>{
        console.log(subregionarea(mapForSubregions.get(region)));
    });
})
let subregion=document.querySelector(".data");
console.log(subregion);
let region=subregion.parentNode.querySelector("#region-container");
let openn=true;
subregion.addEventListener("click",()=>{
    console.log(1);
    if(openn){
        region.style.maxHeight="0px";
        
    }else{
        region.style.maxHeight="200px";
    }
    openn=!openn;
    
    // region.style.display="none";
})