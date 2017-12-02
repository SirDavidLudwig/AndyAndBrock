const Discord = require("discord.js");

class Bot extends Discord.Client {

	/**
	 * Create a Discord bot
	 * @param {Integer} id
	 * @param {String} apiKey
	 */
	constructor(id, apiKey) {
		super()
		this._id = id;
		this._apiKey = apiKey;
		this._channel = null;
		this._connection = null;
	}

	/**
	 * Join a channel
	 * @param {Channel} channel
	 * @return {Undefined}
	 */
	joinChannel(channel) {
		channel.join()
			.then((connection) => {
				this.onJoinChannel(channel, connection)
			})
			.catch((err) => {
				console.error(err);
				this._channel    = null;
				this._connection = null;
			});
	}

	/**
	 * Leave the current channel
	 * @return {Undefined}
	 */
	leaveChannel() {
		if (this._connection)
			this._connection.disconnect();
		this._channel = null;
		this._connection = null;
	}

	/**
	 * @param {Connection} connection
	 * @return {Undefined}
	 */
	onJoinChannel(channel, connection) {
		this._channel    = channel;
		this._connection = connection;
	}

	/**
	 * Log the bot into Discord
	 * @return {Undefined}
	 */
	login() {
		super.login(this._apiKey);
	}

	/**
	 * Subscribe to an event
	 * @param {String}   event
	 * @param {Function} callback
	 * @param {Context}  context
	 * @return {Undefined}
	 */
	subscribe(event, callback, context) {
		var id = this._id;
		this.on(event, function() {
			var args = Array.from(arguments);
			args.unshift(0);
			args[0] = id;
			callback.apply(context, args);
		});
	}
}

// Export the module
module.exports = {Bot};
