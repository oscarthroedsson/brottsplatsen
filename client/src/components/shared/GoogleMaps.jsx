import React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

function GoogleMaps({ searchData }) {
  const [objArray, setObjArray] = useState();
  const [map, setMap] = useState(null);

  const markers = [];

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
      await setObjArray(result);
    };
    getCordinates();
  }, []);

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "0px 12px 12px 0px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "ab6140a0414848a8",
    googleMapsApiKey: "AIzaSyBusRS-9Qru8pYjzF_AroJ88h4dWDeoFoQ",
  });

  const onLoad = React.useCallback(
    function callback(map) {
      // Tar bort gamla markörer
      markers.forEach((marker) => marker.setMap(null));
      markers.length = 0;

      // Justerar kartans vy för att inkludera alla markörer
      const bounds = new window.google.maps.LatLngBounds();
      objArray.forEach((location) => {
        bounds.extend(
          new window.google.maps.LatLng(location.lat, location.lng)
        );
      });
      map.fitBounds(bounds);

      // Skapar en markör för varje objekt i arrayen
      let offset = 0.0001;
      objArray.forEach((location, index) => {
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
    [objArray]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded && objArray ? (
    <div className="py-12">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={11}
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
    </div>
  ) : (
    console.log("laddar")
  );
}

export default GoogleMaps;
