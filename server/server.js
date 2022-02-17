const express = require('express');
const notesRouter = require('./routes/notesRoutes');
const server = express();
const port = 5000;

const path = require('path');

server.use('/api/v1/', notesRouter);

const start = () => {
	server.listen(port, () => {
		console.log(`server is listening on port ${port}...`);
	});
};

start();
