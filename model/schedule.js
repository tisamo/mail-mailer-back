const mongoose = require("mongoose");
const Schedule = new mongoose.Schema({
    id: {type: mongoose.Types.ObjectId},
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    task: {
        type: mongoose.Types.ObjectId,
        ref: "Task",
        required: true
    },
    date: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model("Schedule", Schedule);
