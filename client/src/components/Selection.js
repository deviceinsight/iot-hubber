import React from 'react';

export default class Selection extends React.Component {
	state = {
		currentValue: this.props.initialValue || ''
	};

	onChange = ({target: {value}}) => {
		const {onChange} = this.props;

		this.setState(
			{
				currentValue: value
			},
			() => {
				if (typeof onChange === 'function') {
					onChange(value);
				}
			}
		);
	};

	render() {
		const {options} = this.props;
		const {currentValue} = this.state;

		return (
			<div className="selection">
				<select value={currentValue} onChange={this.onChange}>
					{options.map((option, i) => (
						<option key={i} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		);
	}
}
