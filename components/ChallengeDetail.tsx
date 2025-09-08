import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Challenge, Manifest } from '../types';

const ChallengeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await fetch('/manifest.json');
                if (!response.ok) {
                    throw new Error('Failed to load manifest');
                }
                const data: Manifest = await response.json();
                const foundChallenge = data.challenges.find(c => c.id === id);
                if (foundChallenge) {
                    setChallenge(foundChallenge);
                } else {
                    setError('Challenge not found.');
                }
            } catch (e) {
                 if (e instanceof Error) {
                    setError(`Failed to load challenge data: ${e.message}`);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchChallenge();
    }, [id]);

    if (isLoading) {
        return <div className="text-center text-ctf-green text-2xl">Loading challenge...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-2xl">{error}</div>;
    }

    if (!challenge) {
        return null;
    }

    return (
        <div className="bg-ctf-dark p-8 rounded-lg border border-ctf-green/50 max-w-4xl mx-auto">
            <Link to="/" className="text-ctf-light-green hover:text-ctf-green mb-6 inline-block">&larr; Back to Challenges</Link>
            
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-4xl font-bold text-ctf-green">{challenge.title}</h2>
                <span className="text-xl font-bold text-ctf-green">{challenge.points} Points</span>
            </div>

            <p className="text-ctf-light-gray mb-6">{challenge.description}</p>
            
            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-ctf-light-green mb-3">Challenge Files</h3>
                {challenge.files.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {challenge.files.map(file => (
                            <li key={file} className="mb-2">
                                <a href={`/challenges/${file}`} download className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                                    {file}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-ctf-gray">No files for this challenge.</p>
                )}
            </div>
            
            <div className="mt-8 p-4 border border-red-500/50 bg-red-900/20 rounded-lg text-red-300 text-sm">
                <h4 className="font-bold text-red-400 mb-2">Responsible Use Notice</h4>
                <p>This challenge is for educational purposes only in a controlled environment. The techniques discussed may be illegal if applied to systems you do not have explicit permission to test. Always act ethically and within the law.</p>
            </div>
        </div>
    );
};

export default ChallengeDetail;