import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import AppStore from './store';
import AppRouter from './router';

class App extends React.Component {
  render () {
    return (
      <Provider store={AppStore}>
        <IntlProvider locale="en">
          <AppRouter/>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
