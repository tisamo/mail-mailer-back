const mongoose = require("mongoose");
const template = new mongoose.Schema({
    id: {type: mongoose.Types.ObjectId},
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Template", template);
