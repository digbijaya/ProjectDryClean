import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Initial from "./components/layout/Initial";
import Receive from "./components/orders/Receive";
import Deliver from "./components/orders/Deliver";
import "./App.css";

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
              <Route exact path="/orderreceive" component={Receive} />
              <Route exact path="/orderdeliver" component={Deliver} />
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
