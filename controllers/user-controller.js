const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const UserService = require("../services/user-service");

class UserController {
	// Get all users from database
	async getUsers(req, res, next) {
		try {
			const users = await UserService.getUsers();
			return res.json(users);
		} catch (error) {
      next(error);
		}
	}

	// Create a new users in database
	async addUser(req, res, next) {
		try {
      const errors = validationResult(req)
      if (errors) {
        return next(ApiError.BadRequest("Invalid values", errors.array()));
      }
			// Get users from request
			const users = req.body;
			// Create new user or update existing
			const usersData = await UserService.addUser(users);
			// Remove user users
			return res.json(usersData);
		} catch (error) {
      next(error);
		}
	}
}

module.exports = new UserController();
