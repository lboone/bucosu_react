import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanies, deactivateCompany, activateCompany, deleteCompany } from '../../../../redux/actions/company'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import {Tag } from 'antd'
import SkeletonList from '../../../layout/feedback/SkeletonList'


const ListCompanies = ( { company:{companies, loading}, getCompanies, deactivateCompany, activateCompany, deleteCompany , setAlert} ) => {
  useEffect(()=>{
    getCompanies()
  },[getCompanies])

  const deactivate = async (id) => {
    await deactivateCompany(id)
    await getCompanies()
  }
  const activate = async (id) => {
    await activateCompany(id)
    await getCompanies()
  }

  const clickDeleteCompany = async (id) => {
    await deleteCompany(id)
    .then(()=> {
      setAlert('Company deleted.','success',2000)
      getCompanies()
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  

 


  return (
    <>
      {
        (    <>
      {
        !companies || loading ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (
          <>
            <Link to="/admin/bcs/companies?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Building</Link>
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
                {companies && !loading && companies.map((company)=>{
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
                            <Link className="text-primary" onClick={(e)=>{deactivate(company && company._id)}}>Active</Link>
                            : 
                            <Link className="text-light-gray text-strike" onClick={(e)=>{activate(company && company._id)}}>Inactive</Link>
                        )}
                      </td>
                      <td className="text-center">{(
                          <>
                            <Link className="btn btn-primary btn-outline" title="Edit" to={`/admin/bcs/companies/?action=edit&id=${company._id}`}><i className="fa fa-pen-nib"></i> Edit</Link>
                            <DeleteButton confirmDelete={(e)=> clickDeleteCompany(company._id)} itemName="Event"/>
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
    </>)
      }
    </>
  )
}

ListCompanies.propTypes = {
  company: PropTypes.object.isRequired,
  getCompanies: PropTypes.func.isRequired,
  deactivateCompany: PropTypes.func.isRequired,
  activateCompany: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  company: state.company,
})
  
export default connect(mapStateToProps, {getCompanies, deactivateCompany, activateCompany, deleteCompany, setAlert})(ListCompanies)
  