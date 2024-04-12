const mongoose = require("mongoose");
const Recipients = new mongoose.Schema({
    id: {type: mongoose.Types.ObjectId},
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        unique: true
    }
})

module.exports = mongoose.model("Recipient", Recipients);
