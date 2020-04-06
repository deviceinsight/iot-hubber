class MessageStore {
	constructor() {
		this.messages = {};
	}

	getMessages(clientId) {
		console.log('Getting messages for clientId ', clientId);
		return this.messages[clientId];
	}

	addMessage(clientId, message) {
		console.log('Adding message for clientId ', clientId);
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
