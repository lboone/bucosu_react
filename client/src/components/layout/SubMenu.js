import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { getSubSubMenus, setSubSubMenu } from '../../redux/actions/menu'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'


const override = css`
  display: block;
  margin: 0 auto;
`
const SubMenu = ( {menu, getSubSubMenus, setSubSubMenu}) => {
  const loc = useLocation().pathname
  useEffect(() => {
    if (menu.submenu && !menu.loading && !menu.subsubmenus.length > 0){
      getSubSubMenus(menu.submenu)
    }
    if(menu.subsubmenus && !menu.loading && !menu.subsubmenu){
      menu.subsubmenus.forEach((subsubmenu) => {
          if (loc.split('/')[3] === subsubmenu.link.split('/')[3]) {
            setSubSubMenu(subsubmenu._id) 
          }
      })
    }
  }, [getSubSubMenus, menu, setSubSubMenu, loc])
  
  const onClick = (subSubMenuId)=> {
    setSubSubMenu(subSubMenuId)
  }

  const showSpinner = loc !== '/login'
  const subMenuLoaded = menu && !menu.loading && menu.subsubmenus && (menu.subsubmenus.length > 0)
  return (
    <Fragment>
      {subMenuLoaded ? 
        ( <Fragment>
          {menu.subsubmenus &&
            menu.subsubmenus.map((subsubmenu) => {
                //console.log({submenu:{'loc.split': loc.split('/')[3], link: subsubmenu.link.split('/')[3]}})
                return (
                    <Link 
                      key={subsubmenu._id}
                      to={subsubmenu.link} 
                      onClick={(e)=>onClick(subsubmenu._id)}
                      className={loc.split('/')[3] === subsubmenu.link.split('/')[3] ? 'selected' : ''}
                    >
                      <i 
                        className={`fa ${subsubmenu.icon}`}
                        title={subsubmenu.label}
                      ></i>{' '}
                      <span className="hide-sm">{subsubmenu.label}</span>
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

SubMenu.propTypes = {
  getSubSubMenus: PropTypes.func.isRequired,
  setSubSubMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  menu: state.menu,
})

export default connect(mapStateToProps, { getSubSubMenus, setSubSubMenu })(SubMenu)
