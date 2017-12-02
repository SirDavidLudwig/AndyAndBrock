const Discord = require("discord.js");


class Bot extends Discord.Client {

	/**
	 * Create a Discord bot
	 * @param {String} apiKey
	 */
	constructor(apiKey) {
		super()
		this._apiKey = apiKey;
	}

	/**
	 * Log the bot into Discord
	 * @return {Undefined}
	 */
	login() {
		super.login(this._apiKey);
	}
}

// Export the module
module.exports = {Bot};
