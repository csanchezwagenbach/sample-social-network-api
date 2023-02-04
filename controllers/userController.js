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
        const user = await User.findOne({ _id: req.params.userId }).populate("friends").populate("thoughts")
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
     // Update a user
     async updateUser(req, res) {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body }
        );
        if (!user) {
            res.status(404).json({ message: "No user with this id!" })
        }
        res.status(200).json(user)
     },
     // Delete a user and associated Thoughts
     async deleteUser(req, res) {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if(!user) {
            res.status(404).json({ message: "No user with that ID" })
        } 
        const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts }})
        res.status(200).json(user)
     },
     // Add a given user to another given user's friends array
     async createFriend(req, res) {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
        if(!friend) {
            res.status(404).json()
        }
        res.status(200).json(friend)
     },
     // Remove a given user from another given user's friends array
     async deleteFriend(req, res) {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends:req.params.friendId } },
            { new: true }
        )
        if(!friend) {
            res.status(404)
        }
        res.status(200).json(friend)
     }
};