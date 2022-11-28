import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "./redux/app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      // domain="dev-4hixku625rb7v8m8.us.auth0.com"
      domain={process.env.REACT_APP_DOMAIN}
      // clientId="8PW18rqeRhlkuTLpxgtEcLPwEKeO0qwG"
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
      // redirectUri="http://localhost:3000/home"
      useRefreshTokens={true}
      cacheLocation="localstorage"
      // audience="https://cattle-tracker-api.com"
      audience={REACT_APP_JWT_AUDIENCE}
      // scope="read:current_user update:current_user_metadata"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
