import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import { FaMapMarkerAlt } from "react-icons/fa";
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: 77.6602,
        latitude: 12.8452,
        zoom: 7
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker 
        longitude={77.6602} 
        latitude={12.8452} 
        anchor="bottom"
      >
        <FaMapMarkerAlt 
          style={{ 
            width: '30px', 
            height: '30px', 
            color: "blue",
          }}
        />   
      </Marker>
    </Map>
  );
}

export default App;