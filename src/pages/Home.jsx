import React from 'react';
import { Container } from 'react-bootstrap';
import PokemonOverview from "../components/PokemonOverview"; // Verifique o caminho
import PokemonTypeDistribution from "../components/PokemonTypeDistribution"; // Verifique o caminho

const Home = () => (
  <Container>
    <h1>Bem-vindo ao Pokémon Dashboard!</h1>
    <p>Aqui você pode ver informações sobre Pokémons e muito mais.</p>

    <PokemonOverview />
    <PokemonTypeDistribution />

  </Container>
);

export default Home;
