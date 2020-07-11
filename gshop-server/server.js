//console.log("here")

const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')

let app = express()


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

const cors = require('cors')
app.use(cors())



//Public accessible folder
app.use('/public', express.static(path.join(__dirname, './public')))


/*
 * Set-up routers
 */
const fileRouter = require('./fileRouter')
app.use('/file', fileRouter)
/*
 * Set-up routers
 */

const foodRouter = require('./db/foodRouter')
app.use('/food', foodRouter)
/*
 * Set-up listening ports
 */
app.listen(3000, () => {
	console.log('server start')
})


/*
 * 
 * Set-up MongoDB connection
 */
const db = require('./db/connect')