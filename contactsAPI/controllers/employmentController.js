const con =  require('../db');

const getEmploymentHistory = (userId, callback) => {
    const sql = `SELECT * FROM UserEmployment WHERE user_id=${userId}`;
	con.query(sql, (err, result) => {
		if (err) throw err;
        callback(result);
	});
}

const addEmployments = (userId, employments, callback) => {
    var addUserEmploymentsSql = `INSERT INTO UserEmployment (user_id, institution_name, position, period) VALUES`;
    for (var i = 0; i < employments.length; i ++) {
        const emp = employments[i]
        if (i < employments.length - 1) {
            addUserEmploymentsSql += ` ("${userId}", "${emp.institution_name}", "${emp.position}", "${emp.period}"),`
        } else {
            addUserEmploymentsSql += ` ("${userId}", "${emp.institution_name}", "${emp.position}", "${emp.period}");`
        }
    }
    con.query(addUserEmploymentsSql, (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

module.exports.getEmploymentHistory = getEmploymentHistory;
module.exports.addEmployments = addEmployments;