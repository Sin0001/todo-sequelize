const bodyParser = require('body-parser')
const express = require('express') // 載入express
const exphbs = require('express-handlebars') //載入handelbars
const methodOverride = require('method-override') // 載入method-override 

const app = express()
const PORT = 3000

// 設定hbs
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view', 'hbs')

app.use(bodyParser.urlencoded({ extended: true })) // 使用 body-parser
app.use(methodOverride('_method')) // 使用 method-override

// index route
app.get('/', (req, res) => {
  res.send(`hello word!`)
})

app.listen( PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})