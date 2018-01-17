let express = require('express')
let app = express()
let bodyParser = require('body-parser')
const logger = require('morgan')
let Note = require('./models/Notes')

app.use(bodyParser.json())
// set the logger to watch every incoming connection
app.use(logger('dev'))

app.get('/', (req, res) => {
  Note.getAllNotes((err, data) => {
    if (err) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Unable to fetch all notes'
      })
      console.error(err)
      return
    }
    res.json({
      notes: data
    })
  })
})

app.post('/', (req, res) => {
  let note = req.body
  if (!note.content || !note.title){
    res.status(400).json({
      error: "Bad Request",
      message: "The content or the title is not defined"
    })
    return
  }

  Note.addNote(note, err => {
    if (err){
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Server is unable to insert new note'
      })
      console.error(err)
      return
    }
    res.json({
      message: 'Insert success with title: ' + note.title + ' and content: ' + note.content
    })
  })
})

app.delete('/:id', (req, res) => {
  let id = req.params.id
  Note.deleteNote(id, err => {
    if (err) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: `Server is unable to delete note with id '${id}'`
      })
      console.error(err)
      return
    }
    res.json({
      message: 'Delete success with id: ' + id
    })
  })
})

app.put('/:id', (req, res) => {
  let id = req.params.id
  let note = req.body

  Note.getNoteById(id, (err, existingNotes) => {
    const existingNote = existingNotes[0]
    if (err){
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Server is unable to fetch note with id: ' + id
      })
      console.error(err)
      return
    }
    // first: make sure the record is existing
    if (!existingNote) {
      // tells the client if the note with id 'id' does not exist
      res.status(404).json({
        error: 'Not Found',
        message: `Note with id '${id}' does not exist`
      })
      return
    }
   

    // update note content if it is set in the request body
    if (!note.content)
      note.content = existingNote.content

    // update note title if it is set in the request body
    if (!note.title)
      note.title = existingNote.title

    Note.updateNote(id, note, err => {
      if (err) {
        res.status(500).json({
          error:"Internal Server Error",
          message: "Server is unable to update note"
        })
        console.error(err)
        return
      }

      res.json({
        message: 'Update success with id: ' + id
      })

    })
  })
})

app.listen(3000)
console.log('running on port 3000')
