import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminGetBuildings, adminDeactivateBuilding, adminActivateBuilding, adminDeleteBuilding, adminUpdateBuildings } from '../../../../redux/actions/admin/building'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import { Tag } from 'antd'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListBuildings = ( { adminBuilding:{buildings, loading}, adminGetBuildings, adminDeactivateBuilding, adminActivateBuilding, adminDeleteBuilding ,adminUpdateBuildings,  setAlert} ) => {
  useEffect(()=> loading && buildings && !buildings.length > 0 && adminGetBuildings() ,[loading, buildings, adminGetBuildings])

  const deactivate = async ({id, index}) => {
    await adminDeactivateBuilding(id)
    .then(()=>{
      const newBuildings = [...buildings]
      newBuildings[index].isactive = false
      adminUpdateBuildings(newBuildings)
    })
    
  }
  const activate = async ({id, index}) => {
    await adminActivateBuilding(id)
    .then(()=>{
      const newBuildings = [...buildings]
      newBuildings[index].isactive = true
      adminUpdateBuildings(newBuildings)
    })
  }

  const clickadminDeleteBuilding = async ({id, index}) => {
    await adminDeleteBuilding(id)
    .then(()=> {
      const newBuildings = [...buildings]
      newBuildings.splice(index,1)
      adminUpdateBuildings(newBuildings)
      setAlert('Building deleted.','success',2000)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
    
  return (
    <>
      {
        !buildings || loading ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (
          <>
            <Link to="/admin/bcs/buildings?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Building</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-md">Address</th>
                  <th className="hide-md">Company</th>
                  <th className="hide-md text-center">Type</th>
                  <th className="hide-md text-center">Active</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buildings && !loading && buildings.map((building, index)=>{
                  return (
                    <tr key={building._id}>
                      <td>{building.name}</td>
                      <td className="hide-md">{(
                        <> 
                          {building.buildingaddress.address} <br/> 
                          {`${building.buildingaddress.city}, ${building.buildingaddress.state} ${building.buildingaddress.zip}`}
                        </>
                      )}
                      </td>
                      <td className="hide-md">{building.company.name}</td>
                      <td className="hide-md text-center">{(
                          <Tag color="blue">{building.buildingtype.toUpperCase()}</Tag>
                        )}
                      </td>
                      <td className="hide-md text-center">{(
                          building.isactive? 
                            <Link className="text-primary" onClick={(e)=>{deactivate({id:building._id, index})}}>Active</Link>
                            : 
                            <Link className="text-light-gray text-strike" onClick={(e)=>{activate({id:building._id, index})}}>Inactive</Link>
                        )}
                      </td>
                      <td className="text-center">{(
                          <>
                            <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/buildings/?action=edit&index=${index}`}><i className="fa fa-pen-nib"></i> Edit</Link>
                            <DeleteButton confirmDelete={(e)=> clickadminDeleteBuilding({id:building._id, index})} itemName="Event"/>
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

ListBuildings.propTypes = {
  adminBuilding: PropTypes.object.isRequired,
  adminGetBuildings: PropTypes.func.isRequired,
  adminDeactivateBuilding: PropTypes.func.isRequired,
  adminActivateBuilding: PropTypes.func.isRequired,
  adminDeleteBuilding: PropTypes.func.isRequired,
  adminUpdateBuildings: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  adminBuilding: state.adminBuilding,
})
  
export default connect(mapStateToProps, {adminGetBuildings, adminDeactivateBuilding, adminActivateBuilding, adminDeleteBuilding, adminUpdateBuildings, setAlert})(ListBuildings)
  