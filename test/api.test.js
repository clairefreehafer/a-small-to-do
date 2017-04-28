const supertest = require('supertest-as-promised')(require('../index'));
const expect = require('chai').expect;
const db = require('../db/db');
const Task = require('../db/tasks');

describe('Task routes', () => {
	// clear database
	before(() => {
		return db.sync({ force: true });
	});

	let newTask1, newTask2;
	beforeEach(() => {
		newTask1 = {
			content: 'finish to do app!',
			completed: true
		};
		newTask2 = {
			content: 'take a nap',
			completed: false
		};

		return Promise.all([
			Task.create(newTask1),
			Task.create(newTask2)
		])
		.catch(console.error);
	})

	// empty tables
	afterEach(() => {
		Task.truncate({ cascade: true })
		.catch(console.error);
	});

	it('GET request returns all tasks', () => {
		return supertest
			.get('/api')
			.expect(200)
			.expect('Content-type', /json/)
			.expect(res => {
				expect(res.body.length).to.eql(2);
			});
	});

	it('POST responds with the task that has been added', () => {
		return supertest
			.post('/api')
			.send({ content: 'a new task' })
			.expect(200)
			.expect('Content-type', /json/)
			.expect(res => {
				expect(res.body.content).to.eql('a new task');
			});
	});

	it('DELETE sends back deletion confirmation', () => {
		return supertest
			.delete('/api')
			.query({ content: 'a new task' })
			.expect(204);
	});

	it('GET /incomplete lists incomplete tasks', () => {
		return supertest
			.get('/api/incomplete')
			.expect(200)
			.expect('Content-type', /json/)
			.expect(res => {
				expect(res.body.length).to.eql(1);
			});
	});

	it('GET /complete lists completed tasks', () => {
		return supertest
			.get('/api/complete')
			.expect(200)
			.expect('Content-type', /json/)
			.expect(res => {
				expect(res.body.length).to.eql(1);
			});
	});

	it('PUT successfully updates task', () => {
		return supertest
			.put('/api')
			.send({ content: 'take a nap' })
			.expect(200)
	})
})
