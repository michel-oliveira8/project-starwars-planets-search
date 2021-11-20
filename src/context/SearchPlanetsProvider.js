import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanetSearch from '../services/fetchApi';
import SearchPlanetsContext from './SearchPlanetsContext';

const SearchPlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [select, setSelect] = useState({
    population: '',
    orbital_period: '',
    diameter: '',
    rotation_period: '',
    surface_water: '',
  });
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  const { filters: { filterByNumericValues } } = filter;
  console.log(filterByNumericValues);

  const fetchData = async () => {
    const { results } = await getPlanetSearch();
    setPlanets(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    console.log(filterByNumericValues);
    let filteredPlanets = planets;
    if (filterByNumericValues[filterByNumericValues.length - 1].comparison === 'menor que') {
      filteredPlanets = planets
        .filter((dado) => Number(dado[filterByNumericValues[filterByNumericValues.length - 1].column]) < Number((filterByNumericValues[filterByNumericValues.length - 1].value)));
    }
    if (filterByNumericValues[filterByNumericValues.length - 1].comparison === 'maior que') {
      filteredPlanets = planets
        .filter((dado) => Number(dado[filterByNumericValues[filterByNumericValues.length - 1].column]) > Number(filterByNumericValues[filterByNumericValues.length - 1].value));
    }
    if (filterByNumericValues[filterByNumericValues.length - 1].comparison === 'igual a') {
      filteredPlanets = planets
        .filter((dado) => Number(dado[filterByNumericValues[filterByNumericValues.length - 1].column]) === Number(filterByNumericValues[filterByNumericValues.length - 1].value));
    }
    setPlanets(filteredPlanets);

    if (filterByNumericValues[filterByNumericValues.length - 1].column === 'population') {
      setSelect({
        ...select,
        population: 'clickPopulation',
      });
    }

    if (filterByNumericValues[filterByNumericValues.length - 1].column === 'orbital_period') {
      setSelect({
        ...select,
        orbital_period: 'clickOrbital',
      });
    }
    if (filterByNumericValues[filterByNumericValues.length - 1].column === 'diameter') {
      setSelect({
        ...select,
        diameter: 'clickDiameter',
      });
    }
    if (filterByNumericValues[filterByNumericValues.length - 1].column === 'rotation_period') {
      setSelect({
        ...select,
        rotation_period: 'clickRotation',
      });
    }
    if (filterByNumericValues[filterByNumericValues.length - 1].column === 'surface_water') {
      setSelect({
        ...select,
        surface_water: 'clickSurface',
      });
    }
  };

  const context = {
    planets,
    setPlanets,
    filter,
    setFilter,
    select,
    handleFilter,
  };

  return (
    <SearchPlanetsContext.Provider value={ context }>
      { children }
    </SearchPlanetsContext.Provider>
  );
};

SearchPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchPlanetsProvider;
