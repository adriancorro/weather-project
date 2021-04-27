/* https://docs.google.com/presentation/d/1vdQT9M8jMmdWwhEOWUTBkNP5E0ddEdpV5pQtjf9acaM/edit#slide=id.g80910844c9_0_14
 */   
    const searchCity = document.getElementById(`searchCity`)
    const searchCountrie = document.getElementById(`searchCountrie`)

    const btnSearch = document.getElementById(`btnSearch`)
    
   

    const getWeath = () =>  window.navigator.geolocation.getCurrentPosition(  geoResult => {
    // Coordenas obtenidas
    let geolatitude;
    let geolongitude;
    geolatitude = geoResult.coords.latitude, 
    geolongitude = geoResult.coords.longitude
  

    // Request API. Las API nos pide que le enviemos 3 parametros 
    const url = new URL(`https://api.weatherbit.io/v2.0/current`)
    if(searchCity.value || searchCountrie.value ){
      url.searchParams.set(`city`,searchCity.value)
      url.searchParams.set(`country`,searchCountrie.value)
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
    })
    .catch((error) => {
        console.log(error)
    }) 
})
let body = document.querySelector("body")
let divParent = document.createElement(`div`)
body.appendChild(divParent);

async function myFetch() {
  try {
    let response = await fetch('https://restcountries.eu/rest/v2/alpha/ve');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      let myBlob = await response.value;

      console.log("ddddddd44444444444ddd" + myBlob)
      console.log("dddddddddd" + response.name)
    }
  } catch(e) {
    console.log(e);
  }
}

myFetch();


let ggjhj;
divParent.setAttribute("class", "divParent")
 const getNameCountrie = (codeCountrie)  => {   
       fetch(`https://restcountries.eu/rest/v2/alpha/${codeCountrie}`) 
            .then(data => data.json())
            .then(function(response){ 
                const nameCountrie = document.getElementById(`nameCountrie`)
                nameCountrie.innerText = response.name
                searchCity.value


               
                const divChild = document.createElement(`div`)
                divParent.appendChild(divChild);
                divChild.setAttribute("class", "divChild")
                divChild.innerText =` 1:  ${response.name} `
                ggjhj = response.name
                completo = response.nativeName ;
                let cityAndCountrie = ciudadString + completo
                countries.push(cityAndCountrie)
                 
              
            })
       };
     console.log(` 15555555555555:  ${ggjhj} ` )
  getWeath()
 
btnSearch.addEventListener("click", function( event ) {
    getWeath()
  }, false);
  
  let countries = [];
  let ciudadString;
  let completo;
  searchCity.addEventListener("keyup", function(event) {
      const value = event.target.value;
    /*   // Request API. Las API nos pide que le enviemos 3 parametros 
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
      })  */
 
  });
  let codeVe = ["ve","ar"]
  codeVe.push("us")

  codeVe.forEach(element => {
    getNameCountrie(element)
  });

