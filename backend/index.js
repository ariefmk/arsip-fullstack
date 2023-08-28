// set require
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const compression = require('compression')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(compression())

app.listen(process.env.PORT || 443, () => {
  console.log(`Server berjalan pada port ${process.env.PORT || 443}`)
})
