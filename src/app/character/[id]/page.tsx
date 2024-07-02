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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-zinc-900 text-white">
            {character && (
                <div className="mt-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-lg w-full max-w-4xl">
                    <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500">{character.name}</h1>
                    <ul className="space-y-2 text-lg grid grid-cols-2 gap-4">
                        <li><strong>Height:</strong> {character.height}</li>
                        <li><strong>Mass:</strong> {character.mass}</li>
                        <li><strong>Hair Color:</strong> {character.hair_color}</li>
                        <li><strong>Skin Color:</strong> {character.skin_color}</li>
                        <li><strong>Eye Color:</strong> {character.eye_color}</li>
                        <li><strong>Birth Year:</strong> {character.birth_year}</li>
                        <li><strong>Gender:</strong> {character.gender}</li>
                    </ul>
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


