import axios from 'axios';
import { PokemonAPIResponse, PokemonDetails } from '~/types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const api = axios.create({
  baseURL: BASE_URL
});

export const fetchPokemons = async (url: string): Promise<PokemonAPIResponse> => {
    try {
      const response = await api.get<PokemonAPIResponse>(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching pokemons: ", error);
      throw new Error('Failed to fetch data');
    }
};

export const fetchPokemonDetails = async (id: string): Promise<PokemonDetails> => {
    try {
      const response = await api.get<PokemonDetails>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pokemon details: ", error);
      // Decide on handling: throw an error, return null, or return a default object
      throw new Error('Failed to fetch pokemon details');
    }
};