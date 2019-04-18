import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

import Home from "./container/home";
import CompareView from "./container/compareHome";
import BasicDemoHome from "./container/basicDemoHome";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" name="home" component={Home}/>
                <Route path="/compare" name="compare" component={CompareView}/>
                <Route path="/stock" name="stock" component={BasicDemoHome}/>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;
