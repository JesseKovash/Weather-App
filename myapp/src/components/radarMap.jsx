import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function RadarMap() {
  const Values = useContext(LocationContext);
  const position = [Values.currentLocation?.latitude, Values.currentLocation?.longitude];
  let map;

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  if (Values.currentLocation !== null && Values.radar) {
    map =
    <div className="leaflet-container">
      <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
        <ChangeView center={position} zoom={12} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  }

  return (
    <>
    {map}
    </>
  )
}

export default RadarMap