const Discord = require("discord.js");

class Bot extends Discord.Client {

	/**
	 * Create a Discord bot
	 *
	 * @param {Integer} id
	 * @param {String} apiKey
	 */
	constructor(id, apiKey, lang) {
		super()
		this._id         = id;
		this._apiKey     = apiKey;
		this._channel    = null;
		this._connection = null;

		this._onJoinListener  = undefined;
		this._onLeaveListener = undefined;
	}

	/**
	 * Join a voice channel
	 *
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
	 *
	 * @return {Undefined}
	 */
	leaveChannel() {
		if (this._connection)
			this._connection.disconnect();
		this.onLeaveChannel();
	}

	/**
	 * Invoked when the bot joins the voice channel
	 *
	 * @param {Connection} connection
	 * @return {Undefined}
	 */
	onJoinChannel(channel, connection) {
		this._channel    = channel;
		this._connection = connection;
		if (this._onJoinListener)
			this._onJoinListener[0].apply(this._onJoinListener[1], [this]);
	}

	/**
	 * Invoked when the bot leaves the voice channel
	 *
	 * @return {Undefined}
	 * @memberof Bot
	 */
	onLeaveChannel() {
		this._channel = null;
		this._connection = null;
		if (this._onLeaveListener)
			this._onLeaveListener[0].apply(this._onLeaveListener[1], [this]);
	}

	/**
	 * Log the bot into Discord
	 *
	 * @return {Undefined}
	 */
	login() {
		super.login(this._apiKey);
	}

	/**
	 * Subscribe to an event
	 *
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

	/**
	 * Set the chat queue
	 *
	 * @param {ChatQueue} chatQueue
	 * @memberof Bot
	 */
	setChatQueue(chatQueue) {
		console.log("Chat queue updated");
		this._chatQueue = chatQueue;
	}

	setOnJoinListener(callback, context) {
		this._onJoinListener = [callback, context];
	}
}

// Export the module
module.exports = {Bot};
