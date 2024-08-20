import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Scrollbars } from 'react-custom-scrollbars-2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Scrollbars 
      style={{ width: '100%', height: '100vh' }} 
      autoHide 
      autoHideTimeout={1000} 
      autoHideDuration={200}
      thumbSize={300}
      renderThumbVertical={props => <div {...props} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '4px' }} />}
    >
      <App />
    </Scrollbars>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
