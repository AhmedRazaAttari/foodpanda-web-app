import React from 'react';
import { Router, Route, } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Home from '../component/HomePage';
import Login from '../component/Login';
import Signup from "../component/Signup";


const customHistory = createBrowserHistory();

//Routes for Navigation
const MyRoutes = () => (
    <Router history={customHistory}>
        <div>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/Login' component={Login}></Route>
            <Route exact path='/Signup' component={Signup}></Route>
        </div>
    </Router>
)

export default MyRoutes;