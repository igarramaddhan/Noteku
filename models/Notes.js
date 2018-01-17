let db = require('../dbconnection')

let Note = {
  getAllNotes: cb => {
    return db.query('select * from note', cb)
  },
  addNote: (note, cb) => {
    return db.query(
      'insert into note(title, content) values(?,?)',
      [note.title, note.content],
      cb
    )
  },
  deleteNote: (id, cb) => {
    return db.query('delete from note where id=?', [id], cb)
  },
  updateNote: (id, note, cb) => {
    return db.query(
      'update note set title=?, content=? where id=?',
      [note.title, note.content, id],
      cb
    )
  },
  getNoteById: (id, cb) => {
    return db.query(
      'select * from note where id = ? ',
      [id],
      cb
    )
  }
}

module.exports = Note
