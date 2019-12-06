import React from 'react';
import { Route } from 'react-router-dom';
import Reader from '../Reader/Reader';

import publications from '../Reader/publications.json';

const App = () => {
  return (
    <>
      <Route
        path="/"
        render={props => <Reader {...props} items={publications} />}
      />
    </>
  );
};

export default App;
