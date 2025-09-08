
export interface Challenge {
    id: string;
    title: string;
    difficulty: 'Beginner' | 'Intro' | 'Intermediate' | 'Advanced' | 'Trivial';
    points: number;
    description: string;
    files: string[];
    hints: string[];
    is_fake: boolean;
}

export interface Manifest {
    challenges: Challenge[];
}
