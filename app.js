const bodyParser = require('body-parser')
const express = require('express') // 載入 express
const exphbs = require('express-handlebars') //載入 handelbars
const methodOverride = require('method-override') // 載入 method-override 
const bcrypt = require('bcryptjs') // 載入 bcryptjs

const app = express()
const PORT = 3000

// 設定hbs
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true })) // 使用 body-parser
app.use(methodOverride('_method')) // 使用 method-override

// 設定 routes
// 瀏覽首頁
app.get('/', (req, res) => {
  res.send(`hello word!`)
})

// 登入頁面
app.get('/users/login', (req, res) => {
  res.render('login')
})

// 送出登入
app.post('/users/login', (req, res) => {
  res.send('login')
})

// 註冊頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})

// 送出註冊
app.post('/users/register', (req, res) => {
  res.send('register')
})

//登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
})

// 設定 express port 3000
app.listen( PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})