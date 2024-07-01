import React from 'react';
import { Provider } from 'react-redux';
import InvoicesPage from './pages/InvoicesPage';
import store from './store/store';
import AppContainer from './components/AppContainer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <InvoicesPage />
      </AppContainer>
    </Provider>
  );
};

export default App;
