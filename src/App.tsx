import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Send from "./Send";
import Receive from "./Receive";
import HowTo from "./HowTo";

export interface FileModel {
  name: string,
  contents: any
}

export const BEGIN_MESSAGE = "begin";

export default function App() {
  return (
    <div className="App">
      <a className="github-fork-ribbon" href="https://zippy.cool" data-ribbon="Our other app: Zippy!" title="Our other app: Zippy!">Our other app: Zippy!</a>
      <div className="App-header">
        <Router>
          <Switch>
            <Route path="/id/:senderId" component={Receive}>
            </Route>
            <Route path="/howto">
              <HowTo />
            </Route>
            <Route path="/">
              <Send />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}