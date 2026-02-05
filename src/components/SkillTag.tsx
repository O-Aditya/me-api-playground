import { Skill } from '@/lib/api';

interface SkillTagProps {
    skill: Skill;
}

export default function SkillTag({ skill }: SkillTagProps) {
    return (
        <span className="inline-flex items-center px-2.5 py-1 border border-border rounded font-mono text-xs text-foreground">
            {skill.name}
        </span>
    );
}
