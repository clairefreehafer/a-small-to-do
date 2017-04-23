'use strict';

const expect = require('chai').expect;
const db = require('../db/db');
const Task = require('../db/tasks');

describe('Task model', () => {
	// clear database
	before(() => {
		return db.sync({ force: true });
	});

	let task;
	beforeEach(() => {
		task = Task.build({
			content: 'finish to do app'
		});
	})

	// empty tables
	afterEach(() => {
		return Task.truncate({ cascade: true });
	})

	it('requires "content" field', () => {
		task.content = null;

		return task.validate()
		.then(result => {
			expect(result).to.be.an.instanceof(Error);
			expect(result.message).to.contain('content cannot be null');
		});
	});

	it('"completed" defaults to false', () => {
		expect(task.completed).to.equal(false);
	})
});
