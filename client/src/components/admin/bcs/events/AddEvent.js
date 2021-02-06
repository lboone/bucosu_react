import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBcsEvent } from '../../../../redux/actions/event'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import moment from 'moment'

const AddEvent = ({ createBcsEvent, setAlert }) => {  
  const history = useHistory
  const initialState = {
    name: "",
    startdate: "",
    enddate: "",
    isactive: true,
  }

  const [formData, setFormData] = useState(initialState)
  const { name, startdate, enddate, isactive } = formData


  
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    createBcsEvent({
      name, 
      startdate: moment(startdate).format('YYYY-MM-DD'), 
      enddate: moment(enddate).format('YYYY-MM-DD'), 
      isactive})
    .then(()=>{
      setFormData({...initialState})
      setAlert('Event has been added','success',3000)
      setTimeout(()=>{
        history.push('./')
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
          <i className="fa fa-handshake"></i> Event Information.
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
            type="date"
            placeholder="YYYY-MM-DD"
            name="startdate"
            value={startdate}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            Start Date
          </small>
        </div>
        <div className="form-group">
          <input 
            type="date"
            placeholder="YYYY-MM-DD"
            name="enddate"
            value={enddate}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            End Date
          </small>
        </div>
        
        <br />
        <Link to="#" onClick={(e)=>onSubmit(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Event</Link>
        <Link to="/admin/bcs/events" className="btn btn-danger btn-outline"><i className="fa fa-times"></i> Cancel</Link>
      </form>
      
    </div>
  )
}

AddEvent.propTypes = {
  createBcsEvent: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default connect(null,{createBcsEvent, setAlert})(AddEvent)