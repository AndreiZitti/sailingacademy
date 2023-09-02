import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '80vw',
  height: '500px'
};

const center = {
  lat: 44.482563637266836,
  lng: 26.083010183956997
};

function Map() {
  const [zoom, setZoom] = useState(10);
  const [showMarker, setShowMarker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (zoom < 15) {
        setZoom(prevZoom => prevZoom + 1);
      } else {
        clearInterval(interval);
        setShowMarker(true); // Show marker after zoom-in
      }
    }, 200);

    return () => clearInterval(interval);
  }, [zoom]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBm8mFTEKqMXOCo1dvbpmTSQ-Y1V0Mpr7I"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {showMarker && (
          <Marker
            position={center}
            animation={google.maps.Animation.DROP}
           
          />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
