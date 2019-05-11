import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Page_1 from './WelcomePage';
import Page_2 from './PlansPage';
import Page_3 from './CheckoutPage';

function Index() {
  return <h2>Home</h2>;
}

function Plans() {
  return <h2>Plans</h2>;
}

function App() {
  return (

    <Router>
    <div className='App'>
        <div className='header'>
            <nav>
                <ul>
                    <li>
                    About
                    </li>
                    <li>
                    Settings
                    </li>
                    <li>
                     Login
                    </li>
                </ul>
            </nav>
        </div>
    <div>
    <Route path="/" exact component={Page_1} />
    <Route path="/page_2/" component={Page_2} />
    <Route path="/page_3/" component={Page_3} />
    </div>
    </div>
    </Router>
  );
}

export default App;
