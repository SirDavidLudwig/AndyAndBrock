const {Bot} = require("./bot.js");
const async = require("async");

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
		this._bots.push(new Bot(this._config["andy_api_key"]));
		this._bots.push(new Bot(this._config["brock_api_key"]));

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
			this.ready();
		});
	}

	/**
	 * Invoked when Andy and Brock are ready to begin
	 * @return {Undefined}
	 */
	ready() {

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
