import React from 'react';

export default class LabelledBox extends React.Component {
  render() {
    const { title, children, style } = this.props;

    return (
      <div className="form-group" style={style}>
        <label>{title}</label>
        {children}
      </div>
    );
  }
}
