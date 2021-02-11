import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminUpdateBcsEvent, adminGetBcsEvents } from '../../../../redux/actions/admin/bcsevent'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import moment from 'moment'
import {formatDate} from '../../../../utils/globalFunctions'
import { Skeleton } from 'antd'

const EditEvent = ({ adminBcsEvent:{bcsevents}, adminUpdateBcsEvent, setAlert, id , adminGetBcsEvents}) => {  
  const history = useHistory()
  const [bcsEvent, setBcsEvent] = useState(null)
  const [bcsEventIndex, setBcsEventIndex] = useState(null)
  

  useEffect(()=> id && setBcsEventIndex(id), [id])
  useEffect(()=> bcsEventIndex && !bcsEvent && bcsevents && bcsevents.length > 0 && setBcsEvent(bcsevents[bcsEventIndex]),[bcsEventIndex, bcsEvent, bcsevents])

  
  const initialState = {
    name: "",
    startdate: "",
    enddate: "",
    isactive: true,
  }
  const [formData, setFormData] = useState(initialState)

  useEffect(()=>{
    setFormData({
      name: !bcsEvent  ? '' : bcsEvent.name,
      startdate: !bcsEvent  ? '' : formatDate(bcsEvent.startdate,'YYYY-MM-DD'),
      enddate: !bcsEvent ? '' : formatDate(bcsEvent.enddate,'YYYY-MM-DD'),
      isactive: !bcsEvent ? '' : bcsEvent.isactive,
    })
  }, [ bcsEvent ])
  
  const { name, startdate, enddate, isactive } = formData
  
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    adminUpdateBcsEvent({
      name, 
      startdate: moment(startdate).format('YYYY-MM-DD'), 
      enddate: moment(enddate).format('YYYY-MM-DD'), 
      isactive,
      id:bcsEvent._id
    })
    .then(()=>{
      setAlert('Event has been saved','success',2000)
      adminGetBcsEvents()
      setTimeout(()=>{
        history.push('/admin/bcs/events')
      },3000)
    })
    .catch((e)=> {
      console.log({error: e})
    })
  }
  return (
    <div className="container-center" style={{marginTop: '5px'}}>
      {bcsEvent ? (
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
      )  : (
        <>
        <Skeleton avatar active paragraph={{ rows: 4 }} /> 
        <Skeleton avatar active paragraph={{ rows: 4 }} />
        </>
      )}
    </div>
  )
}

EditEvent.propTypes = {
  adminUpdateBcsEvent: PropTypes.func.isRequired,
  adminGetBcsEvents: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  adminBcsEvent: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=> ({
  adminBcsEvent: state.adminBcsEvent
})

export default connect(mapStateToProps,{adminUpdateBcsEvent, setAlert, adminGetBcsEvents})(EditEvent)