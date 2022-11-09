const express = require('express')
const MuseumController = require('../controllers/Museum')
const router = express.Router();

router.get('/', MuseumController.findAll);
router.get('/:id', MuseumController.findOne);
router.post('/', MuseumController.create);
router.patch('/:id', MuseumController.update);
router.delete('/:id', MuseumController.destroy);

module.exports = router