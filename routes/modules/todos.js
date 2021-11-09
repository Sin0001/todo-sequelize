const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// 瀏覽特定todo
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