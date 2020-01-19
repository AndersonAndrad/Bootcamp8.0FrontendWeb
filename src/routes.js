// dependencies
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// pages
import Main from './pages/Main/index';
import Repository from './pages/Reporitory/index';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Main} ></Route>
        <Route path='/repository' component={Repository} ></Route>
      </Switch>
    </BrowserRouter>
  );
}
