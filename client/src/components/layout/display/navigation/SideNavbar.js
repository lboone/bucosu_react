import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'


const override = css`
  display: block;
  margin: 0 auto;
`
const SideNavbar = ( {menu}) => {
  const location = useLocation().pathname.split('/')[3]

  const showSpinner = location !== '/login'
  const sideMenuLoaded = menu && !menu.loading && menu.sidenavmenus && (menu.sidenavmenus.length > 0)
  return (
    <Fragment>
      {sideMenuLoaded ? 
        ( <Fragment>
          {menu.sidenavmenus.length > 0 &&
            menu.sidenavmenus.map((sidenavmenu) => {
                //console.log({submenu:{'loc.split': loc.split('/')[3], link: sidenavmenu.link.split('/')[3]}})
                return (
                    <Link 
                      key={sidenavmenu._id}
                      to={sidenavmenu.link} 
                      className={location === sidenavmenu.link.split('/')[3] ? 'selected' : ''}
                    >
                      <i 
                        className={`fa ${sidenavmenu.icon}`}
                        title={sidenavmenu.label}
                      ></i>{' '}
                      <span className="hide-sm">{sidenavmenu.label}</span>
                    </Link>
                )
              }
            )
          }
        </Fragment>
        ) : (
            showSpinner && <ClipLoader color={'#37bc9b'} loading={true} css={override} size={25} />
        )
      }
    </Fragment>
  )
}

SideNavbar.propTypes = {
  menu: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  menu: state.menu,
})

export default connect(mapStateToProps, null)(SideNavbar)
