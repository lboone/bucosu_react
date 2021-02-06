import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanyUserTypes } from '../../../../redux/actions/company'

const CompanyUserTypesList = ( { company:{usertypes, loading }, getCompanyUserTypes, value, onChange, isDisabled, companyID } ) => {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [defaultValue, setDefaultValue] = useState("")
  const [disabled, setDisabled] = useState(false)
  
  useEffect(()=>{ (companyID) && getCompanyUserTypes(companyID) },[ companyID, getCompanyUserTypes ])
  useEffect(()=>{ (value) && setDefaultValue(value) },[ value ])
  useEffect(()=>{ (isDisabled) && setDisabled(isDisabled) },[ isDisabled ])
  useEffect(() => { (usertypes && usertypes.length > 0 && !loading) && setDataLoaded(true) }, [ usertypes, loading ])

  return (
      <div className="form-group">
      {
        (dataLoaded) ? (
          <select disabled={disabled} value={defaultValue} required onChange={onChange}>
            <option key={'082331'} value={''}>{'Select a User Type'}</option>
            {
              usertypes.map((usertype) => {
              return <option key={usertype._id} value={usertype._id}>{usertype.name.toUpperCase()}</option>
              })
            }
          </select>
        ) : (
          <select required >
            <option key={'03454340'} value={''}>{'Select a Company first'}</option>
          </select>
        )
      }
      </div>
  )
}

CompanyUserTypesList.propTypes = {
  getCompanyUserTypes: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  company: state.company
})
  
export default connect(mapStateToProps, {getCompanyUserTypes})(CompanyUserTypesList)
  