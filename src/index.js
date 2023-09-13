import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './store/Context';
import Context from './store/Context'; 

import { firebaseApp } from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ firebaseApp }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
