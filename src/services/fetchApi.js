const getPlanetSearch = async () => {
  const results = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
  return results;
};

export default getPlanetSearch;

// usado como referencia um repositório das aulas ao vivo disponível em: https://github.com/tryber/sd-14a-live-lectures/blob/lecture/15.4/Redux/iss-location/src/services/issAPI.js
