const Joi = require('joi');

function validate(params, schema) {
    const validateResult = Joi.validate(params, schema)
    if (!validateResult.error) return validateResult
    const validateResp = { status: 'error', errors: [], error: true }
    fillRespWithErrors(validateResp, validateResult)
    return validateResp
}

function fillRespWithErrors(resp, errorObj) {
    for (let error of errorObj.error.details) {
        resp.errors.push(error.message)
    }
}


function validateStudentsEntry(params) {
    const schema = Joi.object().keys({
        rollNo: Joi.string().required(),
        regNo: Joi.string(),
        batch: Joi.string().required(),
        fathersName: Joi.string().required(),
        mothersName: Joi.string().required(),
        address: Joi.string().required(),
        pincode: Joi.number().integer().max(999999).min(100000).required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        bloodGroup: Joi.string(),
        phone1: Joi.number().integer().max(9999999999).min(1000000000).required(),
        phone2: Joi.number().integer().max(9999999999).min(1000000000).required(),
        fathersPhone: Joi.number().integer().max(9999999999).min(1000000000).required()
    });

    return validate(params, schema);
}


module.exports = {
    validateStudentsEntry
}


