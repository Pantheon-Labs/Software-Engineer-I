const express = require('express');
const notesRouter = require('./routes/notesRoutes');
const cors = require('cors');

const server = express();
const port = 5000;

const path = require('path');
server.use(cors());
server.use('/api/v1/', notesRouter);
server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

const start = () => {
	server.listen(port, () => {
		console.log(`server is listening on port ${port}...`);
	});
};

start();
