import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminGetCompanyTypes } from '../../../../redux/actions/admin/companytype'

const CompanyTypesSelect = ( {adminCompanyType:{companytypes, loading}, adminGetCompanyTypes, value, name="companyTypeID", onChange, isDisabled} ) => {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [defaultValue, setDefaultValue] = useState("")
  const [disabled, setDisabled] = useState(false)

  useEffect(() => { !dataLoaded && adminGetCompanyTypes() }, [ dataLoaded, adminGetCompanyTypes ])
  useEffect(()=>{ (companytypes && companytypes.length > 0 && !loading) && setDataLoaded(true) }, [companytypes, loading])
  useEffect(()=>{ (value) && setDefaultValue(value) }, [ value ])
  useEffect(()=>{ (isDisabled) && setDisabled(isDisabled) }, [ isDisabled ])
  
  return (
      <div className="form-group">
        <select disabled={disabled} value={defaultValue} onChange={onChange} name={name} required>
          <option key={'41564565'} value={''}>{'Select a Company Type'}</option>
        {
            dataLoaded && companytypes.map((companytype) => {
            return <option key={companytype._id} value={companytype._id}>{companytype.name.toUpperCase()}</option>
            })
          }
        </select>
      </div>
  )
}

CompanyTypesSelect.propTypes = {
  adminGetCompanyTypes: PropTypes.func.isRequired,
  adminCompanyType: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  adminCompanyType: state.adminCompanyType,
})
  
export default connect(mapStateToProps, {adminGetCompanyTypes})(CompanyTypesSelect)
  