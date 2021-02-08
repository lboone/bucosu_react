import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBuilding, updateBuilding } from '../../../../redux/actions/building'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const EditBuilding = ({ building:{building, loading}, id, getBuilding, updateBuilding, setAlert }) => {  
  const history = useHistory()

  useEffect(()=>{ id && getBuilding(id) } , [ id , getBuilding ] )

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
      name: loading || !building  ? '' : building.name,
      buildingtype: loading || !building ? '' : building.buildingtype,
      address: loading || !building  ? '' : building.buildingaddress.address,
      city: loading || !building  ? '' : building.buildingaddress.city,
      state: loading || !building  ? '' : building.buildingaddress.state,
      zip: loading || !building  ? '' : building.buildingaddress.zip,
      lng: loading || !building ? '' : building.buildingaddress.location.coordinates[0],
      lat: loading || !building ? '' : building.buildingaddress.location.coordinates[1],
    })
  }, [ building, loading ])
  const { name, buildingtype, address, city, state, zip, lng, lat } = formData

  

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    updateBuilding({
      name, 
      buildingtype,
      address,
      city,
      state,
      zip,
      lng,
      lat,
      id
    })
    .then(()=>{
      setAlert('Building has been updated','success',3000)
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
      {building && !loading ? (  <form className="form"  onSubmit={e => onSubmit(e)}>
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
  getBuilding: PropTypes.func.isRequired,
  updateBuilding: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=> ({
  building: state.building
})

export default connect(mapStateToProps,{getBuilding, setAlert, updateBuilding})(EditBuilding)