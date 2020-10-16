import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/index';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { store } from "./helpers";
import "./assets/css/main.scss";
import './assets/fonts/icomoon/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let env = process.env

// if(process.env !== 'staging')
//     console.log = () => {}

ReactDOM.render(
    <Fragment>
        <Provider store={store}>
                <Routes />
        </Provider>
        <ToastContainer position="top-right"/>
    </Fragment>
,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
