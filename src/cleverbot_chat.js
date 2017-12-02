const {ChatQueue}  = require("./chat_queue.js");
const CleverbotAPI = require("cleverbot-api");


class CleverbotChat extends ChatQueue {

	/**
	 * Create a Cleverbot chat queue
	 * @param {Integer} maximum
	 */
	constructor(maximum) {
		super()
	}
}

// Export the module
module.exports = {CleverbotChat};
