const express = require('express');
const server = express();
const port = 5000;

const start = () => {
	server.listen(port, () => {
		console.log(`server is listening on port ${port}...`);
	});
};

start();
