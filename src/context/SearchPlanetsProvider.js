import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanetSearch from '../services/fetchApi';
import SearchPlanetsContext from './SearchPlanetsContext';

const SearchPlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  });
  const [orderSort, setOrderSort] = useState('name');
  const [orderASC, setOrderASC] = useState('ASC');

  const fetchData = async () => {
    const { results } = await getPlanetSearch();
    const menosUm = -1;
    setPlanets(results.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return menosUm;
      }
      return 0;
    }));
    setData(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeFilter = (target) => {
    const removeCollumn = filter.filters.filterByNumericValues
      .filter((item) => item.column !== target);
    setFilter({
      ...filter,
      filters: {
        ...filter.filters,
        filterByNumericValues: removeCollumn,
      },
    });
    setData(planets);
  };

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
    orderSort,
    setOrderSort,
    orderASC,
    setOrderASC,
    removeFilter,
    data,
    setData,
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
