import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import raw from 'raw.macro';

import Main from '../layouts/Main';
import ContactIcons from '../components/Contact/ContactIcons';

// uses babel to load contents of file
const markdown = raw('../data/contact.md');

// Make all hrefs react router links
const LinkRenderer = ({ ...children }) => <Link {...children} />;

const Contact = () => (
  <Main
    title="Contact"
    description="Contact luminosity_altvr"
  >
    <article className="post markdown" id="contact">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/contact">Contact</Link></h2>
        </div>
      </header>
      <ReactMarkdown
        source={markdown}
        renderers={{
          Link: LinkRenderer,
        }}
        escapeHtml={false}
      />
      <ContactIcons />
    </article>
  </Main>
);

export default Contact;
