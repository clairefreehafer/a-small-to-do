'use strict';

const router = require('express').Router();
const Task = require('../db/tasks');

// CREATE TODO ITEM
router.post('/', (req, res, next) => {
	Task.create({
		content: req.body.content,
		completed: false
	})
	.then((createdTask) => {
		res.send(createdTask);
	})
	.catch(next);
});

// DELETE TODO ITEM
router.delete('/', (req, res, next) => {
	Task.destroy({
		where: {
			content: req.query.content
		}
	})
	.then(res.sendStatus(204))
	.catch(next);
});

// FETCH ALL TODO ITEMS
router.get('/', (req, res, next) => {
	Task.findAll()
	.then(tasks => res.json(tasks))
	.catch(next);
});

// FETCH INCOMPLETE TODO ITEMS
router.get('/incomplete', (req, res, next) => {
	Task.findAll({
		where: {
			completed: false
		}
	})
	.then(tasks => res.json(tasks))
	.catch(next);
});

// FETCH COMPLETE TODO ITEMS
router.get('/complete', (req, res, next) => {
	Task.findAll({
		where: {
			completed: true
		}
	})
	.then(tasks => res.json(tasks))
	.catch(next);
});

// MARK TODO AS COMPLETE
router.put('/', (req, res, next) => {
	Task.update({ completed: true },
		{ where: { content: req.body.content } })
	.then(res.sendStatus(200))
	.catch(next);
});

module.exports = router;
