const con =  require('../db');

const getEmploymentHistory = (userId, callback) => {
    const sql = `SELECT * FROM UserEmployment WHERE user_id=${userId}`;
	con.query(sql, (err, result) => {
		if (err) throw err;
        callback(result);
	});
}

const addEmployment = (userId, employment) => {
    const addEmploymentSql = `INSERT INTO Employment (institution_name, position, period) VALUES ("${institution_name}", "${position}", "${period}");`
    con.query(addEmploymentSql, (err, result) => {
        if (err) throw err;
        const insertId = result.insertId;
        const addUserEmploymentSql = `INSERT INTO UserEmployment (user_id, employment_id) VALUES (${userId}, ${insertId});`;
        con.query(addUserEmploymentSql, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    });
}