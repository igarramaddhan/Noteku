var mysql = require('mysql')
var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'toor123',
  database: 'noteku'
})
module.exports = connection
