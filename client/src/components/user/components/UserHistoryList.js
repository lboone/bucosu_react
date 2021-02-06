import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import UserHistory from './UserHistroy.js'
import SkeletonList from '../../layout/feedback/SkeletonList.js'


const UserHistoryList = ( { profile } ) => {
  const userLogins = !profile.loading && profile.profile.logins
  return (
    <Fragment>
      <div className="content-centers">
        <p className="lead">
          <i className="fab fa-connectdevelop"></i> {!profile.loading && profile.profile && profile.profile.firstname} {!profile.loading && profile.profile && profile.profile.lastname} Last {userLogins && userLogins.length > 5 ? 5 : userLogins.length} Login Events
        </p>
        <div className="profiles">
        {userLogins ?
              userLogins.map((login, index) => {
                if(index < 5){
                  return (
                    <UserHistory key={login._id} login={login}></UserHistory>
                  )
                } else {
                  return ''
                }
              })
              :
              ( <SkeletonList  rows={4} paragraphs={5} /> )
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
  