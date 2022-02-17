const data = require('../data');

const getAllNotes = async (req, res) => {
	try {
		res.status(200).json({ success: true, data: data });
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getAllNotes };
