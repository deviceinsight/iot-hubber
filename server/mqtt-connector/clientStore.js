class ClientStore {
	constructor() {
		this.clients = {};
	}

	getClient(clientId) {
		return this.clients[clientId];
	}

	addClient(clientId, client) {
		this.clients[clientId] = client;
	}

	removeClient(clientId) {
		delete this.clients[clientId];
	}
}

module.exports = new ClientStore();
