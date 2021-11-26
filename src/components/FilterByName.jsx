import React, { useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

export default function FilterByName() {
  const { filter, setFilter, planets, setData } = useContext(SearchPlanetsContext);

  const handleChange = ({ target }) => {
    setFilter({
      ...filter,
      filters: {
        ...filter.filters,
        FilterByName: {
          name: target.value,
        },
      },
    });
    const filterPlanetsByName = planets.filter((item) => (
      item.name.toLowerCase().includes(target.value)));
    setData(filterPlanetsByName);
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
