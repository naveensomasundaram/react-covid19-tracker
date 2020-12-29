import React from "react";
import { MapContainer, TileLayer,Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import './Map.css';
import { showDataOnMap } from './util';

function ChangeView({ center, zoom }) {
  const map = useMap()
  map.setView(center, zoom);
  return null;
}

function Map({ countries, casesType, center, zoom }) {

  return (
    <div className="map">
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>            
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {showDataOnMap(countries, casesType)}
            <ChangeView center={center} zoom={zoom} /> 
        </MapContainer>
      </div>
  );
}

export default Map;