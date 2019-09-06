import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./container/home";
import Main from "./container/main";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact name="main" component={Main} />
        <Route path="/home" name="home" component={Home} />
        <Route path="/compare" name="compare" component={Home} />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
