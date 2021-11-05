import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanetSearch from '../services/fetchApi';
import SearchPlanetsContext from './SearchPlanetsContext';

const SearchPlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  const fetchData = async () => {
    const { results } = await getPlanetSearch();
    setPlanets(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const context = {
    planets,
    setPlanets,
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
