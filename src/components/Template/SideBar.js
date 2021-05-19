import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/avatar.png`} alt="" />
      </Link>
      <header>
        <h2>luminosity_altvr</h2>
        <p><a href="mailto:johnsonyuehit@gmail.com">johnsonyuehit@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, this is Luminosity@<a href="https://altvr.com/">AltspaceVR</a></p>
      <p>I make toys in AltspaceVR with Microsoft&apos;s <a href="https://github.com/microsoft/mixed-reality-extension-sdk">MRE SDK</a>.</p>
    </section>

    <section id="footer">
      <ContactIcons />
    </section>
  </section>
);

export default SideBar;
