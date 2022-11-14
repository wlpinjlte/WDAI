const api_url = "cities.json";

async function getapi() {
    try {
        const response = await fetch(api_url)
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err);
    }
}

const container=document.querySelector("#container");

let createDiv=()=>{
    const div=document.createElement("div");
    div.classList.add("element");
    return div
}

let a=(cities)=>{
    const div=createDiv();
    div.innerHTML+="<h2>a)Miasta z województwa małopolskiego:</h2>";

    const malopolskieCities=cities.filter(city=>city.province=="małopolskie");
    console.log(malopolskieCities);

    malopolskieCities.forEach(city=>div.innerHTML+=`<span>${city.name}</span>`);
    container.appendChild(div);
};

let b=(cities)=>{
    const div=createDiv();
    div.innerHTML+="<h2>b)Miasta które w swojej nazwie posiadają dwa znaki \"a\":</h2>";

    // let twoAcities=cities.filter(city=>city.name.indexOf("a")!=-1&&city.name.indexOf("a")!=city.name.lastIndexOf("a"));
    const twoAcities=cities.filter(city=>city.name.match(/a/g)!=null&&city.name.match(/a/g).length==2);
    console.log(twoAcities);
    console.log("");

    twoAcities.forEach(city=>div.innerHTML+=`<span>${city.name}</span>`);
    container.appendChild(div);
};

let c=(cities)=>{
    const div=createDiv();

    const sortCities=[...cities].sort((city1,city2)=>city2.dentensity-city1.dentensity);
    console.log(sortCities[4]);

    div.innerHTML+=`<h2>c)Piąte pod kątem gęstości zaludnienia miasto w Polsce to: <span style="color:red"> ${sortCities[4].name}</span></h2>`;
    container.appendChild(div);
};

let d=(cities)=>{
    const div=createDiv();
    div.innerHTML+="<h2>d)Lista miast powyżej 100tyś:</h2>";

    cities.forEach(city=>{
        if(city.people>100000){
            city.name+=" City";
            div.innerHTML+=`<span>${city.name}</span>`;
        }
    })
    console.log(cities);

    container.appendChild(div);
}

let e=(cities)=>{
    const div=createDiv();
    
    const citiesAbovePeople=cities.filter(city=>city.people>80000);
    const citiesUnderPeople=cities.filter(city=>city.people<80000);
    console.log(citiesAbovePeople.length);
    console.log(citiesUnderPeople.length);

    let str;
    if(citiesAbovePeople.length>citiesUnderPeople.length){
        str="Powyżej 80000";
    }else{
        str="Poniżej 80000";
    }
    div.innerHTML+=`<h2>e)Jest wiecej miast:<span style="color:red"> ${str}</span></h2>`;
    div.innerHTML+=`<h2 style="margin-top:0">Miast powyżej jest 80000:<span style="color:red"> ${citiesAbovePeople.length}</span></h2>`;
    div.innerHTML+=`<h2 style="margin-top:0">Miast poniżej jest 80000:<span style="color:red"> ${citiesUnderPeople.length}</span></h2>`;
    container.appendChild(div);
}

let f=(cities)=>{
    const div=createDiv();

    const citiesStartWithP=cities.filter(city=>city.name.startsWith("P"));
    let average=citiesStartWithP.reduce((sum,city)=>sum+city.area,0)/citiesStartWithP.length;
    average=Math.round(average * 100) / 100;
    console.log(average);

    div.innerHTML+=`<h2>f)Średnia powierzchnia miast z powiatów zaczynających się na literkę „P” to:<span style="color:red"> ${average}</span></h2>`;
    container.appendChild(div);
}

let g=(cities)=>{
    const div=createDiv();

    const citiesPomorskie=cities.filter(city=>city.province=="pomorskie");
    const citiesAbovePeople=citiesPomorskie.filter(city=>city.people>5000);
    let str;
    if(citiesPomorskie.length==citiesAbovePeople.length){
        str="TAK";
    }else{
        str="NIE"
    }

    div.innerHTML+=`<h2>g)Wszystkie miasta z województwa pomorskiego są większe od 5000 osób:<span style="color:red"> ${str}</span></h2>`;
    div.innerHTML+=`<h2 style="margin-top:0">Takich miast jest:<span style="color:red"> ${citiesAbovePeople.length}</span></h2>`;
    container.appendChild(div);
    console.log(citiesPomorskie);
    console.log(citiesAbovePeople);
}

getapi().then(data=>{
    const cities=data.cities;
    console.log(cities);
    a(cities);
    b(cities);
    c(cities);
    d(cities);
    e(cities);
    f(cities);
    g(cities);
});
