import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Main from './layouts/Main'; // fallback for lazy pages
import Empty from './layouts/Empty'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Mres = lazy(() => import('./pages/Mres'));
const Worlds = lazy(() => import('./pages/Worlds'));
const Kits = lazy(() => import('./pages/Kits'));
const Creators = lazy(() => import('./pages/Creators'));
const Audio = lazy(() => import('./pages/Audio'));
const Mic = lazy(() => import('./pages/Mic'));

const App = () => (
  <BrowserRouter basename={PUBLIC_URL}>
    <Suspense fallback={<Empty />}>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/about" component={About} />
        <Route path="/mres" component={Mres} />
        <Route path="/worlds" component={Worlds} />
        <Route path="/kits" component={Kits} />
        <Route path="/creators" component={Creators} />
        <Route path="/contact" component={Contact} />
        <Route path="/audio" component={Audio} />
        <Route path="/mic" component={Mic} />
        <Route component={NotFound} status={404} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default App;
