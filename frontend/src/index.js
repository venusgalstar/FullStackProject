import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./App"
import store from "./store/index"

import { Provider } from 'react-redux';
import { ParallaxProvider } from "react-scroll-parallax";
import { ToastContainer } from "react-toastify";

window.store = store;


ReactDOM.render(
    <Provider store={store}>
        <ParallaxProvider>
            <ToastContainer />
            <App />
        </ParallaxProvider>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
