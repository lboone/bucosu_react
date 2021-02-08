import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanyTypes, deleteCompanyType } from '../../../../redux/actions/companytype'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListCompanyTypes = ( { companytype:{companytypes, loading}, getCompanyTypes,deleteCompanyType , setAlert} ) => {
  useEffect(()=>{
    getCompanyTypes()
  },[getCompanyTypes])


  const clickDeleteEvent = async (id) => {
    await deleteCompanyType(id)
    .then(()=> {
      setAlert('Company Type deleted.','success',2000)
      getCompanyTypes()
    })
    .catch((err)=>{
      console.log(err)
    })
  }
    
  return (
    <>
      {
        !companytypes || loading ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (
          <>
            <Link to="/admin/bcs/company-types?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Company Type</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-md">Description</th>
                  <th className="hide-md">Level</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companytypes && !loading && companytypes.map((companytype)=>{
                  return (
                    <tr key={companytype._id}>
                      <td>{companytype.name}</td>
                      <td className="hide-md">{companytype.description}</td>
                      <td className="hide-md">{companytype.level}</td>
                      <td className="text-center">{(
                          <>
                            <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/company-types/?action=edit&id=${companytype._id}`}><i className="fa fa-pen-nib"></i> Edit</Link>
                            <DeleteButton confirmDelete={(e)=> clickDeleteEvent(companytype._id)} itemName="Company Type"/>
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

ListCompanyTypes.propTypes = {
  companytype: PropTypes.object.isRequired,
  getCompanyTypes: PropTypes.func.isRequired,
  deleteCompanyType: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  companytype: state.companytype,
})
  
export default connect(mapStateToProps, {getCompanyTypes, deleteCompanyType, setAlert})(ListCompanyTypes)
  