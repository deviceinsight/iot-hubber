import React from 'react';

import classnames from 'classnames';

export default class Button extends React.Component {
	render() {
		const {onClick, children, warning, error, success} = this.props;

		const buttonClass = classnames('button', {
			danger: !!error,
			warning: !!warning,
			success: !!success
		});

		return (
			<button className={buttonClass} onClick={onClick}>
				{children}
			</button>
		);
	}
}
