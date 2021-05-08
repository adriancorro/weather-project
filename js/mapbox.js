let mapBox = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFuY3JyIiwiYSI6ImNrbnpxNzFtODA4NjIyb3FzMWpzcmc5ankifQ.RQ0oHHVzReNtVz678F61Ag';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ geolongitude, geolatitude],
    zoom: 3
    });
      citiesPrincipal.forEach(citie => { 
         if (citie.name){
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
         }
      });
  }