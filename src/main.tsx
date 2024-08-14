import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Импортируем Provider
import store from './redux/store'; // Импортируем store
import App from './App';
import HookForm from './components/HookForm';
import UncontrolledForm from './components/UncontrolledForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/uncontrolled" element={<UncontrolledForm />} />
          <Route path="/hookform" element={<HookForm />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);
