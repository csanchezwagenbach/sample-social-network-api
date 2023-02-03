const { Schema, model } = require = ("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            dafault: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema
    .virtual("reactionCount")
    .get(function () {
        return this.reactions.length;
    });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;