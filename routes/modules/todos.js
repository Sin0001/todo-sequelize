const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// 新增 todo 頁面
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

// 瀏覽特定 todo 頁面
router.get('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: { id, userId}
  })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// 修改 todo 頁面
router.get('/:id/edit', (req,res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: {id, UserId}})
    .then( todo =>  res.render('edit', { todo: todo.get() }))
    .catch(error => console.log(error))
})

// 送出修改 todo
router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//刪除 todo
router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router