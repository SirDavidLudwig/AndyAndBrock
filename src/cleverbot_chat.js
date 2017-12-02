const {ChatQueue}  = require("./chat_queue.js");
const CleverbotAPI = require("cleverbot-api");

QUEUE_LEN     = 4;
START_MESSAGE = "futher mucking fresh of breath air";

class CleverbotChat extends ChatQueue {

	/**
	 * Create a Cleverbot chat queue
	 */
	constructor(apiKey) {
		super()
		this._index     = false;
		this._filling   = false;
		this._cleverbot = [
			new CleverbotAPI(apiKey),
			new CleverbotAPI(apiKey)
		];
		this._lastMsg = [
			START_MESSAGE,
			""
		];
	}

	/**
	 * On pop event
	 *
	 * @memberof ChatQueue
	 */
	onPop() {
		this.fillQueue();
	}

	fillQueue(callback, context) {
		if (this._filling || this.length() >= QUEUE_LEN) {
			if (callback)
				callback.apply(context);
			return;
		}
		this._filling = true;
		var next = () => {
			this._cleverbot[+this._index].getReply({
				input: this._lastMsg[+this._index]
			}, (err, resp) => {
				if (err) {
					next();
				}
				this.push(resp.output);
				this._index = !this._index;
				this._lastMsg[+this._index] = resp.output;
				if (this.length() < QUEUE_LEN)
					next();
				else {
					this._filling = false;
					if (callback)
						callback.apply(context);
				}
			});
		};
		next();
	}

	/**
	 * Reset the chat queue
	 *
	 * @param {Function} callback
	 * @memberof ChatQueue
	 */
	reset(callback, context) {
		this.clear();
		this.push(START_MESSAGE);
		this.fillQueue(callback, context);
	}
}

// Export the module
module.exports = {CleverbotChat};
