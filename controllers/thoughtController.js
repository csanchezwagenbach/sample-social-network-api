const { User, Thought, } =require("../models");

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        const thoughts = await Thought.find();
        if(!thoughts) {
            res.status(500).json(err)
        }
        res.status(200).json(thoughts)
    },
    // Get a single thought 
    async getSingleThought(req, res) {
        const thought = await Thought.findOne({_id: req.params.thoughtId })
        if(!thought) {
            res.status(404).json({ message: "No thought found with that ID" })
        } 
        res.status(200).json(thought)
    },
    // Create a thought and add the thought to the associated user
    async createThought(req, res) {
        const thought = await Thought.create(req.body);
        if(!thought) {
            res.status(500).json(err)
        } 
        const user = await User.findOneAndUpdate(
            { username: req.body.username},
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        )
        if(!user) {
            res.status(404).json({ message: "Thought created but no user found with that username!"})
        }
        res.status(200).json(thought)
    },
    // Update a given thought
    async updateThought(req, res) {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId },
            { $set: req.body }
        );
        if(!thought){
            res.status(404).json({ message: "No thought with this id!" })
        } 
        res.status(200).json(thought)
    },
    // Delete a given thought
    async deleteThought(req, res) {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if(!thought) {
            res.status(404).json({ message: "No thought with that ID" })
        }
        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        )
        if(!user) {
            res.status(404).json({ message: "Thought deleted but no user found associated with thought"})
        }
        res.status(200).json(thought)
    },
    // Create a reaction to a given thought
    async createReaction(req, res) {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        if(!reaction) {
            res.status(404).json({ message: "No thought found with this id!"})
        } 
        res.status(200).json(reaction)
    },
    // Delete a given reaction to a given thought
    async deleteReaction(req, res) {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }    
        )
        if(!reaction) {
            res.status(404).json({ message: "No reaction found with this id!"})
        }
        res.status(200).json(reaction)
    } 
};