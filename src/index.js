import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from './Context/AuthContext';
import App from "./Components/App";

ReactDOM.createRoot(document.getElementById('root')).render(<AuthProvider><App /></AuthProvider>);
