import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/Home'
import ViewResultsPage from './containers/ViewResults'
import WordDisplayPage from './containers/WordDisplay'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/worddisplay" component={WordDisplayPage}/>
    <Route path="/viewresults" component={ViewResultsPage}/>
  </Route>
);
