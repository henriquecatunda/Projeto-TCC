import React from 'react';
import {BrowserRouter, Switch,Route } from "react-router-dom";

import List from "../pages/List/index";
import Login from "../pages/Login/index";

function Routes () {
    return (

    <BrowserRouter>
            <Switch>
                  <Route  path="/list" component={List} exact />
                  <Route  path="/" component={Login} exact />
            </Switch>
    </BrowserRouter>
    );
}

export default Routes;
