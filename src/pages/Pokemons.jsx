import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pokemonsPerPage = 9;
  const [allPokemons, setAllPokemons] = useState([]);
  const [totalLoaded, setTotalLoaded] = useState(0);

  useEffect(() => {
    const fetchPokemons = async (page) => {
      setLoading(true);
      try {
        const offset = (page - 1) * pokemonsPerPage;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`);
        const detailedPokemons = await Promise.all(response.data.results.map(async pokemon => {
          const pokemonDetail = await axios.get(pokemon.url);
          return {
            name: pokemonDetail.data.name,
            image: pokemonDetail.data.sprites.front_default,
            types: pokemonDetail.data.types.map(typeInfo => typeInfo.type.name)
          };
        }));
        setPokemons(detailedPokemons);
        setTotalPages(Math.ceil(response.data.count / pokemonsPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar Pokémons:', error);
        setLoading(false);
      }
    };

    fetchPokemons(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      let offset = 0;
      let totalPokemons = [];
      try {
        while (offset < 1000) {  // Limite de 1000 Pokémons
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=200&offset=${offset}`);
          const detailedPokemons = await Promise.all(response.data.results.map(async pokemon => {
            const pokemonDetail = await axios.get(pokemon.url);
            return {
              name: pokemonDetail.data.name,
              image: pokemonDetail.data.sprites.front_default,
              types: pokemonDetail.data.types.map(typeInfo => typeInfo.type.name)
            };
          }));
          totalPokemons = [...totalPokemons, ...detailedPokemons];
          offset += 200;
        }
        setAllPokemons(totalPokemons);
        setTotalLoaded(totalPokemons.length);
      } catch (error) {
        console.error('Erro ao buscar todos os Pokémons:', error);
      }
    };

    fetchAllPokemons();
  }, []);

  const filteredPokemons = allPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <Container>
      <h1 className="my-4">Pokémons</h1>
      <Form.Group controlId="search">
        <Form.Control className='my-2'
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Row>
            {searchTerm ? (
              filteredPokemons.slice(0, 9).map(pokemon => (
                <Col key={pokemon.name} md={4} className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={pokemon.image} />
                    <Card.Body>
                      <Card.Title>{pokemon.name}</Card.Title>
                      <Card.Text>
                        Tipos: {pokemon.types.join(', ')}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              pokemons.map(pokemon => (
                <Col key={pokemon.name} md={4} className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={pokemon.image} />
                    <Card.Body>
                      <Card.Title>{pokemon.name}</Card.Title>
                      <Card.Text>
                        Tipos: {pokemon.types.join(', ')}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          {!searchTerm && (
            <div className="d-flex justify-content-between my-3">
              <Button variant="primary" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Anterior
              </Button>
              <Button variant="primary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Próximo
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Pokemons;
