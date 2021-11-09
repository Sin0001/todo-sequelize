const express = require('express') // 載入 express
const session = require('express-session') // 載入 express-session
const usePassport = require('./config/passport')
const passport = require('passport')
const exphbs = require('express-handlebars') //載入 handelbars
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override 
const bcrypt = require('bcryptjs') // 載入 bcryptjs

const app = express()
const PORT = 3000

const db = require('./models')
const Todo = db.Todo
const User = db.User

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
// 瀏覽首頁
app.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 瀏覽特定todo
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// 登入頁面
app.get('/users/login', (req, res) => {
  res.render('login')
})

// 送出登入
app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})

// 送出註冊
app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

//登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
})

// 設定 express port 3000
app.listen( PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})