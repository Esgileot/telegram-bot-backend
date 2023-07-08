const userModel = require("../models/user-model");
const ApiError = require("../exceptions/api-error");
class UserService {
	// Get all users from database
	async getUsers() {
		return await userModel.find();
	}

	// Create a new user in database
	async addUser(payload) {
		const user = await userModel.findOne({ email: payload.email });
		if (user) {
			throw ApiError.BadRequest("User with this email already exists");
		}
		return await userModel.create({ ...payload });
	}
}

module.exports = new UserService();
