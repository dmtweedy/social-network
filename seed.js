const mongoose = require('mongoose');
const User = require('./models/User');
const Reaction = require('./models/Reaction');
const Thought = require('./models/Thought');

mongoose.connect('mongodb://127.0.0.1:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user data
const users = [
  { username: 'dmtweedy', email: 'damon.tweedy@yahoo.com' },
  { username: 'Dizzy', email: 'dizzy@bestpets.com' }
];

// Sample reaction data
const reactions = [
  { type: 'like', emoji: '👍' },
  { type: 'love', emoji: '❤️' }
];

// Sample thought data
const thoughts = [
  { content: 'I love this', userId: 1 },
  { content: 'I hate this', userId: 2 }
];

(async () => {
  try {
    // Seed users
    const createdUsers = await User.create(users);

    // Seed thoughts
    const createdThoughts = await Thought.create(
      thoughts.map((thought, index) => ({ ...thought, author: createdUsers[index]._id }))
    );

    // Seed reactions
    const createdReactions = await Reaction.create(
      reactions.map((reaction, index) => ({
        ...reaction,
        thought: createdThoughts[index]._id,
        user: createdUsers[index]._id,
      }))
    );

    console.log('Data seeded successfully');

    // Log created reactions
    console.log('Created reactions:', createdReactions);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database
  }
})();
