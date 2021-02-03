import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/core'
import { setUserID } from '../../../actions/user'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const override = css`
  margin: auto;
  display: block;
`

const UsersTable = ( { users, loading, setUserID } ) => {
  const onClick = (userID) => {
    setUserID(userID)
  }


  const confirmFunction = () => {
    console.log('confirm')
  }
  const declineFunction = () => {
    console.log('decline')
  }
  const confirm = () => {
    confirmAlert(options)
  }

  const options = {
    title : 'Delete User?',
    message : 'Are you sure you want to delete this user?',
    buttons: [
      { label: 'Yes', onClick: confirmFunction},
      { label: 'No', onClick: declineFunction}
    ],
    closeOnEscape: false,
    closeOnClickOutside : false,
  }
  return (
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th className="hide-sm">Email</th>
            <th className="hide-sm">Type</th>
            <th className="hide-sm">Company</th>
            <th className="hide-sm text-center">Active</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          { users.length > 0 ? (
             users.map((u, index) => {
                return (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td className="hide-sm">{u.email}</td>
                    <td className="hide-sm">{u.usertype.name}</td>
                    <td className="hide-sm">{u.company.name}</td>
                    <td className="hide-sm text-center">{u.isactive ? 'Actives' : 'Inavtive'}</td>
                    <td className="text-center"><Link onClick={(e)=>onClick(u._id)} to={`/authorized/users/edit`} className="btn btn-success btn-outline"><i className="fa fa-pen-nib"></i> Edit</Link> 
                    <Link className="btn btn-danger btn-outline" title="Delete" onClick={confirm}><i title="Delete" className="fa fa-trash"></i> Delete</Link>
                    </td>
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