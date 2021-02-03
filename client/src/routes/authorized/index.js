import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import UsersContainer from '../../components/authorized/user/UsersContainer'
import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function AuthorizedRoutes (){
  return (
    <Fragment>
      <Switch>
        <PrivateRoute 
          exact 
          path="/authorized" 
          component={UsersContainer} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.ADMIN}
        />
      </Switch>
    </Fragment>   
  )
} 
