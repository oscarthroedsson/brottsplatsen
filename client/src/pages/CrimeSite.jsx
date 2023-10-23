import Nav from "../components/nav";
import { useParams } from "react-router-dom";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import crimeData from "../data/jsonAPI";

import timeIcon from "../icons/fillTimeDark.png";
import dateIcon from "../icons/fillDateDark.png";
import placeIcon from "../icons/fillLocationDark.png";
import shareIcon from "../icons/fillShare2Dark.png";
import infoIcon from "../icons/lineInfoMain.png";
import { useCallback, useState } from "react";

export default function CrimeSite() {
  const { id } = useParams();
  const crimeId = parseInt(id);
  const crime = crimeData.find((obj) => obj.id === crimeId);
  console.log("Brottet; ", crime);

  const timePeriod = new Date(crime.datetime);
  const year = timePeriod.getFullYear();
  const month = timePeriod.getMonth() + 1;
  const day = timePeriod.getDay();
  const hour = timePeriod.getHours();
  const min = timePeriod.getMinutes();

  return (
    <>
      <Nav />
      <main className="lg:px-16 xl:px-40 md:py-20 ">
        <section className="flex flex-wrap w-full bg-light-bg lg:flex lg:justify-between rounded-xl">
          <article className="py-4 xs:px-4 sm:px-10 m-auto w-full lg:w-1/3">
            <hgroup className="mb-8">
              <h1 className="h1 mb-4">{crime.type}</h1>
              <div className="flex gap-3 flex-wrap mb-2">
                <div className="centerHorizontal gap-1 text-size1-p">
                  <img src={timeIcon} alt="" className="w-5" />
                  {hour}:{min}
                </div>
                <div className="centerHorizontal gap-1 text-size1-p">
                  <img src={dateIcon} alt="" className="w-5" />
                  {day}/{month} - {year}
                </div>
                <div className="centerHorizontal gap-1 text-size1-p">
                  <img src={placeIcon} alt="" className="w-5" />
                  {crime.location.name}
                </div>
              </div>
              <div className="centerHorizontal gap-1">
                <img src={shareIcon} alt="" className="w-5" />
                <p className="text-size1-p">Share</p>
              </div>
            </hgroup>

            <article className="flex align-center gap-2 mb-8 text-size1-p">
              <img src={infoIcon} alt="" className="w-5 h-5 " />
              <div>{crime.summary}</div>
              <hr />
            </article>

            <p className="text-center text-size1-p font-medium-p text-main-color">
              Läs mer om {crime.type} i {crime.location.name}
            </p>
          </article>
          <div className="w-full lg:w-2/3">
            <CrimeMap crime={crime} />
          </div>
        </section>
      </main>
    </>
  );
}

function CrimeMap({ crime }) {
  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "0px 12px 12px 0px",
  };
  //Splitting the coordinate value from crime.location.gps and convert it to a float
  const [lat, lng] = crime.location.gps
    .split(",")
    .map((coord) => parseFloat(coord));

  //reg the lat and lng so the map show the location of the crime
  const center = {
    lat: lat,
    lng: lng,
  };

  //
  const { isLoaded } = useJsApiLoader({
    id: "ab6140a0414848a8",
    googleMapsApiKey: "AIzaSyBusRS-9Qru8pYjzF_AroJ88h4dWDeoFoQ",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);

    let zoom = 15;

    map.setZoom(zoom);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
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
  ) : (
    <>
      <p>Location is Loading...</p>
    </>
  );
}
