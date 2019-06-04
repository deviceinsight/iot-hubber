import React from 'react';

export default class LabelledBox extends React.Component {
	render() {
		const {sent, topic, content} = this.props;

		return (
			<div className="log-entry" key={sent}>
				<span className="sent">{sent}</span>
				<span className="topic">{topic}</span>
				<pre className="content">
					{JSON.stringify(content, null, 4)}
				</pre>
			</div>
		);
	}
}
