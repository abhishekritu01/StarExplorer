'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

const CharacterList = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [favorites, setFavorites] = useState<string[]>(
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favorites') || '[]') : []
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/?page=${page}`)
            .then((response) => {
                setCharacters(response.data.results);
                setError(null);
            })
            .catch((err) => {
                setError('Failed to fetch characters');
                console.error(err);
            });
    }, [page]);

    const handleFavorite = (character: Character) => {
        const updatedFavorites = [...favorites];
        if (favorites.includes(character.name)) {
            const index = updatedFavorites.indexOf(character.name);
            updatedFavorites.splice(index, 1);
        } else {
            updatedFavorites.push(character.name);
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    console.log(characters);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Character List</h1>
            <div className="flex justify-end mb-4 gap-4">
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.length === 0 ? (
                    <p>No characters found.</p>
                ) : (
                    characters.map((character) => {
                        const id = character.url.split('/').filter(Boolean).pop(); // Extract the ID from the URL
                        return (
                            <div key={character.name} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
                                <div className="p-4">
                                    <Link href={`/character/${id}`}>
                                        <p className="text-lg font-semibold hover:underline cursor-pointer">
                                            {character.name}
                                        </p>
                                    </Link>
                                    <div className="mt-2 text-sm text-gray-300">
                                        <p><strong>Description:</strong></p>
                                        <p>
                                            {`${character.name} (${character.gender}), ${character.height}, ${character.mass}, ${character.hair_color}, ${character.skin_color}, ${character.eye_color}`}
                                        </p>
                                    </div>
                                    <button
                                        className={`mt-2 px-4 py-1 rounded-full ${favorites.includes(character.name) ? 'bg-red-500 hover:bg-red-700' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500'} text-white`}
                                        onClick={() => handleFavorite(character)}
                                        aria-label={favorites.includes(character.name) ? 'Unfavorite' : 'Favorite'}
                                    >
                                        {favorites.includes(character.name) ? 'Unfavorite' : 'Favorite'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="flex justify-between mt-4">
                {/* <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    disabled={page === 1}
                >
                    Previous
                </button> */}
                <p className="text-gray-400 p-2">Page {page}</p>
                {/* <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button> */}
            </div>
        </div>
    );
};

export default CharacterList;

