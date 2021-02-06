import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanies, deactivateCompany, activateCompany, deleteCompany } from '../../../../redux/actions/company'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import {Table, Tag } from 'antd'
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
  const [columns, setColumns] = useState("")
  const [data, setData] = useState('')

 if (!columns) setColumns([
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Address',
        key: 'address',
        className:'hide-sm',
        render: ( record) => (
          <> {record.address} <br/> {`${record.city}, ${record.state} ${record.zip}`}</>
        )
      },
      {
        title: 'Phone',
        key: 'phone',
        className:'hide-sm',
        render: ( record) => (
          <>{record.phonenumber}</>
        )
      },
      {
        title: 'Type',
        key: 'type',
        className: 'hide-sm',
        render: ( record)=> (
          <>
            <Tag color="blue">{record.typename}</Tag>
            <Tag>{record.typelevel}</Tag>
          </>
        )
      }, 
      {
        title: 'Active',
        key: 'isactive',
        className:'hide-sm text-center',
        render: (record) => (
          record.isactive ? 
                        <Link to="#" className="text-primary" onClick={(e)=>{deactivate(record.id)}}>Active</Link>
                        : 
                        <Link to="#" className="text-light-gray text-strike" onClick={(e)=>{activate(record.id)}}>Inactive</Link>
        )
      },
      {
        title: 'Actions',
        key: 'actions',
        className: 'text-center',
        render: ( record) => (
          <>
            <Link className="btn btn-success btn-outline" title="Edit" to={`/admin/bcs/companies/?action=edit&id=${record.companyid}`}><i className="fa fa-pen-nib"></i> Edit</Link>
            <DeleteButton confirmDelete={(e)=> clickDeleteCompany(record.companyid)} itemName="Event"/>
          </>
        )
      }
    ])

  useEffect(()=>{
    setData(companies.map((company)=>{
      return {
        key: company._id,
        name: company.name,
        address: company.companyaddress.address,
        city: company.companyaddress.city,
        state: company.companyaddress.state,
        zip: company.companyaddress.zip,
        phonenumber: company.contact.phone,
        typename: company.companytype.name, 
        typelevel:company.companytype.level,
        isactive: company.isactive,
        actions: company._id,
        companyid: company._id,
        id: company._id,
      }
  }))
  },[companies, loading])

 


  return (
    <>
      {
        !companies.length > 0 || loading || !data ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (<Table 
          columns={columns} 
          dataSource={data} 
          title={()=>(<Link to="/admin/bcs/companies?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Company</Link>)}
        />)
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
  