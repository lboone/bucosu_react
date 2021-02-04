import React, { Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth'
import { useLocation } from 'react-router-dom'
import { getMenus, setMenu } from '../../redux/actions/menu'
import Menu from './Menu'

const Navbar = ({ auth: { isAuthenticated, loading, level, user }, logout,  menu, getMenus, setMenu}) => {
  const loc = useLocation().pathname
  
  useEffect(() => {
    if(menu && !menu.loading && !menu.menus){
      getMenus()
    }
    if(menu.menus && !menu.loading && !menu.menu){
      menu.menus.forEach((menu) => {
        const newLoc = loc.split('/')
          if (newLoc[1] === menu.link.split('/')[1]) {
            setMenu(menu._id) 
          }
      })
    }
  }, [getMenus, menu, setMenu, loc])
  
  const onClick = (menuId)=> {
    setMenu(menuId)
  }
  
  const authLinks = (
    <ul>
      {menu.menus &&
        menu.menus.map((menu) => {
          //console.log({navbar:{'loc.split': loc.split('/')[1], link: menu.link}})
          return (
            <li key={menu._id}>
              <Link 
                to={menu.link} 
                onClick={(e)=>onClick(menu._id)}
                className={loc.split('/')[1] === menu.link.split('/')[1] ? 'selected' : ''}
              >
                <i 
                  className={`fa ${menu.icon}`}
                  title={menu.label}
                ></i>{' '}
                <span className="hide-md">{menu.label}</span>
              </Link>
            </li>
          )
        })
      }
      <li key={'0304030'}>
        <a onClick={logout} href='/login'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout <span style={{color: '#37bc9b'}}>{user && ` - ${user.username.toLowerCase()}`}</span></span>
        </a>
      </li>
    </ul>
  )
  const guestLinks = (
    <ul>
      <li key={'3984903'}>
        <Link to="/login" className={useLocation().pathname === '/login' ? 'selected' : ''}>
        <i className="fas fa-sign-in-alt"></i>{' '}
            <span className="hide-sm">Login</span>
        </Link>
      </li>
    </ul>
  )
  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link onClick={getMenus} to="/">
            <span><strong>BUCOSU</strong><span style={{color: 'lightgray', fontWeight: '100'}}>.com</span></span>
          </Link>
        </h1>
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
      </nav>
      <Menu/>
    </Fragment>
  )
}

Navbar.propTypes = {
  getMenus: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  menu: state.menu,
  auth: state.auth

})

export default connect(mapStateToProps, { logout, getMenus, setMenu })(Navbar)
