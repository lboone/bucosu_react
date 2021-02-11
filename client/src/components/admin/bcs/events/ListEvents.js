import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminGetBcsEvents, adminUpdateBcsEvents, adminDeactivateBcsEvent, adminActivateBcsEvent, adminDeleteBcsEvent } from '../../../../redux/actions/admin/bcsevent'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import DisplayDate from '../../../layout/ui/fields/DisplayDate'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListEvents = ( { adminBcsEvent:{bcsevents, loading}, adminGetBcsEvents, adminDeactivateBcsEvent, adminActivateBcsEvent, adminDeleteBcsEvent , adminUpdateBcsEvents, setAlert} ) => {
  useEffect(()=> loading && bcsevents && !bcsevents.length > 0 && adminGetBcsEvents(), [loading, bcsevents, adminGetBcsEvents])

  const clickDeleteEvent = async ({id, index}) => {
    await adminDeleteBcsEvent(id)
    .then(()=> {
      const newBcsEvents = [...bcsevents]
      newBcsEvents.splice(index,1)
      adminUpdateBcsEvents(newBcsEvents)
      setAlert('Event deleted.','success',2000)
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  const deactivate = async ({id, index}) => {
    await adminDeactivateBcsEvent(id)
    .then(()=>{
      const newBcsEvents = [...bcsevents]
      newBcsEvents[index].isactive = false
      adminUpdateBcsEvents(newBcsEvents)
    })
  }
  const activate = async ({id, index}) => {
    await adminActivateBcsEvent(id)
    .then(()=>{
      const newBcsEvents = [...bcsevents]
      newBcsEvents[index].isactive = true
      adminUpdateBcsEvents(newBcsEvents)
    })
  }


    
  return (
    <>
      {
        !bcsevents || loading ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (
          <>
            <Link to="/admin/bcs/events?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Event</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-md">From</th>
                  <th className="hide-md">To</th>
                  <th className="hide-md text-center">Active</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bcsevents && !loading && bcsevents.map((bcsevent, index)=>{
                  return (
                    <tr key={bcsevent._id}>
                      <td>{bcsevent.name}</td>
                      <td className="hide-md">{(<DisplayDate origDate={bcsevent.startdate}/>)}</td>
                      <td className="hide-md">{(<DisplayDate origDate={bcsevent.enddate}/>)}</td>
                      <td className="hide-md text-center">{(
                          bcsevent.isactive? 
                            <Link className="text-primary" onClick={(e)=>{deactivate({id: bcsevent._id, index})}}>Active</Link>
                            : 
                            <Link className="text-light-gray text-strike" onClick={(e)=>{activate({id: bcsevent._id, index})}}>Inactive</Link>
                        )}
                      </td>
                      <td className="text-center">{(
                          <>
                            <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/events/?action=edit&index=${index}`}><i className="fa fa-pen-nib"></i> Edit</Link>
                            <DeleteButton confirmDelete={(e)=> clickDeleteEvent({id: bcsevent._id, index})} itemName="Event"/>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )
      }
    </>
  )
}

ListEvents.propTypes = {
  adminBcsEvent: PropTypes.object.isRequired,
  adminGetBcsEvents: PropTypes.func.isRequired,
  adminDeactivateBcsEvent: PropTypes.func.isRequired,
  adminActivateBcsEvent: PropTypes.func.isRequired,
  adminDeleteBcsEvent: PropTypes.func.isRequired,
  adminUpdateBcsEvents: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  adminBcsEvent: state.adminBcsEvent,
})
  
export default connect(mapStateToProps, {adminGetBcsEvents, adminDeactivateBcsEvent, adminActivateBcsEvent, adminDeleteBcsEvent, adminUpdateBcsEvents, setAlert})(ListEvents)
  