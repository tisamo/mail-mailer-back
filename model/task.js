const mongoose = require("mongoose");
const Task = new mongoose.Schema({
    id: {type: mongoose.Types.ObjectId},
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    schedules:[{
        type: mongoose.Types.ObjectId,
        ref: "Schedule",
    }],
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    recipients: [{
        type: String,
        ref: "Recipient"
    }]
})

module.exports = mongoose.model("Task", Task);
