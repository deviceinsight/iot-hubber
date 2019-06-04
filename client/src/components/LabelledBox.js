import React from 'react';

export default class LabelledBox extends React.Component {
	render() {
		const {title, children, style} = this.props;

		return (
			<div className="labelledbox">
				<div className="labelledbox-header">{title}</div>
				<div style={style} className="labelledbox-content">
					{children}
				</div>
			</div>
		);
	}
}
