
    const searchCity = document.getElementById(`searchCity`)
    const btnSearch = document.getElementById(`btnSearch`)
    const nameCountrie = document.getElementById(`nameCountrie`)

    let addFavoritos = []
    let countries = [];
    const citiesPrincipal = [];
    let addFav = true
    let ciudadString ;
    let geolatitude;
    let geolongitude; 

  

 
    
    const getWeath = (searchlat, searchlon) =>  {
      // Request API. Las API nos pide que le enviemos 3 parametros 
    const url = new URL(`https://api.weatherbit.io/v2.0/current`)

    if(searchCity.value ){
      url.searchParams.set(`city`,searchCity.value)
    }else if (searchlat && searchlon ) {
      // si se esta llamando a getWeath enviando parametros
      url.searchParams.set(`lat`,searchlat)
      url.searchParams.set(`lon`,searchlon)

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
        const description = weather.weather.description
        const city = weather.city_name
        const temperature = weather.temp
        
        const iconWeatherImg = document.getElementById(`iconWeatherImg`)
        const descriptionWeatherDiv =  document.getElementById(`descriptionWeatherDiv`)
        const cityWeatherDiv =  document.getElementById(`cityWeatherDiv`)
        const temperatureWeatherDiv =  document.getElementById(`temperatureWeatherDiv`)

        nameCountrie.innerText = `Country to show: ${weather.country_code}`
        iconWeatherImg.src = urlIcon
        temperatureWeatherDiv.innerText = temperature
        descriptionWeatherDiv.innerText =  description
        cityWeatherDiv.innerText = city
        addFavoritos = []
        addFavoritos.push(urlIcon)
        addFavoritos.push(temperature)
        addFavoritos.push(description)
        addFavoritos.push(city)
        addFavoritos.push(weather.lat)
        addFavoritos.push(weather.lon)

          const fetchGetNameCountrieAsyn = async () => {
              const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${country_code}`);
            if (!response.ok) {
              const message = `An error has occured: ${response.status}`;
              console.log(message)
              throw new Error(message);
            }
            const countrie = await response.json();

            return countrie;
          }
       
/*          Cunado hacemos click a los botones estamos enviando 2 parametros a esta funcion 
            getWeath(Parametro1, Parametro2) por lo que renderiza segun lat y lon
            solo si enviamos lat y lon se activara esta parte del codigo
 */        if(searchlat && searchlon && addFav ){
           //parent div
          const divChild = document.createElement(`div`)
          divChild.setAttribute("id", "divChild")

          //child div
          divParent.appendChild(divChild);
          if(searchlat == geolatitude ){
            divChild.setAttribute("class", "divChild principal");
            divChild.innerText = city + " (Current City)"
          }else{
            divChild.setAttribute("class", "divChild");
           divChild.innerText = city
          }
      
          countries.push(city)
         
          fetchGetNameCountrieAsyn().then(response => {
            const countryDiv = document.createElement(`div`)
            countryDiv.innerText = response.name
            divChild.appendChild(countryDiv);
            
            nameCountrie.innerText = `Country to show: ${response.name}`
           }); 
          
          fetchGetNameCountrieAsyn().catch(error => {
            error.message; 
            console.log(error.message)
          });
          fetchGetNameCountrieAsyn()
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
          mapBox()
        }      
    })
    .catch((error) => {
        console.log(error)
    }) 
}


 
let body = document.querySelector("body")
let divParent = document.createElement(`div`)
body.appendChild(divParent);
divParent.setAttribute("class", "divParent")
divParent.setAttribute("id", "divParent")

searchCity.addEventListener("keyup", function(event) {
  const value = event.target.value;
  addFav = false
  getWeath()
})

btnSearch.addEventListener("click", function( event ) {
  addFavoritos = []
  addFav = true
    getWeath()
  }, false);

  btnFav.addEventListener("click", function( event ) {
    addFav = true
    getWeath(addFavoritos[5], addFavoritos[4])
    addFavoritos = []
  }, false);

  /* 
  Queremos que el push de citiesPrincipal sea el de geolocation, pero como esta es una funcion
  normalmnte demora, debido a eso el push no se hace en el orden requerido por eso las siguientes lineas
  de codigos
  */
 /*  
 let  geoLocation = () => { 
    return new Promise (resolve => { 
      let geolatitude;
      let geolongitude;     
      window.navigator.geolocation.getCurrentPosition(  geoResult => {
        // Coordenas obtenidas
        geolatitude = geoResult.coords.latitude, 
        geolongitude = geoResult.coords.longitude
        resolve (
          citiesPrincipal.push({
            latitude: geoResult.coords.latitude,
            longitude: geoResult.coords.longitude
          })
        )
      })
    });
  } 
  let  push2 = () => { 
    return new Promise (resolve => { 
        resolve (
          citiesPrincipal.push({
            latitude: 41.41,
            longitude: 2.19,
          })
        )
    })
  } 
  let  push3 = () => { 
    return new Promise (resolve => { 
        resolve (
          citiesPrincipal.push({
            latitude: 40.41,
            longitude: -3.70,
          })
        )
    })
  } 
  let  foreachBucle = () => { 
    return new Promise (resolve => { 
        resolve (
          citiesPrincipal.forEach( citie =>
            getWeath(citie.latitude, citie.longitude)) 
        )
    })
  } 
  async function asyncPush() {
    let x = await geoLocation();
    let z = await push2();
    let y = await push3();
    let ww = await foreachBucle();
    return  await x +  await z  +  await y  +  await ww 
  }
  asyncPush(); */

  // Queremos hacer los push por orden ya que geolocation tarda unos milessegunddos mas en reponder
  // asyncF se encarga de resolver ese problema

  let  geoLocation = () => { 
    return new Promise (resolve => { 
      window.navigator.geolocation.getCurrentPosition(  geoResult => {
        // Coordenas obtenidas
    
        geolatitude = geoResult.coords.latitude, 
        geolongitude = geoResult.coords.longitude
        resolve (
          citiesPrincipal.push({
            latitude: geoResult.coords.latitude,
            longitude: geoResult.coords.longitude
          }),
          geolatitude = geoResult.coords.latitude,
          geolongitude = geoResult.coords.latitude
        )
      })
    });
  } 

  async function asyncF() {
    let x = await geoLocation();
    
    citiesPrincipal.push({
      latitude: 40.41,
      longitude: -3.70,
    })

    citiesPrincipal.push({
      latitude: 41.41,
      longitude: 2.19,
    })

    let y = await citiesForeach();
    return  await x ,await y
  }

  asyncF(); 

 let citiesForeach = () => {
  return new Promise(resolve => {
    resolve(
      citiesPrincipal.forEach( citie =>
      getWeath(citie.latitude, citie.longitude)) 
    )
  })
 }




let mapBox = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFuY3JyIiwiYSI6ImNrbnpxNzFtODA4NjIyb3FzMWpzcmc5ankifQ.RQ0oHHVzReNtVz678F61Ag';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [2.19, 41.41],
  zoom: 9
  });
   
  // Create a default Marker and add it to the map.
  let marker1
   marker1 = new mapboxgl.Marker()
  .setLngLat([1.19, 40.41])
  .addTo(map);
    // Create a default Marker, colored black, rotated 45 degrees.
    citiesPrincipal.forEach(citie => { 
        new mapboxgl.Marker({ color: 'black', rotation: 45 })
      .setLngLat([ citie.longitude, citie.latitude ])
      .setPopup(new mapboxgl.Popup({ offset: 15 }) // add popups
      .setHTML(`<h3>City name</h3> <p>${citie.name}</p>`))
      .addTo(map);
    });
}

   
   mapBox()

 