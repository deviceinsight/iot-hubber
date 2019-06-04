import React from 'react';
import classnames from 'classnames';

const NOTIFICATION_DURATION = 2000;

export default class Notification extends React.Component {
	currentTimeout;

	state = {
		notifying: false
	};

	componentDidUpdate(prevProps, prevState) {
		const {text} = this.props;
		const {text: prevText} = prevProps;
		const {notifying} = this.state;
		const {notifying: prevNotifying} = prevState;

		if (!notifying && notifying === prevNotifying) {
			this.showNotification();
		} else if (text === prevText && notifying === prevNotifying) {
			clearTimeout(this.currentTimeout);
			this.refreshNotification();
		}
	}

	showNotification() {
		this.setState({notifying: true});

		this.refreshNotification();
	}

	refreshNotification() {
		this.currentTimeout = setTimeout(() => {
			this.setState({notifying: false});
		}, NOTIFICATION_DURATION);
	}

	render() {
		const {type, text} = this.props;
		const {notifying} = this.state;
		const notificationClass = classnames('notification', {
			error: type === 'error',
			warning: type === 'warning',
			success: type === 'success'
		});

		return notifying && <div className={notificationClass}>{text}</div>;
	}
}
