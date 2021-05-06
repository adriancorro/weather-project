
    const searchCity = document.getElementById(`searchCity`)
    const btnSearch = document.getElementById(`btnSearch`)
    const nameCountrie = document.getElementById(`nameCountrie`)

    let addFavoritos = []
    let countries = [];
    let citiesPrincipal = [];
    let addFav = true
    let geolatitude;
    let geolongitude; 
    
    // Si a getWeath le enviamos como paramtros Lat y Log Hara algo
    // Si a getWeath le enviamos como paramtros searchCity.value Hara algo
    // for of citiesPrincipal necesita Promise. De esta forma la API se comporta correctamente, ya que
    // solo con foreach dara unos errores inesperados.

    const getWeath = (searchlat, searchlon) => new Promise(function(resolve, reject) {
     
      //  setTimeout(() => {
        
       
      // Request API. Las API nos pide que le enviemos 3 parametros 
      const url = new URL(`https://api.weatherbit.io/v2.0/current`)
      // Hay dos formas de interactuar con el Request: 1) Enviando city 2) Enviando lat o lon
    if(searchCity.value ){
      url.searchParams.set(`city`,searchCity.value)
    }else if (searchlat && searchlon ) {
      // si se esta llamando a getWeath enviando parametros
      url.searchParams.set(`lat`,searchlat)
      url.searchParams.set(`lon`,searchlon)
    } 
    url.searchParams.set(`key`,`9fd19cddd4594041b751dcb8f6c01405`)
    url.searchParams.set(`lang`,`es`)

    fetch(url)
    // convertimos a json lo que obtenemos
    .then(response =>  response.json())
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
        iconWeatherImg.src = urlIcon
        temperatureWeatherDiv.innerText = `temperature ${temperature}°` 
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
          try {
              const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${country_code}`);
            if (!response.ok) {
              const message = `An error has occured: ${response.status}`;
              console.log(message)
              throw new Error(message);
            }
            const countrie = await response.json();
            nameCountrie.innerText = `Country to show: ${countrie.nativeName}`
        
            return countrie;
        } catch(e) {
          console.log(e); // 30
        }
        }
        fetchGetNameCountrieAsyn()
  /*          Cuando hacemos click a los botones estamos enviando 2 parametros a esta funcion 
            getWeath(Parametro1, Parametro2) por lo que renderiza segun lat y lon
            solo si enviamos lat y lon como parametros getWeath(parametro1, parametro2)se activara esta parte del codigo
  */       if(searchlat && searchlon && addFav ){
    
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
              //Por cada iteraccion del array citiesPrincipal se crean estos div
              //En particular countryDiv.innerText = response.nativeName demora porque
              //espera respuesta de otra API
              //Hacemos el resolve para que la informacion la traiga, haga el await y siga con la proxima iteraccion
              //Se resuelve problema de mostrar los div en orden. Ahora se muestra:
              // divChild citiesPrincipal[0]
              // divChild citiesPrincipal[1]
              // divChild citiesPrincipal[2]
              // Antes estos no se mostraban en orden.
              resolve( 
                countryDiv.innerText = response.nativeName,
                divChild.appendChild(countryDiv)
              )
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
    
    //  reject(console.log("Fail: for (const element of citiesPrincipal) ")); 


  //  }, 3000);
  
    });
    
let body = document.querySelector("body")
let divParent = document.createElement(`div`)
body.appendChild(divParent);
divParent.setAttribute("class", "divParent")
divParent.setAttribute("id", "divParent")

searchCity.addEventListener("keyup", function(event) {
  const value = event.target.value;
  addFav = false
  getWeath(btnSearch.value)
  
})

btnSearch.addEventListener("click", function( event ) {
  addFavoritos = []
  addFav = true
    getWeath()
  }, false);

  btnFav.addEventListener("click", function( event ) {
    addFav = true
    citiesPrincipal.push({
      latitude: addFavoritos[4],
      longitude: addFavoritos[5]
    })
    getWeath(addFavoritos[5], addFavoritos[4])

    addFavoritos = []
  }, false);



  /* 
asíncrona funciones
Queremos que citiesPrincipal[0] sea  geo Location Actual
podemos cambiar esto dentro asyncF() 
  */

  let  geoLocationActualAndPush = () => { 
    return new Promise (resolve => { 
        window.navigator.geolocation.getCurrentPosition(  geoResult => {
          // Coordenas obtenidas
            resolve (
              citiesPrincipal.push({
                latitude: geoResult.coords.latitude,
                longitude: geoResult.coords.longitude               
              }),      
              geolatitude =  geoResult.coords.latitude,
              geolongitude = geoResult.coords.longitude,
              console.log("resolve 1")
            )
        })
    });
  } 

let pushCitiesFav = () => {
  return new Promise(resolve => {
      resolve(
        citiesPrincipal.push({
          latitude: 40.41,
          longitude: -3.70,
        }),
    
        citiesPrincipal.push({
          latitude: 41.41,
          longitude: 2.19,
        }), 
        console.log("resolve 2"),
        console.log(citiesPrincipal)
      )
  })
}

// El orden para mostrar:
// Puede colocar await pushCitiesFav() antes de await pushLocationActual() o de formas deiferentes
  async function asyncF() {
 let a = await pushCitiesFav();
 let b =  await geoLocationActualAndPush();
 
      // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
      // Usar forEach y await puede dar errores inesperados
      //forEach() intenta ejecutarse secuencialmente y es posible que no siempre obtenga el resultado esperado.
      // el siguiente codigo dara error:
      //citiesPrincipal.forEach( citie => await getWeath(citie.latitude,citie.longitude ))
  
      //Para ejecutar todas las promesas de forma secuencial, puede utilizar for ...of
     /*  for (const element of citiesPrincipal) {
        await getWeath(element.latitude,element.longitude )
      } */

     //El siguiente codigo no da error pero es una forma antigua 
    /*   for (let i = 0; i < citiesPrincipal.length; i++) {
         await getWeath(citiesPrincipal[i].latitude, citiesPrincipal[i].longitude  ) ;
      } */
     
  for (const element of citiesPrincipal) {
   let c = await getWeath(element.latitude,element.longitude )
    console.log( `resolve 3. Element:  ${citiesPrincipal.indexOf(element) }` )
  }

  return await a, await b , await c
 
}

 asyncF();

let mapBox = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFuY3JyIiwiYSI6ImNrbnpxNzFtODA4NjIyb3FzMWpzcmc5ankifQ.RQ0oHHVzReNtVz678F61Ag';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [ geolongitude, geolatitude],
  zoom: 3
  });
   
  // Create a default Marker and add it to the map.
 /*  let marker1
   marker1 = new mapboxgl.Marker()
  .setLngLat([1.19, 40.41])
  .addTo(map); */
    // Create a default Marker, colored black, rotated 45 degrees.
    citiesPrincipal.forEach(citie => { 
       if(citie.longitude === geolongitude){ 
        new mapboxgl.Marker({ color: 'green', rotation: 310 })
        .setLngLat([ citie.longitude, citie.latitude ])
        .setPopup(new mapboxgl.Popup({ offset: 30 }) // add popups
        .setHTML(`<h3>City name</h3> <p>${citie.name}</p>`))
        .addTo(map);
       }else {
        new mapboxgl.Marker({ color: 'black', rotation: 45 })
        .setLngLat([ citie.longitude, citie.latitude ])
        .setPopup(new mapboxgl.Popup({ offset: 15 }) // add popups
        .setHTML(`<h3>City name</h3> <p>${citie.name}</p>`))
        .addTo(map);
       }
  
    });
}

