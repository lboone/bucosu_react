import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminGetBuildings, adminUpdateBuilding } from '../../../../redux/actions/admin/building'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'


const EditBuilding = ({ adminBuilding:{buildings}, adminGetBuildings, adminUpdateBuilding, setAlert, index }) => {  
  const history = useHistory()
  const [building, setBuilding] = useState(null)
  const [buildingIndex, setBuildingIndex] = useState(null)

  useEffect(()=> index && setBuildingIndex(index), [ index ])
  useEffect(() => buildingIndex && !building && buildings && buildings.length > 0 && setBuilding(buildings[buildingIndex]), [ buildingIndex,building, buildings ])

  const initialState = {
    name: "",
    buildingtype: 'school',
    address: "",
    city: "",
    state: "",
    zip: "",
    lng: "",
    lat: "",
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(()=>{
    setFormData({
      ...formData,
      name: !building  ? '' : building.name,
      buildingtype: !building ? '' : building.buildingtype,
      address: !building  ? '' : building.buildingaddress.address,
      city: !building  ? '' : building.buildingaddress.city,
      state: !building  ? '' : building.buildingaddress.state,
      zip: !building  ? '' : building.buildingaddress.zip,
      lng: !building ? '' : building.buildingaddress.location.coordinates[0],
      lat: !building ? '' : building.buildingaddress.location.coordinates[1],
    })
  }, [ building ])
  const { name, buildingtype, address, city, state, zip, lng, lat } = formData

  

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    adminUpdateBuilding({
      name, 
      buildingtype,
      address,
      city,
      state,
      zip,
      lng,
      lat,
      id: building._id
    })
    .then(()=>{
      setAlert('Building has been updated','success',2000)
      adminGetBuildings()
      setTimeout(()=>{
        history.push('./')
      },2500)
    })
    .catch((e)=> {
      console.log({error: e})
    })
  }

  return (
      <div className="container-center" style={{marginTop:'5px'}}>
      {building ? (  <form className="form"  onSubmit={e => onSubmit(e)}>
          <br />
          <p className="lead">
            <i className="fas fa-building"></i> Building Information.
          </p>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              value={name} 
              onChange={e => onChange(e)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Address" 
              name="address" 
              value={address} 
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={city} 
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="State"
              name="state"
              value={state} 
              onChange={e => onChange(e)}
              maxLength="2"
              minLength="2"
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Zip" 
              name="zip" 
              value={zip} 
              onChange={e => onChange(e)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Longitude" 
              name="lng" 
              value={lng} 
              onChange={e => onChange(e)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Latitude" 
              name="lat" 
              value={lat} 
              onChange={e => onChange(e)}
              required 
            />
          </div>
          <br />
          <Link to="#" onClick={(e)=> onSubmit(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Building</Link>
          <input type="submit" className="btn btn-primary btn-outline hidden" value="Update Building" />
          <Link to="/admin/bcs/buildings" className="btn btn-danger btn-outline" id="cancelUpdateUser"><i className="fa fa-times"></i> Cancel</Link>  
        </form>
      ) : (<SkeletonList /> )}
      </div>
  )
}

EditBuilding.propTypes = {
  adminGetBuildings: PropTypes.func.isRequired,
  adminUpdateBuilding: PropTypes.func.isRequired,
  adminBuilding: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=> ({
  adminBuilding: state.adminBuilding
})

export default connect(mapStateToProps,{adminGetBuildings, setAlert, adminUpdateBuilding})(EditBuilding)