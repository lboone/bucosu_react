import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBcsEvents, deactivateBcsEvent, activateBcsEvent, deleteBcsEvent } from '../../../../redux/actions/event'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/core'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import DisplayDate from '../../../layout/ui/fields/DisplayDate'
import { setAlert } from '../../../../redux/actions/alert'

const override = css`
  margin: auto;
  display: block;
`



const Events = ( { event:{events, loading}, getBcsEvents, deactivateBcsEvent, activateBcsEvent, deleteBcsEvent , setAlert} ) => {
  useEffect(()=>{
    getBcsEvents()
  },[getBcsEvents])

  const deactivate = async (id) => {
    await deactivateBcsEvent(id)
    await getBcsEvents()
  }
  const activate = async (id) => {
    await activateBcsEvent(id)
    await getBcsEvents()
  }

  const deleteEvent = async (id) => {
    await deleteBcsEvent(id)
    .then(()=> {
      setAlert('Event deleted.','success',2000)
      getBcsEvents()
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  return (
    <>
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
          (<tr><td colSpan={5} style={{textAlign: 'center'}}>{
              loading ? (<BeatLoader color={'#37bc9b'} loading={true} css={override} margin={10} size={15} />) : (<h1>No Events Found...</h1>)}</td></tr>
          )
          : 
            (
                events.map( (event) => { 
                  return (
                  <tr key={event._id}>
                    <td>{event.name}</td>
                    <td className="hide-sm"><DisplayDate origDate={event.startdate}/></td>
                    <td className="hide-sm"><DisplayDate origDate={event.enddate}/></td>
                    <td className="hide-sm text-center">{
                      event.isactive? 
                      <Link className="text-primary" onClick={(e)=>{deactivate(event._id)}}>Active</Link>
                      : 
                      <Link className="text-light-gray text-strike" onClick={(e)=>{activate(event._id)}}>Inactive</Link>
                    }</td>
                    <td className="text-center">
                      {<Link className="btn btn-success btn-outline" title="Edit" to={`/admin/bcs/events/?action=edit&id=${event._id}`}><i title="Edit" className="fa fa-pen-nib"></i> Edit</Link>}
                      {<DeleteButton confirmDelete={(e)=> deleteEvent(event._id)} itemName="Event"/>}
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
  deactivateBcsEvent: PropTypes.func.isRequired,
  activateBcsEvent: PropTypes.func.isRequired,
  deleteBcsEvent: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  event: state.event,
})
  
export default connect(mapStateToProps, {getBcsEvents, deactivateBcsEvent, activateBcsEvent, deleteBcsEvent, setAlert})(Events)
  