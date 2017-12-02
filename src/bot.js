const Discord = require("discord.js");


class Bot extends Discord.Client {

	/**
	 * @param {String} apiKey
	 */
	constructor(apiKey) {
		super()
		this._apiKey = apiKey;
	}

	login() {
		super.login(this._apiKey);
	}
}

module.exports = {Bot};
