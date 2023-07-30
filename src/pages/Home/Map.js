import React from 'react';
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 44.482563637266836,
  lng:  26.083010183956997
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBm8mFTEKqMXOCo1dvbpmTSQ-Y1V0Mpr7I"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
          <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
