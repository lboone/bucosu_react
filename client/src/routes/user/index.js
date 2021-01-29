import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import User from '../../components/user/User'
import Profile from '../../components/user/Profile'
import Password from '../../components/user/Password'
import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function UserRoutes (){
  return (
    <Fragment>
      <Switch>
        <PrivateRoute 
          exact 
          path="/user" 
          component={User} 
          companyLevel={ COMPANY.PUBLIC } 
          userLevel={ USER.MEMBER }
        />
        <PrivateRoute 
          exact 
          path="/user/profile" 
          component={Profile} 
          companyLevel={ COMPANY.PUBLIC } 
          userLevel={ USER.MEMBER }
        />
        <PrivateRoute 
          exact 
          path="/user/password" 
          component={Password} 
          companyLevel={ COMPANY.PUBLIC } 
          userLevel={ USER.MEMBER }
        />
      </Switch>
      </Fragment>
      
  )
} 
