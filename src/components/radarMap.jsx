import React, { useContext, useState, useEffect, useRef} from "react";
// import { hot } from "react-hot-loader/root";
import { LocationContext } from "../App.js";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function RadarMap() {
  const Values = useContext(LocationContext);
  const [layers, setLayers] = useState(null);
  const [xTile, setXTile] = useState(null);
  const [yTile, setYTile] = useState(null);
  const position = [
    Values.currentLocation?.latitude,
    Values.currentLocation?.longitude,
  ];
  const isFirstRender = useRef(true);
  let mapEl;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return;
  }, [Values.currentLocation]);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  if (Values.currentLocation !== null && Values.radar) {
    const { toFahrenheit, toCelsius, changeDisplay } = Values;
    const { temp } = Values.weatherInfo.current;
    const { city, state, latitude, longitude } = Values.currentLocation;
    mapEl = (
      <MapContainer center={position} zoom="8" className="leaflet-container">
        <div>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url={`https://{s}.tile.osm.org/{z}/{x}/{y}.png`}
          />
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=bc5478df38b07b39ed924f4b833a75ac
            `}
          />
          <Marker position={position}>
            <Popup>
              {city}, {state}
              <br />
              {latitude}, {longitude}
              <br />
              {toFahrenheit(temp)}&deg;F / {toCelsius(temp)}&deg;C
            </Popup>
          </Marker>
        </div>
      </MapContainer>
    );
  }

  return <>{mapEl}</>;
}

export default RadarMap;
