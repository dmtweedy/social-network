const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

// Function to drop and recreate the database
async function dropAndRecreateDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/social-network', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Drop the existing database
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped and recreated');
  } catch (error) {
    console.error('Error dropping and recreating database:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database
  }
}

// Sample user data
const users = [
  { username: 'dmtweedy', email: 'damon.tweedy@yahoo.com' },
  { username: 'dizzy1', email: 'dizzy@bestpets.com' }
];

// Sample thought data with reactions
const thoughts = [
  {
    thoughtText: 'I love this',
    username: 'dmtweedy',
    reactions: [
      { reactionBody: 'I really do!', username: 'dmtweedy' },
      { reactionBody: 'I disagree!', username: 'dizzy1' }
    ],
  },
  {
    thoughtText: 'I hate this',
    username: 'dizzy1',
    reactions: [
      { reactionBody: 'Not a fan', username: 'dizzy1' },
      { reactionBody: 'Lighten up.', username: 'dmtweedy' }
    ],
  },
];

(async () => {
  try {
    await dropAndRecreateDatabase(); // Drop and recreate the database

    // Connect to the database
    await mongoose.connect('mongodb://127.0.0.1:27017/social-network', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Seed users
    const createdUsers = await User.create(users);

    // Seed thoughts and associate them with users
    const createdThoughts = await Thought.create(thoughts);

    // Update user's thoughts array with thought IDs
    for (const user of createdUsers) {
      const userThoughts = createdThoughts.filter(thought => thought.username === user.username);
      user.thoughts = userThoughts.map(thought => thought._id);
      await user.save();
    }

    console.log('Data seeded successfully', createdUsers, createdThoughts);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database
  }
})();