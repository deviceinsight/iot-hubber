import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

import {LabelledBox, Selection, Button, LogEntry, Box} from 'components';

const defaultTemplate = {
	name: 'Hello',
	topic: 'type=hello',
	content: ''
};

export default class Producer extends React.Component {
	state = {
		topic: '',
		content: '',
		initialContent: '',
		templates: [],
		selectedTemplate: '',
		log: []
	};

	componentDidMount() {
		const messageTemplates = JSON.parse(
			process.env.REACT_APP_MESSAGE_TEMPLATES
		);

		if (messageTemplates && messageTemplates.length) {
			this.setState({
				selectedTemplate: defaultTemplate.name,
				topic: defaultTemplate.topic,
				initialContent: '',
				templates: [defaultTemplate, ...messageTemplates]
			});
		}
	}

	handleChangeTopic = ({target: {value}}) => this.setState({topic: value});

	handleChangeContent = value => {
		this.setState({content: value});
	};

	handleSubmit = () => {
		const {onProduce} = this.props;
		const {topic, content} = this.state;

		if (topic.length) {
			onProduce({topic, content})
				.then(response => this.addToLog({topic, content}))
				.catch(error => console.log(error));
		}
	};

	addToLog({topic, content}) {
		const {log} = this.state;
		this.setState({
			log: [
				{
					sent: new Date().toISOString(),
					topic,
					content
				},
				...log
			]
		});
	}

	handleChangeTemplate = value => {
		const chosenTemplate = this.state.templates.find(t => t.name === value);

		if (!chosenTemplate) return;

		const {topic, content, name} = chosenTemplate;

		this.setState({
			topic,
			selectedTemplate: name,
			initialContent: JSON.stringify(content, null, 4)
		});
	};

	render() {
		const {
			topic,
			content,
			initialContent,
			log,
			selectedTemplate,
			templates
		} = this.state;

		return (
			<div className="producer">
				<Box>
					{!!templates.length && (
						<LabelledBox title="Message Template">
							<Selection
								value={selectedTemplate}
								options={templates.map(t => t.name)}
								onChange={this.handleChangeTemplate}
							/>
						</LabelledBox>
					)}
					<LabelledBox title="Message Topic*">
						<input
							type="text"
							value={topic}
							placeholder="type=hello"
							onChange={this.handleChangeTopic}
						/>
					</LabelledBox>
					<div>
						<label style={{fontWeight: 'bold'}}>
							Message Payload
						</label>
						<div
							style={{
								border: '1px solid #ddd',
								margin: '20px 0'
							}}>
							<CodeMirror
								key={initialContent}
								options={{
									mode: 'application/json',
									lineNumbers: true
								}}
								value={content}
								defaultValue={initialContent}
								onChange={this.handleChangeContent}
							/>
						</div>
					</div>
					<Button success onClick={this.handleSubmit}>
						Send
					</Button>
				</Box>
				<Box className="producer-log">
					{log.map((entry, idx) => (
						<LogEntry key={idx} {...entry} />
					))}
				</Box>
			</div>
		);
	}
}
