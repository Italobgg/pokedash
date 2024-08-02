import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';

const PokemonOverview = () => {
  const [totalPokemons, setTotalPokemons] = useState(null);

  useEffect(() => {
    const fetchTotalPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        setTotalPokemons(response.data.count);
      } catch (error) {
        console.error('Erro ao buscar o total de Pokémons:', error);
      }
    };

    fetchTotalPokemons();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card className="my-4">
            <Card.Body>
              <Card.Title>Número Total de Pokémons</Card.Title>
              <Card.Text>
                {totalPokemons !== null ? totalPokemons : 'Carregando...'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonOverview;
