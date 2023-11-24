import React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

//Handles the visual of the google map
function GoogleMaps({ searchData }) {
  //Reciving the search criterias of that the user want to see
  //State to handle all the crimes to be shown on the mapp
  const [arrayOfCrimes, setArrayOfCrimes] = useState();
  const [map, setMap] = useState(null);

  //Array to handle all the markers
  const markers = [];

  useEffect(() => {
    //Get all the cord of the crimes that should be shown
    const getCordinates = async () => {
      const response = await fetch(
        "http://localhost:3000/api/cordinates_crime",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchData),
        }
      );
      const result = await response.json();
      await setArrayOfCrimes(result);
    };
    getCordinates();
  }, [searchData]);

  const containerStyle = {
    width: "100%",
    height: "507px",
    borderRadius: "12px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "ab6140a0414848a8",
    googleMapsApiKey: "AIzaSyBusRS-9Qru8pYjzF_AroJ88h4dWDeoFoQ", //!: api key bör inte ligga i koden, lägg i env variabler
  });

  const onLoad = React.useCallback(
    function callback(map) {
      // Erase old markers from previus search
      markers.forEach((marker) => marker.setMap(null));
      markers.length = 0;

      // calculate the view of the map so all arkers are shown
      //! fungerar så länge jag inte väljer plats
      const bounds = new window.google.maps.LatLngBounds();
      arrayOfCrimes.forEach((location) => {
        bounds.extend(
          new window.google.maps.LatLng(location.lat, location.lng)
        );
      });
      map.fitBounds(bounds);

      let offset = 0.0001; /*putting markers a littlebit wrong so markers that are in the same 
      place doesnt is directly over each other */

      //Create and add markers for every crime
      arrayOfCrimes.forEach((location, index) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(location.lat) + offset * index,
            lng: parseFloat(location.lng),
          },
          map: map,
        });
        markers.push(marker); // Lägg till den nya markören i referensarrayen
      });

      setMap(map);
    },

    [arrayOfCrimes]
  );

  const onUnmount = React.useCallback(function callback(map) {
    //Madde: du använder inte map, varför ta in den som en parameter?
    // -> För annars fungerar det inte.
    setMap(null);
  }, []);

  return isLoaded && arrayOfCrimes ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        mapId: "ab6140a0414848a8",
        // draggable: false,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <p>Laddar</p>
  );
}

export default GoogleMaps;
