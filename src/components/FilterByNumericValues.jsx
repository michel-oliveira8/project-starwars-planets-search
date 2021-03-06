import React, { useState, useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';
import AddRemoveFilter from './AddRemoveFilter';

export default function FilterByNumericValues() {
  const [select, setSelect] = useState({
    population: '',
    orbital_period: '',
    diameter: '',
    rotation_period: '',
    surface_water: '',
  });

  const {
    filter,
    setFilter,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    data,
    setData,
  } = useContext(SearchPlanetsContext);

  const handleFilter = () => {
    let filteredPlanets;
    if (comparison === 'menor que') {
      filteredPlanets = data
        .filter((dado) => Number(dado[column]) < Number((value)));
    }
    if (comparison === 'maior que') {
      filteredPlanets = data
        .filter((dado) => Number(dado[column]) > Number(value));
    }
    if (comparison === 'igual a') {
      filteredPlanets = data
        .filter((dado) => Number(dado[column]) === Number(value));
    }
    setData(filteredPlanets);

    if (column === 'population') {
      setSelect({
        ...select,
        population: 'clickPopulation',
      });
    }

    if (column === 'orbital_period') {
      setSelect({
        ...select,
        orbital_period: 'clickOrbital',
      });
    }
    if (column === 'diameter') {
      setSelect({
        ...select,
        diameter: 'clickDiameter',
      });
    }
    if (column === 'rotation_period') {
      setSelect({
        ...select,
        rotation_period: 'clickRotation',
      });
    }
    if (column === 'surface_water') {
      setSelect({
        ...select,
        surface_water: 'clickSurface',
      });
    }
  };

  const handleClick = () => {
    setFilter({
      ...filter,
      filters: {
        ...filter.filters,
        filterByNumericValues: [
          ...filter.filters.filterByNumericValues,
          {
            column,
            comparison,
            value,
          },
        ],
      },
    });
    handleFilter();
  };

  return (
    <form>
      <label htmlFor="column">
        <select
          id="column"
          name="column"
          data-testid="column-filter"
          value={ column }
          onChange={ (item) => setColumn(item.target.value) }
        >
          {select.population !== 'clickPopulation'
           && <option value="population">population</option>}
          {select.orbital_period !== 'clickOrbital'
           && <option value="orbital_period">orbital_period</option>}
          {select.diameter !== 'clickDiameter'
           && <option value="diameter">diameter</option>}
          {select.rotation_period !== 'clickRotation'
           && <option value="rotation_period">rotation_period</option>}
          {select.surface_water !== 'clickSurface'
           && <option value="surface_water">surface_water</option>}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          id="comparison"
          name="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ (item) => setComparison(item.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        <input
          type="text"
          name="value"
          id="value"
          data-testid="value-filter"
          placeholder="Digite o valor"
          value={ value }
          onChange={ (item) => setValue(item.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <AddRemoveFilter />
    </form>
  );
}
