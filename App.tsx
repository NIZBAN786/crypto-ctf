
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import ChallengeList from './components/ChallengeList';
import ChallengeDetail from './components/ChallengeDetail';

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className="min-h-screen bg-ctf-darker flex flex-col">
                <header className="bg-ctf-dark border-b-2 border-ctf-green p-4 text-center shadow-lg shadow-ctf-green/20">
                    <Link to="/">
                        <h1 className="text-4xl font-bold text-ctf-green tracking-widest uppercase">Crypto CTF</h1>
                    </Link>
                    <p className="text-ctf-gray text-sm mt-1">An Educational Cryptography Playground</p>
                </header>

                <main className="flex-grow container mx-auto p-4 md:p-8">
                    <Routes>
                        <Route path="/" element={<ChallengeList />} />
                        <Route path="/challenge/:id" element={<ChallengeDetail />} />
                    </Routes>
                </main>

                <footer className="bg-ctf-dark p-4 text-center text-ctf-gray text-xs border-t border-ctf-green/30">
                    <p>
                        <span className="font-bold text-red-500">Notice:</span> This is an educational tool. All challenges are fictional and self-contained.
                        Do not attempt these techniques on any system you do not own or have explicit permission to test.
                    </p>
                    <p className="mt-2">© 2024. Built for educational purposes.</p>
                </footer>
            </div>
        </HashRouter>
    );
};

export default App;
