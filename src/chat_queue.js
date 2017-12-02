

class ChatQueue {

	/**
	 * Create a chat queue
	 */
	constructor() {
		this._queue = [];
	}

	/**
	 * Get the text at the back of the queue
	 *
	 * @return {String|Undefined}
	 * @memberof ChatQueue
	 */
	back() {
		return this._queue[this._queue.length-1]
	}

	/**
	 * Get the text at the front of the queue
	 *
	 * @return {String|Undefined}
	 * @memberof ChatQueue
	 */
	front() {
		return this._queue[0];
	}

	/**
	 * Clear the queue
	 *
	 * @return {Undefined}
	 * @memberof ChatQueue
	 */
	clear() {
		this._queue = [];
	}

	/**
	 * Check if the queue is empty
	 *
	 * @return {Boolean}
	 * @memberof ChatQueue
	 */
	isEmpty() {
		return this._queue.length == 0;
	}

	/**
	 * Get the length of the queue
	 *
	 * @return {Integer}
	 * @memberof ChatQueue
	 */
	length() {
		return this._queue.length;
	}

	/**
	 *	Pop off a value from the queue
	 *
	 * @return {String|Undefined}
	 * @memberof ChatQueue
	 */
	pop() {
		this.onPop();
		return this._queue.shift();
	}

	/**
	 * Add a value to the queue
	 *
	 * @param {String} text
	 * @memberof ChatQueue
	 */
	push(text) {
		this._queue.push(text);
	}

	// Methods to override -----------------------------------------------------

	/**
	 * On pop event
	 *
	 * @memberof ChatQueue
	 */
	onPop() { }

	/**
	 * Reset the chat queue
	 *
	 * @param {Function} callback
	 * @memberof ChatQueue
	 */
	reset(callback) { }
}

// Export the module
module.exports = {ChatQueue};
