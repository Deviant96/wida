import React from 'react';
import { Provider } from 'react-redux';
import InvoicesPage from './pages/InvoicesPage';
import store from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <InvoicesPage />
    </Provider>
  );
};

export default App;
