import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import UserHistory from './UserHistroy.js'


const UserHistoryList = ( { profile } ) => {
  const userLogins = !profile.loading && profile.profile.logins
  return (
    <Fragment>
      <div className="content-centers">
        <p class="lead">
          <i class="fab fa-connectdevelop"></i> {!profile.loading && profile.profile && profile.profile.firstname} {!profile.loading && profile.profile && profile.profile.lastname} Last {userLogins && userLogins.length > 5 ? 5 : userLogins.length} Login Events
        </p>
        <div className="profiles">
        {userLogins &&
              userLogins.map((login, index) => {
                if(index < 5){
                  return (
                    <UserHistory login={login}></UserHistory>
                  )
                } else {
                  return ''
                }
              })
            }
        </div>
      </div>
    </Fragment>
  )
}

UserHistoryList.propTypes = {
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
})
  
export default connect(mapStateToProps, null)(UserHistoryList)
  