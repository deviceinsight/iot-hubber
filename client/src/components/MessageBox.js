import React from 'react';

import Message from './Message';

export default class MessageBox extends React.Component {
	render() {
		const {messages} = this.props;

		return (
			<div className="messagebox">
				{messages.map((message, i) => (
					<Message key={i} message={message} />
				))}
			</div>
		);
	}
}
