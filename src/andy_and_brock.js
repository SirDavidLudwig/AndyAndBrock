const {Bot} = require("./bot.js");
const async = require("async");

const JOIN_MESSAGE  = "andy and brock!"
const LEAVE_MESSAGE = "bye andy and brock!"
class AndyAndBrock {

	/**
	 * Create the manager for Andy and Brock
	 * @param {Json Object} config
	 */
	constructor(config) {
		this._config = config;
		this._bots   = [];
	}

	/**
	 * Initialize the bots by creating and logging them in
	 * @return {Undefined}
	 */
	initBots(callback) {
		this._bots.push(new Bot(0, this._config["andy_api_key"]));
		this._bots.push(new Bot(1, this._config["brock_api_key"]));

		async.parallel([
			(callback) => {
				this._bots[0].on("ready", callback);
				this._bots[0].login();
			},
			(callback) => {
				this._bots[1].on("ready", callback);
				this._bots[1].login();
			},
		], (err, result) => {
			this.onBotsReady();
		});
	}

	/**
	 * Initialize the events for the bots
	 * @return {Undefined}
	 */
	initEvents() {
		for (var i = 0; i < 2; i++) {
			this._bots[i].subscribe("message", this.onMessage, this);
		}
	}

	/**
	 * Invoked when a message is received
	 * @param {Integer} id
	 * @param {String}  message
	 * @return {Undefined}
	 */
	onMessage(id, message) {
		var msg = message.content.toLowerCase();
		switch(msg) {
			case JOIN_MESSAGE:
				this._bots[id].joinChannel(message.member.voiceChannel);
				break;
			case LEAVE_MESSAGE:
				this._bots[id].leaveChannel();
				break;
		}
	}

	/**
	 * Invoked when Andy and Brock are ready to begin
	 * @return {Undefined}
	 */
	onBotsReady() {
		this.initEvents();
	}

	/**
	 * Start Andy and Brock
	 * @return {Undefined}
	 */
	start() {
		async.waterfall([
			(callback) => this.initBots(callback)
		]);
	}
}

// Export the module
module.exports = {AndyAndBrock};
