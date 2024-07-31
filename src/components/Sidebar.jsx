import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = () => (
  <nav className="bg-dark sidebar ">
    <Nav className="flex-column p-3">
      <Nav.Link as={NavLink} to="/" end>
        Home
      </Nav.Link>
      <Nav.Link as={NavLink} to="/pokemons">
        Pokémons
      </Nav.Link>
      <Nav.Link as={NavLink} to="/about">
        Sobre
      </Nav.Link>
    </Nav>
  </nav>
);

export default Sidebar;
