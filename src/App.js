import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Axios from "./axios";



const App = () => {
  return (
      <>
      <BrowserRouter>
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={Axios} />
          </Switch>
        </div>
        </BrowserRouter>
      </>
    );
};

export default  App;