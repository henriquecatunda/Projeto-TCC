import React from 'react';
import {BrowserRouter, Switch,Route } from "react-router-dom";

import List from "../pages/ListView/index";
import Login from "../pages/LoginView/index";

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
