import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={"Michael D'Angelo's personal website. New York based Stanford ICME graduate, "
    + 'co-founder and CTO of Arthena, and YC Alumni.'}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">About this site</Link></h2>
          <p>
            template by <a href="https://github.com/mldangelo/personal-site">mldangelo</a>
          </p>
        </div>
      </header>
      <p> Hi, this is Luminosity@AltspaceVR,
        check out my <Link to="/mres">MREs</Link>,
        <Link to="/worlds">worlds</Link>, {' '}
        <Link to="/kits">kits</Link>, {' '}
        or <Link to="/contact">contact</Link> me.
      </p>
    </article>
  </Main>
);

export default Index;
