import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanetSearch from '../services/fetchApi';
import SearchPlanetsContext from './SearchPlanetsContext';

const SearchPlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

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
    filter,
    setFilter,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
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
