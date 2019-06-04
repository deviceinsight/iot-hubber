import React from 'react';

import {FileUpload, LabelledBox, Button} from 'components';

import './connector.scss';

export default class Connector extends React.Component {
	state = {
		clientId: '',
		certCert: undefined,
		certKey: undefined,
		lastWillTopic: '',
		lastWillPayload: ''
	};

	componentDidMount() {
		const clientId = localStorage.getItem('clientId');
		const lastWillTopic = localStorage.getItem('lastWillTopic');
		const lastWillPayload = localStorage.getItem('lastWillPayload');

		if (clientId) this.setState({clientId});
		if (lastWillTopic) this.setState({lastWillTopic});
		if (lastWillPayload) this.setState({lastWillPayload});
	}

	onChangeClientId = ({target: {value: clientId}}) => {
		localStorage.setItem('clientId', clientId);
		this.setState({clientId});
	};

	onChangeLastWillTopic = ({target: {value: topic}}) => {
		localStorage.setItem('lastWillTopic', topic);
		this.setState({lastWillTopic: topic});
	};

	onChangeLastWillPayload = ({target: {value: payload}}) => {
		localStorage.setItem('lastWillPayload', payload);
		this.setState({lastWillPayload: payload});
	};

	onUploadCertificate = acceptedFiles => {
		this.setState({
			certCert: acceptedFiles[0]
		});
	};

	onUploadCertificateKey = acceptedFiles => {
		this.setState({
			certKey: acceptedFiles[0]
		});
	};

	connect = () => {
		const {onConnect} = this.props;

		onConnect(this.state);
	};

	render() {
		const {clientId, lastWillTopic, lastWillPayload, certCert, certKey} = this.state;

		return (
			<div className="connector">
				<LabelledBox title="Client ID">
					<input type="text" value={clientId} onChange={this.onChangeClientId} />
				</LabelledBox>
				<LabelledBox title="certificate.pem">
					<FileUpload
						accept="pem"
						onUpload={this.onUploadCertificate}
						selectedFile={certCert}
					/>
				</LabelledBox>
				<LabelledBox title="certificate.key">
					<FileUpload
						accept="key"
						onUpload={this.onUploadCertificateKey}
						selectedFile={certKey}
					/>
				</LabelledBox>
				<LabelledBox title="Last Will Message Topic">
					<input
						type="text"
						value={lastWillTopic}
						onChange={this.onChangeLastWillTopic}
					/>
				</LabelledBox>
				<LabelledBox title="Last Will Message Payload">
					<input
						type="text"
						value={lastWillPayload}
						onChange={this.onChangeLastWillPayload}
					/>
				</LabelledBox>
				<Button success onClick={this.connect}>
					Connect
				</Button>
			</div>
		);
	}
}
