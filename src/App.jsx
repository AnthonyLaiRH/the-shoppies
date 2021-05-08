import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SearchProvider } from './context/search';
import { NominationProvider } from './context/nomination';

import { Home } from './views/Home';

function App () {
  return (
    <SearchProvider>
      <NominationProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </NominationProvider>
    </SearchProvider>
  );
}
export default App;