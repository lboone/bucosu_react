import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanies, setCompany, getCompanyUserTypes, setCompanyUserType } from '../../actions/company'

const CompanyList = ( { auth, company:{companies,company, usertypes, usertype }, getCompanies, setCompany, getCompanyUserTypes, setCompanyUserType } ) => {
  useEffect(() => {
    getCompanies()
  }, [getCompanies])

  const onChange = (e) => { 
    setCompany(e.target.value)
    getCompanyUserTypes(e.target.value)
  }
  const onChangeUserTypes = (e) => {
    setCompanyUserType(e.target.value)
  }
  return (
    <div className="form">
      <div className="form-group">
      <select  onChange={(e) => onChange(e)} required>
        <option defaultValue key={'000001'} value={''}>{'Select a Company'}</option>
      {
          companies.map((company) => {
          return <option key={company._id} value={company._id}>{company.name.toUpperCase()}</option>
          })
        }
      </select>
      </div>
      <div className="form-group">
      {
        (company && usertypes) ? (
          <select required onChange={(e) => onChangeUserTypes(e)}>
            <option defaultValue key={'000002'} value={''}>{'Select a User Type'}</option>
            {
              usertypes.map((usertype) => {
              return <option key={usertype._id} value={usertype._id}>{usertype.name.toUpperCase()}</option>
              })
            }
          </select>
        ) : (
          <select required >
            <option defaultValue key={'0000003'} value={''}>{'Select a Company first'}</option>
          </select>
        )
      }
      </div>
    </div>
  )
}

CompanyList.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  setCompany: PropTypes.func.isRequired,
  getCompanyUserTypes: PropTypes.func.isRequired,
  setCompanyUserType: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company
})
  
export default connect(mapStateToProps, {getCompanies, setCompany, getCompanyUserTypes, setCompanyUserType})(CompanyList)
  