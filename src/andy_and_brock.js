const {Bot}           = require("./bot.js");
const {CleverbotChat} = require("./cleverbot_chat.js");
const {ScriptedChat}  = require("./scripted_chat.js");
const async           = require("async");

const CHAT_CLEVERBOT = "discuss andy and brock!";
const CHAT_SCRIPT    = "act andy and brock!";
const JOIN_MESSAGE   = "andy and brock!"
const LEAVE_MESSAGE  = "leave andy and brock!"

class AndyAndBrock {

	/**
	 * Create the manager for Andy and Brock
	 *
	 * @param {Json Object} config
	 */
	constructor(config) {
		this._config = config;
		this._bots   = [];
		this._chatMode;
		this._chatQueue;
		this.setChatMode(CHAT_SCRIPT);
	}

	/**
	 * Initialize the bots by creating and logging them in
	 *
	 * @return {Undefined}
	 */
	initBots(callback) {
		this._bots.push(new Bot(0, this._config["andy_api_key"],  "en-gb"));
		this._bots.push(new Bot(1, this._config["brock_api_key"], "en"));

		async.parallel([
			(callback) => {
				this._bots[0].on("ready", callback);
				this._bots[0].login();
			},
			(callback) => {
				this._bots[1].on("ready", callback);
				this._bots[1].login();
			},
		], callback);
	}

	/**
	 * Initialize the events for the bots
	 *
	 * @return {Undefined}
	 */
	initEvents() {
		for (var i = 0; i < 2; i++) {
			this._bots[i].subscribe("message", this.onMessage, this);
		}
	}

	/**
	 * Invoked when a message is received
	 *
	 * @param {Integer} id
	 * @param {String}  message
	 * @return {Undefined}
	 */
	onMessage(id, message) {
		var msg = message.content.toLowerCase();

		if (id == 0) {
			if (msg == CHAT_CLEVERBOT || msg == CHAT_SCRIPT)
				this.setChatMode(msg, message);
		}

		switch(msg) {
			case JOIN_MESSAGE:
				if (message.member && message.member.voiceChannel)
					this._bots[id].joinChannel(message.member.voiceChannel);
				break;
			case LEAVE_MESSAGE:
				this._bots[id].leaveChannel();
				break;
		}
	}

	/**
	 * Invoked when Andy and Brock are ready to begin
	 *
	 * @return {Undefined}
	 * @memberof AndyAndBrock
	 */
	onBotsReady() {
		this.initEvents();
	}

	/**
	 *
	 *
	 * @param {any} mode
	 * @param {any} [message=undefined]
	 * @memberof AndyAndBrock
	 */
	setChatMode(mode, message = undefined) {
		var result

		if (mode == CHAT_CLEVERBOT) {
			if (this._chatMode == CHAT_CLEVERBOT) {
				result = "We are already going to discuss.";
			}
			this._chatQueue = new CleverbotChat();
			result = "Switching to our discussion.";
		} else if(mode == CHAT_SCRIPT) {
			if (this._chatMode == CHAT_SCRIPT) {
				result = "We are already going to act.";
			}
			this._chatQueue = new ScriptedChat();
			result = "Switching to our act.";
		}

		for (var i = 0; i < this._bots.length; i++)
			this._bots[i].setChatQueue(this._chatQueue);

		if (message)
			message.reply(result);
	}

	/**
	 * Start Andy and Brock
	 *
	 * @return {Undefined}
	 */
	start() {
		async.waterfall([
			(callback) => this.initBots(callback)
		], () => { this.onBotsReady() });
	}
}

// Export the module
module.exports = {AndyAndBrock};
