import React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

function GoogleMaps({ searchData }) {
  const [cordinate, setCordinate] = useState();
  const [map, setMap] = useState(null);

  useEffect(() => {
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
      setCordinate(result);
    };
    getCordinates();
    console.log("GoogleMaps | result", cordinate);
  }, []);

  const containerStyle = {};
  const center = {};

  const { isLoaded } = useJsApiLoader({
    id: "ab6140a0414848a8",
    googleMapsApiKey: "AIzaSyBusRS-9Qru8pYjzF_AroJ88h4dWDeoFoQ",
  });

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    //# | Go over the aarray with objects and create a marker for each object
    cordinate.forEach((location) => {
      const infoWindow = new window.google.maps.InfoWindow({
        content: "<h1>Stockholm</h1><p>This is Stockholm.</p>",
      });

      new window.google.maps.Marker({
        position: {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
        },
        map: map,
      });
    });

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
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
    </>
  ) : (
    console.log("laddar")
  );
}

export default GoogleMaps;
