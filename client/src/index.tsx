import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';

import Login from './views/login';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// const render = () => {
//   const App = require('./App').default;

//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     document.getElementById('root')
//   );
// };

// render();

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./app/App', render);
// }
