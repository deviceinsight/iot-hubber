import React from 'react';

import classNames from 'classnames';
import Dropzone from 'react-dropzone';

export default class FileUpload extends React.Component {
	render() {
		const {selectedFile, onUpload} = this.props;

		return (
			<div className="file">
				{selectedFile ? (
					<div className="file-info">{selectedFile.path}</div>
				) : (
					<Dropzone onDrop={onUpload}>
						{({getRootProps, getInputProps, isDragActive}) => (
							<div
								{...getRootProps()}
								className={classNames('dropzone', {
									'dropzone--isActive': isDragActive
								})}>
								<input {...getInputProps()} />
								{isDragActive ? (
									<p>Drop certificates here</p>
								) : (
									<p>
										Try dropping some files here, or click to select files to
										upload
									</p>
								)}
							</div>
						)}
					</Dropzone>
				)}
			</div>
		);
	}
}
