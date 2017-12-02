const {ChatQueue}  = require("./chat_queue.js");
const CleverbotAPI = require("cleverbot-api");

QUEUE_LEN = 4;

class CleverbotChat extends ChatQueue {

	/**
	 * Create a Cleverbot chat queue
	 */
	constructor(apiKey) {
		super()
		this._index     = false;
		this._cleverbot = [
			new CleverbotAPI(apiKey),
			new CleverbotAPI(apiKey)
		];
	}

	/**
	 * On pop event
	 *
	 * @memberof ChatQueue
	 */
	onPop() {

	}

	/**
	 * Reset the chat queue
	 *
	 * @param {Function} callback
	 * @memberof ChatQueue
	 */
	reset(callback) {
		this.clear();

	}
}

// Export the module
module.exports = {CleverbotChat};
