import React, { useState } from "react";
import "./pokemon-styles.css";

async function getPokemon(endpoint, id) {
  const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}/${id}/`);
  const data = await response.json();
  return data;
}

// console.log(speech);

function CardPokemon() {
  const [pokemon, setPokemon] = useState({
    name: "",
    imageFront: "",
    imageBack: "",
    id: "",
    types: [],
    abilities: [],
  });
  const [value, setValue]= useState('')
  const [ability, setAbility] = useState('')
 
  async function handleSubmit(event) {
    event.preventDefault();
    
    
    const pokemon = await getPokemon("pokemon", value);
    const otherData = await getPokemon("pokemon-species", value);

    const description = otherData.flavor_text_entries.find(
      (flavor) => flavor.language.name === "es"
    );

    setAbility(description)

    setPokemon({
      name: pokemon.name,
      imageFront: pokemon.sprites.front_default,
      imageBack: pokemon.sprites.back_default,
      id: pokemon.id,
      types: pokemon.types,
      abilities: pokemon.abilities,
    });
  }

  return (
    <div className="wrapper">
      <div className="pokedex-container">
        <div className="pokedex">
          <div className="top-circles">
            <p className="circle-icon"></p>
            <p className="icon-red"></p>
            <p className="icon-yellow"></p>
          </div>
          <div className="information-pokemon">
            <div className="pokemon-container">
              <div className="image-pokemon"  id="#poke-screen">
                <h1 className="name-pokemon">{pokemon.name}</h1>
                {pokemon.imageFront ? (
                  <div className="image-group">
                    <img className="image" src={pokemon.imageFront} alt="" />
                    <img className="image" src={pokemon.imageBack} alt="" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="search-pokemon-input">
            <form className="form" action="" onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                placeholder="Son 898 pokemones"
                autoComplete="off"
                onChange={(e)=> setValue(e.target.value)}
              />
              <button className="btn">Buscar</button>
            </form>
          </div>
          <div className="decoration">
            <p className="d-1"></p>
            <p className="d-2"></p>
            <p className="d-3"></p>
          </div>
          <div className="poke-info">
         
              <p className="description">
                {ability.flavor_text}
              </p>
              <div className="abilities-pokemon">
                <div className="data-result">
                <h4>Habilidades del Pokemon</h4>
                  {pokemon.abilities.map((ability) => {
                    return <li className="type">{ability.ability.name}</li>;
                  })}
                </div>
                {pokemon.types ? (
                  <div className="types-pokemon">
                    <h4>Tipo de pokemon</h4>
                    {pokemon.types.map((type) => {
                      return <li className="type">{type.type.name}</li>;
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPokemon;