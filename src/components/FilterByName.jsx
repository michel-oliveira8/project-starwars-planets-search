import React, { useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

export default function FilterByName() {
  const { filter, setFilter } = useContext(SearchPlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setFilter({
      ...filter,
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  };

  return (
    <form>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          id="name"
          data-testid="name-filter"
          placeholder="Digite o nome"
          onChange={ handleChange }
        />
      </label>
    </form>
  );
}
