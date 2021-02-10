import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserTypes } from '../../../../redux/actions/usertype'

const UserTypesSelect = ( {usertype:{usertypes, loading}, getUserTypes, value, style, name="userTypeID", onChange, isDisabled, filter} ) => {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [defaultValue, setDefaultValue] = useState("")
  const [disabled, setDisabled] = useState(false)

  useEffect(() => { !dataLoaded && getUserTypes() }, [ dataLoaded, getUserTypes ])
  useEffect(()=>{ (usertypes && usertypes.length > 0 && !loading) && setDataLoaded(true) }, [usertypes, loading])
  useEffect(()=>{ (value) && setDefaultValue(value) }, [ value ])
  useEffect(()=>{ (isDisabled) && setDisabled(isDisabled) }, [ isDisabled ])
  
  let uTypes = [];
  if (filter && dataLoaded ){
    uTypes = usertypes.filter((uType)=>{
      let ok = true

      filter.forEach((item)=> {
        if(item._id === uType._id){
          ok = false
        }
      })
      return ok
    })
  } else if (dataLoaded) {
    uTypes = usertypes
  }

  return (
      <div style={style} className="form-group">
        <select disabled={disabled} value={defaultValue} onChange={onChange} name={name} required>
          <option key={'4156436865'} value={''}>{'Select a User Type'}</option>
        {
            dataLoaded && uTypes.map((usertype) => {
            return <option key={usertype._id} value={usertype._id}>{usertype.name.toUpperCase()}</option>
            })
          }
        </select>
      </div>
  )
}

UserTypesSelect.propTypes = {
  getUserTypes: PropTypes.func.isRequired,
  usertype: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  usertype: state.usertype,
})
  
export default connect(mapStateToProps, {getUserTypes})(UserTypesSelect)
  