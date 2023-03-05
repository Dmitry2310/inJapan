import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import reducers from "./reducers/index.js";
import "./index.css";
import "./i18next";
import App from "./App";

const store = configureStore({ reducer: reducers }, compose(applyMiddleware(thunk)));

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <Provider store={store}>
        <App />
    </Provider >
);
window.store = store;