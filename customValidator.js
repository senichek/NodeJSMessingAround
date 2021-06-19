// Needed for user input validation;
const Joi = require("joi");

function validateCourse(course) {
    // Define schema to shape the "course" object for validation;
    // The name length must be more that 3 and must not be empty;
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(course);
}

module.exports.validateCourse = validateCourse;