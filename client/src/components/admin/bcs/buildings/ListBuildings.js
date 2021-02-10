import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBuildings, deactivateBuilding, activateBuilding, deleteBuilding } from '../../../../redux/actions/building'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import { Tag } from 'antd'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListBuildings = ( { building:{buildings, loading}, getBuildings, deactivateBuilding, activateBuilding, deleteBuilding , setAlert} ) => {
  useEffect(()=>{
    getBuildings()
  },[getBuildings])

  const deactivate = async (id) => {
    await deactivateBuilding(id)
    await getBuildings()
  }
  const activate = async (id) => {
    await activateBuilding(id)
    await getBuildings()
  }

  const clickDeleteBuilding = async (id) => {
    await deleteBuilding(id)
    .then(()=> {
      setAlert('Building deleted.','success',2000)
      getBuildings()
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
                {buildings && !loading && buildings.map((building)=>{
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
                            <Link className="text-primary" onClick={(e)=>{deactivate(building._id)}}>Active</Link>
                            : 
                            <Link className="text-light-gray text-strike" onClick={(e)=>{activate(building._id)}}>Inactive</Link>
                        )}
                      </td>
                      <td className="text-center">{(
                          <>
                            <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/buildings/?action=edit&id=${building._id}`}><i className="fa fa-pen-nib"></i> Edit</Link>
                            <DeleteButton confirmDelete={(e)=> clickDeleteBuilding(building._id)} itemName="Event"/>
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
  