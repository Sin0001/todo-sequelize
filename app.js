const express = require('express') // 載入 express
const session = require('express-session') // 載入 express-session
const usePassport = require('./config/passport')
const passport = require('passport')
const exphbs = require('express-handlebars') //載入 handelbars
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override 
const routes = require('./routes')

const app = express()
const PORT = 3000

// 設定hbs
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true })) // 使用 body-parser
app.use(methodOverride('_method')) // 使用 method-override


usePassport(app)

// 設定 routes
app.use(routes)

// 設定 express port 3000
app.listen( PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})