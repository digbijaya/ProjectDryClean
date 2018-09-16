import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import store from "./store";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Initial from "./components/layout/Initial";
import Receive from "./components/orders/Receive";
import Deliver from "./components/orders/Deliver";
import Reports from "./components/reports/Reports";
import Login from "./components/auth/login";
import "./App.css";

//check for token's presence
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/initial" component={Initial} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/orderreceive" component={Receive} />
              <Route exact path="/orderdeliver" component={Deliver} />
              <Route exact path="/reports" component={Reports} />
            </div>
            <Footer />
          </div>
          {/* <script>
            if ('serviceWorker' in navigator){" "}
            {window.addEventListener("load", function() {
              navigator.serviceWorker.register("/myservice-worker.js");
            })}
          </script> */}
        </Router>
      </Provider>
    );
  }
}

export default App;
