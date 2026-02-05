'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-9 h-9 border border-border rounded hover:bg-muted transition-colors">
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 border border-border rounded hover:bg-muted transition-colors flex items-center justify-center font-mono text-xs"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? '☀' : '☾'}
        </button>
    );
}
