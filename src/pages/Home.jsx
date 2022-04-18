import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap' 

import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Link to={'/sensor'}>
        <Button variant="outline-dark">
          SENSOR
        </Button>
      </Link>
      <Link to={'/client'}>
      <Button variant="outline-dark">
          CLIENTE
        </Button>
      </Link>
    </div>
  );
};

export default Home;
