'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";


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

export default function UserProfile({ params }: any) {
    const [character, setCharacter] = useState<Character | null>(null);

    useEffect(() => {
        if (params.id) {
            axios.get(`https://swapi.dev/api/people/${params.id}`)
                .then((response) => {
                    setCharacter(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching character:', error);
                });
        }
    }, [params.id]);

    if (!character) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-br from-gray-800 to-black text-white">
            {character && (
                <div className="mt-8 bg-gray-900 p-8 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-lg w-full max-w-4xl">
                    <div className="flex flex-col items-center">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`}
                            alt={character.name}
                            onError={(e) => { e.currentTarget.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }}
                            className="w-48 h-48 object-cover rounded-full mb-6 border-4 border-yellow-400"
                        />
                        <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500">
                            {character.name}
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mt-6 ml-24">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2">
                                <span className="font-bold">Height:</span>
                                <span>{character.height} cm</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-bold">Mass:</span>
                                <span>{character.mass} kg</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-bold">Hair Color:</span>
                                <span>{character.hair_color}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-bold">Skin Color:</span>
                                <span>{character.skin_color}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2">
                                <span className="font-bold">Eye Color:</span>
                                <span>{character.eye_color}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-bold">Birth Year:</span>
                                <span>{character.birth_year}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-bold">Gender:</span>
                                <span>{character.gender}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <Link href="/character">
                    <p className="block w-full max-w-4xl mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 text-white text-center py-3 px-6 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-300">
                        Go back to profile
                    </p>
                </Link>
            </div>
        </div>
    );
}



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