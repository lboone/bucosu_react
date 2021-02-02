import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/core'
import { setUserID } from '../../../actions/user'

const override = css`
  margin: auto;
  display: block;
`

const UsersTable = ( { users, loading, setUserID } ) => {
  const onClick = (userID) => {
    setUserID(userID)
  }
  return (
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th className="hide-sm">Type</th>
            <th className="hide-sm">Company</th>
            <th className="hide-sm">Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { users.length > 0 ? (
             users.map((u, index) => {
                return (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td className="hide-sm">{u.usertype.name}</td>
                    <td className="hide-sm">{u.company.name}</td>
                    <td className="hide-sm">{u.isactive ? 'Active' : 'Inavtive'}</td>
                    <td className="hide-sm"><Link onClick={(e)=>onClick(u._id)} to={`/authorized/users/edit`} className="btn btn-bucosu">Edit</Link> </td>
                  </tr>
                )
              })
            ) : (<tr><td colSpan={6} style={{textAlign: 'center'}}>{
              loading ? (<BeatLoader color={'#37bc9b'} loading={true} css={override} margin={10} size={15} />) : (<h1>No Users Found...</h1>)}</td></tr>
            )
          }
        </tbody>
      </table>
  )
}

UsersTable.propTypes = {
  user: PropTypes.object.isRequired,
  setUserID: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user
})
  
export default connect(mapStateToProps, {setUserID})(UsersTable)