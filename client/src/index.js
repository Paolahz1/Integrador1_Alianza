import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Este es el enfoque más tradicional y ampliamente utilizado para renderizar un componente en el DOM

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
