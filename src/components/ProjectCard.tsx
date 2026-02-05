import { Project } from '@/lib/api';
import { Globe, Smartphone, Code2, Terminal } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

const getCategoryIcon = (skills: string[] = []) => {
    const skillSet = skills.map(s => s.toLowerCase());

    if (skillSet.some(s => s.includes('react') || s.includes('next') || s.includes('web'))) {
        return Globe;
    }
    if (skillSet.some(s => s.includes('mobile') || s.includes('android') || s.includes('ios'))) {
        return Smartphone;
    }
    if (skillSet.some(s => s.includes('rust') || s.includes('tauri'))) {
        return Terminal;
    }
    return Code2;
};

export default function ProjectCard({ project }: ProjectCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };

    const Icon = getCategoryIcon(project.skillsUsed || []);
    const year = project.startDate ? formatDate(project.startDate) : new Date().getFullYear();

    return (
        <div className="py-8 border-b border-border last:border-b-0 group hover:bg-[color-mix(in_oklch,var(--color-muted)_30%,transparent)] transition-colors px-0">
            {/* Header with Icon and Year */}
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                    <h3 className="text-lg font-medium">
                        {project.title}
                    </h3>
                </div>
                <span className="font-mono text-xs text-muted-foreground shrink-0">
                    {year}
                </span>
            </div>

            {/* Description */}
            {project.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 ml-7">
                    {project.description}
                </p>
            )}

            {/* Tech Tags */}
            {project.skillsUsed && project.skillsUsed.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3 ml-7">
                    {project.skillsUsed.map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center px-2 py-0.5 bg-muted text-foreground rounded font-mono text-xs"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {/* Link */}
            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors ml-7"
                >
                    view project
                </a>
            )}
        </div>
    );
}
