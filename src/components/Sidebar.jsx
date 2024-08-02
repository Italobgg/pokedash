import React, { useState } from 'react';
import { Nav, Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Botão para abrir o Sidebar em dispositivos móveis */}
      <Button variant="primary" onClick={handleShow} className="d-md-none">
        ☰
      </Button>

      {/* Sidebar com Offcanvas do Bootstrap */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
            <Nav.Link as={Link} to="/pokemons" onClick={handleClose}>Pokémons</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar visível em dispositivos grandes */}
      <div className="d-none d-md-block bg-light border-right" style={{ width: '250px', height: '100vh', position: 'fixed', top: '0', left: '0' }}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/pokemons">Pokémons</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
