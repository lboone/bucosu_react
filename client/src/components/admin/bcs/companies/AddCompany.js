import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminCreateCompany, adminGetCompanies } from '../../../../redux/actions/admin/company'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import CompanyTypesSelect from '../../../layout/ui/fields/CompanyTypesSelect'


const AddCompany = ({ adminCreateCompany, adminGetCompanies, setAlert }) => {  
  const history = useHistory()
  const initialState = {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    website: "",
    logo: "",
    companyTypeID: '',
    isactive: true,
  }

  const [formData, setFormData] = useState(initialState)
  const { name, address, city, state, zip, phone, website, logo, isactive, companyTypeID } = formData

  const [isDisabled, setIsDisabled] = useState(true)
  if(formData && formData.companyTypeID !== "" && isDisabled){
    setIsDisabled(false)
  }

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    adminCreateCompany({
      name, 
      address,
      city,
      state,
      zip,
      phone,
      website,
      logo,
      isactive,
      companyTypeID,
    })
    .then(()=>{
      setFormData({...initialState})
      adminGetCompanies()
      setAlert('Company has been added','success',2000)
      setTimeout(()=>{
        history.push('/admin/bcs/companies')
      },2500)
    })
    .catch((e)=> {
      console.log({error: e})
    })
  }

  //TODO: Add a field for relationships with.  When a company is created, we need to add it to other companies relationships.  Also, we need to pick what companies this company has relationships with.
  return (
    <div className="container-center" style={{marginTop: '5px'}}>
      <form className="form" onSubmit= {e => onSubmit(e)}>
        <br />
        <p className="lead">
          <i className="fa fa-briefcase"></i> Company Information.
        </p>
        <CompanyTypesSelect onChange={onChange} value={companyTypeID}/>
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
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={e => onChange(e)}
            required          
          />
          <small className="form-text">
            Format: 5554443333
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
            required          
          />
          <small className="form-text">
            Format: www.public.com
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Logo"
            name="logo"
            value={logo}
            onChange={e => onChange(e)}
            required          
          />
          <small className="form-text">
            Format: www.somesite.com/yourlogo.png
          </small>
        </div>                
        <br />
        {
          isDisabled ? 
          (<Link to="#" onClick={(e)=>e.preventDefault()} className="btn btn-light btn-outline"><i className="fa fa-save"></i> Save Company</Link>) :
          (<Link  to="#" onClick={(e)=>onSubmit(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Company</Link>)
        }
        
        <Link to="/admin/bcs/companies"  className="btn btn-danger btn-outline"><i className="fa fa-times"></i> Cancel</Link>
      </form>
      
    </div>
  )
}

AddCompany.propTypes = {
  adminCreateCompany: PropTypes.func.isRequired,
  adminGetCompanies: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default connect(null,{adminCreateCompany, adminGetCompanies, setAlert})(AddCompany)