const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        validate: {
                validator: function (val) {
                const regex = /^[a-zA-Z0-9][\w.+-]*@(gmail\.com|hotmail\.com|yahoo\.com)$/;
                return regex.test(val);
                },
                message:
                "Email must start with alphanumeric and use gmail.com, hotmail.com, or yahoo.com domain only",
            },
        },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: {
            type: String,
            required: true,
            enum: {
                values: ['User', 'Admin', 'Driver'],
                message: '{VALUE} is not a valid role',
            },
            default: 'user',
        }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;