const express = require('express')
const connectDB = require('./config/db')
const listEndpoints = require('express-list-endpoints')
const auth = require('./middleware/auth')
const {SWAGGEROPTIONS} = require('./config/constants')

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

// Setup express app
const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({extended: false}))


app.get('/',(req, res) => res.send('API Running'))

// Define Routes
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/companies',require('./routes/api/companies'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/usertypes',require('./routes/api/usertypes'))
app.use('/api/companytypes',require('./routes/api/companytypes'))
app.use('/api/buildings',require('./routes/api/buildings'))

app.use('/api/endpoints',auth, function(req,res) {
  res.status(200).json(listEndpoints(app))
})


const PORT = process.env.PORT || 5001


const specs = swaggerJsdoc(SWAGGEROPTIONS);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))