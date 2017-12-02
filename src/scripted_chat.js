const { ChatQueue } = require("./chat_queue.js");
const jetpack = require("fs-jetpack");


class ScriptedChat extends ChatQueue {

	/**
	 * Create a scripted chat queue
	 */
	constructor() {
		super()
	}

	/**
	 * Reset the chat queue
	 *
	 * @param {Function} callback
	 * @memberof ScriptedChat
	 */
	reset(callback, context) {
		this.clear();
		var lines = jetpack.read("./script.txt").split('\n');
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].trim())
				this.push(lines[i].trim());
		}
		callback.apply(context);
	}
}

// Export the module
module.exports = {ScriptedChat}
