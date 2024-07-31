import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5'); // Ajuste o limite conforme necessário
        setPokemons(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar Pokémons:', error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Pokémons</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Row>
          {pokemons.map((pokemon) => (
            <Col key={pokemon.name} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{pokemon.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Pokemons;
