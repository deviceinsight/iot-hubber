import React from 'react';

export default class Header extends React.Component {
	render() {
		const {title, children} = this.props;

		return (
			<div className="header" style={{padding: 20}}>
				<h3
					style={{
						fontStyle: 'italic',
						color: 'white',
						fontSize: 44,
						padding: '5px 10px',
						border: '1px dashed #fff'
					}}>
					{title}
				</h3>
				<div className="controls">{children}</div>
			</div>
		);
	}
}
