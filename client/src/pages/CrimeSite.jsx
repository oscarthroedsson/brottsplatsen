import Nav from "../components/Nav.jsx";

import { useParams } from "react-router-dom";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

import timeIcon from "../icons/vTime.png";
import dateIcon from "../icons/vDate.png";
import placeIcon from "../icons/vPlace_ping.png";
import crimeIcon from "../icons/vCrime.png";

export default function CrimeSite() {
  const { type, location, id } = useParams();
  const [specificCrime, setSpecificCrime] = useState({});
  const [crimeArray, setCrimeArray] = useState([]);

  useEffect(() => {
    const fetchCrime = async () => {
      const res = await fetch(`http://localhost:3000/api/whole_list`);
      const data = await res.json();
      setCrimeArray(data);
    };
    fetchCrime();
  }, []);

  useEffect(() => {
    setSpecificCrime(crimeArray.find((crime) => crime._id === parseInt(id)));
    console.log("specificCrime: ", specificCrime);
  }, [crimeArray]);

  function getTime() {
    let time = new Date(specificCrime.datetime);
    let hour = time.getHours();
    let minute = time.getMinutes();

    return `${hour}:${minute}`;
  }

  function getDate() {
    let time = new Date(specificCrime.datetime);
    let month = time.getMonth();
    let day = time.getDate();

    return `${day}/${month}`;
  }

  console.log("specificCrime: ", specificCrime);

  return (
    <>
      <Nav />
      <main className="lg:px-16 xl:px-40 md:py-20 ">
        <section className="flex flex-wrap w-full bg-light-bg lg:flex lg:justify-between rounded-xl">
          <article className="py-4 xs:px-4 sm:px-10 m-auto w-full lg:w-1/3">
            {specificCrime && (
              <>
                <hgroup className="mb-8">
                  <h1 className="h1 mb-4">{type}</h1>
                  <div className="flex gap-3 flex-wrap mb-2">
                    <div className="centerHorizontal gap-1 text-size1-p">
                      <img src={timeIcon} alt="" className="w-4" />
                      {specificCrime && getTime(specificCrime)}
                    </div>
                    <div className="centerHorizontal gap-1 text-size1-p">
                      <img src={dateIcon} alt="" className="w-4" />
                      {specificCrime && getDate(specificCrime)}
                    </div>
                    <div className="centerHorizontal gap-1 text-size1-p">
                      <img src={placeIcon} alt="" className="w-3" />
                      {specificCrime && location}
                    </div>
                  </div>
                  <div className="centerHorizontal gap-1">
                    <img src="" alt="" className="w-3" />
                    <p className="text-size1-p">Share</p>
                  </div>
                </hgroup>

                <article className="flex align-center gap-2 mb-8 text-size1-p">
                  <img src={crimeIcon} alt="" className="w-5 h-4" />
                  <div>{specificCrime.summary}</div>
                  <hr />
                </article>
              </>
            )}
          </article>
          <div className="w-full lg:w-2/3">
            {/* {specificCrime && <CrimeMap crime={specificCrime} />} */}
          </div>
        </section>
      </main>
    </>
  );
}

// export function CrimeMap({ crime }) {
//   console.log("crime", crime);
//   const containerStyle = {
//     width: "100%",
//     height: "400px",
//     borderRadius: "0px 12px 12px 0px",
//   };

//   // Splitting the coordinate value from crime.location.gps and convert it to a float
//   console.log("gps:", crime.location.gps.split(","));
//   const [lat, lng] = crime.location.gps.split(",");

//   // reg the lat and lng so the map show the location of the crime
//   const center = { lat: lat, lng: lng };

//   // if map is loaded, show the map, else show a loading message
//   const { isLoaded } = useJsApiLoader({
//     id: "ab6140a0414848a8",
//     googleMapsApiKey: "AIzaSyBusRS-9Qru8pYjzF_AroJ88h4dWDeoFoQ",
//   });

//   const [map, setMap] = useState(null);

//   const onLoad = useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);

//     let zoom = 15;

//     map.setZoom(zoom);
//     setMap(map);
//   }, []);

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={{
//         disableDefaultUI: true,
//         mapId: "ab6140a0414848a8",
//         // draggable: false,
//       }}
//     />
//   ) : (
//     <>
//       <p>Location is Loading...</p>
//     </>
//   );
// }
