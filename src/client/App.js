import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import AppStore from './store';
import AppRouter from './router';
import Home from './container/home';

class App extends React.Component {
  render () {
    return (
      <Provider store={AppStore}>
        <IntlProvider locale="en">
          <Home/>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
