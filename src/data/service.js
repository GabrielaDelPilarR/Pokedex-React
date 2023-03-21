export const getPokemon = async (state,id)=>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await response.json()
    state(data) 
}

export const getAbility = async (state,id)=>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    const data = await response.json()
    state(data) 
}

export const getData = async (state)=>{
    const response = await fetch(`https://dummyjson.com/products`)
    const data = await response.json()
     return state(data) 
}