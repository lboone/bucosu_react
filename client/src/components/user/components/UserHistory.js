import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'


const UserHistory = ( { profile } ) => {
  const userLogins = !profile.loading && profile.profile.logins
  return (
    <Fragment>
      <div className="content-center">
        <h2 className="my-2">{!profile.loading && profile.profile && profile.profile.firstname} Login History</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>IP Address</th>
              <th className="hide-md">Device</th>
            </tr>
          </thead>
          <tbody>
            {userLogins &&
              userLogins.map((login, index) => {
                if(index < 5){
                  return (
                    <tr key={login._id}>
                      <td>
                        <Moment format="MM/DD/YYYY">
                          {login.date}
                        </Moment>
                      </td>
                      <td>{login.ipaddress}</td>
                      <td className="hide-md">{login.device}</td>
                    </tr>
                  )
                } else {
                  return ''
                }
              })
            }
          </tbody>
        </table>
    
      </div>
    </Fragment>
  )
}

UserHistory.propTypes = {
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
})
  
export default connect(mapStateToProps, null)(UserHistory)
  