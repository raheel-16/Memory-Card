import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [randomArray, setRandomArray] = useState([]);
  const [prevClickedPokemon, setPrevClickedPokemon] = useState(null);

  const url = 'https://pokeapi.co/api/v2/pokemon';

  const fetchData = async () => {
    try {
      const requests = Array.from({ length: 8 }, (_, index) =>
        fetch(`${url}/${index + 1}`).then(response =>
          response.json()
        )
      );
      const pokemonData = await Promise.all(requests);
      setPokemons(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const randomizeArray = [...pokemons].sort(() => 0.5 - Math.random());
    setRandomArray(randomizeArray.slice(0, 8));
  }, [pokemons]);

  const shuffleCards = () => {
    const randomizeArray = [...pokemons].sort(() => 0.5 - Math.random());
    setRandomArray(randomizeArray.slice(0, 8));
  };

  const onClick = (pokemon) => {
    if (prevClickedPokemon === null) {
      setPrevClickedPokemon(pokemon);
    } else {
      if (prevClickedPokemon.name === pokemon.name) {
        setCount(count + 1); 
      } else {
        setCount(0); 
      }
      
      setPrevClickedPokemon(null);
    }
    shuffleCards(); 
  };
  

  return (
    <>
      <div className='header'>
        <h1>Pokemon Memory Game</h1>
        <p>Score: {count}</p>
        <p>Best Score: {count}</p>
      </div>

      <div className="card-grid">
        {randomArray.map((pokemon, index) => (
          <button onClick={() => onClick(pokemon)} className="card" key={index}>
            <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
