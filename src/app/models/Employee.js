const mongoose = require('mongoose');

const Employee = mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    },
    {
        timestamp: true
    }
);


module.exports = mongoose.model("employee", Employee);