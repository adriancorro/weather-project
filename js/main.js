/* https://docs.google.com/presentation/d/1vdQT9M8jMmdWwhEOWUTBkNP5E0ddEdpV5pQtjf9acaM/edit#slide=id.g80910844c9_0_14
 */   
    const searchCity = document.getElementById(`searchCity`)
    const btnSearch = document.getElementById(`btnSearch`)

    const getWeath = (p) =>  window.navigator.geolocation.getCurrentPosition(  geoResult => {
    // Coordenas obtenidas
    let geolatitude;
    let geolongitude;
    geolatitude = geoResult.coords.latitude, 
    geolongitude = geoResult.coords.longitude

    // Request API. Las API nos pide que le enviemos 3 parametros 
    const url = new URL(`https://api.weatherbit.io/v2.0/current`)

    if(searchCity.value ){
      url.searchParams.set(`city`,searchCity.value)
    }else if (p) {
      url.searchParams.set(`city`,p)
    } else {
      url.searchParams.set(`lat`,geolatitude)
      url.searchParams.set(`lon`,geolongitude)
    }
    url.searchParams.set(`key`,`9fd19cddd4594041b751dcb8f6c01405`)
    url.searchParams.set(`lang`,`es`)

      fetch(url)
    // convertimos a json lo que obtenemos
    .then(response => response.json())
    .then(json => {
        // datos a obtener
        const weather = json.data[0]
        const icon =  weather.weather.icon
        const urlIcon = `https://www.weatherbit.io/static/img/icons/${icon}.png`
        const country_code = weather.country_code
        getNameCountrie(country_code)
        const description = weather.weather.description
        const city = weather.city_name
        const temperature = weather.temp
        
        const iconWeatherImg = document.getElementById(`iconWeatherImg`)
        const descriptionWeatherDiv =  document.getElementById(`descriptionWeatherDiv`)
        const cityWeatherDiv =  document.getElementById(`cityWeatherDiv`)
        const temperatureWeatherDiv =  document.getElementById(`temperatureWeatherDiv`)
        
        iconWeatherImg.src = urlIcon
        temperatureWeatherDiv.innerText = temperature
        descriptionWeatherDiv.innerText =  description
        cityWeatherDiv.innerText = city

        addFavoritos.push(urlIcon)
        addFavoritos.push(temperature)
        addFavoritos.push(description)
        addFavoritos.push(city)
        addFavoritos.push(weather.lat)
        addFavoritos.push(weather.lon)

        if(p){
          const divChild = document.createElement(`div`)
          divChild.setAttribute("id", "divChild")
          divParent.appendChild(divChild);
          divChild.setAttribute("class", "divChild");
          divChild.innerText = city

          const imgFav = document.createElement(`img`)
          imgFav.setAttribute("class", "imgFav");
          imgFav.src = urlIcon
          divChild.appendChild(imgFav);

          const temp = document.createElement(`div`)
          temp.innerText = temperature
          divChild.appendChild(temp);

          const desc = document.createElement(`div`)
          desc.innerText = description
          divChild.appendChild(desc);
        }
              
    })
    .catch((error) => {
        console.log(error)
    }) 
})

let addFavoritos = []
let ultimoPais = []

let body = document.querySelector("body")
let divParent = document.createElement(`div`)
body.appendChild(divParent);
divParent.setAttribute("class", "divParent")
divParent.setAttribute("id", "divParent")


const getNameCountrie = (codeCountrie) => {
  const fetchGetNameCountrie = async () => {
    const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${codeCountrie}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.log(message)
      throw new Error(message);
    }
    const countrie = await response.json();
    return countrie;
  }


  fetchGetNameCountrie().then(response => {
    ultimoPais = []
    const nameCountrie = document.getElementById(`nameCountrie`)
    ultimoPais.push(response.name)
    nameCountrie.innerText = response.name
    searchCity.value
    pais = response.name
    completo = response.nativeName ;
    let cityAndCountrie = ciudadString + response.alpha2Code

    countries.push(cityAndCountrie)
  });
  
  fetchGetNameCountrie().catch(error => {
    error.message; 
    console.log(error.message)
  });
  
}

btnSearch.addEventListener("click", function( event ) {
  addFavoritos = []
    getWeath()
    console.log(addFavoritos )
    console.log(ultimoPais )

  }, false);

  const cities = [];
  btnFav.addEventListener("click", function( event ) {
     
     getWeath(addFavoritos[3])
   
  }, false);
  
  let countries = [];
  let ciudadString;
  searchCity.addEventListener("keyup", function(event) {
      const value = event.target.value;
       // Request API. Las API nos pide que le enviemos 3 parametros 
      const url = new URL(`https://api.weatherbit.io/v2.0/current`)
      if(searchCity.value  ){
        url.searchParams.set(`city`,searchCity.value)
        //url.searchParams.set(`country`,searchCity.value)
      }else{
      url.searchParams.set(`lat`,geolatitude)
      url.searchParams.set(`lon`,geolongitude)
      }
      url.searchParams.set(`key`,`9fd19cddd4594041b751dcb8f6c01405`)
      url.searchParams.set(`lang`,`es`)
      fetch(url)
      // convertimos a json lo que obtenemos
      .then(response => response.json())
      .then(json => {
          // datos a obtener
          const weather = json.data[0]
          const country_code = weather.country_code
         
         getNameCountrie(country_code)
          ciudadString = searchCity.value + ", "
          module.exports = countries; 
        
      })
      .catch((error) => {
          console.log(error)
      })  
 
  });


 /*  cities.forEach( codeCountrie => getNameCountrie(codeCountrie.cityname) )
 */


const citiesPrincipal = [];

citiesPrincipal.push({
    name: "Barcelona",
    latitude: 41.41,
    longitude: 2.19,
});

citiesPrincipal.push({
    name: "Madrid",
    latitude: 40.41,
    longitude: -3.70,
});
citiesPrincipal.forEach( citie =>getWeath(citie.name) )
