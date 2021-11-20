import React, { useContext, useState } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

export default function FilterByNumericValues() {
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  const {
    filter,
    setFilter,
    handleFilter,
    select,
  } = useContext(SearchPlanetsContext);

  // const { filters: { filterByNumericValues } } = filter;

  // useEffect(() => {
  //   console.log('olaaaaaaaaaa');
  //   return () => {
  //     handleFilter();
  //   };
  // }, [handleFilter, filterByNumericValues]);

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

  const removeFilter = (target) => {
    const removeCollumn = filter.filters.filterByNumericValues
      .filter((item) => item.column !== target);
    setColumn(removeCollumn);
    setFilter({
      ...filter,
      filters: {
        ...filter.filters,
        filterByNumericValues: removeCollumn,
      },
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="column">
          <select
            id="column"
            name="column"
            data-testid="column-filter"
            value={ column }
            onChange={ ({ target: { value } }) => setColumn(value) }
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
            onChange={ ({ target: { value } }) => setComparison(value) }
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
            onChange={ ({ target: { value } }) => setValue(value) }
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
      <div>
        {filter.filters.filterByNumericValues.map((item, index) => (
          <div key={ index } data-testid="filter">
            <span>{`${item.column} ${item.comparison} ${item.value}`}</span>
            <button
              type="button"
              onClick={ () => removeFilter(item.column) }
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
