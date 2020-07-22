import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { PortfolioListPage } from './pages/portfolio/portfolioListPage/PortfolioListPage';
import { PortfolioPage } from './pages/portfolio/portfolioPage/PortfolioPage';
import { PageLayout } from './pages/PageLayout';
import './App.css';

function App() {
  return (
    <Router>
      <PageLayout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/portfolioList" /> 
          </Route>

          <Route exact path="/portfolioList">
            <PortfolioListPage />
          </Route>

          <Route path="/portfolioList/:id">
            <PortfolioPage />
          </Route>
        </Switch>

      </PageLayout>
    </Router>
  );
}

export default App;
