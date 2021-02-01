import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '../../../utils/constants'
import Moment from 'react-moment'

const UserHistory = ( {login} ) => {
  const mapStyles = {        
    height: "250px",
    width: "250px",
    borderRadius:"50%"
  }
  
  const defaultCenter = {
    lat: login.geolocation.address.location.coordinates[1],
    lng: login.geolocation.address.location.coordinates[0]
  }

  const locations = [
    {
      name: login.geolocation.name,
      location: {
        lat: defaultCenter.lat,
        lng: defaultCenter.lng
      }
    }
  ]

  return (
      <div className="loginhistory bg-light">
        <div style={{width: '300px'}}>
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}
              id={login._id}
              options={{disableDefaultUI: true}}
            >
              { 
                locations.map(item => {
                  return (
                  <Marker key={item.name} position={item.location}/>
                  )
                })
              }
            </GoogleMap>
          </LoadScript>
        </div>
        <div>
          <h2><Moment format="dddd, MM/DD/YYYY hh:mm A">{login.date}</Moment></h2>
          <p>{login.geolocation.name} - {login.geolocation.isp}</p>
          <p>{login.geolocation.address.city}, {login.geolocation.address.state}{' '}{login.geolocation.address.zip}{'  '}{login.geolocation.address.country}</p>
          <p>{login.device}</p>
          <p>{login.ipaddress}</p>
        </div>
      </div>
  )
}

  
export default UserHistory
  