const router = require('express').Router();
const Thought = require('../models/Thought');

router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get thoughts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create thought' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get thought' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update thought' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete thought' });
  }
});

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add reaction' });
  }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.id(req.params.reactionId).remove();
    await thought.save();
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove reaction' });
  }
});

module.exports = router;