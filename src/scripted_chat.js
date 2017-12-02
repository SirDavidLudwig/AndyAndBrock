const { ChatQueue } = require("./chat_queue.js");


class ScriptedChat extends ChatQueue {

	/**
	 * Create a scripted chat queue
	 */
	constructor() {
		super()
		this.reset();
	}

	reset() {
		this.push("hello there");
		this.push("hello!");
		this.push("What are you doing?");
		this.push("Nothing");
		this.push("Well, goodbye then");
		this.push("Bye");
	}
}

// Export the module
module.exports = {ScriptedChat}
