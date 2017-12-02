const {Bot} = require("./bot.js");
const async = require("async");


class AndyAndBrock {

	/**
	 * @param {Json Object} config
	 */
	constructor(config) {
		this._config = config;
		this._bots   = [];
	}

	/**
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
	 * @return {Undefined}
	 */
	ready() {

	}

	/**
	 * @return {Undefined}
	 */
	start() {
		async.waterfall([
			(callback) => this.initBots(callback)
		]);
	}
}

module.exports = {AndyAndBrock};
