import React, { useState, useCallback } from 'react';

const MasterAssembler: React.FC = () => {
    const [flags, setFlags] = useState<string[]>(['', '', '', '']);
    const [masterFlag, setMasterFlag] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleFlagChange = (index: number, value: string) => {
        const newFlags = [...flags];
        newFlags[index] = value;
        setFlags(newFlags);
    };

    const assembleMasterFlag = useCallback(() => {
        setError('');
        setMasterFlag('');
        setIsCopied(false);

        if (flags.some(f => f.trim() === '')) {
            setError('Please enter all four real flags.');
            return;
        }

        const fragments: string[] = [];
        const flagRegex = /^Dark_Flag\{(.+?)\}$/;

        for (let i = 0; i < flags.length; i++) {
            const flag = flags[i];
            const match = flag.trim().match(flagRegex);

            if (!match) {
                setError(`Flag #${i + 1} has an invalid format. It must look like: Dark_Flag{...}`);
                return;
            }

            const inner = match[1];
            if (inner.length < 6) {
                setError(`Flag #${i + 1}'s content is too short. The text inside {} must be at least 6 characters long.`);
                return;
            }
            // Extract fragment: characters 3 through 6 (1-based index)
            // which is index 2 to 6 in 0-based JS slice.
            fragments.push(inner.slice(2, 6));
        }

        const finalMasterFlag = `Dark_Flag{${fragments.join('')}}`;
        setMasterFlag(finalMasterFlag);
    }, [flags]);

    const handleCopy = useCallback(() => {
        if (!masterFlag || !navigator.clipboard) return;
        
        navigator.clipboard.writeText(masterFlag).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy master flag:', err);
            setError('Could not copy flag to clipboard.');
        });
    }, [masterFlag]);

    return (
        <div className="bg-ctf-dark p-6 rounded-lg border-2 border-ctf-green/80 shadow-lg shadow-ctf-green/20 mb-12">
            <h2 className="text-2xl text-ctf-green font-bold text-center mb-4">Master Flag Assembler</h2>
            <p className="text-center text-ctf-gray mb-6">Enter the four <span className="text-ctf-light-green font-bold">REAL</span> flags you've discovered to compute the master flag.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flags.map((flag, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Real Flag #${index + 1}`}
                        value={flag}
                        onChange={(e) => handleFlagChange(index, e.target.value)}
                        className="w-full bg-ctf-darker border border-ctf-gray p-2 rounded text-ctf-light-gray focus:outline-none focus:ring-2 focus:ring-ctf-green"
                        aria-label={`Real Flag Input ${index + 1}`}
                    />
                ))}
            </div>
            <div className="text-center mt-6">
                <button onClick={assembleMasterFlag} className="bg-ctf-green text-ctf-dark font-bold py-2 px-8 rounded-lg hover:bg-ctf-light-green transition-colors text-lg">
                    Assemble
                </button>
            </div>
            {error && <div role="alert" className="mt-4 p-3 bg-red-900 border border-red-500 text-red-300 rounded text-center">{error}</div>}
            {masterFlag && (
                <div className="mt-6 p-4 bg-green-900 border border-ctf-green text-ctf-light-green rounded text-center">
                    <p className="text-sm text-ctf-light-gray">Master Flag:</p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <p className="font-bold text-2xl tracking-widest break-all">{masterFlag}</p>
                        <button
                            onClick={handleCopy}
                            className="bg-ctf-gray/50 text-ctf-light-gray font-bold py-1 px-3 rounded-lg hover:bg-ctf-gray/80 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Copy master flag to clipboard"
                            disabled={isCopied}
                        >
                            {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterAssembler;