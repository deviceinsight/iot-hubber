const dotenv = require('dotenv').config();

// GET ENV VARIABLES
const port = process.env.REACT_APP_HTTP_PORT || 8088;
const websocketPort = process.env.REACT_APP_WEBSOCKET_PORT || 8089;
const websocketTopic =
	process.env.REACT_APP_WEBSOCKET_TOPIC || 'device-messages';
const iotHubUrl = process.env.IOTHUB_URL || 'di-tech-2.azure-devices.net';
const iotHubBroker = process.env.IOTHUB_BROKER || `tls://${iotHubUrl}:8883`;

const mqttConnector = require('./mqtt-connector');

// CONFIGURE EXPRESS SERVER
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
	path: '/iot-hubber/api/socket.io/'
});
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const upload = multer({dest: 'tmp/'});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const handleError = (status, err, res) => {
	console.log(err);

	res.status(500).json({
		status: status,
		message: err
	});
};

// ROUTES
app.post(
	'/connect',
	upload.fields([
		{name: 'certCert', maxCount: 1},
		{name: 'certKey', maxCount: 1}
	]),
	async (req, res) => {
		try {
			const {clientId, lastWillTopic, lastWillPayload} = req.body;
			const {certCert, certKey} = req.files;

			const callback = message => {
				if (socket) {
					socket.emit(websocketTopic, message);
				}
			};

			await mqttConnector.connect({
				config: {
					iotHubUrl,
					iotHubBroker
				},
				connectionInfo: {
					clientId,
					lastWillTopic,
					lastWillPayload,
					certKey: certKey[0].path,
					certCert: certCert[0].path
				},
				callback
			});

			res.json({
				status: 'CONNECTED',
				clientId
			});
		} catch (err) {
			handleError('CONNECTION ERROR', err, res);
		}
	}
);

app.post('/disconnect', (req, res) => {
	const {clientId} = req.body;

	mqttConnector
		.disconnect({clientId})
		.then(() => {
			res.json({
				status: 'DISCONNECTING'
			});
		})
		.catch(err => handleError('DISCONNECTING ERROR', err, res));
});

app.post('/produce', (req, res) => {
	const {clientId, topic, content} = req.body;

	mqttConnector
		.publish({clientId, topic, content})
		.then(() => {
			res.json({
				status: 'PUBLISHING'
			});
		})
		.catch(err => handleError('PUBLISHING ERROR', err, res));
});

// CONSUME VIA WEBSOCKETS
server.listen(websocketPort);

let socket = null;

io.on('connection', s => {
	console.log('Websocket connection established');
	socket = s;
});

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ', err);
});

app.get('/messages/:urn', (req, res) => {
	const clientId = req.params.urn;
	try {
		mqttConnector.getMessages({clientId});
		res.json({
			messages: mqttConnector.getMessages({clientId}) || []
		});
	} catch (err) {
		handleError('GET MESSAGES ERROR', err, res);
	}
});

app.delete('/messages/:urn', (req, res) => {
	const clientId = req.params.urn;

	mqttConnector.resetMessages({clientId});
});

// START SERVER
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
