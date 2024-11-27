# Location Pinning Map Application

## Project Overview
This is a full-stack web application that allows users to pin locations on a map and add detailed information about each pinned location. Users can double-click on the map to create a pin and then fill out a form with additional details.

## Technologies Used
- **Frontend**: React.js
  - Chosen for its component-based architecture and efficient rendering
  - Provides a smooth, responsive user interface
- **Backend**: Express.js
  - Lightweight and flexible Node.js web application framework
  - Easy to set up routes and handle API requests
- **Database**: MongoDB
  - NoSQL database for flexible, schema-less data storage
  - Ideal for storing location-based information with varying attributes
 - **API**: MapBox
  - used react-map-gl library to integrate map

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

## Installation and Setup

### 1. Clone the Repository
```bash
git clone git@github.com:sgnhyperion/Map-Tales.git
cd Map-Tales
```

### 2. Install Dependencies
#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

### 3. Run the Application
#### Start Backend Server
```bash
cd backend
npm start
```

#### Start Frontend Development Server
```bash
cd ../frontend
npm start
```

## Features
- Interactive map interface
- Double-click to pin locations
- Add detailed information for each pin:
  - Title
  - Description
  - Review
  - Rating

## Future Improvements
- Add user authentication
- Implement location sharing
- Create advanced filtering options
- Adding Media

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## TroubleShoot
The loading of map takes time, so if the application doesn't work please reopen the like 4-5 time and it will start working


## Contact
Harsh Kumar - harsh.23bcs10116@sst.scaler.com

Project Link: https://map-tales-frontend.vercel.app/
