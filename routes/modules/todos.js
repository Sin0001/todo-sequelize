const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// 新增 todo
router.get('/new', (req, res) => {
  return res.render('new')
})

// 送出新增 todo
router.post('/', (req,res) => {
  const UserId = req.user.id
  const name = req.body.name
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定 todo
router.get('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: { id, userId}
  })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router