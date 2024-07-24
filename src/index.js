import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./globals.styles.js"
import "./components/Background/Background.styles.js"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer theme='light' autoClose={1200} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
