const mysql = require('mysql');

let connection;

if (process.env.JAWSDB_URL) {
  //Heroku db
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //DB connect to local host
  connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'burgers_db'
  });
}

connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadid}`);
});

module.exports = connection;
