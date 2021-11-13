import React, { useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';
import titles from '../data';

export default function Table() {
  const {
    planets,
    filter: { filters: { filterByName: { name } } } } = useContext(SearchPlanetsContext);
  return (
    <table>
      <thead>
        <tr>
          { titles.map((title) => <th key={ title }>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {planets
          .filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
          .map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

// Para contrução da tabela, foi usado como referencia: https://edrodrigues.com.br/blog/criando-tabelas-com-filtros-%E2%80%8B%E2%80%8Busando-react/
