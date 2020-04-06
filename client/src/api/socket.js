import io from 'socket.io-client';

const port = process.env.REACT_APP_WEBSOCKET_PORT;
const topic = process.env.REACT_APP_WEBSOCKET_TOPIC;
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const path = '/iot-hubber/api/socket.io/';

const socket = baseUrl
	? io({
			path
	  })
	: io(`http://localhost:${port}`, {
			path
	  });

export const subscribeToSocket = handler => {
	socket.on(topic, data => {
		console.log(data);
		handler(data);
	});
};
