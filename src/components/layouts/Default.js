import React from 'react';
import Header from '../common/Header';

const DefaultLayout = props => (
  <div className="layout--default">
    <Header />

    <div className="content">{props.children}</div>
  </div>
);

export default DefaultLayout;
