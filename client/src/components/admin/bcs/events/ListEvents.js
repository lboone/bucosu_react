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
import {Table } from 'antd'


const override = css`
  margin: auto;
  display: block;
`

const ListEvents = ( { event:{events, loading}, getBcsEvents, deactivateBcsEvent, activateBcsEvent, deleteBcsEvent , setAlert} ) => {
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'From Data',
      dataIndex: 'startdate',
      key: 'startdate',
      className:'hide-sm',
      render: (startdate) => (
        <DisplayDate origDate={startdate}/>
      )
    },
    {
      title: 'To Data',
      dataIndex: 'enddate',
      key: 'enddate',
      className:'hide-sm',
      render: (enddate) => (
        <DisplayDate origDate={enddate}/>
      )
    },
    {
      title: 'Active',
      dataIndex: 'isactive',
      key: 'isactive',
      className:'hide-sm text-center',
      render: ({isactive, id}) => (
        isactive? 
                      <Link className="text-primary" onClick={(e)=>{deactivate(id)}}>Active</Link>
                      : 
                      <Link className="text-light-gray text-strike" onClick={(e)=>{activate(id)}}>Inactive</Link>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      className: 'text-center',
      render: (text, record) => (
        <>
          <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/events/?action=edit&id=${record.eventid}`}><i className="fa fa-pen-nib"></i> Edit</Link>

          <DeleteButton confirmDelete={(e)=> deleteEvent(record.eventid)} itemName="Event"/>
        </>
      )
    }
  ]

  const data = events && !loading && events.map((event)=>{
    return {
      key: event._id,
      name: event.name,
      startdate: event.startdate,
      enddate: event.enddate,
      isactive: {isactive: event.isactive, id: event._id},
      actions: event._id,
      eventid: event._id,
    }
  }) 
  console.log(data)
  
  return (
    <>
      {
        !events || loading ? 
        (<div className="text-center">
          <BeatLoader 
            color={'#37bc9b'} 
            loading={true} 
            css={override} 
            margin={10} 
            size={15} 
          />
        </div>)
        :
        (<Table 
          columns={columns} 
          dataSource={data} 
          title={()=>(<Link to="/admin/bcs/events?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Event</Link>)}
        />)
      }
    </>
  )
}

ListEvents.propTypes = {
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
  
export default connect(mapStateToProps, {getBcsEvents, deactivateBcsEvent, activateBcsEvent, deleteBcsEvent, setAlert})(ListEvents)
  