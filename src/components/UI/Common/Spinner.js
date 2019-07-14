import React from 'react';
import spinner from '../../../../img/loading.gif';

const Spinner = (props) => (
  <div className="spinner" style={{display: 'flex', justifyContent: 'center', height: (props.height ? `${props.height}px` : 40)}}>
    <img alt="loading" src={spinner} width={(props.width || 40)} height={(props.height || 40)}/>
  </div>
);

export default Spinner;
