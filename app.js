require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");

// Create app instance
const app = express();

app.use(express.json());
app.use("/users", router);
app.use(errorMiddleware)

const bootstrap = async () => {
	try {
		// Connect to mongoDB cluster
		await mongoose.connect(process.env.DB_URL);

		app.listen(process.env.APP_PORT || 3000, () => {
			console.log(`listening on ${process.env.APP_PORT || 3000}`);
		});
	} catch (error) {
		console.log(error);
	}
};
// Start server
bootstrap();
