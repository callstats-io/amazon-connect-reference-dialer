import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

import Home from "./container/home";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" name="home" component={Home}/>
                <Route path="/compare" name="compare" component={Home}/>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;
