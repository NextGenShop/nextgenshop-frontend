import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import App from '../App';

jest.mock('../store');
jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('../index.js');
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      div
    );
  });
});
