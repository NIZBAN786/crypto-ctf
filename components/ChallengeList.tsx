
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Challenge, Manifest } from '../types';
import MasterAssembler from './MasterAssembler';

const getDifficultyColor = (difficulty: Challenge['difficulty']): string => {
    switch (difficulty) {
        case 'Beginner':
            return 'text-green-400 border-green-400';
        case 'Intro':
            return 'text-blue-400 border-blue-400';
        case 'Intermediate':
            return 'text-yellow-400 border-yellow-400';
        case 'Advanced':
            return 'text-red-400 border-red-400';
        case 'Trivial':
            return 'text-gray-500 border-gray-500';
        default:
            return 'text-ctf-gray border-ctf-gray';
    }
};

const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
    const difficultyClasses = getDifficultyColor(challenge.difficulty);
    const cardBorder = 'border-ctf-green/50';

    return (
        <Link to={`/challenge/${challenge.id}`} className={`block bg-ctf-dark p-6 rounded-lg border ${cardBorder} hover:border-ctf-green hover:scale-105 transition-transform duration-300`}>
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-ctf-light-green mb-2">{challenge.title}</h3>
                <span className={`text-sm font-bold py-1 px-2 border rounded-full ${difficultyClasses}`}>{challenge.difficulty}</span>
            </div>
            <p className="text-ctf-light-gray mb-4">{challenge.description}</p>
            <div className="text-right text-ctf-green font-bold text-lg">
                {challenge.points} Points
            </div>
        </Link>
    );
};

const ChallengeList: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await fetch('/manifest.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Manifest = await response.json();
                setChallenges(data.challenges);
            } catch (e) {
                if (e instanceof Error) {
                    setError(`Failed to load challenges: ${e.message}`);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    if (isLoading) {
        return <div className="text-center text-ctf-green text-2xl">Loading challenges...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-2xl">{error}</div>;
    }

    return (
        <div>
            <MasterAssembler />
            <h2 className="text-3xl text-ctf-green font-bold text-center mb-8 border-b-2 border-ctf-green/30 pb-4">Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {challenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
            </div>
        </div>
    );
};

export default ChallengeList;