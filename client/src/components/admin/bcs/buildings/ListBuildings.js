import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBuildings, deactivateBuilding, activateBuilding, deleteBuilding } from '../../../../redux/actions/building'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import {Table } from 'antd'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListBuildings = ( { building:{buildings, loading}, getBuildings, deactivateBuilding, activateBuilding, deleteBuilding , setAlert} ) => {
  useEffect(()=>{
    getBuildings()
  },[getBuildings])

  const deactivate = async (id) => {
    console.log({id}  )
    await deactivateBuilding(id)
    await getBuildings()
  }
  const activate = async (id) => {
    await activateBuilding(id)
    await getBuildings()
  }

  const deleteTheBuilding = async (id) => {
    await deleteBuilding(id)
    .then(()=> {
      setAlert('Building deleted.','success',2000)
      getBuildings()
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
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      className:'hide-sm'
    },
    {
      title: 'Type',
      dataIndex: 'buildingtype',
      key: 'buildingtype',
      className:'hide-sm',
      render: (buildingtype) => (
        <>{buildingtype.toUpperCase()}</>
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
          <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/buildings/?action=edit&id=${record.buildingid}`}><i className="fa fa-pen-nib"></i> Edit</Link>

          <DeleteButton confirmDelete={(e)=> deleteTheBuilding(record.buildingid)} itemName="Event"/>
        </>
      )
    }
  ]

  const data = buildings && !loading && buildings.map((building)=>{
    return {
      key: building._id,
      name: building.name,
      company: building.company.name,
      buildingtype: building.buildingtype,
      isactive: {isactive: building.isactive, id: building._id},
      actions: building._id,
      buildingid: building._id,
      id: building._id,
    }
  }) 
    
  return (
    <>
      {
        !buildings || loading ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (<Table 
          columns={columns} 
          dataSource={data} 
          title={()=>(<Link to="/admin/bcs/buildings?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Building</Link>)}
        />)
      }
    </>
  )
}

ListBuildings.propTypes = {
  building: PropTypes.object.isRequired,
  getBuildings: PropTypes.func.isRequired,
  deactivateBuilding: PropTypes.func.isRequired,
  activateBuilding: PropTypes.func.isRequired,
  deleteBuilding: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  building: state.building,
})
  
export default connect(mapStateToProps, {getBuildings, deactivateBuilding, activateBuilding, deleteBuilding, setAlert})(ListBuildings)
  