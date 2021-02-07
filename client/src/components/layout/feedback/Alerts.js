import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'antd'

const Alerts = ({ alerts }) =>{
  let type = "", msg = ""
 return (
   <>
   {alerts !== null && 
  alerts.length > 0 && 
  alerts.map((alert) =>{ 
    switch (alert.alertType) {
    case 'danger':
      type="error"
      msg="Error"
      break;
    case 'success':
      type="success"
      msg="Success"
      break
    default:
      type="info"
      msg="Info"
      break;
    }
    return (
    <Alert
      message={msg}
      description={alert.msg}
      type={type}
      showIcon
      closable
      banner
      key={alert.id}
    />
  )
   })

   }
  </>)
 }
 

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  alerts: state.alert
})
export default connect(mapStateToProps)(Alerts)
