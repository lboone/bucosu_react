import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanies, deactivateCompany, activateCompany, deleteCompany } from '../../../../redux/actions/company'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/core'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import DisplayDate from '../../../layout/ui/fields/DisplayDate'
import { setAlert } from '../../../../redux/actions/alert'

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


  return (
    <>
      <Link to="/admin/bcs/companies?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New Company</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hide-sm">Address</th>
            <th className="hide-sm">Phone</th>
            <th className="hide-sm">Type</th>
            <th className="hide-sm text-center">Active</th>
            <th className="text-center">Actions</th>

          </tr>
        </thead>
        <tbody>
        {
          !companies || loading ? 
          (<tr><td colSpan={5} style={{textAlign: 'center'}}>{
              loading ? (<BeatLoader color={'#37bc9b'} loading={true} css={override} margin={10} size={15} />) : (<h1>No Companies Found...</h1>)}</td></tr>
          )
          : 
            (
                companies.map( (company) => { 
                  return (
                  <tr key={company._id}>
                    <td>{company.name}</td>
                    <td className="hide-sm">{`${company.companyaddress.address} ${company.companyaddress.city}, ${company.companyaddress.state}  ${company.companyaddress.zip}`}</td>
                    <td className="hide-sm">{company.contact.phone}</td>
                    <td className="hide-sm"><span className="a-type">{company.companytype.name}<span></span>{`[${company.companytype.level}]`}</span></td>
                    <td className="hide-sm text-center">{
                      company.isactive? 
                      <Link className="text-primary" onClick={(e)=>{deactivate(company._id)}}>Active</Link>
                      : 
                      <Link className="text-light-gray text-strike" onClick={(e)=>{activate(company._id)}}>Inactive</Link>
                    }</td>
                    <td className="text-center">
                      {<Link className="btn btn-success btn-outline" title="Edit" to={`/admin/bcs/companies/?action=edit&id=${company._id}`}><i title="Edit" className="fa fa-pen-nib"></i> Edit</Link>}
                      {<DeleteButton confirmDelete={(e)=> clickDeleteCompany(company._id)} itemName="Company"/>}
                    </td>
                  </tr>
                  )})
              
            )
        }
        </tbody>
      </table>
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
  