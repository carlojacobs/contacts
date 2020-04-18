const mysql = require('mysql')

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Dittoenbram1234!"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL!");
});

con.query("USE Contacts;", (err, result) => {
	if (err) throw err;
})

module.exports = con;
