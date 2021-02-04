import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import User from '../../components/user/User'
import Profile from '../../components/user/EditProfile'
import ResetPassword from '../../components/user/ResetPassword'
import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function UserRoutes (){
  return (
    <Fragment>
      <Switch>
        <PrivateRoute 
          exact 
          path="/user/home/login-history" 
          component={User} 
          companyLevel={ COMPANY.PUBLIC } 
          userLevel={ USER.MEMBER }
        />
        <PrivateRoute 
          exact 
          path="/user/home/profile" 
          component={Profile} 
          companyLevel={ COMPANY.PUBLIC } 
          userLevel={ USER.MEMBER }
        />
        <PrivateRoute 
          exact 
          path="/user/home/reset-password" 
          component={ResetPassword} 
          companyLevel={ COMPANY.PUBLIC } 
          userLevel={ USER.MEMBER }
        />
      </Switch>
      </Fragment>
      
  )
} 
