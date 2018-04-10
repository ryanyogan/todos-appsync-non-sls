import React from 'react';

const Loading = props => (
  <div className="component--loading" style={props.style}>
    <div className="loader" />
    <p>{props.message ? props.message : 'Loading data, please wait...'}</p>
  </div>
);

export default Loading;
