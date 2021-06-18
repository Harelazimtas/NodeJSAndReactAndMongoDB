import "./App.module.css";
import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "./router/Navbar";
import Block from "./blockchain/block.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hash from "./hash/hash";

function App() {
  const callAPI = () => {
    axios
      .get("http://localhost:3030/getAll")
      .then((res) => {})
      .catch((error) => console.log(error));
  };
  //after render to DOM
  useEffect(() => {
    callAPI();
  }, []);

  return (
    <Router>
      <div>
        <Navbar listCityName={[]} />
        <Switch>
          <Route path="/somePage">some page 1</Route>
          <Route path="/block">
            <Block></Block>
          </Route>
          <Route path="/hash">
            <Hash></Hash>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
