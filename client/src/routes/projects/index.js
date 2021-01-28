import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import Project from '../../components/project/Project'
import Manage from '../../components/project/Manage'
import Timeline from '../../components/project/Timeline'
import Calendar from '../../components/project/Calendar'
import Report from '../../components/project/Report'
import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function ProjectsRoutes (){
  return (
    <Fragment>
      <Switch>
        <PrivateRoute 
          exact 
          path="/projects" 
          component={Project} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.READER}
        />
        <PrivateRoute 
          exact 
          path="/projects/manage" 
          component={Manage} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.EDITOR}
        />
        <PrivateRoute 
          exact 
          path="/projects/timeline" 
          component={Timeline} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.READER}
        />
        <PrivateRoute 
          exact 
          path="/projects/calendar" 
          component={Calendar} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.READER}
        />
        <PrivateRoute 
          exact 
          path="/projects/reports" 
          component={Report} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.READER}
        />
      </Switch>
    </Fragment>   
  )
} 
