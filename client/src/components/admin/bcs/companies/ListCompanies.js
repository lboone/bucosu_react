import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminGetCompanies, adminDeactivateCompany, adminActivateCompany, adminDeleteCompany, adminUpdateCompanies } from '../../../../redux/actions/admin/company'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import {Tag } from 'antd'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListCompanies = ( { adminCompany:{companies, loading}, adminGetCompanies, adminDeactivateCompany, adminActivateCompany, adminDeleteCompany , adminUpdateCompanies, setAlert} ) => {
  useEffect(()=> loading && companies && !companies.length > 0 && adminGetCompanies(), [loading, companies, adminGetCompanies])

  const clickadminDeleteCompany = async ({id, index}) => {
    await adminDeleteCompany(id)
    .then(()=> {
      const newCompanies = [...companies]
      newCompanies.splice(index,1)
      adminUpdateCompanies(newCompanies)
      setAlert('Company deleted.','success',2000)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const deactivate = async ({id, index}) => {
    await adminDeactivateCompany(id)
    .then(()=>{
      const newCompanies = [...companies]
      newCompanies[index].isactive = false
      adminUpdateCompanies(newCompanies)
    })
  }
  const activate = async ({id, index}) => {
    await adminActivateCompany(id)
    .then(()=>{
      const newCompanies = [...companies]
      newCompanies[index].isactive = true
      adminUpdateCompanies(newCompanies)
    })
  }

  return (
    <>
      {
        !companies || loading ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (
          <>
            <Link to="/admin/bcs/companies?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Company</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-md">Address</th>
                  <th className="hide-md">Phone</th>
                  <th className="hide-md">Type</th>
                  <th className="hide-md text-center">Active</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies && !loading && companies.map((company, index)=>{
                  return (
                    <tr key={company._id}>
                      <td>{company.name}</td>
                      <td className="hide-md">{(
                          <> 
                            {company && company.companyaddress && company.companyaddress.address && company.companyaddress.address} <br/> 
                            {`${company && company.companyaddress && company.companyaddress.city &&company.companyaddress.city}, ${company && company.companyaddress && company.companyaddress.state && company.companyaddress.state} ${company && company.companyaddress && company.companyaddress.zip && company.companyaddress.zip}`}
                          </>
                        )}
                      </td>
                      <td className="hide-md">{company && company.contact && company.contact.phone && company.contact.phone}</td>
                      <td className="hide-md">{
                        <>
                          <Tag color="blue">{company && company.companytype && company.companytype.name && company.companytype.name}</Tag>
                          <Tag>{company && company.companytype && company.companytype.level && company.companytype.level}</Tag>
                        </>}
                      </td>
                      <td className="hide-md text-center">{(
                          company.isactive? 
                            <Link className="text-primary" onClick={(e)=>{deactivate({id: company && company._id, index})}}>Active</Link>
                            : 
                            <Link className="text-light-gray text-strike" onClick={(e)=>{activate({id:company && company._id, index})}}>Inactive</Link>
                        )}
                      </td>
                      <td className="text-center">{(
                          <>
                            <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/companies/?action=edit&id=${index}`}><i className="fa fa-pen-nib"></i> Edit</Link>
                            <DeleteButton confirmDelete={(e)=> clickadminDeleteCompany({id: company._id, index})} itemName="Event"/>
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

ListCompanies.propTypes = {
  adminCompany: PropTypes.object.isRequired,
  adminGetCompanies: PropTypes.func.isRequired,
  adminDeactivateCompany: PropTypes.func.isRequired,
  adminActivateCompany: PropTypes.func.isRequired,
  adminDeleteCompany: PropTypes.func.isRequired,
  adminUpdateCompanies: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  adminCompany: state.adminCompany,
})
  
export default connect(mapStateToProps, {adminGetCompanies, adminDeactivateCompany, adminActivateCompany, adminDeleteCompany, adminUpdateCompanies, setAlert})(ListCompanies)
  