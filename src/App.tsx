import React from 'react';

import Schedule from './modules/schedule/containers/Schedule/Schedule';
import Toolbar from './modules/shared/toolbar/containers/Toolbar/Toolbar';

function App() {
  return (
    <div>
      <Toolbar />
      <Schedule />
    </div>
  );
}

export default App;
