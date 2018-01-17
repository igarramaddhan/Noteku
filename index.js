let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let Note = require('./models/Notes')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  Note.getAllNotes((err, data) => {
    if (err) throw err
    res.json(data)
  })
})

app.post('/', (req, res) => {
  let note = req.body
  Note.addNote(note, err => {
    if (err) throw err
    res.json(
      'Insert success with title: ' +
        note.title +
        ' and content: ' +
        note.content
    )
  })
})

app.delete('/:id', (req, res) => {
  let id = req.params.id
  Note.deleteNote(id, err => {
    if (err) throw err
    res.json('Delete success with id: ' + id)
  })
})

app.put('/:id', (req, res) => {
  let id = req.params.id
  let note = req.body
  Note.updateNote(id, note, err => {
    if (err) throw err
    res.json('Update success with id: ' + id)
  })
})

app.listen(3000)
console.log('running on port 3000')
