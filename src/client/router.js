import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./container/home";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" name="home" component={Home}/>
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
