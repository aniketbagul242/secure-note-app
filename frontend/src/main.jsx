
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <BrowserRouter>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >

        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StoreContextProvider>

);
