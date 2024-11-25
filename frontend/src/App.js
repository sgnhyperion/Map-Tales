import * as React from 'react';
import { useEffect, useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3300/api"

function App() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(()=>{
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    getPins();
  },[])

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
      {pins.map((p, index)=>(
        <React.Fragment key={index}>
          <Marker 
            longitude={p.longitude} 
            latitude={p.latitude} 
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedPin(p);
            }}
          >
            <FaMapMarkerAlt 
              style={{ 
                width: '30px', 
                height: '30px', 
                color: "blue",
              }}
            />   
          </Marker>

          {selectedPin && selectedPin._id === p._id && (
            <Popup 
              longitude={p.longitude} 
              latitude={p.latitude} 
              anchor="left"
              onClose={() => setSelectedPin(null)}
            >
              <div className='card'>
                <label>Title</label>
                <h4 className='place'>{p.title}</h4>
                <label>Review</label>
                <p className='desc'>{p.description}</p>
                <label>Rating</label>
                <div className='stars'>
                  {[...Array(p.rating)].map((star, index) => (
                    <FaStar key={index} className='star'/>
                  ))}
                </div>
                <label>Information</label>
                <span className='username'>Created by <b>{p.username}</b></span>
                <span className='date'>1 hour ago</span>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
    </Map>
  );
}

export default App;