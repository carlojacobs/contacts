const con =  require('../db');

const getEducationHistory = (userId, callback) => {
    const sql = `SELECT * FROM UserEducation WHERE user_id=${userId}`;
	con.query(sql, (err, result) => {
		if (err) throw err;
        callback(result);
	});
}

const addEducations = (userId, educations, callback) => {
    var addUserEducationsSql = `INSERT INTO UserEducation (user_id, institution_name, degree) VALUES`;
        for (var i = 0; i < educations.length; i ++) {
            const edu = educations[i]
            if (i < educations.length - 1) {
                addUserEducationsSql += ` ("${userId}", "${edu.institution_name}", "${edu.degree}"),`
            } else {
                addUserEducationsSql += ` ("${userId}", "${edu.institution_name}", "${edu.degree}");`
            }
        }
        console.log(addUserEducationsSql);
        con.query(addUserEducationsSql, (err, result) => {
            if (err) throw err;
            callback(result);
        });
}

module.exports.getEducationHistory = getEducationHistory;
module.exports.addEducations = addEducations;