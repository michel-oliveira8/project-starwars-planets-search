import React, { useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

export default function AddRemoveFilter() {
  const { filter: { filters: { filterByNumericValues } },
    removeFilter } = useContext(SearchPlanetsContext);

  return (
    <div>
      {filterByNumericValues.map((item, index) => (
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
  );
}
