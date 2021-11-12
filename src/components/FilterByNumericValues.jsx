import React, { useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

export default function FilterByNumericValues() {
  const {
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
  } = useContext(SearchPlanetsContext);

  const handleFilter = () => {
    let filteredPlanets;
    if (comparison === 'menor que') {
      filteredPlanets = planets
        .filter((dado) => Number(dado[column]) < Number((value)));
    }
    if (comparison === 'maior que') {
      filteredPlanets = planets
        .filter((dado) => Number(dado[column]) > Number(value));
    }
    if (comparison === 'igual a') {
      filteredPlanets = planets
        .filter((dado) => Number(dado[column]) === Number(value));
    }
    setPlanets(filteredPlanets);
  };

  const handleClick = () => {
    setFilter({
      ...filter,
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
    </form>
  );
}
