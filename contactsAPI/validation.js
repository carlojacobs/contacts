const validation = (keys) => {
    const fn = (req, res, next) => {
        const body = req.body;
        var valid = true;
        for (var i = 0; i < keys.length; i++) {
            const validationKey = keys[i];
            if (body[validationKey] == null) {
                valid = false;
                break;
            }
        }
        if (valid) {
            next()
        } else {
            res.sendStatus(400);
        }
    }
    return fn;
}

module.exports = validation;