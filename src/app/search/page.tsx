'use client';

import { useState } from 'react';
import { api, SearchResults } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            setError(null);
            setHasSearched(true);

            const response = await api.search(query);

            if (response.success && response.data) {
                setResults(response.data);
            } else {
                setError(response.error?.message || 'Search failed');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const totalResults =
        (results?.projects.length || 0) +
        (results?.skills.length || 0) +
        (results?.work.length || 0);

    return (
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="border-b border-border pb-8 mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                        back
                    </Link>

                    <h1 className="text-4xl font-bold mb-2">search</h1>
                    <p className="font-mono text-sm text-muted-foreground">
                        find projects, skills, and experiences
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-12">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="search..."
                            className="w-full pl-11 pr-4 py-2.5 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono text-sm"
                            autoFocus
                        />
                    </div>
                </form>

                {/* Results */}
                {error && (
                    <div className="border border-border rounded-lg p-6">
                        <p className="font-mono text-sm text-muted-foreground">{error}</p>
                    </div>
                )}

                {hasSearched && !loading && !error && (
                    <div>
                        {totalResults === 0 ? (
                            <div className="py-16 text-center border border-border rounded-lg">
                                <p className="font-mono text-sm text-muted-foreground mb-1">no results found</p>
                                <p className="font-mono text-xs text-muted-foreground">
                                    try a different search term
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="font-mono text-xs text-muted-foreground mb-8">
                                    {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
                                </div>

                                {/* Projects */}
                                {results?.projects && results.projects.length > 0 && (
                                    <div className="mb-12">
                                        <h2 className="text-xl font-semibold mb-6">
                                            projects ({results.projects.length})
                                        </h2>
                                        <div className="border-t border-border">
                                            {results.projects.map((project) => (
                                                <div
                                                    key={project.id}
                                                    className="py-6 border-b border-border last:border-b-0 hover:bg-[color-mix(in_oklch,var(--color-muted)_30%,transparent)] transition-colors"
                                                >
                                                    <h3 className="text-base font-medium mb-2">
                                                        {project.title}
                                                    </h3>
                                                    {project.description && (
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {project.description}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Skills */}
                                {results?.skills && results.skills.length > 0 && (
                                    <div className="mb-12">
                                        <h2 className="text-xl font-semibold mb-6">
                                            skills ({results.skills.length})
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {results.skills.map((skill) => (
                                                <span
                                                    key={skill.name}
                                                    className="inline-flex items-center px-2.5 py-1 bg-muted text-foreground rounded font-mono text-xs"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Work Experience */}
                                {results?.work && results.work.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-6">
                                            experience ({results.work.length})
                                        </h2>
                                        <div className="border-t border-border">
                                            {results.work.map((work, index) => (
                                                <div
                                                    key={index}
                                                    className="py-6 border-b border-border last:border-b-0"
                                                >
                                                    <h3 className="text-base font-medium">
                                                        {work.role}
                                                    </h3>
                                                    <p className="font-mono text-xs text-muted-foreground">
                                                        {work.company}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
