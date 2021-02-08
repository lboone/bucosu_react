import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../../../redux/actions/alert'
import { Link, useHistory } from 'react-router-dom'
import { createBuilding } from '../../../../redux/actions/building'
import CompaniesSelect from '../../../layout/ui/fields/CompaniesSelect'

const AddBuilding = ( { building:{ building, loading }, createBuilding, setAlert } ) => {
  const history = useHistory()
 
  const initialState = {
    name: '',
    address: '',
    buildingtype: 'school',
    city: '',
    state: '',
    zip: '',
    lng: '',
    lat: '',
    company:'',
  }
  const [formData, setFormData] = useState(initialState)

  const { name, address, buildingtype, city, state, zip, lng, lat , company } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

  const [isDisabled, setIsDisabled] = useState(true)
  if(formData && formData.company !== "" && isDisabled){
    setIsDisabled(false)
  }

  const onSubmit = e => {
    e.preventDefault();
    if(company ){
      createBuilding({
        name, address, buildingtype, city, state, zip, lng, lat, company
      })
      .then(()=>{
        setFormData({ ...initialState });
        setAlert('Building has been created.','success',2000)
        setTimeout(() => {
          history.push('/admin/bcs/buildings')
        }, 2000);
      })
      .catch((e)=>{
        console.log({error: e})
      })
    } else {
      setAlert('You must select a Company!','danger',3000)
    }
  }

  console.log({formData})

  return (
    
    <div className="container-center" style={{marginTop:'5px'}}>
        <form className="form"  onSubmit={e => onSubmit(e)}>
          <br />
          <p className="lead">
            <i className="fas fa-building"></i> Building Information.
          </p>
          <CompaniesSelect onChange={onChange} name="company" value={company} />
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
          {
            isDisabled ? 
              (<Link to="#" onClick={(e)=>e.preventDefault()} className="btn btn-light btn-outline"><i className="fa fa-save"></i> Save Building</Link>) :
              (<Link  to="#" onClick={(e)=>onSubmit(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Building</Link>)
          }
          <input type="submit" className="btn btn-primary btn-outline hidden" value="Add Building" />
          <Link to="/admin/bcs/buildings" className="btn btn-danger btn-outline" id="cancelUpdateUser"><i className="fa fa-times"></i> Cancel</Link>  
        </form>
      </div>
    
  )
}

AddBuilding.propTypes = {
  createBuilding: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  building: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  building: state.building,
})
  
export default connect(mapStateToProps, {createBuilding, setAlert})(AddBuilding)
  