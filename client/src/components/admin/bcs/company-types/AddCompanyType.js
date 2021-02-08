import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createCompanyType } from '../../../../redux/actions/companytype'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'

const AddCompanyType = ({ createCompanyType, setAlert }) => {  
  const history = useHistory()
  const initialState = {
    name: "",
    description: "",
    level: "",
  }

  const [formData, setFormData] = useState(initialState)
  const { name, description, level } = formData


  
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    createCompanyType({
      name, 
      description, 
      level, 
      })
    .then(()=>{
      setFormData({...initialState})
      setAlert('Company Type has been added','success',3000)
      setTimeout(()=>{
        history.push('/admin/bcs/company-types')
      },2500)
    })
    .catch((e)=> {
      console.log({error: e})
    })
  }
  return (
    <div className="container-center" style={{marginTop: '5px'}}>
      <form className="form" onSubmit= {e => onSubmit(e)}>
        <br />
        <p className="lead">
          <i className="fa fa-handshake"></i> User Type Information.
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
            placeholder="Description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Level"
            name="level"
            value={level}
            onChange={e => onChange(e)}
            required
          />
        </div>
        
        <br />
        <Link to="#" onClick={(e)=>onSubmit(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Company Type</Link>
        <Link to="/admin/bcs/company-types" className="btn btn-danger btn-outline"><i className="fa fa-times"></i> Cancel</Link>
      </form>
      
    </div>
  )
}

AddCompanyType.propTypes = {
  createCompanyType: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default connect(null,{createCompanyType, setAlert})(AddCompanyType)