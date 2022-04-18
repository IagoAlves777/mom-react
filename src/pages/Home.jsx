import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h3>O que você deseja acessar?</h3>
      <div className='section'>
        <Link to={'/sensor'}>
          <Button variant="outline-primary">SENSOR</Button>
        </Link>
        <Link to={'/client'}>
          <Button variant="outline-danger">CLIENTE</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
