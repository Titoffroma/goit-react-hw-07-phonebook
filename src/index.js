import React from 'react';
import ReactDOM from 'react-dom';
// import './server';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import 'material-design-icons/iconfont/material-icons.css';
import App from './components/App/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
