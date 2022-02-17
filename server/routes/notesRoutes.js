const express = require('express');
const notesRouter = express.Router();
const { getAllNotes } = require('../controllers/notesController');

notesRouter.route('/notes').get(getAllNotes);

module.exports = notesRouter;
