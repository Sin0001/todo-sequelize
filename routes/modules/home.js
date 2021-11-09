const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

// 瀏覽首頁
router.get('/', (req, res) => {
  const id = req.user.id
  User.findByPk(id)
    .then((user) => {
      if (!user) throw new Error('user not found')
      return Todo.findAll({
        raw: true,
        nest: true,
        where: { Userid: id }
      })
    }) 
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router