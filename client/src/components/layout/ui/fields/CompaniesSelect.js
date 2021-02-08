import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanyRelationships } from '../../../../redux/actions/company'

const CompaniesSelect = ( { company:{companies,loading }, getCompanyRelationships , value, name="company", onChange, isDisabled} ) => {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [defaultValue, setDefaultValue] = useState("")
  const [disabled, setDisabled] = useState(false)

  useEffect(() => { !dataLoaded && getCompanyRelationships() }, [dataLoaded, getCompanyRelationships])
  useEffect(() => { (companies && companies.length > 0 && !loading) && setDataLoaded(true) }, [ companies, loading ])
  useEffect(() => { value && setDefaultValue(value)}, [ value ])
  useEffect(() => { isDisabled && setDisabled(isDisabled) }, [ isDisabled ])
  
  return (
    <div className="form-group">
      <select  disabled={disabled} name={name} value={ defaultValue } onChange={onChange} required>
        <option key={'56548655'} value={''}>{'Select a Company'}</option>
      {   dataLoaded &&
          companies.map((company) => {
          return <option key={company._id} value={company._id}>{company.name.toUpperCase()}</option>
          })
        }
      </select>
    </div>
  )
}

CompaniesSelect.propTypes = {
  getCompanyRelationships: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  company: state.company
})
  
export default connect(mapStateToProps, { getCompanyRelationships })(CompaniesSelect)
  