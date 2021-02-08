import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserTypes } from '../../../../redux/actions/usertype'

const UserTypesSelect = ( {usertype:{usertypes, loading}, getUserTypes, value, name="userTypeID", onChange, isDisabled} ) => {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [defaultValue, setDefaultValue] = useState("")
  const [disabled, setDisabled] = useState(false)

  useEffect(() => { !dataLoaded && getUserTypes() }, [ dataLoaded, getUserTypes ])
  useEffect(()=>{ (usertypes && usertypes.length > 0 && !loading) && setDataLoaded(true) }, [usertypes, loading])
  useEffect(()=>{ (value) && setDefaultValue(value) }, [ value ])
  useEffect(()=>{ (isDisabled) && setDisabled(isDisabled) }, [ isDisabled ])
  
  return (
      <div className="form-group">
        <select disabled={disabled} value={defaultValue} onChange={onChange} name={name} required>
          <option key={'4156436865'} value={''}>{'Select a User Type'}</option>
        {
            dataLoaded && usertypes.map((usertype) => {
            return <option key={usertype._id} value={usertype._id}>{usertype.name.toUpperCase()}</option>
            })
          }
        </select>
      </div>
  )
}

UserTypesSelect.propTypes = {
  getUserTypes: PropTypes.func.isRequired,
  companytype: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  companytype: state.companytype,
})
  
export default connect(mapStateToProps, {getUserTypes})(UserTypesSelect)
  