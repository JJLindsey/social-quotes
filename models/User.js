const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/],
    },
    quotes: [{
        type: Schema.Types.ObjectId,
        ref: "Quotes",
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
});

UserSchema.virtual("friendCount").get(function () {
    return this.friends.reduce(
        (total, friends) => total + friends.replies.length + 1,
        0
    );
});
