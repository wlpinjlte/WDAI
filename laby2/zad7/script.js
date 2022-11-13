//https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/
// api url
const api_url = "cities.json";

// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response.ok) {
        good(data);
    }else{
        console.log("ERROR");
    }
    
}
let a=(cities)=>{
    let malopolskieCities=cities.filter(city=>city.province=="małopolskie");
    console.log(malopolskieCities);
    malopolskieCities.forEach(city=>console.log(city.name));
}
let b=(cities)=>{
    let twoAcities=cities.filter(city=>city.name.includes("a",2));
    console.log(twoAcities);
}
function good(data){
    console.log(data);
    let cities=data.cities;
    console.log(cities)
    a(cities);
    b(cities);
}
getapi(api_url);
