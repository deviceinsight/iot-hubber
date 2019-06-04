import axios from 'axios';

const port = process.env.REACT_APP_HTTP_PORT;
axios.defaults.baseURL = `http://localhost:${port}`;

export const STATUS_CONNECTED = 'CONNECTED';

export const getStatusWithMessage = (response, type) => {
	const {status, statusText} = response;

	let message = `${status} - ${statusText || ''}`;

	return {
		status: type,
		message: `${type}: ${message}`
	};
};

export const connect = params => {
	const formData = new FormData();
	formData.append('certCert', params.certCert);
	formData.append('certKey', params.certKey);
	formData.append('clientId', params.clientId);
	formData.append('lastWillTopic', params.lastWillTopic);
	formData.append('lastWillPayload', params.lastWillPayload);

	return axios.post('/connect', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
};

export const disconnect = clientId => {
	return axios.post('/disconnect', {clientId});
};

export const produce = ({clientId, topic, content}) => {
	const payload = content.replace(/\s/g, '');
	return axios.post('/produce', {clientId, topic, content: payload});
};

export const consume = clientId => {
	return axios.post('/consume', {clientId});
};
