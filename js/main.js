
    const searchCity = document.getElementById(`searchCity`)
    const btnSearch = document.getElementById(`btnSearch`)
    const nameCountrie = document.getElementById(`nameCountrie`)

    let addFavoritos = []
    let countries = [];
    const citiesPrincipal = [];
    const citiesTemporal = [];
    let addFav = true
    let ciudadString ;

    const getWeath = (searchlat, searchlon) => 
     window.navigator.geolocation.getCurrentPosition(  geoResult => {
    // Coordenas obtenidas
    let geolatitude;
    let geolongitude;
    geolatitude = geoResult.coords.latitude, 
    geolongitude = geoResult.coords.longitude

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

     
        citiesTemporal.push({
            name: city,
            latitude: weather.lat,
            longitude: weather.lon,
            temperature: temperature,
            description: description,
            urlIcon: urlIcon,
          })

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
          citiesPrincipal.push({
            name: city,
            latitude: weather.lat,
            longitude: weather.lon,
          });
          //parent div
          const divChild = document.createElement(`div`)
          divChild.setAttribute("id", "divChild")

          //child div
          divParent.appendChild(divChild);
          divChild.setAttribute("class", "divChild");
          divChild.innerText = city
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
})

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

  


citiesPrincipal.push({
    name: "Barcelona",
    latitude: 41.41,
    longitude: 2.19,
    country_code: "ES"
});

citiesPrincipal.push({
    name: "Madrid",
    latitude: 40.41,
    longitude: -3.70,
    country_code: "ES"
});



let gfgfg = [] 

let a = [] 

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
   console.log(addFavoritos[5])
    // Create a default Marker, colored black, rotated 45 degrees.
    citiesPrincipal.forEach(citie => { 
        new mapboxgl.Marker({ color: 'black', rotation: 45 })
      .setLngLat([ citie.longitude, citie.latitude ])
      .setPopup(new mapboxgl.Popup({ offset: 15 }) // add popups
      .setHTML(`<h3>City name</h3> <p>${citie.name}</p>`))
      .addTo(map);
    });

  /* a.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker({ color: 'black', rotation: 45 })
      .setLngLat([lat , lon])
      .addTo(map);
  }); */
}



citiesPrincipal.forEach( citie =>
   getWeath(citie.latitude, citie.longitude)   ) 


   mapBox()