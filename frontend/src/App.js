import * as React from 'react';
import { useEffect, useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import axios from "axios"
import {format} from 'timeago.js'

axios.defaults.baseURL = 'http://localhost:3300';
function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  useEffect(()=>{
    const getPins = async () => {
      try {        
        const res = await axios.get("api/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    getPins();
  },[]);

  const handleMarkerClick = (id)=>{
    setCurrentPlaceId(id);
  }

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

      {pins.map((p)=>(
        <>
        <Marker 
        longitude={p.longitude} 
        latitude={p.latitude} 
        anchor="bottom"
        >
        <FaMapMarkerAlt 
          style={{ 
            width: '30px', 
            height: '30px', 
            color: "blue",
          }
        }
        onClick={()=>handleMarkerClick(p._id)}
        />   
      </Marker>

       {currentPlaceId === p._id &&
          <Popup 
            longitude={p.longitude} 
            latitude={p.latitude} 
            anchor="bottom"
            closeOnClick={false}
            >
             <div className='card'>
               <label>Title</label>
               <h4 className='place'>{p.title}</h4>
               <label>Review</label>
               <p className='desc'>{p.description}</p>
               <label>Rating</label>
               <div className='stars'>
                 <FaStar className='star'/>
                 <FaStar className='star'/>
                 <FaStar className='star'/>
                 <FaStar className='star'/>
                 <FaStar className='star'/>
                 </div>
                 <label>Information</label>
                 <span className='username'>Created by <b>{p.username}</b></span>
                 <span className='date'>{format(p.createdAt)}</span>
                 </div>
              </Popup> 
          }
            </>
      ))}

    </Map>
  );
}

export default App;



