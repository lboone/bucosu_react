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

  const SWAGGEROPTIONS = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "BUCOSU BCS API with Swagger",
        version: "1.0.0",
        description:
          "This is a robust API made for the BUCOSU web application, made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LAMB Apps",
          url: "https://lambapps.com",
          email: "lloyd@lambapps.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5001/api",
        },
      ],
    },
    apis: [
      "./models/Building.js",
      "./models/Company.js",
      "./models/CompanyType.js",
      "./models/IPGeolocation.js",
      "./models/Menu.js",
      "./models/Profile.js",
      "./models/User.js",
      "./models/UserType.js"
    ]
  }

  module.exports = {
    ACCESSTYPES,
    SWAGGEROPTIONS
  }


  /*
   * Note the api used for getting the ip goelocation is found at
   * https://geo.ipify.org/docs
   * Login: lloyd@lambapps.com
   * Password: IPGeolocationAPI#1
   */ 