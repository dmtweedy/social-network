const User = require('../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts friends');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get users' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).populate('thoughts friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const newUser = await User.create({ username, email });
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' });
    }
  },

  addFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } }, // Using $addToSet to avoid duplicates
        { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add friend' });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to remove friend' });
    }
  },
};

module.exports = userController;