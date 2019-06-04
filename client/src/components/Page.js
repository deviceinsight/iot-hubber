import React from 'react';

export default class Page extends React.Component {
	render() {
		const {title, children} = this.props;
		return (
			<div className="page">
				<h1>{title}</h1>
				<div className="page-content">{children}</div>
			</div>
		);
	}
}
