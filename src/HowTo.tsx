import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import Footer from './Footer';

const HowTo = () => {
  return (
  <>
    <h1>How to use <Link to="/"><img src={logo} className="App-logo-small" alt="Adhoc" style={{marginBottom: -40}} /></Link></h1>
    <ol>
      <li>
        Click the button to generate a link.
      </li>

      <li>
        Click the button to copy the link.
      </li>

      <li>
        Send the link to the other caller.
      </li>

      <li>
        Wait for them to start the call.
      </li>
    </ol>
    <Footer />
  </>
  );
}

export default HowTo;
