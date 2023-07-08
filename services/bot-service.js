const { Telegraf, session } = require("telegraf");
const UserService = require("../services/user-service");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());
bot.start((ctx) => ctx.reply("Hello!"));
bot.command("add", (ctx) => {
	ctx.reply("Input name:");
	ctx.session = { step: "name" }; // Save current step
});
bot.on("message", async (ctx) => {
	const { step } = ctx.session;

	switch (step) {
		case "name":
			ctx.session.name = ctx.message.text;
			ctx.reply("Input age:");
			ctx.session.step = "age";
			break;
		case "age":
			ctx.session.age = ctx.message.text;
			ctx.reply("Input email:");
			ctx.session.step = "email";
			break;
		case "email":
			ctx.session.email = ctx.message.text;
			try {
				await UserService.addUser({
					name: ctx.session.name,
					email: ctx.session.email,
					age: ctx.session.age,
				});
				ctx.reply("User was created.");
			} catch (e) {
				ctx.reply(
					"Check your input values. Email is required, age must be between 0 to 120, nane must be provided."
				);
			}
			delete ctx.session;
			break;
		default:
			ctx.reply("Unknow command.");
			break;
	}
});

module.exports = bot;
