import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="bg-light border-right" style={{ width: '250px' }}>
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/pokemons">Pokémons</Nav.Link>
      <Nav.Link as={Link} to="/about">About</Nav.Link>
    </Nav>
  </div>
);

export default Sidebar;
