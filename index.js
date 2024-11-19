require('dotenv').config()
const  express = require('express')
const cors =  require('cors')
const router = require('./routes/router')
require('./database/dbCollection')


const serverTest = express()

serverTest.use(cors())
serverTest.use(express.json())
serverTest.use(router)

const PORT = 3002 ||  process.env.PORT

serverTest.listen(PORT, () => {
    console.log(`ServerTest  is running on port ${PORT}`)
    })

serverTest.get('/',  (req, res) => {
    res.status(200).send('ServerTest is running')
    })

  





