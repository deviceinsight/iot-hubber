import React from 'react';

export default class Message extends React.PureComponent {
	render() {
		const {message} = this.props;

		return <pre className={''}>{JSON.stringify(message, null, 4)}</pre>;
	}
}
