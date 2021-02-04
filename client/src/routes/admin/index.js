import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

// Admin
import Admin from '../../components/admin/Admin'
// Admin | User
import UsersContainer from '../../components/admin/user/user/UsersContainer'
import UserTypesContainer from '../../components/admin/user/user-types/UserTypesContainer'
import LoginHistory from '../../components/admin/user/login-history/LoginHistory'
import SettingsContainer from '../../components/admin/user/settings/SettingsContainer'
// Admin | BCS
import Bcs from '../../components/admin/bcs/Bcs'
import EventsContainer from '../../components/admin/bcs/events/EventsContainer'
import CompaniesContainer from '../../components/admin/bcs/companies/CompaniesContainer'
import BuildingsContainer from '../../components/admin/bcs/buildings/BuildingsContainer'
import CompanyTypesContainer from '../../components/admin/bcs/company-types/CompanyTypesContainer'
import HeadingsContainer from '../../components/admin/bcs/headings/HeadingsContainer'
import ProfilesContainer from '../../components/admin/bcs/profiles/ProfilesContainer'
import QuestionsContainer from '../../components/admin/bcs/questions/QuestionsContainer'
// Admin | Projects
import Projects from '../../components/admin/projects/Projects'
import PurposesContainer from '../../components/admin/projects/purposes/PurposesContainer'
import StatusesContainer from '../../components/admin/projects/statuses/StatusesContainer'
import TypesContainer from '../../components/admin/projects/types/TypesContainer'

// Admin | Menus
import Menus from '../../components/admin/menus/Menus'


import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function AdminRoutes (){
  return (
    <Fragment>
      <Switch>
      <PrivateRoute 
        exact 
        path="/admin/home" 
        component={Admin} 
        companyLevel={ COMPANY.SCHOOLDISTRICT } 
        userLevel={ USER.ADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/user/home" 
        component={UsersContainer} 
        companyLevel={ COMPANY.SCHOOLDISTRICT } 
        userLevel={ USER.ADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/user/types" 
        component={UserTypesContainer} 
        companyLevel={ COMPANY.SCHOOLDISTRICT } 
        userLevel={ USER.ADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/user/login-history" 
        component={LoginHistory} 
        companyLevel={ COMPANY.SCHOOLDISTRICT } 
        userLevel={ USER.ADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/user/settings" 
        component={SettingsContainer} 
        companyLevel={ COMPANY.SCHOOLDISTRICT } 
        userLevel={ USER.ADMIN }
      />


      <PrivateRoute 
        exact 
        path="/admin/bcs/home" 
        component={Bcs} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/events" 
        component={EventsContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/companies" 
        component={CompaniesContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/buildings" 
        component={BuildingsContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/company-types" 
        component={CompanyTypesContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/headings" 
        component={HeadingsContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/profiles" 
        component={ProfilesContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/questions" 
        component={QuestionsContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />



      <PrivateRoute 
        exact 
        path="/admin/projects/home" 
        component={Projects} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/projects/purposes" 
        component={PurposesContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/projects/statuses" 
        component={StatusesContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/projects/types" 
        component={TypesContainer} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/menus/home" 
        component={Menus} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      </Switch>
      </Fragment>
      
  )
} 
