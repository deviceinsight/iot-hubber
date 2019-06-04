import io from 'socket.io-client';

const port = process.env.REACT_APP_WEBSOCKET_PORT;
const topic = process.env.REACT_APP_WEBSOCKET_TOPIC;

const socket = io(`http://localhost:${port}`);

export const subscribeToSocket = handler => {
	socket.on(topic, data => {
		console.log(data);
		handler(data);
	});
};
