class MessageStore {
	constructor() {
		this.messages = {};
	}

	getMessages(clientId) {
		return this.messages[clientId];
	}

	addMessage(clientId, message) {
		this.messages[clientId] = this.messages[clientId] || [];
		this.messages[clientId].push(message);
	}

	resetMessages(clientId) {
		if (this.messages[clientId]) {
			this.messages[clientId] = [];
		}
	}
}

module.exports = new MessageStore();
