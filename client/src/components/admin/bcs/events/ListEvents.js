import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBcsEvents } from '../../../../actions/event'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Moment from 'react-moment'


const Events = ( { event:{events, loading}, getBcsEvents } ) => {
  useEffect(()=>{
    getBcsEvents()
  },[getBcsEvents])

  const confirmFunction = () => {
    console.log('confirm')
  }
  const declineFunction = () => {
    console.log('decline')
  }
  const confirm = () => {
    confirmAlert(options)
  }

  const options = {
    title : 'Delete Event?',
    message : 'Are you sure you want to delete this event?',
    buttons: [
      { label: 'Yes', onClick: confirmFunction},
      { label: 'No', onClick: declineFunction}
    ],
    closeOnEscape: false,
    closeOnClickOutside : false,
  }

  return (
    <>
      <h2>List Events</h2>
      <Link to="/admin/bcs/events?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Event</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hide-sm">From Date</th>
            <th className="hide-sm">To Date</th>
            <th className="hide-sm text-center">Active</th>
            <th className="text-center">Actions</th>

          </tr>
        </thead>
        <tbody>
        {
          !events || loading ? 
            (<tr><td colSpan={5}><h1>loading...</h1></td></tr>) 
          : 
            (
                events.map( (event) => { return (
                  <tr key={event._id}>
                    <td>{event.name}</td>
                    <td className="hide-sm"><Moment format="MM/DD/YYYY">{event.startdate}</Moment></td>
                    <td className="hide-sm"><Moment format="MM/DD/YYYY">{event.enddate}</Moment></td>
                    <td className="hide-sm text-center">{event.isactive? 'Active' : 'Inactive'}</td>
                    <td className="text-center">
                      {<Link className="btn btn-success btn-outline" title="Edit" to={`/admin/bcs/events/?action=edit&id=${event._id}`}><i title="Edit" className="fa fa-pen-nib"></i> Edit</Link>}
                      {<Link className="btn btn-danger btn-outline" title="Delete" onClick={confirm}><i title="Delete" className="fa fa-trash"></i> Delete</Link>}
                    </td>
                  </tr>
                  )})
              
            )
        }
        </tbody>
      </table>
    </>
  )
}

Events.propTypes = {
  event: PropTypes.object.isRequired,
  getBcsEvents: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  event: state.event,
})
  
export default connect(mapStateToProps, {getBcsEvents})(Events)
  