const ApiError = require("../exceptions/api-error");

module.exports = (err, req, res, next) => {
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, status: err.status, errors: err.errors });
	}
	return res.status(500).json({ message: "Unexpected error" });
};
