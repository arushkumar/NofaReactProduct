import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { basicReduxStore } from "./reduxStore";

import registerServiceWorker from './registerServiceWorker';

const AppProvider = () => (
  <Provider store={basicReduxStore}>
  <App />
</Provider>
 )
 ReactDOM.render(<AppProvider />, document.querySelector("my-app"));
   registerServiceWorker();
