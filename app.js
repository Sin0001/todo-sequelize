const express = require('express') // 載入 express
const session = require('express-session') // 載入 express-session
const exphbs = require('express-handlebars') //載入 handelbars
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override 
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

const usePassport = require('./config/passport')

const app = express()
const PORT = process.env.PORT

// 設定hbs
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true })) // 使用 body-parser
app.use(methodOverride('_method')) // 使用 method-override

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 設定 routes
app.use(routes)

// 設定 express port 3000
app.listen( PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})