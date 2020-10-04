const path = require('path')
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const loginRoutes = require('./routes/login')
const indexRoutes = require('./routes/index')
const adminRoutes = require('./routes/admin')

const PORT = process.env.PORT || config.get('PORT') || 3000
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser('keyboard cat'))

app.set('views', path.join(__dirname, 'template/pages'))
app.set('view engine', 'pug')

app.use(session({
  secret: config.get('key'),
  key: 'isAdmin',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 10*60*1000,
  }
}))

app.use(flash())
app.use(express.static(path.join(__dirname, '/public')))
app.use('/', loginRoutes)
app.use('/', indexRoutes)
app.use('/', adminRoutes)

const start = async () => {
  try {
    await mongoose.connect(config.get('mongodb'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT, () => {
      console.log(`Server has been started on PORT: ${PORT}`)
    })
  } catch (err) {
    console.log(`Server error: ${err.message}`)
    process.exit(1)
  }
}
start()
