import React from 'react';

import {MessageBox, LabelledBox, Box} from 'components';
import {consume} from 'api/api';
import {subscribeToSocket} from 'api/socket';

class Consumer extends React.Component {
	state = {
		messages: [],
		consuming: 'NO'
	};

	componentDidMount() {
		const {clientId} = this.props;
		subscribeToSocket(this.handleMessage);

		consume(clientId).then(response => {
			this.setState({consuming: response.data.status});
		});
	}

	componentWillUnmount() {
		// unsubscribe from websocket
	}

	handleMessage = message => {
		const {messages} = this.state;

		this.setState({
			messages: [JSON.parse(message), ...messages]
		});
	};

	render() {
		const {messages, consuming} = this.state;

		return (
			<Box className="consumer">
				<LabelledBox title="Consuming">{consuming}</LabelledBox>

				<MessageBox messages={messages} />
			</Box>
		);
	}
}

export default Consumer;
