import React from 'react';

export default class Box extends React.Component {
	render() {
		const {children} = this.props;
		return <div className="box">{children}</div>;
	}
}
