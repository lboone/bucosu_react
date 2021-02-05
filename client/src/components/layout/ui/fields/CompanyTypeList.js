import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanyTypes } from '../../../../redux/actions/companytype'

const CompanyList = ( {companytype:{companytypes}, getCompanyTypes, onChange} ) => {
  useEffect(() => {
    getCompanyTypes()
  }, [getCompanyTypes])
  
  const runOnChange = (e) => {
    console.log(e)
    onChange(e)
  }
  return (
    <div className="form">
      <div className="form-group">
      <select  onChange={(e) => runOnChange(e)} name="companyTypeID" required>
        <option defaultValue key={'000001'} value={''}>{'Select a Company'}</option>
      {
          companytypes && companytypes.map((companytype) => {
          return <option key={companytype._id} value={companytype._id}>{companytype.name.toUpperCase()}</option>
          })
        }
      </select>
      </div>
    </div>
  )
}

CompanyList.propTypes = {
  getCompanyTypes: PropTypes.func.isRequired,
  companytype: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  companytype: state.companytype,
})
  
export default connect(mapStateToProps, {getCompanyTypes})(CompanyList)
  