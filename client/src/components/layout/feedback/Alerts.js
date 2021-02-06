import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'antd'

const Alerts = ({ alerts }) =>{
  let type = ""
 return (
   <>
   {alerts !== null && 
  alerts.length > 0 && 
  alerts.map((alert) =>{ 
    switch (alert.alertType) {
    case 'danger':
      type="error"
      break;
    case 'success':
      type="success"
      break
    default:
      type="info"
      break;
    }
    return (
    <Alert
      message="Error"
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
