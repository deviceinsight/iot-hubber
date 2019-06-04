import React from 'react';

export default class Modal extends React.Component {
	render() {
		const {children, title} = this.props;
		return (
			<div className="modal">
				<div className="modal-title">{title}</div>
				<div className="modal-content">{children}</div>
			</div>
		);
	}
}
