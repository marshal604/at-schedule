import React from 'react';

import Schedule from './modules/schedule/containers/Schedule/Schedule';
import Toolbar from './modules/shared/toolbar/containers/Toolbar/Toolbar';

function App() {
  return (
    <>
      <Toolbar />
      <Schedule />
    </>
  );
}

export default App;
