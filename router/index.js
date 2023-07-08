const UserController = require("../controllers/user-controller");
const { body } = require("express-validator");
const Router = require("express");

const router = new Router();

router.get("/", UserController.getUsers);
router.post(
	"/addUser",
	body("email", "Email must be correct").isEmail().optional(false),
	body("age", "Age must be between 0 to 120")
		.isInt({ min: 0, max: 120 })
		.optional(false),
	body("name", "Provide name").isString().isLength({ min: 3 }).optional(false),
	UserController.addUser
);

module.exports = router;
