import { Profile } from '@/lib/api';
import Image from 'next/image';

interface ProfileCardProps {
    profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
    return (
        <div className="border-b border-border pb-8 mb-12">
            {/* Avatar and Name */}
            <div className="flex items-start gap-6 mb-6">
                {profile.avatarUrl && (
                    <Image
                        src={profile.avatarUrl}
                        alt={profile.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full ring-1 ring-[var(--edge)]"
                    />
                )}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">
                        {profile.name}
                    </h1>
                    {profile.education && (
                        <p className="font-mono text-sm text-muted-foreground">
                            {profile.education}
                        </p>
                    )}
                </div>
            </div>

            {/* Links */}
            {(profile.githubUrl || profile.linkedinUrl || profile.portfolioUrl) && (
                <div className="flex flex-wrap gap-6 mb-6">
                    {profile.githubUrl && (
                        <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            github
                        </a>
                    )}
                    {profile.linkedinUrl && (
                        <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            linkedin
                        </a>
                    )}
                    {profile.portfolioUrl && (
                        <a
                            href={profile.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            portfolio
                        </a>
                    )}
                </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <span>{profile.projects.length} projects</span>
                <span>·</span>
                <span>{profile.skills.length} skills</span>
                <span>·</span>
                <span>{profile.work.length} experiences</span>
            </div>
        </div>
    );
}
