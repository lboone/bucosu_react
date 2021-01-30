const ACCESSTYPES = {
  "COMPANY":{
    "ADMIN":0,
    "ARCHITECTFIRM":1,
    "SCHOOLDISTRICT":2,
    "PUBLIC":99
  },
  "USER":{
    "SUPERADMIN":0,
    "ARCHITECT":1,
    "SUPERINTENDENT":1,
    "ADMIN":2,
    "EDITOR":3,
    "FACILITIESDIRECTOR":3,
    "BUSINESSOFFICIAL":3,
    "AUTHOR":4,
    "MEP":4,
    "CIVIL":4,
    "READER":98,
    "MEMBER":99
  }
}

/*
 *  Google Maps Information:
 *  Login: lloyd@bucosu.com
 *  API Key Name: Bucosu-DEV-Map-API-Key
 *  API Key Type: Maps Javascript API
 */ 
const GOOGLE_MAPS_API_KEY = 'AIzaSyBHYOELmZ1_30HVStYZehPBRTGDBf2LJu4'

export {
  ACCESSTYPES,
  GOOGLE_MAPS_API_KEY
}