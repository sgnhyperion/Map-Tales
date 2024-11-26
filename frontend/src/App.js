import React, { useEffect, useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import {format} from 'timeago.js'
import axios from 'axios';

function App() {
  const url = 'http://localhost:3300/api/pins'
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentUser, setCurrentUser] = useState("Harsh"); // You might want to set this from login
  const [newPlace, setNewPlace] = useState(null);
  const [viewPort, setViewPort] = useState({ 
    longitude: 77.6602, 
    latitude: 12.8452, 
    zoom: 7 
  });
  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState(null);

  // Fetch pins using Axios
  useEffect(() => {
    const getPins = async () => {
      try {        
        const res = await axios.get(url);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getPins();
  }, []);

  const handleMarkerClick = (p) => {
    setCurrentPlaceId(p._id);
    setViewPort({
      ...viewPort, 
      latitude: p.latitude, 
      longitude: p.longitude
    });
  }

  const handleAddClick = (e) => {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    setNewPlace({ lat, lng });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser || 'Anonymous', // Fallback username if not set
      title: title,
      description: desc,
      rating: rating,
      latitude: newPlace.lat,
      longitude: newPlace.lng
    }

    try {
      const res = await axios.post(url, newPin);
      
      setPins([...pins, res.data]);
      
      setNewPlace(null);
      setTitle(null);
      setDesc(null);
      setRating(0);
    } catch (error) {
      console.error('Error creating pin:', error);
      alert('Failed to create pin. Please try again.');
    }
  }

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={viewPort}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onDblClick={handleAddClick}
    > 
      {pins.map((p) => (
        <React.Fragment key={p._id}>
          <Marker 
            longitude={p.longitude} 
            latitude={p.latitude} 
            anchor="bottom"
          >
            <FaMapMarkerAlt 
              style={{ 
                width: '30px', 
                height: '30px', 
                color: p.username === currentUser ? "red" : "blue",
              }}
              onClick={() => handleMarkerClick(p)}
            />   
          </Marker>
          {currentPlaceId === p._id && (
            <Popup 
              longitude={p.longitude} 
              latitude={p.latitude} 
              anchor="left"
              closeOnClick={false}
            >
              <div className='card'>
                <label>Title</label>
                <h4 className='place'>{p.title}</h4>
                <label>Review</label>
                <p className='desc'>{p.description}</p>
                <label>Rating</label>
                <div className='stars'>
                  {[...Array(p.rating)].map((_, index) => (
                    <FaStar key={index} className='star'/>
                  ))}
                </div>
                <label>Information</label>
                <span className='username'>Created by <b>{currentUser}</b></span>
                <span className='date'>{format(p.createdAt)}</span>
              </div>
            </Popup> 
          )}
        </React.Fragment>
      ))}

      {newPlace && (
        <Popup 
          longitude={newPlace.lng} 
          latitude={newPlace.lat} 
          anchor="left"
          closeOnClick={false}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input 
                placeholder='Enter title' 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label>Review</label>
              <textarea 
                placeholder='Say something about this place.'
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <label>Rating</label>
              <select 
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className='submit-button' type='submit'>Submit</button>
            </form>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;