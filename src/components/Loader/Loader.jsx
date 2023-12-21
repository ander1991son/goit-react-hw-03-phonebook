import React from 'react';

const Loader = ({ isLoading }) => {
  return <div className="loader">{isLoading && 'Loading...'}</div>;
};

export default Loader;
