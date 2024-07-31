import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const AppNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="#home">Pokémon Dashboard</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/pokemons">Pokémons</Nav.Link>
      <Nav.Link href="/about">Sobre</Nav.Link>
    </Nav>
  </Navbar>
);

export default AppNavbar;
