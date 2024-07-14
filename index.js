import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from './Book-Blog/frontend/src/Context/AuthContext';
import App from "./Book-Blog/frontend/src/Components/App";

ReactDOM.createRoot(document.getElementById('root')).render(<AuthProvider><App /></AuthProvider>);
