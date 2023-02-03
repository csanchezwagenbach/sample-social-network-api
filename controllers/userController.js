const { User, Thought } = require("../models");

module.exports = {
     // Get all users
     async getUsers(req, res) {
        const newUser = await User.find();
        if(newUser) {
            res.status(200).json(newUser)
        } else res.status(500).json(err)
     },
     // Get a single user
     async getSingleUser(req, res) {
        const user = await User.findOne({ _id: req.params.userId })
            .select("__v");
        if(!user) {
            res.status(404).json({ message: "No user found with that ID" })
        } res.status(200).json(user)
     },
     // Create a user
     async createUser(req, res) {
        const user = await User.create(req.body);
        if(!user) {
            res.status(500).json(err);
        } res.status(200).json(user)
     },
     // Delete a user and associated Thoughts
     async deleteUser(req, res) {
        const user = await User.findOneAndDelete({ _id: req.params.userId })
        if(!user) {
            res.status(404).json({ message: "No user with that ID" })
        } res.status(200).json(user)
     }
};