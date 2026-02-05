'use client';

import { useEffect, useState } from 'react';
import { api, Project } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const projectsResponse = await api.getProjects(selectedSkill);
                if (projectsResponse.success && projectsResponse.data) {
                    setProjects(projectsResponse.data);

                    const uniqueSkills = Array.from(
                        new Set(
                            projectsResponse.data.flatMap((p) => p.skillsUsed || [])
                        )
                    ).sort();
                    setSkills(uniqueSkills);
                } else {
                    setError(projectsResponse.error?.message || 'Failed to load projects');
                }
            } catch (err) {
                setError('An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedSkill]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent mx-auto mb-4"></div>
                    <p className="font-mono text-xs text-muted-foreground">loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full border border-border rounded-lg p-8">
                    <h2 className="text-xl font-semibold mb-2">error</h2>
                    <p className="text-sm text-muted-foreground mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 border border-border rounded hover:bg-muted transition-colors font-mono text-sm"
                    >
                        retry
                    </button>
                </div>
            </div>
        );
    }

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

                    <h1 className="text-4xl font-bold mb-2">projects</h1>
                    <p className="font-mono text-sm text-muted-foreground">
                        {selectedSkill ? `filtered by ${selectedSkill}` : `${projects.length} total`}
                    </p>
                </div>

                {/* Filter */}
                {skills.length > 0 && (
                    <div className="mb-12">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedSkill('')}
                                className={`px-3 py-1.5 rounded font-mono text-xs transition-colors ${selectedSkill === ''
                                        ? 'bg-foreground text-background'
                                        : 'bg-muted text-foreground hover:bg-[color-mix(in_oklch,var(--color-muted)_80%,var(--color-foreground)_20%)]'
                                    }`}
                            >
                                all
                            </button>
                            {skills.map((skill) => (
                                <button
                                    key={skill}
                                    onClick={() => setSelectedSkill(skill)}
                                    className={`px-3 py-1.5 rounded font-mono text-xs transition-colors ${selectedSkill === skill
                                            ? 'bg-foreground text-background'
                                            : 'bg-muted text-foreground hover:bg-[color-mix(in_oklch,var(--color-muted)_80%,var(--color-foreground)_20%)]'
                                        }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Panel List */}
                <div className="border-t border-border">
                    {projects.length === 0 ? (
                        <div className="py-16 text-center">
                            <p className="font-mono text-sm text-muted-foreground">
                                no projects found
                            </p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
