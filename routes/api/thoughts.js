const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

router.route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router.route('/:id')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
  .post(thoughtController.addReaction) // adding a reaction to a thought
  .delete(thoughtController.removeReaction); // removing a reaction from a thought

module.exports = router;