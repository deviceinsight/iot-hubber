const mqtt = require('mqtt');
const path = require('path');
const fs = require('fs');

const clientStore = require('./clientStore');

const getSubscriptionTopic = clientId =>
	`devices/${clientId}/messages/devicebound/#`;
const getPublishTopic = (clientId, propertyBag) =>
	`devices/${clientId}/messages/events/${propertyBag}`;

const connect = ({
	config: {iotHubUrl, iotHubBroker},
	connectionInfo: {
		clientId,
		lastWillTopic,
		lastWillPayload,
		certKey,
		certCert
	}
}) => {
	return new Promise((resolve, reject) => {
		const username = `${iotHubUrl}/${clientId}/api-version=2016-11-14`;
		const certKeyContent = fs.readFileSync(certKey, 'utf-8').toString();
		const certCertContent = fs.readFileSync(certCert, 'utf-8').toString();
		const existingClient = clientStore.getClient(clientId);

		if (existingClient) {
			resolve();
		}

		const client = mqtt.connect(iotHubBroker, {
			clientId,
			username,
			protocol: 'mqtts',
			cert: certCertContent,
			key: certKeyContent,
			rejectUnauthorized: false,
			will: {
				topic: getPublishTopic(clientId, lastWillTopic),
				payload: lastWillPayload
			}
		});

		fs.unlinkSync(certKey);
		fs.unlinkSync(certCert);

		client.on('connect', () => {
			clientStore.addClient(clientId, client);
			resolve();
		});
	});
};

const consume = ({clientId, callback}) => {
	return new Promise((resolve, reject) => {
		const client = clientStore.getClient(clientId);

		if (!client) {
			reject('No Client connected');
		}

		const subscriptionTopic = getSubscriptionTopic(clientId);

		client.subscribe(subscriptionTopic, function(err) {
			if (!err) {
				resolve();
			}
			reject(err);
		});

		client.on('message', (topic, message) => {
			callback(message.toString());
		});
	});
};

const disconnect = ({clientId}) => {
	return new Promise((resolve, reject) => {
		const client = clientStore.getClient(clientId);

		if (!client) {
			reject('No Client connected');
		}

		client.end(true);
		clientStore.removeClient(clientId);

		resolve();
	});
};

const publish = ({clientId, topic, content}) => {
	const publishTopic = getPublishTopic(clientId, topic);

	return new Promise((resolve, reject) => {
		const client = clientStore.getClient(clientId);

		if (!client) {
			reject('No Client connected');
		}

		client.subscribe(publishTopic, function(err) {
			if (!err) {
				client.publish(publishTopic, content);
				client.unsubscribe(publishTopic);

				resolve();
			}
			reject(err);
		});
	});
};

module.exports = {
	connect,
	disconnect,
	publish,
	consume
};
