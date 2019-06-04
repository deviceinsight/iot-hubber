import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class TextInput extends React.Component {
	render() {
		return (
			<div className="textinput">
				<SyntaxHighlighter language="json" style={dark}>
					{`{
                     "hello": "myprop"
                 }`}
				</SyntaxHighlighter>
			</div>
		);
	}
}
