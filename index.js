const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const Task = require('./db/tasks');

const pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/api', require('./api/tasks'));

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500)
	.send(err.message || 'Internal Service Error');
});

// sync database and start server
Task.sync()
	.then(() => {
		app.listen(1337, () => {
			console.log('Server is listening on port 1337!');
		});
	});

	module.exports = app;
