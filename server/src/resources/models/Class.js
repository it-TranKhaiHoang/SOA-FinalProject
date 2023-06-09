const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        currentYear: {
            type: Number,
            require: true,
        },
        teacher: {
            type: mongoose.Types.ObjectId,
            ref: 'SchoolStaff',
        },
        grade: {
            type: String,
            enum: ['1st', '2nd', '3rd', '4th', '5th'],
            required: true,
        },
        schedules: { type: [mongoose.Types.ObjectId], ref: 'Schedule' },
        students: { type: [mongoose.Types.ObjectId], ref: 'Student' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Class', Class);
