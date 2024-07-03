// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Link from 'next/link';

// interface Character {
//     name: string;
//     height: string;
//     mass: string;
//     hair_color: string;
//     skin_color: string;
//     eye_color: string;
//     birth_year: string;
//     gender: string;
//     homeworld: string;
//     films: string[];
//     species: string[];
//     vehicles: string[];
//     starships: string[];
//     created: string;
//     edited: string;
//     url: string;
// }

// const CharacterList = () => {
//     const [characters, setCharacters] = useState<Character[]>([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(true);
//     const [favorites, setFavorites] = useState<string[]>(
//         typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favorites') || '[]') : []
//     );
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         setLoading(true);
//         axios.get(`https://swapi.dev/api/people/?page=${page}`)
//             .then((response) => {
//                 setCharacters(response.data.results);
//                 setLoading(false);
//                 setError(null);
//             })
//             .catch((err) => {
//                 setError('Failed to fetch characters');
//                 setLoading(false);
//                 console.error(err);
//             });
//     }, [page]);

//     const handleFavorite = (character: Character) => {
//         const updatedFavorites = [...favorites];
//         if (favorites.includes(character.name)) {
//             const index = updatedFavorites.indexOf(character.name);
//             updatedFavorites.splice(index, 1);
//         } else {
//             updatedFavorites.push(character.name);
//         }
//         setFavorites(updatedFavorites);
//         localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     };


//     console.log('favorites', characters);



//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-8">Character List</h1>
//             <div className="flex justify-end mb-4 gap-4">
//                 <button
//                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
//                     onClick={() => setPage(page > 1 ? page - 1 : 1)}
//                     disabled={page === 1}
//                 >
//                     Previous
//                 </button>
//                 <button
//                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
//                     onClick={() => setPage(page + 1)}
//                 >
//                     Next
//                 </button>
//             </div>
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {loading ? (
//                     <Loader />
//                 ) : (
//                     characters.map((character) => {
//                         const id = character.url.split('/').filter(Boolean).pop(); // Extract the ID from the URL
//                         return (
//                             <div key={character.name} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
//                                 <img
//                                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
//                                     alt={character.name}
//                                     onError={(e) => { e.currentTarget.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-4">
//                                     <Link href={`/character/${id}`}>
//                                         <p className="text-lg font-semibold hover:underline cursor-pointer">
//                                             {character.name}
//                                         </p>
//                                     </Link>
//                                     <div className="mt-2 text-sm text-gray-300">
//                                         <p><strong>Description:</strong></p>
//                                         <p>
//                                             {`${character.name} (${character.gender}), ${character.height}, ${character.mass}, ${character.hair_color}, ${character.skin_color}, ${character.eye_color}`}
//                                         </p>
//                                     </div>
//                                     <button
//                                         className={`mt-2 px-4 py-1 rounded-full ${favorites.includes(character.name) ? 'bg-red-500 hover:bg-red-700' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500'} text-white`}
//                                         onClick={() => handleFavorite(character)}
//                                         aria-label={favorites.includes(character.name) ? 'Unfavorite' : 'Favorite'}
//                                     >
//                                         {favorites.includes(character.name) ? 'Unfavorite' : 'Favorite'}
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 )}
//             </div>
//             <div className="flex justify-between mt-4">
//                 <p className="text-gray-400 p-2">Page {page}</p>
//             </div>
//         </div>
//     );
// };

// export default CharacterList;

// const Loader = () => (
//     <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//         <div className="flex items-center justify-center">
//             <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
//             </svg>
//         </div>
//     </div>
// );






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

interface CharacterWithFilmState extends Character {
    selectedFilm: string;
}

const CharacterList = () => {
    const [characters, setCharacters] = useState<CharacterWithFilmState[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<string[]>(
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favorites') || '[]') : []
    );
    const [error, setError] = useState<string | null>(null);
    const [filmsList, setFilmsList] = useState<{ url: string, title: string }[]>([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://swapi.dev/api/people/?page=${page}`)
            .then((response) => {
                const charactersWithFilmState = response.data.results.map((character: Character) => ({
                    ...character,
                    selectedFilm: '', // Initialize selectedFilm for each character
                }));
                setCharacters(charactersWithFilmState);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                setError('Failed to fetch characters');
                setLoading(false);
                console.error(err);
            });

        axios.get('https://swapi.dev/api/films/')
            .then((response) => {
                setFilmsList(response.data.results);
            })
            .catch((err) => {
                console.error('Failed to fetch films', err);
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

    const handleFilmFilter = (filmUrl: string, index: number) => {
        setLoading(true);
        axios.get(filmUrl)
            .then((response) => {
                const updatedCharacters = [...characters];
                updatedCharacters[index].selectedFilm = filmUrl;
                setCharacters(updatedCharacters);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                setError('Failed to fetch characters');
                setLoading(false);
                console.error(err);
            });
    };

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
                {loading ? (
                    <Loader />
                ) : (
                    characters.map((character, index) => {
                        const id = character.url ? character.url.split('/').filter(Boolean).pop() : '';
                        return (
                            <div key={character.name} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                                    alt={character.name}
                                    onError={(e) => { e.currentTarget.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }}
                                    className="w-full h-48 object-cover"
                                />
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
                                        <p><strong>Filter by Film:</strong></p>
                                        <select
                                            className="px-4 py-2 text-zinc-900 bg-gray-300 rounded"
                                            onChange={(e) => handleFilmFilter(e.target.value, index)}
                                            value={character.selectedFilm}
                                        >
                                            <option className='text-black' value="">All Films</option>
                                            {filmsList.map((film, index) => (
                                                <option className='text-zinc-900' key={index} value={film.url}>
                                                    {film.title}
                                                </option>
                                            ))}
                                        </select>
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
                <p className="text-gray-400 p-2">Page {page}</p>
            </div>
        </div>
    );
};

export default CharacterList;

const Loader = () => (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="flex items-center justify-center">
            <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
        </div>
    </div>
);
