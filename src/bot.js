const Discord   = require("discord.js");
const GoogleTTS = require("google-tts-api");

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
		this._lang       = lang;
		this._channel    = null;
		this._connection = null;
		this._chatQueue  = undefined;

		this._onConversedListener = undefined;
		this._onJoinListener      = undefined;
		this._onLeaveListener     = undefined;

		this._nextUrl = null;
	}

	/**
	 * Prepare the next audible statement
	 *
	 * @return {Undefined}
	 * @memberof Bot
	 */
	prepare(callback) {
		if (this._chatQueue.isEmpty()) {
			this._nextUrl = null;
			return;
		}
		var next = this._chatQueue.pop();
		console.log(this._id, "Getting response:", next);
		GoogleTTS(next, this._lang, 1).then((url) => {
			this._nextUrl = url;
			if (callback)
				callback();
		});
	}

	/**
	 * Converse in the conversation
	 *
	 * @return {Undefined}
	 * @memberof Bot
	 */
	converse() {
		console.log("Conversing...", !this._connection, this._nextUrl);
		if (!this._connection || this._nextUrl == null)
			return;
		var dispatcher = this._connection.playArbitraryInput(this._nextUrl);
		dispatcher.on("start", () => {
			// Fix the delay buildup between the bots
			this._connection.player.streamingData.pausedTime = 0;
		});
		dispatcher.on("end", () => { this.onConversed(); });
		this.prepare();
	}

	/**
	 * Join a voice channel
	 *
	 * @param {Channel} channel
	 * @return {Undefined}
	 * @memberof Bot
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
	 * @memberof Bot
	 */
	leaveChannel() {
		if (this._connection)
			this._connection.disconnect();
		this.onLeaveChannel();
	}

	/**
	 * Invoked when the bot has finished conversing
	 *
	 * @memberof Bot
	 */
	onConversed() {
		if (this._onConversedListener)
			this._onConversedListener[0].apply(this._onConversedListener[1]);
	}

	/**
	 * Invoked when the bot joins the voice channel
	 *
	 * @param {Connection} connection
	 * @return {Undefined}
	 * @memberof Bot
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

	/**
	 * Set the on conversed callback
	 *
	 * @param {Function} callback
	 * @param {Context}  context
	 * @memberof Bot
	 */
	setOnConversedListener(callback, context) {
		this._onConversedListener = [callback, context];
	}

	/**
	 * Set the on join callback
	 * @param {Function} callback
	 * @param {Context}  context
	 * @return {Undefined}
	 * @memberof Bot
	 */
	setOnJoinListener(callback, context) {
		this._onJoinListener = [callback, context];
	}

	/**
	 * Set the on leave callback
	 * @param {Function} callback
	 * @param {Context}  context
	 * @return {Undefined}
	 * @memberof Bot
	 */
	setOnLeaveListener(callback, context) {
		this._onLeaveListener = [callback, context];
	}
}

// Export the module
module.exports = {Bot};
