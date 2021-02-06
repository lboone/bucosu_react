import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanies, deactivateCompany, activateCompany, deleteCompany } from '../../../../redux/actions/company'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/core'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import {Table, Tag } from 'antd'

const override = css`
  margin: auto;
  display: block;
`



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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      key: 'address',
      className:'hide-sm',
      render: (text, record) => (
        <> {record.address} <br/> {`${record.city}, ${record.state} ${record.zip}`}</>
      )
    },
    {
      title: 'Phone',
      key: 'phone',
      className:'hide-sm',
      render: (text, record) => (
        <>{record.phonenumber}</>
      )
    },
    {
      title: 'Type',
      key: 'type',
      className: 'hide-sm',
      render: (text, record)=> (
        <>
          <Tag color="blue">{record.typename}</Tag>
          <Tag>{record.typelevel}</Tag>
        </>
      )
    },  
    {
      title: 'Active',
      dataIndex: 'isactive',
      key: 'isactive',
      className:'hide-sm text-center',
      render: ({isactive, id}) => (
        isactive? 
                      <Link to="#" className="text-primary" onClick={(e)=>{deactivate(id)}}>Active</Link>
                      : 
                      <Link to="#" className="text-light-gray text-strike" onClick={(e)=>{activate(id)}}>Inactive</Link>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      className: 'text-center',
      render: (text, record) => (
        <>
          <Link className="btn btn-success btn-outline" title="Edit" to={`/admin/bcs/companies/?action=edit&id=${record.companyid}`}><i className="fa fa-pen-nib"></i> Edit</Link>
          <DeleteButton confirmDelete={(e)=> clickDeleteCompany(record.companyid)} itemName="Event"/>
        </>
      )
    }
  ]

  const data = companies && !loading && companies.map((company)=>{
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
      isactive: {isactive: company.isactive, id: company._id},
      actions: company._id,
      companyid: company._id
    }
  })
  console.log(data) 

  return (
    <>
      {
        !companies || loading ? 
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
  