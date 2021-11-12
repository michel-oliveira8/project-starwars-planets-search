import React from 'react';
import './App.css';
import FilterByName from './components/FilterByName';
import Table from './components/Table';
import FilterByNumericValues from './components/FilterByNumericValues';
import SearchPlanetsProvider from './context/SearchPlanetsProvider';

function App() {
  return (
    <>
      <span>Projeto Star wars - Trybe</span>
      <SearchPlanetsProvider>
        <FilterByName />
        <FilterByNumericValues />
        <Table />
      </SearchPlanetsProvider>
    </>
  );
}

export default App;
