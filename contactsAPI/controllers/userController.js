const con = require('../db');
const hashing = require('../hashing');

const getAllUsers = (callback) => {
	const sql = "SELECT * FROM Users;";
	con.query(sql, (err, result) => {
		if (err) throw err;
        callback(result);
	});
}

// Get a user by their primary key id
const getUsersById = (id, callback) => {
    const sql = `SELECT * FROM Users WHERE id=${id}`
    con.query(sql, (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

// Get a user by their email
const getUsersByEmail = (email, callback) => {
    const sql = `SELECT * FROM Users WHERE email="${email}";`
    con.query(sql, (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

// Create a new user
const createUser = (user, callback) => {
    console.log("creating");
    const { firstname, lastname, email, biography, password } = user;
    hashPassword(password, hashedPassword => {
        const sql = `INSERT INTO Users (firstname, lastname, email, biography, password) VALUES ("${firstname}", "${lastname}", "${email}", "${biography}", "${hashedPassword}");`
        con.query(sql, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    });
}

const updateUser = (newUser, callback) => {
    const { id, firstname, lastname, email, biography, password } = newUser;
    hashPassword(password, hashedPassword => {
        const sql = `UPDATE Users SET firstname="${firstname}", lastname="${lastname}", email="${email}", biography="${biography}", password="${hashedPassword}" WHERE id=${id};`
        con.query(sql, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    });
}

// Hash the  password
const hashPassword = (password, callback) => {
    hashing.cryptPassword(password, (err, hash) => {
        if (err) throw err;
        callback(hash);
    });
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUsersById = getUsersById;
module.exports.getUsersByEmail = getUsersByEmail;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
