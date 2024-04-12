const mongoose = require("mongoose");
const User = new mongoose.Schema({
        id: {type: mongoose.Types.ObjectId},
        username: {type: String, required: true, unique: true},
        created: {type: Date, default: Date.now()},
        password: {type: String},
        tasks: [{type: mongoose.Types.ObjectId,
        ref: "Task"}],
        recipients: [{type: mongoose.Types.ObjectId,
            ref: "Recipient"}]
    },
    {
        versionKey: false
    });


module.exports = mongoose.model("User", User);
