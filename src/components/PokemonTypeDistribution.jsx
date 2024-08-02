import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PokemonTypeDistribution = () => {
  const [typeDistribution, setTypeDistribution] = useState([]);

  useEffect(() => {
    const fetchTypeDistribution = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const types = response.data.results;
        const typeCounts = await Promise.all(types.map(async (type) => {
          const pokemonResponse = await axios.get(type.url);
          return { type: type.name, count: pokemonResponse.data.pokemon.length };
        }));
        setTypeDistribution(typeCounts);
      } catch (error) {
        console.error('Erro ao buscar a distribuição dos tipos:', error);
      }
    };

    fetchTypeDistribution();
  }, []);

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6F61', 
    '#8A2BE2', '#5F9B9F', '#FF4500', '#2E8B57', '#FFD700', 
    '#6A5ACD', '#D2691E', '#00FA9A', '#FF1493', '#1E90FF', 
    '#F08080', '#32CD32', '#ADFF2F', '#20B2AA', '#FF6347'
  ];
  
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center">Distribuição por Tipo</h2>
          <div className="my-5 d-flex justify-content-center">
            <div>
              <PieChart width={550} height={450}>
                <Pie
                  data={typeDistribution}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonTypeDistribution;
