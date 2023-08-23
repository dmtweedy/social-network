const Thought = require('../models/Thought');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get thoughts' });
    }
  },

  addReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const { reactionBody, username } = req.body;

      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $push: {
            reactions: {
              reactionBody,
              username,
              createdAt: new Date(), // Add a timestamp for the reaction
            },
          },
        },
        { new: true }
      );

      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add reaction' });
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } }, // Remove the reaction with the given _id
        { new: true }
      );

      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove reaction' });
    }
  },
};

module.exports = thoughtController;