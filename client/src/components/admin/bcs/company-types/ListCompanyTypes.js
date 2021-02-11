import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminGetCompanyTypes, adminDeleteCompanyType, adminUpdateCompanyTypes} from '../../../../redux/actions/admin/companytype'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListCompanyTypes = ( { adminCompanyType:{companytypes, loading}, adminGetCompanyTypes,adminDeleteCompanyType, adminUpdateCompanyTypes,  setAlert} ) => {
  useEffect(()=> loading && companytypes && !companytypes.length > 0 && adminGetCompanyTypes(), [loading, companytypes, adminGetCompanyTypes])


  const clickDeleteEvent = async ({id, index}) => {
    await adminDeleteCompanyType(id)
    .then(()=> {
      const newCompanyTypes = [...companytypes]
      newCompanyTypes.splice(index,1)
      adminUpdateCompanyTypes(newCompanyTypes)
      setAlert('Company Type deleted.','success',2000)
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
                {companytypes && !loading && companytypes.map((companytype, index)=>{
                  return (
                    <tr key={companytype._id}>
                      <td>{companytype.name}</td>
                      <td className="hide-md">{companytype.description}</td>
                      <td className="hide-md">{companytype.level}</td>
                      <td className="text-center">{(
                          <>
                            <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/company-types/?action=edit&index=${index}`}><i className="fa fa-pen-nib"></i> Edit</Link>
                            <DeleteButton confirmDelete={(e)=> clickDeleteEvent({id:companytype._id,index})} itemName="Company Type"/>
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
  adminCompanyType: PropTypes.object.isRequired,
  adminGetCompanyTypes: PropTypes.func.isRequired,
  adminDeleteCompanyType: PropTypes.func.isRequired,
  adminUpdateCompanyTypes: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  adminCompanyType: state.adminCompanyType,
})
  
export default connect(mapStateToProps, {adminGetCompanyTypes, adminDeleteCompanyType, adminUpdateCompanyTypes, setAlert})(ListCompanyTypes)
  