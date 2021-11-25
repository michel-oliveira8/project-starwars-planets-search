import React, { useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

export default function SortFilter() {
  const { planets,
    setPlanets,
    orderSort,
    setOrderSort,
    filter,
    setFilter,
    orderASC,
    setOrderASC } = useContext(SearchPlanetsContext);

  const compareNumberStrings = (a, b) => {
    const menosUm = -1;
    // Lógica inpirada no Pull Request de Kelvin Weverton
    // link https://github.com/tryber/sd-014-a-project-starwars-planets-search/pull/121/commits/509d50dfbabd2985be63b301f55424405fe5b8aa
    if (!Number.isNaN(parseInt(a, 10))) {
      if (Number(a) > Number(b)) {
        return 1;
      }
      if (Number(a) < Number(b)) {
        return menosUm;
      }
      return 0;
    }
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return menosUm;
    }
    return 0;
  };

  const handleSort = () => {
    if (orderASC === 'ASC') {
      const sortPlanets = planets
        .sort((a, b) => compareNumberStrings(a[orderSort], b[orderSort]));
      setPlanets(sortPlanets);
    }

    if (orderASC === 'DESC') {
      const sortPlanets = planets
        .sort((a, b) => compareNumberStrings(b[orderSort], a[orderSort]));
      setPlanets(sortPlanets);
    }
  };

  const handleClick = () => {
    setFilter({
      ...filter,
      order: {
        orderSort,
        orderASC,
      },
    });
    handleSort();
  };

  return (
    <form>
      <select
        data-testid="column-sort"
        onChange={ ({ target: { value } }) => setOrderSort(value) }
      >
        <option value="name">name</option>
        <option value="rotation_period">rotation_period</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="climate">climate</option>
        <option value="gravity">gravity</option>
        <option value="terrain">terrain</option>
        <option value="surface_water">surface_water</option>
        <option value="population">population</option>
        <option value="films">films</option>
        <option value="created">created</option>
        <option value="edited">edited</option>
        <option value="url">url</option>
      </select>
      <label htmlFor="inputASC">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          value="ASC"
          name="sort"
          id="inputASC"
          onChange={ ({ target: { value } }) => setOrderASC(value) }
        />
        Ascendente
      </label>
      <label htmlFor="inputDESC">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          name="sort"
          id="inputDESC"
          onChange={ ({ target: { value } }) => setOrderASC(value) }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </form>
  );
}
